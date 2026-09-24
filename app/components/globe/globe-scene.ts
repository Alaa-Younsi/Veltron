/**
 * Interactive WebGL trade globe (vanilla three.js — no React renderer overhead).
 *
 * - Dot-matrix continents (pre-computed at build time → /data/globe-land.bin)
 * - Fresnel atmosphere + rim-lit occluder sphere
 * - Great-circle trade routes with travelling "comet" pulses
 * - Drag to spin (with inertia), gentle auto-rotation
 * - Pauses when offscreen / tab hidden; fully disposed on teardown
 *
 * Loaded lazily (dynamic import) after hydration, so it never affects first paint.
 */
import {
  AdditiveBlending,
  BackSide,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  RingGeometry,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
} from "three";

export type GlobePoint = {
  lat: number;
  lon: number;
  kind: "hub" | "origin" | "destination";
};

type GlobeOptions = {
  points: GlobePoint[];
  reducedMotion: boolean;
  onReady: () => void;
};

const DEG = Math.PI / 180;
const GOLD = new Color("#e6bf6e");
const GOLD_DEEP = new Color("#d4a24c");
const MIST = new Color("#c7d2d4");
const INK = new Color("#0f1719");

function toVector(lat: number, lon: number, radius = 1): Vector3 {
  const phi = (90 - lat) * DEG;
  const theta = (lon + 180) * DEG;
  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/** Great-circle arc lifted above the surface proportionally to its length. */
function arcCurve(a: GlobePoint, b: GlobePoint): CatmullRomCurve3 {
  const start = toVector(a.lat, a.lon).normalize();
  const end = toVector(b.lat, b.lon).normalize();
  const angle = start.angleTo(end);
  const lift = 0.04 + (angle / Math.PI) * 0.26;
  const pts: Vector3[] = [];
  const steps = 48;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Spherical linear interpolation between the two surface normals.
    const s = Math.sin(angle);
    const v =
      s < 1e-6
        ? start.clone()
        : start
            .clone()
            .multiplyScalar(Math.sin((1 - t) * angle) / s)
            .add(end.clone().multiplyScalar(Math.sin(t * angle) / s));
    pts.push(v.normalize().multiplyScalar(1.004 + Math.sin(Math.PI * t) * lift));
  }
  return new CatmullRomCurve3(pts);
}

const dotsMaterial = (pixelRatio: number) =>
  new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uSize: { value: 7.5 },
      uPixelRatio: { value: pixelRatio },
      uColor: { value: MIST },
    },
    vertexShader: /* glsl */ `
      uniform float uSize;
      uniform float uPixelRatio;
      varying float vFacing;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vec3 n = normalize(normalMatrix * normalize(position));
        vFacing = dot(n, normalize(-mv.xyz));
        gl_PointSize = uSize * uPixelRatio / -mv.z;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      varying float vFacing;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        if (dot(c, c) > 0.25) discard;
        float a = smoothstep(0.0, 0.55, vFacing);
        gl_FragColor = vec4(uColor, a * 0.85);
      }
    `,
  });

const occluderMaterial = () =>
  new ShaderMaterial({
    uniforms: { uBase: { value: INK }, uRim: { value: GOLD_DEEP } },
    vertexShader: /* glsl */ `
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uBase;
      uniform vec3 uRim;
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        float rim = pow(1.0 - max(dot(vNormal, vView), 0.0), 3.0);
        // Soft key light from the upper left gives the sphere volume.
        float light = 0.55 + 0.45 * max(dot(vNormal, normalize(vec3(-0.6, 0.7, 0.6))), 0.0);
        gl_FragColor = vec4(uBase * light * 1.9 + uRim * rim * 0.35, 1.0);
      }
    `,
  });

const atmosphereMaterial = () =>
  new ShaderMaterial({
    side: BackSide,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: { uColor: { value: GOLD_DEEP } },
    vertexShader: /* glsl */ `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      varying vec3 vNormal;
      void main() {
        float i = pow(max(0.56 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 3.0);
        gl_FragColor = vec4(uColor, 1.0) * i * 0.55;
      }
    `,
  });

const arcMaterial = (color: Color, offset: number, speed: number) =>
  new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uReveal: { value: 0 },
      uOffset: { value: offset },
      uSpeed: { value: speed },
      uColor: { value: color },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform float uReveal;
      uniform float uOffset;
      uniform float uSpeed;
      uniform vec3 uColor;
      varying vec2 vUv;
      void main() {
        if (vUv.x > uReveal) discard;
        float head = fract(uTime * uSpeed + uOffset);
        float d = head - vUv.x;
        float trail = 0.3;
        float comet = (d >= 0.0 && d < trail) ? pow(1.0 - d / trail, 2.2) : 0.0;
        float alpha = 0.38 + comet * 0.9;
        gl_FragColor = vec4(uColor * (0.75 + comet), alpha);
      }
    `,
  });

export async function createTradeGlobe(canvas: HTMLCanvasElement, options: GlobeOptions) {
  const { points, reducedMotion, onReady } = options;
  const container = canvas.parentElement;
  if (!container) throw new Error("Globe canvas needs a parent element");

  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 1.32 / Math.sin(15 * DEG));

  const globe = new Group();
  scene.add(globe);

  // Occluder (hides back-facing dots/arcs) with rim light
  const sphereGeo = new SphereGeometry(0.995, 72, 72);
  const occluder = new Mesh(sphereGeo, occluderMaterial());
  globe.add(occluder);

  // Atmosphere
  const atmoGeo = new SphereGeometry(1.12, 64, 64);
  const atmosphere = new Mesh(atmoGeo, atmosphereMaterial());
  scene.add(atmosphere);

  // Land dots
  const response = await fetch("/data/globe-land.bin");
  const raw = new Int16Array(await response.arrayBuffer());
  const positions = new Float32Array((raw.length / 2) * 3);
  for (let i = 0; i < raw.length / 2; i++) {
    const v = toVector((raw[i * 2] ?? 0) / 100, (raw[i * 2 + 1] ?? 0) / 100, 1.001);
    positions.set([v.x, v.y, v.z], i * 3);
  }
  const dotsGeo = new BufferGeometry();
  dotsGeo.setAttribute("position", new Float32BufferAttribute(positions, 3));
  const dotsMat = dotsMaterial(pixelRatio);
  globe.add(new Points(dotsGeo, dotsMat));

  // Routes + markers
  const hub = points.find((p) => p.kind === "hub");
  const arcMaterials: ShaderMaterial[] = [];
  const disposables: { dispose: () => void }[] = [sphereGeo, atmoGeo, dotsGeo, dotsMat];
  const markerGeo = new SphereGeometry(1, 12, 12);
  disposables.push(markerGeo);

  if (hub) {
    points
      .filter((p) => p.kind !== "hub")
      .forEach((p, index) => {
        const inbound = p.kind === "origin";
        const curve = inbound ? arcCurve(p, hub) : arcCurve(hub, p);
        const geo = new TubeGeometry(curve, 96, inbound ? 0.0042 : 0.0058, 8, false);
        const mat = arcMaterial(
          inbound ? GOLD_DEEP : GOLD,
          (index * 0.137) % 1,
          inbound ? 0.16 : 0.22,
        );
        arcMaterials.push(mat);
        disposables.push(geo, mat);
        globe.add(new Mesh(geo, mat));

        const markerMat = new MeshBasicMaterial({ color: inbound ? GOLD_DEEP : MIST });
        disposables.push(markerMat);
        const marker = new Mesh(markerGeo, markerMat);
        marker.scale.setScalar(inbound ? 0.009 : 0.011);
        marker.position.copy(toVector(p.lat, p.lon, 1.006));
        globe.add(marker);
      });

    const hubMat = new MeshBasicMaterial({ color: GOLD });
    const hubMarker = new Mesh(markerGeo, hubMat);
    hubMarker.scale.setScalar(0.02);
    const hubPos = toVector(hub.lat, hub.lon, 1.008);
    hubMarker.position.copy(hubPos);
    globe.add(hubMarker);
    disposables.push(hubMat);

    const ringGeo = new RingGeometry(0.028, 0.034, 48);
    const ringMat = new MeshBasicMaterial({ color: GOLD, transparent: true, depthWrite: false });
    const ring = new Mesh(ringGeo, ringMat);
    ring.position.copy(hubPos);
    ring.lookAt(hubPos.clone().multiplyScalar(2));
    globe.add(ring);
    disposables.push(ringGeo, ringMat);
    globe.userData.ring = ring;
  }

  // Initial orientation: centre on the Indian Ocean trade corridor, tilted north.
  const baseLon = 78;
  let rotY = -(baseLon + 90) * DEG;
  let rotX = 0.32;
  let targetY = rotY;
  let targetX = rotX;
  globe.rotation.set(rotX, rotY, 0);

  // Interaction
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let velocity = 0;
  let idleSince = performance.now();
  const onDown = (e: PointerEvent) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
    canvas.dataset.dragging = "true";
  };
  const onMove = (e: PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    targetY += dx * 0.006;
    targetX = Math.max(-0.2, Math.min(0.8, targetX + dy * 0.004));
    velocity = dx * 0.006;
    idleSince = performance.now();
  };
  const onUp = (e: PointerEvent) => {
    dragging = false;
    if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    delete canvas.dataset.dragging;
    idleSince = performance.now();
  };
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", onUp);

  // Sizing
  const resize = () => {
    const { width, height } = container.getBoundingClientRect();
    if (width === 0 || height === 0) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  // Render loop (paused when not visible)
  let frame = 0;
  let visible = true;
  let last = performance.now();
  // Wall-clock time drives shader animation so it stays correct at any frame rate.
  const startedAt = performance.now();
  let readyFired = false;

  const render = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const elapsed = (now - startedAt) / 1000;

    if (!dragging) {
      velocity *= 0.94;
      targetY += velocity;
      if (!reducedMotion && now - idleSince > 2500) targetY += dt * 0.06;
    }
    rotY += (targetY - rotY) * 0.08;
    rotX += (targetX - rotX) * 0.08;
    globe.rotation.set(rotX, rotY, 0);

    arcMaterials.forEach((mat, i) => {
      const u = mat.uniforms;
      if (u.uTime) u.uTime.value = reducedMotion ? 0 : elapsed;
      if (u.uReveal)
        u.uReveal.value = reducedMotion
          ? 1
          : Math.min(1, Math.max(0, (elapsed - 0.3 - i * 0.05) / 1.6));
    });

    const ring = globe.userData.ring as Mesh | undefined;
    if (ring && !reducedMotion) {
      const p = (elapsed % 2.4) / 2.4;
      ring.scale.setScalar(1 + p * 2.2);
      (ring.material as MeshBasicMaterial).opacity = 1 - p;
    }

    renderer.render(scene, camera);
    if (!readyFired) {
      readyFired = true;
      onReady();
    }
  };

  const loop = (now: number) => {
    render(now);
    frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
  };
  const start = () => {
    if (!frame) {
      last = performance.now();
      frame = requestAnimationFrame(loop);
    }
  };
  const stop = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  };

  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? false;
    if (visible) start();
    else stop();
  });
  intersection.observe(canvas);
  const onVisibility = () => (document.hidden ? stop() : visible && start());
  document.addEventListener("visibilitychange", onVisibility);
  start();

  return {
    dispose() {
      stop();
      intersection.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      for (const d of disposables) d.dispose();
      atmosphere.material.dispose();
      occluder.material.dispose();
      renderer.dispose();
    },
  };
}

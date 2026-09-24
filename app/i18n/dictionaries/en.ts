/**
 * English dictionary — the master copy. Its shape defines the `Dictionary`
 * type every other locale must satisfy (enforced at compile time).
 *
 * Technical values in product specifications are typical/indicative; final
 * specifications are always confirmed per contract.
 */
export const en = {
  meta: {
    siteName: "VELTRON Global Trading",
    titleSuffix: "VELTRON Global Trading Limited",
    defaultDescription:
      "Hong Kong–based international trader of cement, clinker, gypsum, construction materials and industrial raw materials — with global sourcing and end-to-end shipping coordination.",
  },

  common: {
    nav: {
      home: "Home",
      about: "About Us",
      products: "Products",
      logistics: "Trade & Logistics",
      markets: "Markets",
      quality: "Quality & Compliance",
      contact: "Contact",
      requestQuote: "Request a Quote",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      skipToContent: "Skip to main content",
      language: "Language",
      allProducts: "All products",
      productsIntro: "Bulk and bagged supply for construction and industry.",
      mainNavigation: "Main navigation",
    },
    footer: {
      tagline:
        "International trading of cement, clinker and industrial raw materials — sourced responsibly, shipped reliably.",
      headquarters: "Headquarters",
      company: "Company",
      products: "Products",
      rights: "All rights reserved.",
      backToTop: "Back to top",
      registered: "Registered in Hong Kong SAR",
    },
    cta: {
      requestQuote: "Request a quote",
      exploreProducts: "Explore products",
    },
    labels: {
      address: "Address",
      email: "Email",
      phone: "Phone",
      whatsapp: "WhatsApp",
      hours: "Office hours",
      hoursValue: "Monday – Friday, 09:00 – 18:00 (HKT)",
      home: "Home",
      breadcrumb: "Breadcrumb",
    },
    ctaBand: {
      eyebrow: "Start a conversation",
      title: "Have a requirement? Let’s build the right supply plan.",
      text: "Share your product, volume, destination port and preferred Incoterm. We will come back with a tailored, transparent offer.",
    },
    whatsapp: {
      label: "Chat on WhatsApp",
      message: "Hello VELTRON, I would like to discuss a supply requirement.",
    },
  },

  products: {
    cement: {
      name: "Cement",
      short: "Portland and blended cements for every scale of construction.",
      tagline: "Consistent strength. Reliable supply.",
      intro: [
        "We supply Ordinary Portland Cement and blended cements from carefully qualified producers, meeting European (EN 197-1) and American (ASTM C150) standards.",
        "From 50 kg bags for retail distribution to full bulk shipments for ready-mix plants and infrastructure projects, every lot is matched to your specification and backed by mill test certificates.",
      ],
      highlights: [
        "EN 197-1 & ASTM C150 grades",
        "Bagged, jumbo bag or bulk",
        "Mill test certificate per lot",
      ],
      grades: [
        {
          name: "OPC CEM I 42.5 N / R",
          detail: "General-purpose Portland cement for structural concrete.",
        },
        {
          name: "OPC CEM I 52.5 N / R",
          detail: "High early strength for precast and high-performance concrete.",
        },
        {
          name: "CEM II 42.5 R / 32.5 R",
          detail: "Portland-composite cements for masonry, blocks and general works.",
        },
        {
          name: "ASTM C150 Type I / II",
          detail: "US-standard cement, including moderate sulfate resistance.",
        },
        {
          name: "Sulfate-Resisting (Type V / SR)",
          detail: "Low C₃A cement for marine and aggressive soil conditions.",
        },
      ],
      specsTitle: "Typical properties — OPC CEM I 42.5",
      specs: [
        { label: "Compressive strength, 2 days", value: "≥ 10 MPa (N) · ≥ 20 MPa (R)" },
        { label: "Compressive strength, 28 days", value: "42.5 – 62.5 MPa" },
        { label: "Initial setting time", value: "≥ 60 min" },
        { label: "Soundness (Le Chatelier)", value: "≤ 10 mm" },
        { label: "Sulfate content (SO₃)", value: "≤ 3.5 %" },
        { label: "Chloride content", value: "≤ 0.10 %" },
        { label: "Loss on ignition", value: "≤ 5.0 %" },
      ],
      packaging: [
        "50 kg woven PP or kraft paper bags",
        "1.5 t and 2 t jumbo bags (FIBC)",
        "Bulk in vessel holds or tankers",
      ],
      applications: [
        "Ready-mix concrete",
        "Precast elements",
        "Infrastructure & marine works",
        "Residential & commercial building",
        "Blocks, mortar and plaster",
      ],
      shipping: [
        "Bulk carriers — Handysize to Supramax",
        "Break-bulk bagged cargo",
        "20 ft containers for smaller lots",
      ],
    },
    clinker: {
      name: "Clinker",
      short: "High-quality Portland clinker for cement grinding plants.",
      tagline: "The core of every cement.",
      intro: [
        "Portland cement clinker is the backbone of cement production. We supply grinding plants and cement producers with clinker of consistent chemistry and reactivity, sourced from modern dry-process kilns.",
        "Shipments are arranged on geared bulk carriers with pre-loading sampling and independent analysis, giving your production team predictable performance cargo after cargo.",
      ],
      highlights: [
        "Consistent C₃S and low free lime",
        "Ordinary & sulfate-resisting grades",
        "Bulk shipments from 25,000 MT",
      ],
      grades: [
        { name: "Ordinary Portland Clinker", detail: "For CEM I / ASTM Type I cement production." },
        {
          name: "Sulfate-Resisting Clinker",
          detail: "Low C₃A (≤ 3.5 %) for SR and Type V cements.",
        },
        {
          name: "Low-Alkali Clinker",
          detail: "Reduced Na₂O-eq for alkali-silica-sensitive applications.",
        },
      ],
      specsTitle: "Typical chemistry — Ordinary Portland Clinker",
      specs: [
        { label: "Tricalcium silicate (C₃S)", value: "≥ 55 %" },
        { label: "Free lime (f-CaO)", value: "≤ 1.5 %" },
        { label: "Magnesium oxide (MgO)", value: "≤ 5.0 %" },
        { label: "Loss on ignition", value: "≤ 1.0 %" },
        { label: "Insoluble residue", value: "≤ 0.75 %" },
        { label: "Lime saturation factor (LSF)", value: "92 – 98" },
        { label: "Size distribution", value: "0 – 50 mm (≥ 90 %)" },
        { label: "Strength, 28 days (lab-ground)", value: "≥ 50 MPa" },
      ],
      packaging: ["Bulk only — loose in vessel holds"],
      applications: [
        "Cement grinding plants",
        "Blended cement production",
        "Capacity balancing for integrated plants",
      ],
      shipping: [
        "Supramax, Ultramax and Panamax vessels",
        "Geared vessels for ports without shore cranes",
        "Typical parcels 25,000 – 60,000 MT",
      ],
    },
    gypsum: {
      name: "Gypsum",
      short: "Natural gypsum for cement retarding, plaster and board.",
      tagline: "Pure calcium sulfate, sized to spec.",
      intro: [
        "Natural gypsum (calcium sulfate dihydrate) is an essential set-retarder in cement grinding and the raw material for plaster and gypsum board.",
        "We supply high-purity gypsum lumps and crushed grades from established quarries, screened to the size range your mill or kiln requires.",
      ],
      highlights: [
        "Purity up to 95 % CaSO₄·2H₂O",
        "Crushed & screened to size",
        "Bulk or jumbo bags",
      ],
      grades: [
        {
          name: "Cement-grade gypsum",
          detail: "Lumps for use as a set-retarder in cement grinding.",
        },
        {
          name: "Plaster / board-grade gypsum",
          detail: "High whiteness and purity for calcining.",
        },
        { name: "Agricultural gypsum", detail: "Soil conditioner supplying calcium and sulfur." },
      ],
      specsTitle: "Typical properties — cement-grade gypsum",
      specs: [
        { label: "Purity (CaSO₄·2H₂O)", value: "85 – 95 %" },
        { label: "Sulfur trioxide (SO₃)", value: "≥ 40 %" },
        { label: "Combined water", value: "≥ 18 %" },
        { label: "Free moisture", value: "≤ 3 %" },
        { label: "Chloride (Cl⁻)", value: "≤ 0.02 %" },
        { label: "Size range", value: "0–50 / 10–50 / 20–80 mm" },
      ],
      packaging: ["Bulk in vessel holds", "1 – 2 t jumbo bags"],
      applications: [
        "Cement set-retarder",
        "Plaster and gypsum board",
        "Agriculture and soil treatment",
        "Ceramics and moulds",
      ],
      shipping: [
        "Handysize and Supramax bulk carriers",
        "Containerised jumbo bags for smaller volumes",
      ],
    },
    "construction-materials": {
      name: "Construction Materials",
      short: "Steel, aggregates, bitumen and finishing materials.",
      tagline: "Everything a project needs to rise.",
      intro: [
        "Beyond cement, we supply the core materials that keep construction projects on schedule — reinforcing steel, aggregates, bitumen and finishing products.",
        "Consolidating several product lines under one trading partner simplifies procurement, documentation and shipping for contractors and distributors alike.",
      ],
      highlights: [
        "Rebar to BS 4449 & ASTM A615",
        "Bitumen 60/70 and 80/100",
        "Consolidated multi-product supply",
      ],
      grades: [
        { name: "Steel reinforcing bar", detail: "B500B, ASTM A615 Grade 60 — Ø 8 to 32 mm." },
        { name: "Wire rod & billets", detail: "SAE 1006/1008 wire rod · 3SP/5SP billets." },
        { name: "Aggregates & crushed stone", detail: "Limestone and granite, 5 – 40 mm graded." },
        { name: "Bitumen", detail: "Penetration grades 60/70 and 80/100." },
        { name: "Tiles & gypsum board", detail: "Ceramic and porcelain tiles · 9 – 15 mm board." },
      ],
      specsTitle: "Product range at a glance",
      specs: [
        { label: "Steel rebar", value: "BS 4449 B500B · ASTM A615 Gr 60 · Ø 8 – 32 mm" },
        { label: "Wire rod", value: "SAE 1006 / 1008 · Ø 5.5 – 12 mm" },
        { label: "Billets", value: "3SP / 5SP · 120 – 150 mm square" },
        { label: "Aggregates", value: "Crushed limestone / granite · 5 – 40 mm" },
        { label: "Bitumen", value: "Penetration grade 60/70 · 80/100" },
        { label: "Gypsum board", value: "Standard, moisture & fire resistant · 9 – 15 mm" },
      ],
      packaging: [
        "Steel in bundles with tags",
        "Bitumen in drums, jumbo bags or bulk",
        "Tiles and board on pallets",
      ],
      applications: [
        "Residential & commercial construction",
        "Roads and infrastructure",
        "Distribution and wholesale",
      ],
      shipping: [
        "Break-bulk vessels for steel",
        "Containers for finishing materials",
        "Bulk carriers for aggregates",
      ],
    },
    "industrial-raw-materials": {
      name: "Industrial Raw Materials",
      short: "Limestone, slag, fly ash, fuels and correctives.",
      tagline: "The inputs behind heavy industry.",
      intro: [
        "Cement, steel and power producers depend on a steady flow of raw materials and fuels. We source the key inputs — from limestone and supplementary cementitious materials to kiln fuels and correctives.",
        "Each material is qualified against your process requirements, with analysis certificates and independent inspection available on every shipment.",
      ],
      highlights: [
        "SCMs: slag, fly ash, pozzolana",
        "Kiln fuels: petcoke & coal",
        "Correctives: iron ore, bauxite",
      ],
      grades: [
        { name: "Limestone", detail: "High-calcium limestone for cement and lime." },
        {
          name: "Granulated slag (GGBFS)",
          detail: "Supplementary cementitious material for blended cements.",
        },
        { name: "Fly ash", detail: "Class F and Class C, for cement and concrete." },
        { name: "Petroleum coke", detail: "Fuel-grade petcoke for cement kilns." },
        { name: "Steam coal", detail: "Thermal coal for kilns and power generation." },
        { name: "Iron ore & bauxite", detail: "Correctives for raw-mix chemistry." },
      ],
      specsTitle: "Typical specifications",
      specs: [
        { label: "Limestone", value: "CaCO₃ ≥ 90 – 97 % · 0 – 80 mm" },
        { label: "Granulated slag", value: "Glass content ≥ 85 % · basicity ≥ 1.0" },
        { label: "Fly ash", value: "Class F / C · LOI ≤ 6 %" },
        { label: "Petroleum coke", value: "GCV ≥ 8,000 kcal/kg · S ≤ 6.5 %" },
        { label: "Steam coal", value: "NAR 5,500 – 6,000 kcal/kg" },
        { label: "Iron ore (corrective)", value: "Fe₂O₃ ≥ 60 %" },
      ],
      packaging: ["Bulk in vessel holds", "Jumbo bags for fly ash and specialty grades"],
      applications: [
        "Cement and clinker production",
        "Steelmaking and metallurgy",
        "Power generation",
      ],
      shipping: ["Supramax and Panamax bulk carriers", "Pneumatic bulk vessels for fly ash"],
    },
  },

  pages: {
    home: {
      title: "International Trading of Cement & Construction Materials",
      description:
        "VELTRON Global Trading Limited supplies cement, clinker, gypsum, construction materials and industrial raw materials worldwide from its base in Hong Kong.",
      hero: {
        eyebrow: "International trading · Hong Kong",
        titleLead: "Building materials,",
        titleAccent: "sourced globally.",
        titleTail: "Delivered with precision.",
        text: "VELTRON Global Trading Limited connects trusted producers of cement, clinker, gypsum and industrial raw materials with buyers across the Middle East, Africa, Asia and beyond.",
        badges: ["Bulk & bagged cargo", "FOB · CFR · CIF", "Independent inspection"],
        mapCaption: "Trade network — sourcing hubs and destination markets",
        scroll: "Scroll",
      },
      marquee: [
        "Cement",
        "Clinker",
        "Gypsum",
        "Steel rebar",
        "Limestone",
        "Granulated slag",
        "Fly ash",
        "Aggregates",
        "Bitumen",
        "Petroleum coke",
      ],
      productsSection: {
        eyebrow: "What we trade",
        title: "A focused portfolio for construction and heavy industry",
        text: "Five product lines, one accountable partner — from specification and sourcing to loading, shipping and documentation.",
      },
      stats: [
        { value: "5", label: "Product lines" },
        { value: "7", label: "Regions served" },
        { value: "3", label: "Incoterm options" },
        { value: "1", label: "Point of contact, quote to discharge" },
      ],
      why: {
        eyebrow: "Why VELTRON",
        title: "Trading built on reliability, transparency and control",
        items: {
          sourcing: {
            title: "Qualified sourcing network",
            text: "We work with producers we have vetted for capacity, consistency and compliance — so the product you contract is the product you receive.",
          },
          quality: {
            title: "Quality you can verify",
            text: "Mill certificates, pre-shipment sampling and independent inspection by internationally recognised surveyors on request.",
          },
          logistics: {
            title: "End-to-end logistics",
            text: "Chartering, loading supervision, documentation and discharge coordination handled by one team from quote to arrival.",
          },
          terms: {
            title: "Clear commercial terms",
            text: "FOB, CFR or CIF pricing, secure payment instruments and contracts written in plain language — no surprises.",
          },
        },
      },
      process: {
        eyebrow: "How we work",
        title: "From inquiry to discharge, in five clear steps",
        steps: [
          {
            title: "Inquiry",
            text: "You share product, specification, volume, destination and timing.",
          },
          {
            title: "Sourcing & offer",
            text: "We match qualified producers and issue a firm, transparent offer.",
          },
          {
            title: "Contract & payment",
            text: "Terms are agreed and secured through LC, TT or agreed instruments.",
          },
          {
            title: "Inspection & loading",
            text: "Sampling, surveying and loading supervision at the origin port.",
          },
          {
            title: "Shipping & delivery",
            text: "Voyage tracking, documents and discharge coordination at destination.",
          },
        ],
      },
      reach: {
        eyebrow: "Global reach",
        title: "Hong Kong at the centre of a worldwide supply network",
        text: "From our base in Hong Kong we coordinate supply between major producing regions and fast-growing construction markets on every continent.",
        cta: "Explore our markets",
      },
      quote: {
        text: "From quarry to quay, every tonne we trade is backed by verified quality and coordinated logistics.",
        author: "VELTRON Trading Desk",
      },
    },

    about: {
      title: "About Us",
      description:
        "Learn about VELTRON Global Trading Limited — a Hong Kong international trading company specialising in cement, clinker and construction raw materials.",
      hero: {
        eyebrow: "About VELTRON",
        title: "A trading partner built for the materials that build the world",
        text: "VELTRON Global Trading Limited is an international trading company headquartered in Hong Kong, specialising in cement, clinker, gypsum, construction materials and industrial raw materials.",
      },
      story: {
        eyebrow: "Who we are",
        title: "Connecting producers and builders across continents",
        paragraphs: [
          "Construction and heavy industry run on bulk materials that must arrive on time, on specification and at a competitive landed cost. VELTRON was founded to make that happen with less friction.",
          "Operating from Hong Kong — one of the world’s great trading and shipping hubs — we bring together qualified producers in Asia, the Middle East and the Mediterranean with contractors, cement plants and distributors in growing markets worldwide.",
          "Our team manages the entire chain: sourcing and qualification, commercial terms, inspection, chartering and documentation. Our clients deal with one accountable partner from the first inquiry to the final discharge.",
        ],
      },
      mission: {
        title: "Our mission",
        text: "To supply essential construction and industrial materials reliably and transparently, helping our clients build with confidence.",
      },
      vision: {
        title: "Our vision",
        text: "To be the trusted trading partner for cement and raw materials between the world’s producing regions and its fastest-growing markets.",
      },
      values: {
        eyebrow: "Our values",
        title: "The principles behind every contract",
        items: {
          integrity: {
            title: "Integrity",
            text: "Honest specifications, honest pricing and commitments we keep.",
          },
          reliability: {
            title: "Reliability",
            text: "Cargo that arrives on time and on specification, shipment after shipment.",
          },
          transparency: {
            title: "Transparency",
            text: "Clear terms, full documentation and open communication at every step.",
          },
          partnership: {
            title: "Partnership",
            text: "Long-term relationships over one-off transactions.",
          },
        },
      },
      hq: {
        eyebrow: "Headquarters",
        title: "Based in Hong Kong, trading worldwide",
        text: "Hong Kong’s free-port status, deep financial markets and connectivity to every major shipping lane make it the natural base for an international commodities trader.",
      },
    },

    products: {
      title: "Products",
      description:
        "Cement, clinker, gypsum, construction materials and industrial raw materials — supplied in bulk or bagged, to international standards.",
      hero: {
        eyebrow: "Our products",
        title: "Materials for construction and heavy industry",
        text: "Every product is sourced from qualified producers, supplied to international standards and shipped in the format that suits your operation.",
      },
      standardsNote:
        "Specifications shown are typical values. Final specifications, tolerances and test methods are confirmed in each contract.",
      detail: {
        overview: "Overview",
        grades: "Available grades",
        packaging: "Packaging",
        applications: "Applications",
        shipping: "Shipping options",
        related: "Related products",
        quoteTitle: "Request a quote for {product}",
        quoteText:
          "Tell us the grade, quantity, destination port and preferred Incoterm — we will respond with a tailored offer.",
        backToProducts: "All products",
      },
    },

    logistics: {
      title: "Global Trade & Logistics",
      description:
        "End-to-end trade and logistics coordination — global sourcing, chartering, inspection, documentation and delivery on FOB, CFR or CIF terms.",
      hero: {
        eyebrow: "Global trade & logistics",
        title: "One partner from the producer’s gate to your port",
        text: "We coordinate every link in the supply chain so that your cargo moves safely, on schedule and fully documented.",
      },
      services: {
        eyebrow: "What we handle",
        title: "Integrated services around every shipment",
        items: {
          sourcing: {
            title: "Global sourcing",
            text: "Identification and qualification of producers that match your specification, volume and budget.",
          },
          chartering: {
            title: "Chartering & freight",
            text: "Voyage charters, bulk and break-bulk tonnage and container bookings at competitive rates.",
          },
          inspection: {
            title: "Inspection & surveying",
            text: "Pre-shipment sampling, quantity and quality surveys by independent inspection companies.",
          },
          documentation: {
            title: "Trade documentation",
            text: "Bills of lading, certificates of origin and analysis, packing lists, invoices and insurance.",
          },
          finance: {
            title: "Payment security",
            text: "Structured payment through letters of credit, telegraphic transfer or other agreed instruments.",
          },
          delivery: {
            title: "Port & discharge coordination",
            text: "Liaison with agents and receivers for smooth berthing, discharge and clearance.",
          },
        },
      },
      incoterms: {
        coverage: {
          loading: "Loading on board",
          freight: "Ocean freight",
          insurance: "Cargo insurance",
          seller: "Arranged by VELTRON",
        },
        eyebrow: "Incoterms® 2020",
        title: "Flexible delivery terms",
        text: "Choose the point at which cost and risk transfer — we price and execute on the terms that suit your organisation.",
        items: [
          {
            code: "FOB",
            name: "Free On Board",
            text: "Delivered on board your nominated vessel at the port of loading. You control freight and insurance.",
          },
          {
            code: "CFR",
            name: "Cost and Freight",
            text: "We arrange and pay ocean freight to your destination port. Risk transfers once goods are on board.",
          },
          {
            code: "CIF",
            name: "Cost, Insurance and Freight",
            text: "As CFR, plus marine cargo insurance arranged by us for your benefit.",
          },
        ],
      },
      modes: {
        eyebrow: "Shipment modes",
        title: "The right vessel for every cargo",
        items: {
          bulk: {
            title: "Dry bulk",
            text: "Handysize to Panamax carriers for cement, clinker, gypsum and raw materials.",
          },
          breakbulk: {
            title: "Break-bulk",
            text: "Bagged cement, steel products and project cargo in general-cargo vessels.",
          },
          container: {
            title: "Containers",
            text: "20 ft and 40 ft containers for smaller lots and finishing materials.",
          },
        },
      },
      documents: {
        title: "Standard shipping documents",
        items: [
          "Commercial invoice",
          "Bill of lading",
          "Certificate of origin",
          "Certificate of analysis",
          "Inspection certificate (quality & quantity)",
          "Packing list",
          "Insurance certificate (CIF)",
        ],
      },
    },

    markets: {
      title: "Markets & Destinations",
      description:
        "VELTRON supplies construction materials to buyers in the Middle East, Africa, South and Southeast Asia, Europe, the Americas and Oceania.",
      hero: {
        eyebrow: "Markets & destinations",
        title: "Supplying growth markets across seven regions",
        text: "Our sourcing network spans major producing hubs in Asia, the Gulf and the Mediterranean — reaching buyers wherever construction is accelerating.",
      },
      mapLegend: { hub: "Headquarters", origin: "Sourcing hub", destination: "Destination market" },
      regionsTitle: "Regions we serve",
      regions: {
        gcc: {
          name: "Middle East & GCC",
          text: "Cement, clinker and steel for large-scale infrastructure and real estate programmes.",
        },
        africa: {
          name: "Africa",
          text: "Bulk cement, clinker and gypsum for grinding plants and fast-growing urban markets across West, East and North Africa.",
        },
        southAsia: {
          name: "South Asia",
          text: "Clinker, gypsum and raw materials supporting the region’s expanding cement capacity.",
        },
        southeastAsia: {
          name: "Southeast Asia",
          text: "Construction materials and industrial inputs for one of the world’s most dynamic building markets.",
        },
        europe: {
          name: "Europe & Mediterranean",
          text: "Clinker, cement and SCMs for importers and grinding terminals.",
        },
        americas: {
          name: "The Americas",
          text: "Cement and clinker for terminals and distributors in North and Latin America.",
        },
        oceania: {
          name: "Oceania",
          text: "Cement, clinker and materials for Australia and the Pacific islands.",
        },
      },
      portsLabel: "Key ports",
      originsTitle: "Sourcing hubs",
      originsText:
        "Qualified producers in China, Vietnam, Thailand, Indonesia, the UAE, Oman, Pakistan, Egypt and Türkiye.",
    },

    quality: {
      title: "Quality & Compliance",
      description:
        "How VELTRON assures product quality and trades responsibly — supplier qualification, independent inspection, international standards and compliance.",
      hero: {
        eyebrow: "Quality & compliance",
        title: "Quality you can verify. Business you can trust.",
        text: "Every shipment is governed by clear specifications, independent verification and strict compliance standards.",
      },
      process: {
        eyebrow: "Quality assurance",
        title: "Controls at every stage of the shipment",
        steps: [
          {
            title: "Supplier qualification",
            text: "Producers are assessed for capacity, process control, certifications and track record.",
          },
          {
            title: "Specification agreement",
            text: "Grades, tolerances and test methods are fixed in the contract before production.",
          },
          {
            title: "Pre-shipment sampling",
            text: "Representative samples are taken and analysed by accredited laboratories.",
          },
          {
            title: "Independent inspection",
            text: "Quality and quantity surveys by internationally recognised inspection companies such as SGS, Bureau Veritas or Intertek, on request.",
          },
          {
            title: "Loading supervision",
            text: "Hold cleanliness, draft surveys and loading are supervised and documented.",
          },
          {
            title: "Full documentation",
            text: "Certificates of analysis, origin and inspection accompany every cargo.",
          },
        ],
      },
      standards: {
        eyebrow: "Standards",
        title: "Products supplied to recognised international standards",
        items: [
          { code: "EN 197-1", text: "European standard for common cements" },
          { code: "ASTM C150", text: "Standard specification for Portland cement" },
          { code: "ASTM C595", text: "Blended hydraulic cements" },
          { code: "BS 4449", text: "Carbon steel bars for reinforcement" },
          { code: "ASTM A615", text: "Deformed carbon-steel reinforcing bars" },
          { code: "ISO 9001", text: "Quality management — preferred for producers" },
        ],
      },
      compliance: {
        eyebrow: "Compliance",
        title: "Trading responsibly",
        items: {
          kyc: {
            title: "Know your counterparty",
            text: "Due diligence on buyers and suppliers before any contract is signed.",
          },
          sanctions: {
            title: "Sanctions screening",
            text: "Counterparties, vessels and routes are screened against applicable sanctions regimes.",
          },
          antiBribery: {
            title: "Anti-bribery & ethics",
            text: "Zero tolerance for corruption, in line with international best practice.",
          },
          environment: {
            title: "Responsible sourcing",
            text: "Preference for producers with modern, efficient and lower-emission operations.",
          },
        },
      },
    },

    contact: {
      title: "Contact Us",
      description:
        "Contact VELTRON Global Trading Limited in Hong Kong — request a quote for cement, clinker, gypsum, construction materials or industrial raw materials.",
      hero: {
        eyebrow: "Contact us",
        title: "Let’s talk about your next shipment",
        text: "Send us your requirements and our trading desk will respond with a tailored offer — usually within one business day.",
      },
      formTitle: "Request a quote",
      formText:
        "Fields marked * are required. The more detail you share, the more precise our offer.",
      infoTitle: "VELTRON Global Trading Limited",
      mapTitle: "Our office",
      mapLoad: "Load interactive map",
      mapConsent: "Loading the map connects to Google Maps.",
      openInMaps: "Open in Google Maps",
    },
  },

  form: {
    labels: {
      name: "Full name",
      company: "Company",
      email: "Business email",
      phone: "Phone / WhatsApp",
      country: "Country",
      product: "Product of interest",
      quantity: "Estimated quantity",
      destinationPort: "Destination port",
      incoterm: "Preferred Incoterm",
      message: "Your requirements",
      consent: "I agree that VELTRON may use these details to respond to my inquiry.",
    },
    placeholders: {
      name: "Jane Smith",
      company: "Company name",
      email: "name@company.com",
      phone: "+971 50 123 4567",
      country: "e.g. Nigeria",
      quantity: "e.g. 50,000 MT per month",
      destinationPort: "e.g. Lagos (Apapa)",
      message: "Grade / specification, packaging, delivery schedule, payment terms…",
    },
    selectPlaceholder: "Select…",
    productOptions: {
      cement: "Cement",
      clinker: "Clinker",
      gypsum: "Gypsum",
      "construction-materials": "Construction materials",
      "industrial-raw-materials": "Industrial raw materials",
      logistics: "Trade & logistics services",
      other: "Other",
    },
    incotermOptions: {
      FOB: "FOB — Free On Board",
      CFR: "CFR — Cost and Freight",
      CIF: "CIF — Cost, Insurance and Freight",
      other: "Other / not sure",
    },
    optional: "Optional",
    submit: "Send inquiry",
    sending: "Sending…",
    errors: {
      required: "This field is required.",
      tooShort: "Please enter a little more detail.",
      tooLong: "This entry is too long.",
      invalidEmail: "Please enter a valid email address.",
      invalidPhone: "Please use digits, spaces and + ( ) - only.",
      invalidOption: "Please select an option.",
      consentRequired: "Please confirm to continue.",
    },
    api: {
      bad_request: "Your request could not be processed. Please refresh the page and try again.",
      validation: "Please check the highlighted fields.",
      captcha: "Security verification failed. Please try again.",
      rate_limited: "Too many requests. Please wait a few minutes before trying again.",
      unavailable: "The inquiry service is temporarily unavailable. Please try again later.",
      server: "Something went wrong while sending your inquiry. Please try again.",
      network: "Network error — please check your connection and try again.",
    },
    captchaPending: "Please complete the security check.",
    success: {
      title: "Thank you — your inquiry is on its way.",
      text: "Our trading desk will review your requirements and get back to you shortly, usually within one business day.",
      again: "Send another inquiry",
    },
    privacyNote:
      "Protected by Cloudflare Turnstile. Your details are used only to respond to your inquiry.",
  },
};

export type Dictionary = typeof en;

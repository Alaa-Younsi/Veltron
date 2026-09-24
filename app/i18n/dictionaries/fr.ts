import type { Dictionary } from "./en";

export const fr: Dictionary = {
  meta: {
    siteName: "VELTRON Global Trading",
    titleSuffix: "VELTRON Global Trading Limited",
    defaultDescription:
      "Négociant international basé à Hong Kong : ciment, clinker, gypse, matériaux de construction et matières premières industrielles, avec sourcing mondial et coordination logistique de bout en bout.",
  },

  common: {
    nav: {
      home: "Accueil",
      about: "À propos",
      products: "Produits",
      logistics: "Commerce & logistique",
      markets: "Marchés",
      quality: "Qualité & conformité",
      contact: "Contact",
      requestQuote: "Demander un devis",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      skipToContent: "Aller au contenu principal",
      language: "Langue",
      allProducts: "Tous les produits",
      productsIntro: "Approvisionnement en vrac et en sacs pour la construction et l’industrie.",
      mainNavigation: "Navigation principale",
    },
    footer: {
      tagline:
        "Négoce international de ciment, de clinker et de matières premières industrielles — sourcés de manière responsable, expédiés de manière fiable.",
      headquarters: "Siège",
      company: "Entreprise",
      products: "Produits",
      getInTouch: "Nous contacter",
      getInTouchText:
        "Indiquez-nous vos besoins — produit, volume et destination — et notre service commercial préparera une offre.",
      rights: "Tous droits réservés.",
      backToTop: "Retour en haut",
      registered: "Société enregistrée à Hong Kong (RAS)",
    },
    cta: {
      requestQuote: "Demander un devis",
      exploreProducts: "Découvrir nos produits",
      learnMore: "En savoir plus",
      contactUs: "Nous contacter",
      viewDetails: "Voir le détail",
      talkToUs: "Parler à notre service commercial",
    },
    labels: {
      address: "Adresse",
      email: "E-mail",
      phone: "Téléphone",
      whatsapp: "WhatsApp",
      hours: "Horaires",
      hoursValue: "Lundi – vendredi, 09h00 – 18h00 (heure de Hong Kong)",
      home: "Accueil",
      breadcrumb: "Fil d’Ariane",
    },
    ctaBand: {
      eyebrow: "Parlons de votre projet",
      title: "Un besoin ? Construisons ensemble le bon plan d’approvisionnement.",
      text: "Indiquez le produit, le volume, le port de destination et l’Incoterm souhaité. Nous vous répondrons avec une offre claire et sur mesure.",
    },
  },

  products: {
    cement: {
      name: "Ciment",
      short: "Ciments Portland et composés pour tous les chantiers.",
      tagline: "Une résistance constante. Un approvisionnement fiable.",
      intro: [
        "Nous fournissons du ciment Portland ordinaire et des ciments composés issus de producteurs rigoureusement qualifiés, conformes aux normes européennes (EN 197-1) et américaines (ASTM C150).",
        "Des sacs de 50 kg pour la distribution jusqu’aux cargaisons complètes en vrac pour les centrales à béton et les projets d’infrastructure, chaque lot correspond à votre cahier des charges et est accompagné de certificats d’usine.",
      ],
      highlights: [
        "Qualités EN 197-1 et ASTM C150",
        "En sacs, big-bags ou vrac",
        "Certificat d’usine pour chaque lot",
      ],
      grades: [
        {
          name: "OPC CEM I 42,5 N / R",
          detail: "Ciment Portland polyvalent pour le béton de structure.",
        },
        {
          name: "OPC CEM I 52,5 N / R",
          detail:
            "Haute résistance au jeune âge pour la préfabrication et les bétons hautes performances.",
        },
        {
          name: "CEM II 42,5 R / 32,5 R",
          detail:
            "Ciments Portland composés pour la maçonnerie, les blocs et les travaux courants.",
        },
        {
          name: "ASTM C150 Type I / II",
          detail: "Ciment aux normes américaines, y compris résistance modérée aux sulfates.",
        },
        {
          name: "Résistant aux sulfates (Type V / SR)",
          detail: "Ciment à faible teneur en C₃A pour milieux marins et sols agressifs.",
        },
      ],
      specsTitle: "Propriétés typiques — OPC CEM I 42,5",
      specs: [
        { label: "Résistance à la compression, 2 jours", value: "≥ 10 MPa (N) · ≥ 20 MPa (R)" },
        { label: "Résistance à la compression, 28 jours", value: "42,5 – 62,5 MPa" },
        { label: "Début de prise", value: "≥ 60 min" },
        { label: "Stabilité (Le Chatelier)", value: "≤ 10 mm" },
        { label: "Teneur en sulfates (SO₃)", value: "≤ 3,5 %" },
        { label: "Teneur en chlorures", value: "≤ 0,10 %" },
        { label: "Perte au feu", value: "≤ 5,0 %" },
      ],
      packaging: [
        "Sacs de 50 kg en PP tissé ou papier kraft",
        "Big-bags (FIBC) de 1,5 t et 2 t",
        "Vrac en cales ou en citernes",
      ],
      applications: [
        "Béton prêt à l’emploi",
        "Éléments préfabriqués",
        "Infrastructures et ouvrages maritimes",
        "Bâtiments résidentiels et commerciaux",
        "Blocs, mortiers et enduits",
      ],
      shipping: [
        "Vraquiers — de Handysize à Supramax",
        "Marchandises en sacs (break-bulk)",
        "Conteneurs 20 pieds pour les petits lots",
      ],
    },
    clinker: {
      name: "Clinker",
      short: "Clinker Portland de haute qualité pour les centres de broyage.",
      tagline: "Le cœur de chaque ciment.",
      intro: [
        "Le clinker de ciment Portland est la base de la production cimentière. Nous approvisionnons les centres de broyage et les cimentiers en clinker à la chimie et à la réactivité constantes, issu de fours modernes par voie sèche.",
        "Les expéditions sont organisées sur des vraquiers équipés de grues, avec échantillonnage avant chargement et analyses indépendantes, pour des performances prévisibles cargaison après cargaison.",
      ],
      highlights: [
        "C₃S constant et faible chaux libre",
        "Qualités ordinaire et résistante aux sulfates",
        "Cargaisons en vrac dès 25 000 t",
      ],
      grades: [
        {
          name: "Clinker Portland ordinaire",
          detail: "Pour la production de ciment CEM I / ASTM Type I.",
        },
        {
          name: "Clinker résistant aux sulfates",
          detail: "Faible C₃A (≤ 3,5 %) pour ciments SR et Type V.",
        },
        {
          name: "Clinker à faible teneur en alcalis",
          detail: "Na₂O-éq réduit pour les applications sensibles à l’alcali-réaction.",
        },
      ],
      specsTitle: "Chimie typique — clinker Portland ordinaire",
      specs: [
        { label: "Silicate tricalcique (C₃S)", value: "≥ 55 %" },
        { label: "Chaux libre (CaO libre)", value: "≤ 1,5 %" },
        { label: "Oxyde de magnésium (MgO)", value: "≤ 5,0 %" },
        { label: "Perte au feu", value: "≤ 1,0 %" },
        { label: "Résidu insoluble", value: "≤ 0,75 %" },
        { label: "Facteur de saturation en chaux (LSF)", value: "92 – 98" },
        { label: "Granulométrie", value: "0 – 50 mm (≥ 90 %)" },
        { label: "Résistance à 28 jours (broyé en laboratoire)", value: "≥ 50 MPa" },
      ],
      packaging: ["Vrac uniquement — en cales"],
      applications: [
        "Centres de broyage de ciment",
        "Production de ciments composés",
        "Équilibrage de capacité des usines intégrées",
      ],
      shipping: [
        "Navires Supramax, Ultramax et Panamax",
        "Navires gréés pour les ports sans grues de quai",
        "Lots typiques de 25 000 à 60 000 t",
      ],
    },
    gypsum: {
      name: "Gypse",
      short: "Gypse naturel pour la régulation de prise, le plâtre et les plaques.",
      tagline: "Du sulfate de calcium pur, calibré sur mesure.",
      intro: [
        "Le gypse naturel (sulfate de calcium dihydraté) est un régulateur de prise indispensable au broyage du ciment et la matière première du plâtre et des plaques de plâtre.",
        "Nous fournissons du gypse en blocs et concassé de haute pureté, issu de carrières reconnues et criblé selon la granulométrie requise par votre broyeur ou votre four.",
      ],
      highlights: [
        "Pureté jusqu’à 95 % de CaSO₄·2H₂O",
        "Concassé et criblé sur mesure",
        "En vrac ou en big-bags",
      ],
      grades: [
        {
          name: "Gypse qualité cimenterie",
          detail: "Blocs utilisés comme régulateur de prise au broyage du ciment.",
        },
        {
          name: "Gypse qualité plâtre / plaques",
          detail: "Blancheur et pureté élevées pour la calcination.",
        },
        { name: "Gypse agricole", detail: "Amendement apportant calcium et soufre aux sols." },
      ],
      specsTitle: "Propriétés typiques — gypse qualité cimenterie",
      specs: [
        { label: "Pureté (CaSO₄·2H₂O)", value: "85 – 95 %" },
        { label: "Trioxyde de soufre (SO₃)", value: "≥ 40 %" },
        { label: "Eau de constitution", value: "≥ 18 %" },
        { label: "Humidité libre", value: "≤ 3 %" },
        { label: "Chlorures (Cl⁻)", value: "≤ 0,02 %" },
        { label: "Granulométrie", value: "0–50 / 10–50 / 20–80 mm" },
      ],
      packaging: ["Vrac en cales", "Big-bags de 1 à 2 t"],
      applications: [
        "Régulateur de prise du ciment",
        "Plâtre et plaques de plâtre",
        "Agriculture et amendement des sols",
        "Céramique et moules",
      ],
      shipping: [
        "Vraquiers Handysize et Supramax",
        "Big-bags en conteneurs pour les petits volumes",
      ],
    },
    "construction-materials": {
      name: "Matériaux de construction",
      short: "Acier, granulats, bitume et matériaux de finition.",
      tagline: "Tout ce qu’il faut pour qu’un projet s’élève.",
      intro: [
        "Au-delà du ciment, nous fournissons les matériaux essentiels qui maintiennent les chantiers dans les délais — acier d’armature, granulats, bitume et produits de finition.",
        "Regrouper plusieurs familles de produits auprès d’un seul partenaire simplifie les achats, la documentation et le transport, pour les entreprises de construction comme pour les distributeurs.",
      ],
      highlights: [
        "Rond à béton BS 4449 et ASTM A615",
        "Bitume 60/70 et 80/100",
        "Approvisionnement multi-produits consolidé",
      ],
      grades: [
        {
          name: "Acier d’armature (rond à béton)",
          detail: "B500B, ASTM A615 Grade 60 — Ø 8 à 32 mm.",
        },
        {
          name: "Fil machine et billettes",
          detail: "Fil machine SAE 1006/1008 · billettes 3SP/5SP.",
        },
        {
          name: "Granulats et pierre concassée",
          detail: "Calcaire et granit, calibrés de 5 à 40 mm.",
        },
        { name: "Bitume", detail: "Grades de pénétration 60/70 et 80/100." },
        {
          name: "Carrelage et plaques de plâtre",
          detail: "Carreaux céramique et grès cérame · plaques de 9 à 15 mm.",
        },
      ],
      specsTitle: "La gamme en un coup d’œil",
      specs: [
        { label: "Rond à béton", value: "BS 4449 B500B · ASTM A615 Gr 60 · Ø 8 – 32 mm" },
        { label: "Fil machine", value: "SAE 1006 / 1008 · Ø 5,5 – 12 mm" },
        { label: "Billettes", value: "3SP / 5SP · carré de 120 – 150 mm" },
        { label: "Granulats", value: "Calcaire / granit concassé · 5 – 40 mm" },
        { label: "Bitume", value: "Grade de pénétration 60/70 · 80/100" },
        { label: "Plaques de plâtre", value: "Standard, hydrofuges et coupe-feu · 9 – 15 mm" },
      ],
      packaging: [
        "Acier en bottes étiquetées",
        "Bitume en fûts, big-bags ou vrac",
        "Carrelage et plaques sur palettes",
      ],
      applications: [
        "Construction résidentielle et commerciale",
        "Routes et infrastructures",
        "Distribution et négoce de gros",
      ],
      shipping: [
        "Navires break-bulk pour l’acier",
        "Conteneurs pour les matériaux de finition",
        "Vraquiers pour les granulats",
      ],
    },
    "industrial-raw-materials": {
      name: "Matières premières industrielles",
      short: "Calcaire, laitier, cendres volantes, combustibles et correcteurs.",
      tagline: "Les intrants de l’industrie lourde.",
      intro: [
        "Les cimentiers, sidérurgistes et producteurs d’énergie dépendent d’un flux régulier de matières premières et de combustibles. Nous sourçons les intrants clés — du calcaire et des ajouts cimentaires aux combustibles de four et aux correcteurs.",
        "Chaque matière est qualifiée selon les exigences de votre procédé, avec certificats d’analyse et inspection indépendante disponibles pour chaque expédition.",
      ],
      highlights: [
        "Ajouts : laitier, cendres volantes, pouzzolane",
        "Combustibles : coke de pétrole et charbon",
        "Correcteurs : minerai de fer, bauxite",
      ],
      grades: [
        {
          name: "Calcaire",
          detail: "Calcaire à haute teneur en calcium pour le ciment et la chaux.",
        },
        { name: "Laitier granulé (GGBFS)", detail: "Ajout cimentaire pour les ciments composés." },
        { name: "Cendres volantes", detail: "Classes F et C, pour le ciment et le béton." },
        { name: "Coke de pétrole", detail: "Petcoke combustible pour fours à ciment." },
        {
          name: "Charbon vapeur",
          detail: "Charbon thermique pour fours et production d’électricité.",
        },
        { name: "Minerai de fer et bauxite", detail: "Correcteurs pour la chimie du cru." },
      ],
      specsTitle: "Spécifications typiques",
      specs: [
        { label: "Calcaire", value: "CaCO₃ ≥ 90 – 97 % · 0 – 80 mm" },
        { label: "Laitier granulé", value: "Teneur en verre ≥ 85 % · basicité ≥ 1,0" },
        { label: "Cendres volantes", value: "Classe F / C · perte au feu ≤ 6 %" },
        { label: "Coke de pétrole", value: "PCS ≥ 8 000 kcal/kg · S ≤ 6,5 %" },
        { label: "Charbon vapeur", value: "PCI (NAR) 5 500 – 6 000 kcal/kg" },
        { label: "Minerai de fer (correcteur)", value: "Fe₂O₃ ≥ 60 %" },
      ],
      packaging: ["Vrac en cales", "Big-bags pour les cendres volantes et les qualités spéciales"],
      applications: [
        "Production de ciment et de clinker",
        "Sidérurgie et métallurgie",
        "Production d’électricité",
      ],
      shipping: ["Vraquiers Supramax et Panamax", "Navires pneumatiques pour les cendres volantes"],
    },
  },

  pages: {
    home: {
      title: "Négoce international de ciment et de matériaux de construction",
      description:
        "VELTRON Global Trading Limited fournit du ciment, du clinker, du gypse, des matériaux de construction et des matières premières industrielles dans le monde entier depuis Hong Kong.",
      hero: {
        eyebrow: "Négoce international · Hong Kong",
        titleLead: "Des matériaux de construction",
        titleAccent: "sourcés dans le monde entier.",
        titleTail: "Livrés avec précision.",
        text: "VELTRON Global Trading Limited relie des producteurs fiables de ciment, de clinker, de gypse et de matières premières industrielles aux acheteurs du Moyen-Orient, d’Afrique, d’Asie et d’ailleurs.",
        badges: ["Vrac et sacs", "FOB · CFR · CIF", "Inspection indépendante"],
        mapCaption: "Réseau commercial — pôles d’approvisionnement et marchés de destination",
        scroll: "Défiler",
      },
      marquee: [
        "Ciment",
        "Clinker",
        "Gypse",
        "Rond à béton",
        "Calcaire",
        "Laitier granulé",
        "Cendres volantes",
        "Granulats",
        "Bitume",
        "Coke de pétrole",
      ],
      productsSection: {
        eyebrow: "Ce que nous négocions",
        title: "Un portefeuille ciblé pour la construction et l’industrie lourde",
        text: "Cinq familles de produits, un seul partenaire responsable — de la spécification et du sourcing jusqu’au chargement, au transport et à la documentation.",
      },
      stats: [
        { value: "5", label: "Familles de produits" },
        { value: "7", label: "Régions desservies" },
        { value: "3", label: "Options d’Incoterms" },
        { value: "1", label: "Interlocuteur unique, du devis au déchargement" },
      ],
      why: {
        eyebrow: "Pourquoi VELTRON",
        title: "Un négoce fondé sur la fiabilité, la transparence et la maîtrise",
        items: {
          sourcing: {
            title: "Un réseau de producteurs qualifiés",
            text: "Nous travaillons avec des producteurs évalués pour leur capacité, leur régularité et leur conformité — le produit contracté est le produit livré.",
          },
          quality: {
            title: "Une qualité vérifiable",
            text: "Certificats d’usine, échantillonnage avant expédition et inspection indépendante par des organismes reconnus, sur demande.",
          },
          logistics: {
            title: "Une logistique de bout en bout",
            text: "Affrètement, supervision du chargement, documentation et coordination du déchargement, gérés par une seule équipe.",
          },
          terms: {
            title: "Des conditions commerciales claires",
            text: "Prix FOB, CFR ou CIF, instruments de paiement sécurisés et contrats rédigés simplement — sans surprise.",
          },
        },
      },
      process: {
        eyebrow: "Notre méthode",
        title: "De la demande au déchargement, en cinq étapes claires",
        steps: [
          {
            title: "Demande",
            text: "Vous précisez le produit, la spécification, le volume, la destination et le calendrier.",
          },
          {
            title: "Sourcing et offre",
            text: "Nous sélectionnons des producteurs qualifiés et émettons une offre ferme et transparente.",
          },
          {
            title: "Contrat et paiement",
            text: "Les conditions sont convenues et sécurisées par LC, virement ou tout instrument convenu.",
          },
          {
            title: "Inspection et chargement",
            text: "Échantillonnage, expertise et supervision du chargement au port d’origine.",
          },
          {
            title: "Transport et livraison",
            text: "Suivi du voyage, documents et coordination du déchargement à destination.",
          },
        ],
      },
      reach: {
        eyebrow: "Présence mondiale",
        title: "Hong Kong au cœur d’un réseau d’approvisionnement mondial",
        text: "Depuis Hong Kong, nous coordonnons les flux entre les grandes régions productrices et les marchés de la construction en forte croissance sur tous les continents.",
        cta: "Découvrir nos marchés",
      },
      quote: {
        text: "De la carrière au quai, chaque tonne que nous négocions s’appuie sur une qualité vérifiée et une logistique coordonnée.",
        author: "Service commercial VELTRON",
      },
    },

    about: {
      title: "À propos",
      description:
        "Découvrez VELTRON Global Trading Limited, société de négoce international basée à Hong Kong, spécialisée dans le ciment, le clinker et les matières premières de construction.",
      hero: {
        eyebrow: "À propos de VELTRON",
        title: "Un partenaire de négoce pour les matériaux qui bâtissent le monde",
        text: "VELTRON Global Trading Limited est une société de négoce international dont le siège est à Hong Kong, spécialisée dans le ciment, le clinker, le gypse, les matériaux de construction et les matières premières industrielles.",
      },
      story: {
        eyebrow: "Qui sommes-nous",
        title: "Relier producteurs et bâtisseurs à travers les continents",
        paragraphs: [
          "La construction et l’industrie lourde reposent sur des matériaux en vrac qui doivent arriver à temps, conformes et à un coût rendu compétitif. VELTRON a été créée pour y parvenir avec moins de frictions.",
          "Depuis Hong Kong — l’un des plus grands carrefours commerciaux et maritimes au monde — nous mettons en relation des producteurs qualifiés d’Asie, du Moyen-Orient et de Méditerranée avec des entreprises de construction, des cimenteries et des distributeurs sur les marchés en croissance.",
          "Notre équipe gère toute la chaîne : sourcing et qualification, conditions commerciales, inspection, affrètement et documentation. Nos clients traitent avec un seul partenaire responsable, de la première demande au déchargement final.",
        ],
      },
      mission: {
        title: "Notre mission",
        text: "Fournir de manière fiable et transparente les matériaux essentiels à la construction et à l’industrie, pour que nos clients bâtissent en toute confiance.",
      },
      vision: {
        title: "Notre vision",
        text: "Être le partenaire de confiance pour le ciment et les matières premières entre les grandes régions productrices et les marchés à plus forte croissance.",
      },
      values: {
        eyebrow: "Nos valeurs",
        title: "Les principes qui guident chaque contrat",
        items: {
          integrity: {
            title: "Intégrité",
            text: "Des spécifications honnêtes, des prix honnêtes et des engagements tenus.",
          },
          reliability: {
            title: "Fiabilité",
            text: "Des cargaisons conformes et ponctuelles, expédition après expédition.",
          },
          transparency: {
            title: "Transparence",
            text: "Des conditions claires, une documentation complète et une communication ouverte.",
          },
          partnership: {
            title: "Partenariat",
            text: "Des relations durables plutôt que des transactions ponctuelles.",
          },
        },
      },
      hq: {
        eyebrow: "Siège",
        title: "Basés à Hong Kong, présents dans le monde entier",
        text: "Port franc, marchés financiers profonds et connexion à toutes les grandes routes maritimes : Hong Kong est la base naturelle d’un négociant international en matières premières.",
      },
    },

    products: {
      title: "Produits",
      description:
        "Ciment, clinker, gypse, matériaux de construction et matières premières industrielles — en vrac ou en sacs, selon les normes internationales.",
      hero: {
        eyebrow: "Nos produits",
        title: "Des matériaux pour la construction et l’industrie lourde",
        text: "Chaque produit provient de producteurs qualifiés, répond aux normes internationales et est expédié dans le conditionnement adapté à votre activité.",
      },
      standardsNote:
        "Les spécifications indiquées sont des valeurs typiques. Les spécifications finales, tolérances et méthodes d’essai sont confirmées dans chaque contrat.",
      detail: {
        overview: "Présentation",
        grades: "Qualités disponibles",
        packaging: "Conditionnement",
        applications: "Applications",
        shipping: "Options de transport",
        related: "Produits associés",
        quoteTitle: "Demander un devis : {product}",
        quoteText:
          "Indiquez la qualité, la quantité, le port de destination et l’Incoterm souhaité — nous vous répondrons avec une offre sur mesure.",
        backToProducts: "Tous les produits",
        onThisPage: "Sur cette page",
      },
    },

    logistics: {
      title: "Commerce international & logistique",
      description:
        "Coordination commerciale et logistique de bout en bout : sourcing mondial, affrètement, inspection, documentation et livraison en FOB, CFR ou CIF.",
      hero: {
        eyebrow: "Commerce international & logistique",
        title: "Un seul partenaire, de l’usine du producteur jusqu’à votre port",
        text: "Nous coordonnons chaque maillon de la chaîne d’approvisionnement pour que votre cargaison circule en toute sécurité, dans les délais et entièrement documentée.",
      },
      services: {
        eyebrow: "Ce que nous prenons en charge",
        title: "Des services intégrés autour de chaque expédition",
        items: {
          sourcing: {
            title: "Sourcing mondial",
            text: "Identification et qualification de producteurs adaptés à votre spécification, à votre volume et à votre budget.",
          },
          chartering: {
            title: "Affrètement et fret",
            text: "Affrètements au voyage, tonnage vrac et break-bulk, réservations de conteneurs à des tarifs compétitifs.",
          },
          inspection: {
            title: "Inspection et expertise",
            text: "Échantillonnage avant expédition, contrôles de quantité et de qualité par des sociétés d’inspection indépendantes.",
          },
          documentation: {
            title: "Documents commerciaux",
            text: "Connaissements, certificats d’origine et d’analyse, listes de colisage, factures et assurance.",
          },
          finance: {
            title: "Sécurisation des paiements",
            text: "Paiement structuré par lettre de crédit, virement ou tout autre instrument convenu.",
          },
          delivery: {
            title: "Coordination portuaire",
            text: "Liaison avec les agents et réceptionnaires pour un accostage, un déchargement et un dédouanement fluides.",
          },
        },
      },
      incoterms: {
        coverage: {
          loading: "Chargement à bord",
          freight: "Fret maritime",
          insurance: "Assurance marchandises",
          seller: "Pris en charge par VELTRON",
        },
        eyebrow: "Incoterms® 2020",
        title: "Des conditions de livraison flexibles",
        text: "Choisissez le point de transfert des coûts et des risques — nous établissons nos prix et exécutons selon les conditions qui vous conviennent.",
        items: [
          {
            code: "FOB",
            name: "Franco à bord",
            text: "Livré à bord du navire que vous désignez au port de chargement. Vous gérez le fret et l’assurance.",
          },
          {
            code: "CFR",
            name: "Coût et fret",
            text: "Nous organisons et payons le fret maritime jusqu’à votre port. Le risque est transféré dès le chargement à bord.",
          },
          {
            code: "CIF",
            name: "Coût, assurance et fret",
            text: "Comme CFR, avec en plus une assurance maritime souscrite par nos soins à votre profit.",
          },
        ],
      },
      modes: {
        eyebrow: "Modes d’expédition",
        title: "Le bon navire pour chaque cargaison",
        items: {
          bulk: {
            title: "Vrac sec",
            text: "Vraquiers de Handysize à Panamax pour le ciment, le clinker, le gypse et les matières premières.",
          },
          breakbulk: {
            title: "Break-bulk",
            text: "Ciment en sacs, produits sidérurgiques et colis lourds sur navires de marchandises diverses.",
          },
          container: {
            title: "Conteneurs",
            text: "Conteneurs 20 et 40 pieds pour les petits lots et les matériaux de finition.",
          },
        },
      },
      documents: {
        title: "Documents d’expédition standard",
        items: [
          "Facture commerciale",
          "Connaissement",
          "Certificat d’origine",
          "Certificat d’analyse",
          "Certificat d’inspection (qualité et quantité)",
          "Liste de colisage",
          "Certificat d’assurance (CIF)",
        ],
      },
    },

    markets: {
      title: "Marchés & destinations",
      description:
        "VELTRON approvisionne des acheteurs au Moyen-Orient, en Afrique, en Asie du Sud et du Sud-Est, en Europe, dans les Amériques et en Océanie.",
      hero: {
        eyebrow: "Marchés & destinations",
        title: "Au service des marchés en croissance dans sept régions",
        text: "Notre réseau couvre les grands pôles producteurs d’Asie, du Golfe et de Méditerranée — pour atteindre les acheteurs partout où la construction s’accélère.",
      },
      mapLegend: {
        hub: "Siège",
        origin: "Pôle d’approvisionnement",
        destination: "Marché de destination",
      },
      regionsTitle: "Régions desservies",
      regions: {
        gcc: {
          name: "Moyen-Orient & CCG",
          text: "Ciment, clinker et acier pour les grands programmes d’infrastructure et d’immobilier.",
        },
        africa: {
          name: "Afrique",
          text: "Ciment en vrac, clinker et gypse pour les centres de broyage et les marchés urbains en plein essor d’Afrique de l’Ouest, de l’Est et du Nord.",
        },
        southAsia: {
          name: "Asie du Sud",
          text: "Clinker, gypse et matières premières pour accompagner l’essor des capacités cimentières de la région.",
        },
        southeastAsia: {
          name: "Asie du Sud-Est",
          text: "Matériaux de construction et intrants industriels pour l’un des marchés du bâtiment les plus dynamiques au monde.",
        },
        europe: {
          name: "Europe & Méditerranée",
          text: "Clinker, ciment et ajouts cimentaires pour les importateurs et terminaux de broyage.",
        },
        americas: {
          name: "Amériques",
          text: "Ciment et clinker pour les terminaux et distributeurs d’Amérique du Nord et latine.",
        },
        oceania: {
          name: "Océanie",
          text: "Ciment, clinker et matériaux pour l’Australie et les îles du Pacifique.",
        },
      },
      portsLabel: "Ports clés",
      originsTitle: "Pôles d’approvisionnement",
      originsText:
        "Producteurs qualifiés en Chine, au Vietnam, en Thaïlande, en Indonésie, aux Émirats arabes unis, à Oman, au Pakistan, en Égypte et en Türkiye.",
    },

    quality: {
      title: "Qualité & conformité",
      description:
        "Comment VELTRON garantit la qualité de ses produits et exerce un négoce responsable : qualification des fournisseurs, inspection indépendante, normes internationales et conformité.",
      hero: {
        eyebrow: "Qualité & conformité",
        title: "Une qualité vérifiable. Des relations de confiance.",
        text: "Chaque expédition est encadrée par des spécifications claires, une vérification indépendante et des règles de conformité strictes.",
      },
      process: {
        eyebrow: "Assurance qualité",
        title: "Des contrôles à chaque étape de l’expédition",
        steps: [
          {
            title: "Qualification des fournisseurs",
            text: "Les producteurs sont évalués sur leur capacité, la maîtrise de leur procédé, leurs certifications et leurs références.",
          },
          {
            title: "Accord sur la spécification",
            text: "Qualités, tolérances et méthodes d’essai sont fixées au contrat avant la production.",
          },
          {
            title: "Échantillonnage avant expédition",
            text: "Des échantillons représentatifs sont prélevés et analysés par des laboratoires accrédités.",
          },
          {
            title: "Inspection indépendante",
            text: "Contrôles qualité et quantité par des sociétés d’inspection reconnues telles que SGS, Bureau Veritas ou Intertek, sur demande.",
          },
          {
            title: "Supervision du chargement",
            text: "Propreté des cales, jaugeage (draft survey) et chargement sont supervisés et documentés.",
          },
          {
            title: "Documentation complète",
            text: "Certificats d’analyse, d’origine et d’inspection accompagnent chaque cargaison.",
          },
        ],
      },
      standards: {
        eyebrow: "Normes",
        title: "Des produits conformes aux normes internationales reconnues",
        items: [
          { code: "EN 197-1", text: "Norme européenne des ciments courants" },
          { code: "ASTM C150", text: "Spécification du ciment Portland" },
          { code: "ASTM C595", text: "Ciments hydrauliques composés" },
          { code: "BS 4449", text: "Barres d’armature en acier au carbone" },
          { code: "ASTM A615", text: "Barres d’armature crénelées en acier au carbone" },
          { code: "ISO 9001", text: "Management de la qualité — privilégié chez nos producteurs" },
        ],
      },
      compliance: {
        eyebrow: "Conformité",
        title: "Un négoce responsable",
        items: {
          kyc: {
            title: "Connaissance des contreparties",
            text: "Due diligence sur les acheteurs et les fournisseurs avant toute signature.",
          },
          sanctions: {
            title: "Contrôle des sanctions",
            text: "Contreparties, navires et itinéraires sont vérifiés au regard des régimes de sanctions applicables.",
          },
          antiBribery: {
            title: "Anticorruption & éthique",
            text: "Tolérance zéro envers la corruption, conformément aux meilleures pratiques internationales.",
          },
          environment: {
            title: "Approvisionnement responsable",
            text: "Préférence pour des producteurs aux installations modernes, efficaces et moins émettrices.",
          },
        },
      },
    },

    contact: {
      title: "Contact",
      description:
        "Contactez VELTRON Global Trading Limited à Hong Kong — demandez un devis pour du ciment, du clinker, du gypse, des matériaux de construction ou des matières premières industrielles.",
      hero: {
        eyebrow: "Contact",
        title: "Parlons de votre prochaine expédition",
        text: "Envoyez-nous vos besoins : notre service commercial vous répondra avec une offre sur mesure, généralement sous un jour ouvré.",
      },
      formTitle: "Demander un devis",
      formText:
        "Les champs marqués d’un * sont obligatoires. Plus vous êtes précis, plus notre offre le sera.",
      infoTitle: "VELTRON Global Trading Limited",
      mapTitle: "Nos bureaux",
      mapLoad: "Charger la carte interactive",
      mapConsent: "Le chargement de la carte établit une connexion avec Google Maps.",
      openInMaps: "Ouvrir dans Google Maps",
    },
  },

  form: {
    labels: {
      name: "Nom complet",
      company: "Société",
      email: "E-mail professionnel",
      phone: "Téléphone / WhatsApp",
      country: "Pays",
      product: "Produit recherché",
      quantity: "Quantité estimée",
      destinationPort: "Port de destination",
      incoterm: "Incoterm souhaité",
      message: "Vos besoins",
      consent: "J’accepte que VELTRON utilise ces informations pour répondre à ma demande.",
    },
    placeholders: {
      name: "Marie Dupont",
      company: "Nom de la société",
      email: "nom@societe.com",
      phone: "+33 6 12 34 56 78",
      country: "ex. Côte d’Ivoire",
      quantity: "ex. 50 000 t par mois",
      destinationPort: "ex. Abidjan",
      message:
        "Qualité / spécification, conditionnement, calendrier de livraison, conditions de paiement…",
    },
    selectPlaceholder: "Sélectionner…",
    productOptions: {
      cement: "Ciment",
      clinker: "Clinker",
      gypsum: "Gypse",
      "construction-materials": "Matériaux de construction",
      "industrial-raw-materials": "Matières premières industrielles",
      logistics: "Services commerce & logistique",
      other: "Autre",
    },
    incotermOptions: {
      FOB: "FOB — Franco à bord",
      CFR: "CFR — Coût et fret",
      CIF: "CIF — Coût, assurance et fret",
      other: "Autre / je ne sais pas",
    },
    optional: "Facultatif",
    submit: "Envoyer la demande",
    sending: "Envoi en cours…",
    errors: {
      required: "Ce champ est obligatoire.",
      tooShort: "Merci de donner un peu plus de détails.",
      tooLong: "Cette saisie est trop longue.",
      invalidEmail: "Veuillez saisir une adresse e-mail valide.",
      invalidPhone: "Utilisez uniquement des chiffres, espaces et + ( ) -.",
      invalidOption: "Veuillez sélectionner une option.",
      consentRequired: "Veuillez confirmer pour continuer.",
    },
    api: {
      bad_request:
        "Votre demande n’a pas pu être traitée. Veuillez actualiser la page et réessayer.",
      validation: "Veuillez vérifier les champs signalés.",
      captcha: "La vérification de sécurité a échoué. Veuillez réessayer.",
      rate_limited: "Trop de demandes. Veuillez patienter quelques minutes avant de réessayer.",
      unavailable:
        "Le service de demande est temporairement indisponible. Veuillez réessayer plus tard.",
      server: "Une erreur est survenue lors de l’envoi de votre demande. Veuillez réessayer.",
      network: "Erreur réseau — vérifiez votre connexion et réessayez.",
    },
    captchaPending: "Veuillez compléter la vérification de sécurité.",
    success: {
      title: "Merci — votre demande a bien été envoyée.",
      text: "Notre service commercial étudiera vos besoins et reviendra vers vous rapidement, généralement sous un jour ouvré.",
      again: "Envoyer une autre demande",
    },
    privacyNote:
      "Protégé par Cloudflare Turnstile. Vos données servent uniquement à répondre à votre demande.",
  },
};

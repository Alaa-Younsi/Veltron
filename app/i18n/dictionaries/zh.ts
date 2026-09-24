import type { Dictionary } from "./en";

/** Simplified Chinese (zh-Hans). */
export const zh: Dictionary = {
  meta: {
    siteName: "VELTRON 环球贸易",
    titleSuffix: "VELTRON Global Trading Limited",
    defaultDescription:
      "总部位于香港的国际贸易公司，经营水泥、熟料、石膏、建筑材料及工业原材料，提供全球采购与端到端物流协调服务。",
  },

  common: {
    nav: {
      home: "首页",
      about: "关于我们",
      products: "产品",
      logistics: "贸易与物流",
      markets: "市场",
      quality: "质量与合规",
      contact: "联系我们",
      requestQuote: "获取报价",
      openMenu: "打开菜单",
      closeMenu: "关闭菜单",
      skipToContent: "跳至主要内容",
      language: "语言",
      allProducts: "全部产品",
      productsIntro: "为建筑与工业领域提供散装及袋装供应。",
      mainNavigation: "主导航",
    },
    footer: {
      tagline: "水泥、熟料及工业原材料国际贸易——负责任地采购，可靠地交付。",
      headquarters: "总部",
      company: "公司",
      products: "产品",
      rights: "版权所有。",
      backToTop: "返回顶部",
      registered: "于中国香港特别行政区注册",
    },
    cta: {
      requestQuote: "获取报价",
      exploreProducts: "浏览产品",
    },
    labels: {
      address: "地址",
      email: "电子邮件",
      phone: "电话",
      whatsapp: "WhatsApp",
      hours: "办公时间",
      hoursValue: "周一至周五 09:00 – 18:00（香港时间）",
      home: "首页",
      breadcrumb: "面包屑导航",
    },
    ctaBand: {
      eyebrow: "开启合作",
      title: "有采购需求？让我们为您制定合适的供应方案。",
      text: "请告知产品、数量、目的港及首选贸易术语，我们将为您提供透明、量身定制的报价。",
    },
    whatsapp: {
      label: "WhatsApp 咨询",
      message: "您好 VELTRON，我想咨询采购需求。",
    },
  },

  products: {
    cement: {
      name: "水泥",
      short: "适用于各类规模工程的硅酸盐水泥及复合水泥。",
      tagline: "强度稳定，供应可靠。",
      intro: [
        "我们从严格审核的生产商处供应普通硅酸盐水泥及复合水泥，符合欧洲（EN 197-1）及美国（ASTM C150）标准。",
        "从供分销渠道使用的 50 公斤袋装，到供预拌混凝土厂及基础设施项目使用的整船散装，每批货物均按您的规格匹配，并附工厂检验证书。",
      ],
      highlights: ["EN 197-1 及 ASTM C150 等级", "袋装、吨袋或散装", "每批附工厂检验证书"],
      grades: [
        { name: "OPC CEM I 42.5 N / R", detail: "适用于结构混凝土的通用硅酸盐水泥。" },
        { name: "OPC CEM I 52.5 N / R", detail: "早期强度高，适用于预制构件及高性能混凝土。" },
        { name: "CEM II 42.5 R / 32.5 R", detail: "复合硅酸盐水泥，适用于砌筑、砌块及一般工程。" },
        { name: "ASTM C150 I / II 型", detail: "美国标准水泥，包括中等抗硫酸盐型。" },
        { name: "抗硫酸盐水泥（V 型 / SR）", detail: "低 C₃A 水泥，适用于海洋环境及侵蚀性土壤。" },
      ],
      specsTitle: "典型性能 — OPC CEM I 42.5",
      specs: [
        { label: "2 天抗压强度", value: "≥ 10 MPa (N) · ≥ 20 MPa (R)" },
        { label: "28 天抗压强度", value: "42.5 – 62.5 MPa" },
        { label: "初凝时间", value: "≥ 60 分钟" },
        { label: "安定性（雷氏法）", value: "≤ 10 mm" },
        { label: "三氧化硫含量 (SO₃)", value: "≤ 3.5 %" },
        { label: "氯离子含量", value: "≤ 0.10 %" },
        { label: "烧失量", value: "≤ 5.0 %" },
      ],
      packaging: ["50 公斤编织袋或牛皮纸袋", "1.5 吨及 2 吨吨袋 (FIBC)", "船舱或罐车散装"],
      applications: [
        "预拌混凝土",
        "预制构件",
        "基础设施及海工工程",
        "住宅及商业建筑",
        "砌块、砂浆及抹灰",
      ],
      shipping: ["散货船 — 灵便型至超灵便型", "袋装件杂货运输", "小批量采用 20 英尺集装箱"],
    },
    clinker: {
      name: "熟料",
      short: "为水泥粉磨厂提供优质硅酸盐熟料。",
      tagline: "每一吨水泥的核心。",
      intro: [
        "硅酸盐水泥熟料是水泥生产的基础。我们为粉磨站及水泥生产商供应化学成分与活性稳定的熟料，来源于现代化干法窑生产线。",
        "货物采用自带吊机的散货船运输，装船前取样并进行独立检测，确保每一船货物的性能稳定可预期。",
      ],
      highlights: ["C₃S 稳定、游离钙低", "普通型及抗硫酸盐型", "散装货量 25,000 吨起"],
      grades: [
        { name: "普通硅酸盐熟料", detail: "用于生产 CEM I / ASTM I 型水泥。" },
        { name: "抗硫酸盐熟料", detail: "低 C₃A（≤ 3.5 %），用于 SR 及 V 型水泥。" },
        { name: "低碱熟料", detail: "低当量碱含量，适用于对碱骨料反应敏感的工程。" },
      ],
      specsTitle: "典型化学成分 — 普通硅酸盐熟料",
      specs: [
        { label: "硅酸三钙 (C₃S)", value: "≥ 55 %" },
        { label: "游离氧化钙 (f-CaO)", value: "≤ 1.5 %" },
        { label: "氧化镁 (MgO)", value: "≤ 5.0 %" },
        { label: "烧失量", value: "≤ 1.0 %" },
        { label: "不溶物", value: "≤ 0.75 %" },
        { label: "石灰饱和系数 (LSF)", value: "92 – 98" },
        { label: "粒度分布", value: "0 – 50 mm（≥ 90 %）" },
        { label: "28 天强度（实验室粉磨）", value: "≥ 50 MPa" },
      ],
      packaging: ["仅限散装 — 船舱散装"],
      applications: ["水泥粉磨站", "复合水泥生产", "一体化水泥厂产能调配"],
      shipping: [
        "超灵便型、极限灵便型及巴拿马型船",
        "为无岸吊港口配备自带吊机船舶",
        "常规批量 25,000 – 60,000 吨",
      ],
    },
    gypsum: {
      name: "石膏",
      short: "天然石膏，用于水泥缓凝、石膏粉及石膏板生产。",
      tagline: "高纯度硫酸钙，按需定粒径。",
      intro: [
        "天然石膏（二水硫酸钙）是水泥粉磨中必不可少的缓凝剂，也是石膏粉和石膏板的原料。",
        "我们从成熟矿山供应高纯度块状及破碎石膏，按您的磨机或窑炉要求筛分至所需粒径。",
      ],
      highlights: ["CaSO₄·2H₂O 纯度最高达 95 %", "按粒径破碎筛分", "散装或吨袋"],
      grades: [
        { name: "水泥级石膏", detail: "块状石膏，用作水泥粉磨缓凝剂。" },
        { name: "石膏粉 / 石膏板级", detail: "白度和纯度高，适用于煅烧。" },
        { name: "农用石膏", detail: "土壤改良剂，补充钙和硫。" },
      ],
      specsTitle: "典型性能 — 水泥级石膏",
      specs: [
        { label: "纯度 (CaSO₄·2H₂O)", value: "85 – 95 %" },
        { label: "三氧化硫 (SO₃)", value: "≥ 40 %" },
        { label: "结晶水", value: "≥ 18 %" },
        { label: "游离水分", value: "≤ 3 %" },
        { label: "氯离子 (Cl⁻)", value: "≤ 0.02 %" },
        { label: "粒径范围", value: "0–50 / 10–50 / 20–80 mm" },
      ],
      packaging: ["船舱散装", "1 – 2 吨吨袋"],
      applications: ["水泥缓凝剂", "石膏粉及石膏板", "农业及土壤改良", "陶瓷及模具"],
      shipping: ["灵便型及超灵便型散货船", "小批量采用集装箱装吨袋"],
    },
    "construction-materials": {
      name: "建筑材料",
      short: "钢材、骨料、沥青及装饰材料。",
      tagline: "项目建设所需，一应俱全。",
      intro: [
        "除水泥外，我们还供应确保工程按期推进的核心材料——钢筋、骨料、沥青及装饰装修产品。",
        "由同一贸易伙伴整合多条产品线，可为承包商和分销商简化采购、单证及运输流程。",
      ],
      highlights: ["BS 4449 及 ASTM A615 钢筋", "60/70 及 80/100 沥青", "多品类整合供应"],
      grades: [
        { name: "钢筋", detail: "B500B、ASTM A615 60 级 — 直径 8 至 32 mm。" },
        { name: "线材与钢坯", detail: "SAE 1006/1008 线材 · 3SP/5SP 钢坯。" },
        { name: "骨料与碎石", detail: "石灰石及花岗岩，5 – 40 mm 级配。" },
        { name: "沥青", detail: "针入度等级 60/70 及 80/100。" },
        { name: "瓷砖与石膏板", detail: "陶瓷砖及瓷质砖 · 9 – 15 mm 石膏板。" },
      ],
      specsTitle: "产品一览",
      specs: [
        { label: "钢筋", value: "BS 4449 B500B · ASTM A615 Gr 60 · Ø 8 – 32 mm" },
        { label: "线材", value: "SAE 1006 / 1008 · Ø 5.5 – 12 mm" },
        { label: "钢坯", value: "3SP / 5SP · 方坯 120 – 150 mm" },
        { label: "骨料", value: "石灰石 / 花岗岩碎石 · 5 – 40 mm" },
        { label: "沥青", value: "针入度等级 60/70 · 80/100" },
        { label: "石膏板", value: "普通、防潮及防火型 · 9 – 15 mm" },
      ],
      packaging: ["钢材成捆并挂标签", "沥青采用桶装、吨袋或散装", "瓷砖及板材托盘包装"],
      applications: ["住宅及商业建筑", "道路及基础设施", "分销及批发"],
      shipping: ["钢材采用件杂货船", "装饰材料采用集装箱", "骨料采用散货船"],
    },
    "industrial-raw-materials": {
      name: "工业原材料",
      short: "石灰石、矿渣、粉煤灰、燃料及校正料。",
      tagline: "重工业背后的关键原料。",
      intro: [
        "水泥、钢铁及电力生产商依赖稳定的原材料和燃料供应。我们采购各类关键原料——从石灰石和辅助胶凝材料，到窑用燃料及校正原料。",
        "每种材料均按您的工艺要求进行评估，每批货物均可提供分析证书及独立检验。",
      ],
      highlights: [
        "辅助胶凝材料：矿渣、粉煤灰、火山灰",
        "窑用燃料：石油焦及煤炭",
        "校正料：铁矿石、铝土矿",
      ],
      grades: [
        { name: "石灰石", detail: "用于水泥和石灰生产的高钙石灰石。" },
        { name: "粒化高炉矿渣 (GGBFS)", detail: "用于复合水泥的辅助胶凝材料。" },
        { name: "粉煤灰", detail: "F 类及 C 类，用于水泥和混凝土。" },
        { name: "石油焦", detail: "水泥窑用燃料级石油焦。" },
        { name: "动力煤", detail: "用于窑炉及发电的热能煤。" },
        { name: "铁矿石与铝土矿", detail: "用于调整生料化学成分的校正料。" },
      ],
      specsTitle: "典型规格",
      specs: [
        { label: "石灰石", value: "CaCO₃ ≥ 90 – 97 % · 0 – 80 mm" },
        { label: "粒化矿渣", value: "玻璃体含量 ≥ 85 % · 碱度 ≥ 1.0" },
        { label: "粉煤灰", value: "F / C 类 · 烧失量 ≤ 6 %" },
        { label: "石油焦", value: "高位热值 ≥ 8,000 kcal/kg · 硫 ≤ 6.5 %" },
        { label: "动力煤", value: "NAR 5,500 – 6,000 kcal/kg" },
        { label: "铁矿石（校正料）", value: "Fe₂O₃ ≥ 60 %" },
      ],
      packaging: ["船舱散装", "粉煤灰及特种等级采用吨袋"],
      applications: ["水泥及熟料生产", "钢铁冶金", "发电"],
      shipping: ["超灵便型及巴拿马型散货船", "粉煤灰采用气力卸货船"],
    },
  },

  pages: {
    home: {
      title: "水泥与建筑材料国际贸易",
      description:
        "VELTRON Global Trading Limited 立足香港，向全球供应水泥、熟料、石膏、建筑材料及工业原材料。",
      hero: {
        eyebrow: "国际贸易 · 香港",
        titleLead: "建筑材料，",
        titleAccent: "全球采购。",
        titleTail: "精准交付。",
        text: "VELTRON Global Trading Limited 连接值得信赖的水泥、熟料、石膏及工业原材料生产商，服务中东、非洲、亚洲及更多地区的买家。",
        badges: ["散装及袋装货物", "FOB · CFR · CIF", "独立第三方检验"],
        mapCaption: "贸易网络 — 采购中心与目的地市场",
        scroll: "向下滚动",
      },
      marquee: [
        "水泥",
        "熟料",
        "石膏",
        "钢筋",
        "石灰石",
        "粒化矿渣",
        "粉煤灰",
        "骨料",
        "沥青",
        "石油焦",
      ],
      productsSection: {
        eyebrow: "经营产品",
        title: "专注于建筑与重工业的产品组合",
        text: "五大产品线，一个负责到底的合作伙伴——从规格确认、采购到装货、运输及单证。",
      },
      stats: [
        { value: "5", label: "产品线" },
        { value: "7", label: "服务区域" },
        { value: "3", label: "贸易术语选项" },
        { value: "1", label: "从报价到卸货的单一联系人" },
      ],
      why: {
        eyebrow: "为何选择 VELTRON",
        title: "以可靠、透明和可控为基础的贸易",
        items: {
          sourcing: {
            title: "合格的采购网络",
            text: "我们合作的生产商均经过产能、质量稳定性及合规性审核——您签约的产品，就是您收到的产品。",
          },
          quality: {
            title: "可验证的质量",
            text: "提供工厂证书、装运前取样，并可按要求安排国际认可的检验机构进行独立检验。",
          },
          logistics: {
            title: "端到端物流",
            text: "租船、装货监督、单证及卸货协调，由同一团队从报价到抵港全程负责。",
          },
          terms: {
            title: "清晰的商业条款",
            text: "FOB、CFR 或 CIF 报价，安全的支付方式，合同表述清晰——没有意外。",
          },
        },
      },
      process: {
        eyebrow: "合作流程",
        title: "从询价到卸货，五个清晰步骤",
        steps: [
          { title: "询价", text: "您提供产品、规格、数量、目的地及时间要求。" },
          { title: "采购与报价", text: "我们匹配合格生产商，并出具明确、透明的报价。" },
          { title: "合同与付款", text: "商定条款，并通过信用证、电汇或约定方式保障付款。" },
          { title: "检验与装货", text: "在装运港进行取样、检验及装货监督。" },
          { title: "运输与交付", text: "跟踪航程、提供单证，并在目的港协调卸货。" },
        ],
      },
      reach: {
        eyebrow: "全球网络",
        title: "以香港为中心的全球供应网络",
        text: "我们立足香港，协调主要生产地区与各大洲快速增长的建筑市场之间的供应。",
        cta: "了解我们的市场",
      },
      quote: {
        text: "从矿山到码头，我们经营的每一吨货物都有经过验证的质量和协调有序的物流作为保障。",
        author: "VELTRON 贸易团队",
      },
    },

    about: {
      title: "关于我们",
      description:
        "了解 VELTRON Global Trading Limited——一家总部位于香港、专注于水泥、熟料及建筑原材料的国际贸易公司。",
      hero: {
        eyebrow: "关于 VELTRON",
        title: "为建设世界的材料而生的贸易伙伴",
        text: "VELTRON Global Trading Limited 是一家总部位于香港的国际贸易公司，专注于水泥、熟料、石膏、建筑材料及工业原材料。",
      },
      story: {
        eyebrow: "我们是谁",
        title: "连接各大洲的生产商与建设者",
        paragraphs: [
          "建筑业和重工业依赖大宗材料，这些材料必须准时、符合规格并以具有竞争力的到岸成本送达。VELTRON 的创立，正是为了让这一切更加顺畅。",
          "我们立足香港——全球重要的贸易和航运枢纽之一——将亚洲、中东及地中海地区的合格生产商，与全球增长市场中的承包商、水泥厂及分销商紧密连接。",
          "我们的团队管理整个链条：采购与资质审核、商业条款、检验、租船及单证。客户从首次询价到最终卸货，只需对接一个负责到底的合作伙伴。",
        ],
      },
      mission: {
        title: "我们的使命",
        text: "可靠、透明地供应建筑及工业所需的基础材料，帮助客户安心建设。",
      },
      vision: {
        title: "我们的愿景",
        text: "成为全球主要生产地区与增长最快市场之间值得信赖的水泥及原材料贸易伙伴。",
      },
      values: {
        eyebrow: "我们的价值观",
        title: "每一份合同背后的原则",
        items: {
          integrity: { title: "诚信", text: "规格真实、价格公道、言出必行。" },
          reliability: { title: "可靠", text: "每一批货物都准时到达并符合规格。" },
          transparency: { title: "透明", text: "条款清晰、单证完整，每一步都保持开放沟通。" },
          partnership: { title: "合作", text: "重视长期合作关系，而非一次性交易。" },
        },
      },
      hq: {
        eyebrow: "总部",
        title: "立足香港，贸易全球",
        text: "凭借自由港地位、成熟的金融市场以及与各大航线的紧密连接，香港是国际大宗商品贸易商的理想总部所在地。",
      },
    },

    products: {
      title: "产品",
      description: "水泥、熟料、石膏、建筑材料及工业原材料——散装或袋装，符合国际标准。",
      hero: {
        eyebrow: "我们的产品",
        title: "服务建筑与重工业的材料",
        text: "每一种产品均来自合格生产商，符合国际标准，并以最适合您运营的方式装运。",
      },
      standardsNote: "所列规格为典型值。最终规格、公差及检测方法以每份合同为准。",
      detail: {
        overview: "概述",
        grades: "可供等级",
        packaging: "包装",
        applications: "应用领域",
        shipping: "运输方式",
        related: "相关产品",
        quoteTitle: "获取{product}报价",
        quoteText: "请告知等级、数量、目的港及首选贸易术语，我们将为您提供量身定制的报价。",
        backToProducts: "全部产品",
      },
    },

    logistics: {
      title: "全球贸易与物流",
      description:
        "端到端的贸易与物流协调——全球采购、租船、检验、单证，以及按 FOB、CFR 或 CIF 条款交付。",
      hero: {
        eyebrow: "全球贸易与物流",
        title: "从生产商工厂到您的港口，一个合作伙伴全程负责",
        text: "我们协调供应链的每一个环节，确保您的货物安全、准时并以完整单证抵达。",
      },
      services: {
        eyebrow: "服务范围",
        title: "围绕每一批货物的一体化服务",
        items: {
          sourcing: { title: "全球采购", text: "寻找并审核符合您规格、数量和预算的生产商。" },
          chartering: {
            title: "租船与运费",
            text: "程租、散货及件杂货运力，以及具有竞争力的集装箱订舱。",
          },
          inspection: {
            title: "检验与公证",
            text: "装运前取样，由独立检验机构进行数量和质量检验。",
          },
          documentation: {
            title: "贸易单证",
            text: "提单、原产地证书及分析证书、装箱单、发票及保险单。",
          },
          finance: { title: "付款保障", text: "通过信用证、电汇或其他约定方式进行结构化付款。" },
          delivery: {
            title: "港口与卸货协调",
            text: "与代理及收货人联络，确保靠泊、卸货及清关顺利。",
          },
        },
      },
      incoterms: {
        coverage: {
          loading: "装船",
          freight: "海运费",
          insurance: "货物保险",
          seller: "由 VELTRON 负责",
        },
        eyebrow: "Incoterms® 2020 国际贸易术语",
        title: "灵活的交货条款",
        text: "选择费用和风险转移的节点——我们按照最适合贵公司的条款报价和执行。",
        items: [
          { code: "FOB", name: "船上交货", text: "在装运港交至您指定的船上。运费和保险由您负责。" },
          {
            code: "CFR",
            name: "成本加运费",
            text: "我们安排并支付至目的港的海运费。货物装船后风险即转移。",
          },
          {
            code: "CIF",
            name: "成本、保险费加运费",
            text: "与 CFR 相同，另由我们为您投保海运货物险。",
          },
        ],
      },
      modes: {
        eyebrow: "运输方式",
        title: "为每种货物匹配合适的船舶",
        items: {
          bulk: { title: "干散货", text: "灵便型至巴拿马型散货船，运输水泥、熟料、石膏及原材料。" },
          breakbulk: { title: "件杂货", text: "以杂货船运输袋装水泥、钢材及项目货物。" },
          container: { title: "集装箱", text: "20 英尺及 40 英尺集装箱，适用于小批量及装饰材料。" },
        },
      },
      documents: {
        title: "标准运输单证",
        items: [
          "商业发票",
          "提单",
          "原产地证书",
          "分析证书",
          "检验证书（质量及数量）",
          "装箱单",
          "保险单（CIF）",
        ],
      },
    },

    markets: {
      title: "市场与目的地",
      description: "VELTRON 为中东、非洲、南亚及东南亚、欧洲、美洲及大洋洲的买家供应建筑材料。",
      hero: {
        eyebrow: "市场与目的地",
        title: "服务七大区域的增长市场",
        text: "我们的采购网络覆盖亚洲、海湾地区及地中海的主要生产中心——哪里的建设在加速，我们就服务到哪里。",
      },
      mapLegend: { hub: "总部", origin: "采购中心", destination: "目的地市场" },
      regionsTitle: "服务区域",
      regions: {
        gcc: { name: "中东及海湾地区", text: "为大型基础设施及房地产项目供应水泥、熟料和钢材。" },
        africa: {
          name: "非洲",
          text: "为西非、东非及北非的粉磨站和快速发展的城市市场供应散装水泥、熟料及石膏。",
        },
        southAsia: { name: "南亚", text: "供应熟料、石膏及原材料，支持该地区不断扩大的水泥产能。" },
        southeastAsia: {
          name: "东南亚",
          text: "为全球最具活力的建筑市场之一供应建筑材料及工业原料。",
        },
        europe: { name: "欧洲及地中海", text: "为进口商及粉磨终端供应熟料、水泥及辅助胶凝材料。" },
        americas: { name: "美洲", text: "为北美及拉丁美洲的码头和分销商供应水泥及熟料。" },
        oceania: { name: "大洋洲", text: "为澳大利亚及太平洋岛国供应水泥、熟料及建筑材料。" },
      },
      portsLabel: "主要港口",
      originsTitle: "采购中心",
      originsText:
        "合格生产商遍布中国、越南、泰国、印度尼西亚、阿联酋、阿曼、巴基斯坦、埃及及土耳其。",
    },

    quality: {
      title: "质量与合规",
      description:
        "VELTRON 如何保证产品质量并开展负责任的贸易——供应商审核、独立检验、国际标准及合规管理。",
      hero: {
        eyebrow: "质量与合规",
        title: "质量可验证，合作可信赖。",
        text: "每一批货物都遵循明确的规格、独立的核验和严格的合规标准。",
      },
      process: {
        eyebrow: "质量保证",
        title: "贯穿货物全流程的质量控制",
        steps: [
          { title: "供应商审核", text: "评估生产商的产能、过程控制、认证资质及过往业绩。" },
          { title: "规格确认", text: "在生产前于合同中明确等级、公差及检测方法。" },
          { title: "装运前取样", text: "抽取具有代表性的样品，并由认可实验室进行分析。" },
          {
            title: "独立检验",
            text: "可按要求由 SGS、必维 (Bureau Veritas) 或天祥 (Intertek) 等国际认可检验机构进行质量和数量检验。",
          },
          { title: "装货监督", text: "对舱容清洁、水尺计重及装货过程进行监督并记录。" },
          { title: "完整单证", text: "每批货物均附分析证书、原产地证书及检验证书。" },
        ],
      },
      standards: {
        eyebrow: "标准",
        title: "产品符合国际公认标准",
        items: [
          { code: "EN 197-1", text: "欧洲通用水泥标准" },
          { code: "ASTM C150", text: "硅酸盐水泥标准规范" },
          { code: "ASTM C595", text: "混合水硬性水泥" },
          { code: "BS 4449", text: "钢筋混凝土用碳素钢筋" },
          { code: "ASTM A615", text: "混凝土用碳素钢变形钢筋" },
          { code: "ISO 9001", text: "质量管理体系 — 优先选择的生产商资质" },
        ],
      },
      compliance: {
        eyebrow: "合规",
        title: "负责任的贸易",
        items: {
          kyc: { title: "了解交易对手", text: "在签订任何合同前，对买方和供应商进行尽职调查。" },
          sanctions: {
            title: "制裁筛查",
            text: "依据适用的制裁制度，对交易对手、船舶及航线进行筛查。",
          },
          antiBribery: { title: "反贿赂与商业道德", text: "遵循国际最佳实践，对腐败零容忍。" },
          environment: { title: "负责任采购", text: "优先选择设施现代、高效且排放更低的生产商。" },
        },
      },
    },

    contact: {
      title: "联系我们",
      description:
        "联系位于香港的 VELTRON Global Trading Limited——获取水泥、熟料、石膏、建筑材料或工业原材料报价。",
      hero: {
        eyebrow: "联系我们",
        title: "一起谈谈您的下一批货物",
        text: "请发送您的需求，我们的贸易团队将为您提供量身定制的报价——通常在一个工作日内回复。",
      },
      formTitle: "获取报价",
      formText: "带 * 的为必填项。您提供的信息越详细，我们的报价就越精准。",
      infoTitle: "VELTRON Global Trading Limited",
      mapTitle: "我们的办公室",
      mapLoad: "加载交互式地图",
      mapConsent: "加载地图将连接至 Google 地图。",
      openInMaps: "在 Google 地图中打开",
    },
  },

  form: {
    labels: {
      name: "姓名",
      company: "公司",
      email: "工作邮箱",
      phone: "电话 / WhatsApp",
      country: "国家/地区",
      product: "意向产品",
      quantity: "预估数量",
      destinationPort: "目的港",
      incoterm: "首选贸易术语",
      message: "您的需求",
      consent: "我同意 VELTRON 使用以上信息回复我的询价。",
    },
    placeholders: {
      name: "张伟",
      company: "公司名称",
      email: "name@company.com",
      phone: "+86 138 0000 0000",
      country: "例如：尼日利亚",
      quantity: "例如：每月 50,000 吨",
      destinationPort: "例如：拉各斯（阿帕帕港）",
      message: "等级 / 规格、包装、交货计划、付款条件……",
    },
    selectPlaceholder: "请选择……",
    productOptions: {
      cement: "水泥",
      clinker: "熟料",
      gypsum: "石膏",
      "construction-materials": "建筑材料",
      "industrial-raw-materials": "工业原材料",
      logistics: "贸易与物流服务",
      other: "其他",
    },
    incotermOptions: {
      FOB: "FOB — 船上交货",
      CFR: "CFR — 成本加运费",
      CIF: "CIF — 成本、保险费加运费",
      other: "其他 / 不确定",
    },
    optional: "选填",
    submit: "提交询价",
    sending: "正在发送……",
    errors: {
      required: "此项为必填项。",
      tooShort: "请提供更多详细信息。",
      tooLong: "输入内容过长。",
      invalidEmail: "请输入有效的电子邮件地址。",
      invalidPhone: "仅可使用数字、空格及 + ( ) -。",
      invalidOption: "请选择一个选项。",
      consentRequired: "请勾选确认后继续。",
    },
    api: {
      bad_request: "您的请求无法处理，请刷新页面后重试。",
      validation: "请检查标记的字段。",
      captcha: "安全验证失败，请重试。",
      rate_limited: "请求过于频繁，请几分钟后再试。",
      unavailable: "询价服务暂时不可用，请稍后再试。",
      server: "发送询价时出现错误，请重试。",
      network: "网络错误——请检查网络连接后重试。",
    },
    captchaPending: "请完成安全验证。",
    success: {
      title: "谢谢——您的询价已成功发送。",
      text: "我们的贸易团队将审阅您的需求并尽快与您联系，通常在一个工作日内回复。",
      again: "再次提交询价",
    },
    privacyNote: "本表单受 Cloudflare Turnstile 保护。您的信息仅用于回复您的询价。",
  },
};

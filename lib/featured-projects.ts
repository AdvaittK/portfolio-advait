export type FeaturedProject = {
  id: string
  title: string
  description: string
  longDescription: string
  tags: string[]
  image: string
  demoLink: string
  githubLink: string
  features: string[]
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: "crevo-studio",
    title: "Crevo Studio – Thumbnail + Title Agency",
    description:
      "A premium, conversion-focused website for Crevo Studio: a thumbnail + title packaging agency engineered for clicks and fast delivery.",
    longDescription:
      "Crevo Studio is a specialized thumbnail packaging agency that helps creators and brands drive higher CTR by pairing bold, mobile-first thumbnails with hook-based title strategy. The website was built to feel sharp and premium, clearly communicate the offer, and guide visitors toward booking a call or claiming an audit.",
    tags: ["Agency", "Thumbnails", "Landing Page", "Conversion", "Brand"],
    image: "/assets/projects/crevio.png",
    demoLink: "https://www.crevostudio.in/",
    githubLink: "",
    features: [
      "Premium, scroll-stopping visual direction",
      "Conversion-first layout with clear CTAs",
      "Fast, responsive performance across devices",
      "Proof and credibility sections (results + creators)",
      "Clean information hierarchy for pricing & FAQs",
      "Share-friendly metadata and social preview setup",
    ],
  },
  {
    id: "amrita-kunal",
    title: "Amrita Kunal - Healer Coach Personal Brand Website",
    description:
      "A serene, trust-first personal brand website for Amrita Kunal, designed to communicate her healing philosophy and guide visitors toward bookings.",
    longDescription:
      "Amrita Kunal's website was crafted to balance warmth and clarity so visitors quickly understand her work as a healer coach and feel confident taking the next step. The structure combines grounded storytelling, trust-building sections, and a clean conversion path for discovery calls and enquiries.",
    tags: ["Personal Brand", "Healer Coach", "Wellness", "Coaching", "Conversion"],
    image: "/assets/projects/ak.png",
    demoLink: "https://www.amritakunal.com/",
    githubLink: "",
    features: [
      "Calm, premium visual direction aligned with a healing brand",
      "Clear service pathways for sessions and coaching journeys",
      "Trust-focused sections with story, outcomes, and FAQs",
      "High-converting consultation and contact CTA flow",
      "Mobile-first layout for frictionless browsing",
      "Performance and SEO-ready build for discoverability",
    ],
  },
  {
    id: "asoka-ferrocast",
    title: "Asoka Ferrocast – Steel Pipes Distribution",
    description: "A trusted corporate website for a steel pipes distributor, built to communicate reliability, technical expertise, and infrastructure-focused support.",
    longDescription: "With over four decades of industry expertise, Asoka Ferrocast is a trusted name in the distribution of a comprehensive range of high-quality steel pipes. The website was designed to reflect that legacy through clear positioning, strong credibility cues, and a polished presentation of their industrial capabilities. It also highlights their commitment to supporting India’s rapid infrastructure growth with dependable solutions for diverse industrial needs.",
    tags: ["Industrial", "Steel Pipes", "Distribution", "Corporate Website", "Infrastructure"],
    image: "/assets/projects/aoka.png",
    demoLink: "https://www.asokaferrocast.com/",
    githubLink: "",
    features: [
      "Legacy-driven brand storytelling",
      "Clear positioning for industrial buyers",
      "Trust-focused corporate presentation",
      "Responsive, modern website structure",
      "Infrastructure and supply capability messaging",
      "Clean visual hierarchy for easy navigation"
    ]
  },
  {
    id: "cult-of-content-agency",
    title: "Cult of Content – Content-Led Growth Agency",
    description: "A content-led growth agency helping D2C brands, coaches, and creators grow through organic content marketing.",
    longDescription: "Cult of Content is a specialized content-led growth agency dedicated to helping D2C brands, coaches, and creators achieve rapid growth through strategic organic content marketing. The agency builds repeatable systems for ideas that hook, storytelling that builds authority, and content that converts into leads and sales. With a focus on sustainable growth and authentic engagement, Cult of Content partners with ambitious entrepreneurs to establish market authority and scale their influence.",
    tags: ["Agency", "Content Marketing", "Growth", "Digital Marketing", "D2C"],
    image: "/assets/projects/coc.webp",
    demoLink: "https://www.cultofcontent.agency/",
    githubLink: "",
    features: [
      "Content-first growth strategies",
      "Organic reach and authority building",
      "Conversion-optimized content systems",
      "Brand positioning and messaging",
      "Audience engagement and retention",
      "Sustainable long-term growth"
    ]
  },
  {
    id: "cult-of-content-guitars",
    title: "Cult of Content – Guitar Retail Specialists",
    description: "A specialized content agency built exclusively for guitar stores, music retailers, and instrument brands.",
    longDescription: "Cult of Content's guitar division is a specialized content agency built exclusively for guitar stores, music retailers, and instrument brands. The agency creates retention-first content systems that drive growth, build trust, and establish brands as authorities in the music retail space. By understanding the unique needs of music retailers and their passionate audience, Cult of Content delivers content strategies that drive both online engagement and in-store foot traffic.",
    tags: ["Agency", "Content Marketing", "Music Retail", "Guitar", "E-Commerce"],
    image: "/assets/projects/gcoc.webp",
    demoLink: "https://guitar.cultofcontent.agency/",
    githubLink: "",
    features: [
      "Specialized music retail strategies",
      "Community building and engagement",
      "Retention-first content systems",
      "Multi-channel promotion",
      "Audience growth and loyalty",
      "Music industry expertise"
    ]
  },
  {
    id: "integrated-media-agency",
    title: "Integrated Media Agency – Personal Brand Growth",
    description: "Scale and grow personal brands through strategic marketing, conversion-focused funnels, and integrated media strategies.",
    longDescription: "Integrated Media Agency specializes in scaling and accelerating the growth of personal brands through comprehensive marketing strategies, conversion-optimized funnels, and integrated media campaigns. By combining content strategy, funnel optimization, and multi-channel marketing, they help entrepreneurs and thought leaders build influential personal brands that drive business results and establish lasting market authority.",
    tags: ["Agency", "Personal Branding", "Marketing", "Growth", "Digital Marketing"],
    image: "/assets/projects/imga.webp",
    demoLink: "https://www.integratedmedia.agency/",
    githubLink: "",
    features: [
      "Personal brand strategy and positioning",
      "Conversion funnel optimization",
      "Multi-channel marketing campaigns",
      "Audience growth and scaling",
      "Authority and thought leadership",
      "Integrated media approach"
    ]
  },
  {
    id: "shweta-mishra-quantum-manifestation",
    title: "Shweta Mishra – Quantum Manifestation Coach Website",
    description: "A clean, uplifting coaching website for Shweta Mishra, focused on clarity, credibility, and conversion.",
    longDescription: "A bespoke website for Quantum Manifestation Coach Shweta Mishra designed to highlight her coaching philosophy, credibility, and client transformation. Emphasis was placed on trust-building elements, accessible structure, responsive performance, and an aesthetic that balances professionalism with warmth. The site is optimized for clarity of messaging and delivers a polished experience across devices.",
    tags: ["Coaching", "Personal Brand", "Wellness", "Website", "UI/UX"],
    image: "/assets/projects/shweta-site.webp",
    demoLink: "https://www.shwetamishra.in/",
    githubLink: "",
    features: [
      "Personal brand presentation and positioning",
      "Responsive, mobile-first layout",
      "Clear calls to action for engagement",
      "Performance & accessibility optimizations",
      "Calming, trust-focused visual styling",
      "Scalable structure for future resources"
    ]
  },
  {
    id: "sizzle-studios",
    title: "Sizzle Studios – Creative Portfolio Website",
    description: "A modern, responsive portfolio website for Sizzle Studios, showcasing their creative work and services with an elegant, professional design.",
    longDescription: "Sizzle Studios' portfolio website is a beautifully crafted showcase of their creative services and portfolio work. The website features a modern, clean design that highlights their artistic capabilities while providing an excellent user experience. Built with responsive design principles, it ensures optimal viewing across all devices and platforms.",
    tags: ["Portfolio", "Creative", "Design", "Website", "UI/UX"],
    image: "/assets/projects/sizzle-site.webp",
    demoLink: "https://www.sizzlestudio.in/",
    githubLink: "",
    features: [
      "Modern, responsive portfolio design",
      "Creative work showcase and gallery",
      "Service presentation and offerings",
      "Professional contact and inquiry system",
      "Optimized for all devices and platforms",
      "Clean, elegant user interface"
    ]
  },
  {
    id: "oriental-air-ship-services",
    title: "Oriental Air & Ship Services – Import Clearing & Forwarding",
    description: "Oriental's new website was designed to provide a clean, professional, and user-friendly experience for clients and partners.",
    longDescription: "Oriental's new website was designed to provide a clean, professional, and user-friendly experience for clients and partners. The focus was on showcasing their wide range of logistics services with clarity, ensuring smooth navigation, and creating a visually appealing platform that reflects Oriental's 40+ years of trust and excellence in the industry.",
    tags: ["Logistics", "Import Export", "Clearing & Forwarding", "Business", "Website"],
    image: "/assets/projects/oriental-home.webp",
    demoLink: "https://www.orientalimited.com/",
    githubLink: "",
    features: [
      "Service showcase for import clearing & forwarding",
      "Focus on PSU and Government clientele",
      "Trust- and legacy-driven brand narrative",
      "Modern, responsive, and accessible UI"
    ]
  },
  {
    id: "vitira-website",
    title: "VITIRA – Business Website Transformation",
    description: "A modern, high-performance business website for VITIRA, designed to elevate their digital presence and showcase their services.",
    longDescription: "VITIRA's new website was transformed to deliver a clean, professional, and engaging experience for their clients. The project focused on clear service presentation, fast performance, and a visually appealing interface that aligns with VITIRA's brand values.",
    tags: ["Business", "Website", "Transformation", "UI/UX", "Next.js"],
    image: "/assets/projects/vitira.webp",
    demoLink: "https://www.vitira.in/",
    githubLink: "",
    features: [
      "Modern, responsive business website",
      "Clear service and value proposition presentation",
      "Fast performance and SEO optimization",
      "Brand-aligned visual design",
      "Contact and inquiry system",
      "Mobile-first experience"
    ]
  },
  {
    id: "dems-portfolio",
    title: "Dem's Portfolio – Thumbnail Designer Showcase",
    description: "A stunning portfolio website showcasing Dem's exceptional thumbnail design work, featuring a modern and creative interface that highlights their unique artistic style.",
    longDescription: "Dem's Portfolio is a beautifully crafted showcase of thumbnail design work, built to highlight their creative process and artistic vision. The website features a modern, minimalist design that puts the focus on the artwork while maintaining excellent user experience. It includes a dynamic gallery of thumbnail designs, case studies of successful projects, and a seamless contact system for potential clients.",
    tags: ["Portfolio", "Design", "Thumbnails", "Creative", "UI/UX"],
    image: "/assets/projects/dem-portfolio.webp",
    demoLink: "https://dems8.com",
    githubLink: "https://github.com/AdvaittK/dem-portfolio",
    features: [
      "Dynamic gallery of thumbnail designs",
      "Case studies and project breakdowns",
      "Client testimonials and success stories",
      "Contact and commission system",
      "Responsive design optimized for all devices",
      "Portfolio filtering and search functionality"
    ]
  },
  {
    id: "uvoka-website",
    title: "UVOKA – LinkedIn Personal Branding Agency Website",
    description: "A modern, responsive website for UVOKA, a LinkedIn personal branding agency. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion for smooth animations and interactions.",
    longDescription: "UVOKA's website is a comprehensive platform showcasing their LinkedIn personal branding services. The website features a modern design with smooth animations, clear service presentation, client testimonials, and a professional portfolio that reflects their expertise in personal branding. Built with cutting-edge technologies for optimal performance and user experience.",
    tags: ["Business", "Website", "Personal Branding", "LinkedIn", "Next.js", "Agency"],
    image: "/assets/projects/uvoka.webp",
    demoLink: "https://uvoka.in",
    githubLink: "",
    features: [
      "Modern, responsive agency website",
      "Smooth animations and interactions",
      "Service showcase and pricing packages",
      "Client testimonials and success stories",
      "Professional portfolio presentation",
      "Contact and inquiry system"
    ]
  },
  {
    id: "royal-sarees",
    title: "Royal Sarees – Premium Indian Ethnic Wear E-Commerce",
    description: "A luxurious e-commerce platform specializing in premium Indian ethnic wear, featuring an elegant design that showcases traditional craftsmanship and modern fashion.",
    longDescription: "Royal Sarees is a sophisticated e-commerce platform dedicated to showcasing premium Indian ethnic wear. The website features a rich, elegant design that highlights the intricate details of traditional Indian garments while providing a seamless shopping experience. Built with modern web technologies, it offers advanced filtering, detailed product views, and a secure checkout process.",
    tags: ["E-Commerce", "Next.js", "React", "TypeScript", "TailwindCSS"],
    image: "/assets/projects/royal-sarees.webp",
    demoLink: "https://royalsarees.advaitt.dev/",
    githubLink: "https://github.com/AdvaittK/saree-ecommerce",
    features: [
      "Elegant product showcase with high-quality imagery",
      "Advanced filtering by style, occasion, and region",
      "Detailed product pages with size guides",
      "Secure payment integration",
      "Responsive design for all devices",
      "Multi-language support for global reach"
    ]
  },
  {
    id: "cardhint",
    title: "CardHint – Smart Credit Card Comparison Platform",
    description: "A smart platform for comparing credit cards and maximizing rewards, built with Next.js, Tailwind, and advanced UI components.",
    longDescription: "CardHint is a modern web application designed to help users compare credit cards and find the best options for their needs. It features a user-friendly interface, advanced filtering options, and detailed information on various credit cards.",
    tags: ["Finance", "Next.js", "Tailwind CSS"],
    image: "/assets/projects/cardhint-app.webp",
    demoLink: "https://cardhint.advaitt.dev/",
    githubLink: "https://github.com/AdvaittK/cardhint",
    features: [
      "Smart credit card recommendations powered by expert insights",
      "Advanced filtering based on rewards, fees, and user goals",
      "Secure and privacy-focused platform architecture",
      "Responsive design optimized for all devices",
      "User-friendly interface with clean, modern UI elements",
      "Regularly updated database with the latest card offers"
    ]
  },
  {
    id: "kixkart-ecommerce",
    title: "KixKart – Premium Sneakers E-Commerce Platform",
    description: "Cyberpunk-inspired e-commerce platform specializing in premium sneakers and streetwear, built with Next.js, Tailwind, and advanced UI components.",
    longDescription: "KixKart is a modern, cyberpunk-themed e-commerce web application designed for sneakerheads and streetwear enthusiasts. It offers a visually striking interface and smooth shopping experience for users browsing high-end sneakers across categories.",
    tags: ["E-Commerce", "Next.js", "Tailwind CSS"],
    image: "/assets/projects/kixkart.webp",
    demoLink: "https://www.kixkart.advaitt.dev/",
    githubLink: "https://github.com/AdvaittK/kixkart",
    features: [
      "Fully responsive e-commerce UI with shopping cart and wishlist",
      "Theme toggle for dark/light mode",
      "Browse by product categories",
      "Product pages with rich descriptions and visuals",
      "User authentication & account management",
      "Cyberpunk-inspired UI with smooth animations"
    ]
  },
  {
    id: "pulseboard-dashboard",
    title: "PulseBoard – Interactive Dashboard Frontend Showcase",
    description: "A modern, responsive dashboard UI with interactive charts, subscription flows, and a mock backend for demo purposes. Showcasing frontend design, state management, and UI component patterns.",
    longDescription: "PulseBoard is a sleek and responsive dashboard web application designed to demonstrate advanced frontend patterns and UI/UX principles. Built with Next.js 15, React 19, and TypeScript, it features dynamic charts, dark/light theme switching, and comprehensive UI components.",
    tags: ["Next.js", "React", "TypeScript", "TailwindCSS", "Shadcn", "Charts", "Mock Backend"],
    image: "/assets/projects/pulseboard.webp",
    demoLink: "https://www.pulseboard.advaitt.dev/",
    githubLink: "https://github.com/AdvaittK/pulse-board-main",
    features: [
      "Responsive dashboard layouts with modern UI/UX",
      "Dynamic charts powered by mock data",
      "Theme switcher (dark/light mode)",
      "Subscription and pricing management UI",
      "Intuitive sidebar navigation",
      "Mock API layer simulating backend interaction"
    ]
  },
  {
    id: "symtolink-health",
    title: "SymtoLink – Health Symptom Analysis Platform",
    description: "AI-powered health symptom analysis platform that helps users identify potential health conditions and connect with healthcare providers.",
    longDescription: "SymtoLink is a healthcare technology platform that combines AI algorithms with medical knowledge to help users analyze their symptoms, understand potential conditions, and find appropriate care. The platform features a user-friendly interface for symptom input, analysis reports, and healthcare provider connections.",
    tags: ["Healthcare Tech", "AI", "Next.js", "React", "TailwindCSS"],
    image: "/assets/projects/symptolink.webp",
    demoLink: "https://symptolink.advaitt.dev/",
    githubLink: "https://github.com/AdvaittK/symtolink",
    features: [
      "Intuitive symptom input interface",
      "AI-powered analysis of reported symptoms",
      "Condition probability assessments",
      "Healthcare provider recommendations",
      "Secure user health profiles",
      "Responsive design for all devices"
    ]
  },
  {
    id: "portfolio-website",
    title: "Advait | Web Developer Portfolio",
    description: "A modern, high-performance portfolio website showcasing my work, skills, and services as a frontend developer and UI designer.",
    longDescription: "This portfolio website is a fully custom, responsive web application built to highlight my expertise in frontend development, UI/UX design, and modern web technologies. It features animated transitions, a dynamic projects showcase, a services/pricing section, and a contact form.",
    tags: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion", "Vercel"],
    image: "/new_homepage.png",
    demoLink: "https://advaitt.dev/",
    githubLink: "https://github.com/AdvaittK/portfolio-advait",
    features: [
      "Fully responsive, custom-designed UI",
      "Animated page transitions and interactive elements",
      "Dynamic projects and services sections",
      "SEO and social sharing optimized",
      "Vercel Analytics integration",
      "Accessible and performant design"
    ]
  },
  {
    id: "truthsense-fact-checker",
    title: "TruthSense – AI-Powered Fact Checking Platform",
    description: "Web application that uses AI to analyze and verify claims against trusted sources, helping users identify misinformation online.",
    longDescription: "TruthSense is an advanced fact-checking platform that leverages artificial intelligence to analyze claims against a database of trusted sources. Users can submit statements or URLs for verification, and the system provides reliability scores, source citations, and context to help combat misinformation.",
    tags: ["AI", "NLP", "React", "Node.js", "TailwindCSS"],
    image: "/assets/projects/truthsense.webp",
    demoLink: "https://truthsense.advaitt.dev/",
    githubLink: "https://github.com/AdvaittK/truthsense",
    features: [
      "Text and URL submission for fact checking",
      "AI-powered claim extraction and verification",
      "Source reliability scoring system",
      "Citation links to trusted sources",
      "User-friendly analysis reports",
      "Responsive design for mobile and desktop"
    ]
  },
  {
    id: "json-gen-tool",
    title: "JSON Gen – Advanced Mock Data Generator",
    description: "Developer tool for generating custom JSON mock data with advanced schema options, templates, and API endpoint simulation.",
    longDescription: "JSON Gen is a comprehensive developer utility designed to simplify the creation of mock data for frontend development and testing. It offers a robust schema editor, template system, and API endpoint simulation features to help developers prototype and test applications efficiently.",
    tags: ["Developer Tool", "JSON", "React", "TypeScript", "API Mocking"],
    image: "/assets/projects/jsonge.webp",
    demoLink: "https://www.jsongen.advaitt.dev/",
    githubLink: "https://github.com/AdvaittK/json-generator",
    features: [
      "Visual schema editor for custom JSON structures",
      "Predefined templates for common data patterns",
      "Advanced type and constraint options",
      "One-click data generation with adjustable volume",
      "Simulated API endpoint creation",
      "Export options for various formats"
    ]
  }
]

/** Matches the number of projects on /projects; keep arrays in sync when adding work. */
export const portfolioProjectCount = featuredProjects.length

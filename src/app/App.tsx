import { useState, useRef, useEffect } from "react";
import { ArrowRight, Mail, Linkedin, Menu, X } from "lucide-react";
import maxqLogo from "../imports/MaxQ_Logo.jpeg";
import blHeadshot from "../imports/BLheadshot.jpg";
import { motion, useInView } from "motion/react";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

const NAV = ["About", "Expertise", "Services", "Workshops", "Contact"];

const credentials = [
  {
    company: "OnPoint",
    stat: "+140%",
    statLabel: "YOY Operating Profit",
    detail: "Scaled SOCOM capabilities for 160+ staff across markets",
  },
  {
    company: "TikTok",
    stat: "+USD 250M/Q",
    statLabel: "Ad Sales Handled",
    detail: "6× SEA markets · Trading Deals valued >USD 1B",
  },
  {
    company: "Criteo",
    stat: "+USD 6M",
    statLabel: "New Business / Annum",
    detail: "Enterprise programmatic & retail media acquisition",
  },
  {
    company: "Sojern",
    stat: "100+",
    statLabel: "Customers Scaled",
    detail: "1st APAC hire · built and led a team of 50+",
  },
];

const expertise = [
  {
    title: "Social Commerce",
    items: [
      "Ecommerce Set Up & Strategy",
      "Livestream Set Up & Scale",
      "Affiliate & Influencer Strategy",
      "Full Funnel Media (off and online)",
      "Video (Professional & AIGC)",
      "Performance Media & D2C",
      "Media Measurement",
      "Attribution Analysis",
      "AI Agents & Automation",
    ],
  },
  {
    title: "Retail Media",
    items: [
      "D2C Site Set Up & Strategy",
      "Retail Media Networks",
      "D2C Pixel Set Up",
      "Attribution Analysis",
      "Customer Experience",
      "Programmatic Display & Retargeting",
      "AI Agents & Automation",
    ],
  },
  {
    title: "Strategic Pulses",
    items: [
      "Organisational Set Up",
      "Core Competency Mapping",
      "Competitive Oversight",
      "Platform Strategy",
      "Product Roadmap",
      "Ecosystem Benchmarks",
      "Growth Frameworks",
      "Analytics & TTMS Diagnostics",
      "AI Readiness & Builds",
    ],
  },
];

const advisoryIncludes = [
  "Monthly Leadership Session (1hr/week)",
  "Monthly Reviews (1hr/week)",
  "Async Advisory Support",
  "Select Leaders Coaching (1hr/week)",
  "Commercial Guidance (1hr/month)",
  "Ecosystem Introductions",
  "Leadership Sounding Board",
];

const fractionalRoles = [
  "Fractional GM SEA",
  "Fractional CMO",
  "Interim Commercial Leader",
  "Regional Partnerships Leader",
];

const consultancyProjects = [
  {
    name: "Social Commerce Set Up / Transformation",
    price: "From USD 15k",
    deliverables: ["Operating Model Assessment", "Capability Roadmap", "Monetization Strategy", "Org Chart & Set Up"],
  },
  {
    name: "SEA Market Expansion & Advisory",
    price: "From USD 20k",
    deliverables: ["Market Readiness Report", "Ecosystem Mapping", "Partnership Strategy", "Commercial Go to Market"],
  },
  {
    name: "Investor / PE / VC Advisory",
    price: "Enquire",
    deliverables: ["Diligence Support", "Market Validation", "Ecosystem Insight", "Founder Assessment", "Commerce Platform Landscape"],
  },
];

const workshopTopics = [
  "Future of Social Commerce in APAC/SEA",
  "Creator Economy Monetisation",
  "Live Commerce Operating Models",
  "Agency Transformation Process",
  "AI and Commerce Convergence & Builds",
  "Enterprise Brands & Category Insights in SEA",
];

const workshopRates = [
  { format: "Internal Leadership Session", rate: "USD 4K" },
  { format: "Executive Workshop", rate: "USD 7K–10K" },
  { format: "Conference Representation", rate: "On Request" },
];

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Favicon
    const link: HTMLLinkElement = document.querySelector("link[rel~='icon']") || document.createElement("link");
    link.rel = "icon";
    link.href = maxqLogo;
    document.head.appendChild(link);

    // Page title
    document.title = "MaxQ Digital · Strategic Advisory";

    // Open Graph meta tags
    const ogTags: Record<string, string> = {
      "og:type": "website",
      "og:title": "MaxQ Digital · Strategic Advisory",
      "og:description": "18+ years at the intersection of culture, commerce and technology across Southeast Asia. Strategic advisory, fractional C-level leadership and consultancy for businesses navigating digital growth.",
      "og:image": blHeadshot,
      "og:url": window.location.href,
      "twitter:card": "summary_large_image",
      "twitter:title": "MaxQ Digital · Strategic Advisory",
      "twitter:description": "Strategic advisory for businesses navigating digital commerce, retail media and social commerce across APAC.",
      "twitter:image": blHeadshot,
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      const attr = property.startsWith("twitter:") ? "name" : "property";
      let tag = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    });
  }, []);

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const ids = ["about", "expertise", "services", "workshops", "contact"];
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div className="bg-background text-foreground min-h-screen" style={{ fontFamily: "var(--font-body)" }}>

      {/* ── NAV ── */}
      <nav
        className="relative z-10 transition-all duration-500"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5"
          >
            <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "var(--primary)" }}>
              {/* Sweeping cursive arc */}
              <path
                d="M1 18 C3 18, 6 16, 9 12 C12 8, 16 3, 22 1"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
              {/* Elegant open arrowhead */}
              <path
                d="M16 1.5 C18 1, 20.5 1, 22 1 C22 3, 21.5 5, 21 7"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <span className="text-sm tracking-[0.18em] uppercase text-foreground" style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}>
              MaxQ
            </span>
            <span className="text-sm tracking-[0.12em] uppercase text-muted-foreground">Digital</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV.slice(0, -1).map((link) => {
              const isActive = activeSection === link.toLowerCase();
              return (
                <button
                  key={link}
                  onClick={() => scrollTo(link.toLowerCase())}
                  className="relative text-[11px] tracking-[0.16em] uppercase transition-colors duration-200 pb-0.5"
                  style={{ color: isActive ? "var(--primary)" : "var(--muted-foreground)" }}
                >
                  {link}
                  <span
                    className="absolute bottom-0 left-0 h-px bg-primary transition-all duration-300"
                    style={{ width: isActive ? "100%" : "0%" }}
                  />
                </button>
              );
            })}
            <button
              onClick={() => scrollTo("contact")}
              className="text-[11px] tracking-[0.16em] uppercase px-5 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              Get in Touch
            </button>
          </div>

          <button className="md:hidden text-foreground p-1" onClick={() => setMobileOpen((v) => !v)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-6 flex flex-col gap-5">
            {NAV.map((link) => {
              const isActive = activeSection === link.toLowerCase();
              return (
                <button
                  key={link}
                  onClick={() => scrollTo(link.toLowerCase())}
                  className="text-xs tracking-[0.14em] uppercase text-left transition-colors flex items-center gap-2"
                  style={{ color: isActive ? "var(--primary)" : "var(--muted-foreground)" }}
                >
                  {isActive && <span className="w-3 h-px bg-primary" />}
                  {link}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 pt-20 md:pt-28 overflow-hidden">
        {/* Watermark */}
        <div
          className="absolute right-[-2rem] bottom-8 text-[12rem] md:text-[22rem] leading-none select-none pointer-events-none font-light"
          style={{ fontFamily: "var(--font-display)", color: "rgba(201,168,108,0.045)" }}
          aria-hidden
        >
          18+
        </div>
        {/* Subtle grid lines */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0"
              style={{ top: `${(i + 1) * 8.33}%`, height: "1px", background: "var(--border)", opacity: 0.4 }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto w-full">
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-px bg-primary" />
            <span className="text-[10px] tracking-[0.28em] uppercase text-primary">Strategic Advisory · Southeast Asia</span>
          </div>

          {/* Heading row: text left, logo right */}
          <div className="flex items-center justify-between gap-6 md:gap-8 mb-10 md:mb-12">
            <h1
              className="text-[clamp(2.6rem,7vw,6.5rem)] font-light leading-[0.92] flex-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Strategic Advisory
              <br />
              <span style={{ color: "var(--primary)" }}>for APAC's</span>
              <br />
              Digital Economy
            </h1>

            {/* Logo */}
            <div
              className="overflow-hidden shrink-0 hidden md:block"
              style={{ height: "17.5rem", background: "var(--background)", marginRight: "4rem" }}
            >
              <img
                src={maxqLogo}
                alt="MaxQ Digital logo"
                style={{
                  height: "21.5rem",
                  width: "auto",
                  display: "block",
                  filter: "invert(1) sepia(0.35) saturate(1.5) hue-rotate(5deg)",
                  mixBlendMode: "lighten",
                }}
              />
            </div>
          </div>

          {/* Name, photo & bio */}
          <div className="flex items-start gap-5 mb-14">
            {/* Gold bar — stretches full height of content */}
            <div className="w-px bg-primary shrink-0 self-stretch" />
            <div className="flex flex-col gap-6 max-w-2xl">
              {/* Photo + name row */}
              <div className="flex items-center gap-4">
                <img
                  src={blHeadshot}
                  alt="Bianca T. Loo"
                  className="shrink-0 h-[5.5rem] w-[4rem] md:h-[7.15rem] md:w-[5.2rem]"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center top",
                    borderRadius: "2px",
                    border: "1px solid #4a5568",
                    filter: "grayscale(0.1) brightness(0.88)",
                  }}
                />
                <div>
                  <p className="text-xl font-light text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                    Bianca T. Loo
                  </p>
                  <p className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground mt-1.5">
                    Principal · APAC Digital Media & Tech Sales
                  </p>
                  <p className="text-[11px] tracking-[0.12em] uppercase text-muted-foreground mt-1">
                    C-Executive Leadership · Client – Agency – Platform – Enabler
                  </p>
                </div>
              </div>

              {/* Personal bio */}
              <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                With 18 years at the intersection of culture, commerce and social content — thick in the heart of the SEA region — I have come to realise winning in social commerce and retail has a lot to do with three things: knowledge of tech and media solutions, understanding the heartbeat of culture and creators, and the integrative prowess to structure a brand and agency strategy that designs for dynamism, discipline and impactful breakthroughs.
              </p>

              {/* MaxQ stanza */}
              <div className="space-y-3 pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                  <span className="text-primary font-medium">'Max Q'</span> is the moment during ascent when the launch rocket experiences maximum dynamic pressure — the point where aerodynamic forces (air density × velocity) place the greatest stress on the vehicle, threatening implosion.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                  It's the phase where margins matter most, speed is throttled back a little, and decisions must be precise.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed text-justify">
                  As a metaphor, <span className="text-foreground">MaxQ Digital</span> aims to help businesses navigate the intersection of culture, commerce and technology, understand the advent in AI, automation and emerging products, and identify strategic pathways for success.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-14">
            <div className="w-10 h-px bg-primary opacity-40" />
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Stats row */}
          <FadeUp delay={0.2}>
          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-y-8 md:gap-y-0 mb-14">
            {[
              { value: "18+", label: "Yrs APAC Experience" },
              { value: "6×", label: "SEA Markets" },
              { value: "USD 250M", label: "Ad Sales / Quarter" },
              { value: "C-Suite", label: "Leadership Roles" },
            ].map((stat, i) => (
              <div
                key={i}
                className="pr-8 md:pr-10 border-r border-border last:border-0 md:last:border-0 even:border-0 md:even:border-r"
                style={{ paddingLeft: i === 0 ? 0 : undefined }}
              >
                <p
                  className="text-3xl font-light text-primary"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {stat.value}
                </p>
                <p className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          </FadeUp>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => scrollTo("services")}
              className="flex items-center gap-2.5 bg-primary text-primary-foreground px-8 py-3 text-[11px] tracking-[0.14em] uppercase hover:bg-accent transition-all duration-200 font-medium"
            >
              View Services <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="text-[11px] tracking-[0.14em] uppercase text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              Get in Touch →
            </button>
          </div>
        </div>
      </section>

      {/* ── TRACK RECORD ── */}
      <section id="about" className="py-16 md:py-24 px-6 md:px-12 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <SectionLabel label="Track Record" />
          <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border mt-12">
            {credentials.map((c) => (
              <div
                key={c.company}
                className="bg-background hover:bg-card transition-colors duration-300 p-6 md:p-10 flex flex-col"
              >
                <p className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-6">
                  {c.company}
                </p>
                <p
                  className="text-[3.5rem] font-light leading-none text-primary mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {c.stat}
                </p>
                <p className="text-sm text-foreground mb-3 font-light">{c.statLabel}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.detail}</p>
              </div>
            ))}
          </div>
          </FadeUp>
        </div>
      </section>

      {/* ── EXPERTISE ── */}
      <section id="expertise" className="py-16 md:py-24 px-6 md:px-12 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto">
          <SectionLabel label="Core Competencies" />
          <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mt-12">
            {expertise.map((col, i) => (
              <div key={col.title} className="bg-card p-6 md:p-10">
                <div
                  className="h-[2px] mb-8"
                  style={{
                    width: "2.5rem",
                    background: "var(--primary)",
                    opacity: 1 - i * 0.22,
                  }}
                />
                <h3
                  className="text-xl font-light mb-8 text-foreground"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="text-primary shrink-0 leading-snug">—</span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          </FadeUp>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-16 md:py-24 px-6 md:px-12 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <SectionLabel label="Engagement Models" />
          <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border mt-12">

            {/* Monthly Advisory */}
            <div className="bg-background p-6 md:p-10 flex flex-col">
              <span className="text-[10px] tracking-[0.22em] uppercase text-primary mb-5">Retainer</span>
              <h3
                className="text-2xl font-light mb-4 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Monthly Strategic Advisory
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-8">
                For SG/HQ companies requiring ongoing strategic guidance and senior executive counsel.
              </p>
              <p className="text-[10px] tracking-[0.16em] uppercase text-muted-foreground mb-4">Includes</p>
              <ul className="space-y-2 flex-1">
                {advisoryIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <span className="text-primary shrink-0 mt-0.5">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-border space-y-3">
                {[
                  { tier: "Tier A", note: "Strategy & Scope" },
                  { tier: "Tier B", note: "Full Advisory +\nGo to Market" },
                ].map((p) => (
                  <div key={p.tier} className="flex items-baseline justify-between">
                    <span className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground" style={{ whiteSpace: "pre-line" }}>
                      {p.tier} · {p.note}
                    </span>
                    <span className="text-sm text-primary font-medium">Upon Request</span>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollTo("contact")} className="mt-6 text-[10px] tracking-[0.16em] uppercase text-primary hover:text-accent transition-colors flex items-center gap-1.5">
                Enquire <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Fractional C-level */}
            <div className="bg-background p-6 md:p-10 flex flex-col relative">
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: "var(--primary)" }}
              />
              <span className="text-[10px] tracking-[0.22em] uppercase text-primary mb-5">Embedded</span>
              <h3
                className="text-2xl font-light mb-4 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Fractional C-level Leadership
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-8">
                For overseas organisations wanting deeper engagement and executive leadership involvement.
              </p>
              <p className="text-[10px] tracking-[0.16em] uppercase text-muted-foreground mb-4">Example Roles</p>
              <ul className="space-y-2 flex-1">
                {fractionalRoles.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <span className="text-primary shrink-0 mt-0.5">›</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[10px] text-muted-foreground mt-4 italic">SG-based or travel paid</p>
              <div className="mt-8 pt-6 border-t border-border space-y-3">
                {["2 days / month", "4 days / month", "8 days / month"].map((tier) => (
                  <div key={tier} className="flex items-baseline justify-between">
                    <span className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground">{tier}</span>
                    <span className="text-sm text-primary font-medium">Upon Request</span>
                  </div>
                ))}
                <p className="text-[10px] text-muted-foreground italic pt-1">
                  + Bonus upside on KPI attainment
                </p>
              </div>
              <button onClick={() => scrollTo("contact")} className="mt-6 text-[10px] tracking-[0.16em] uppercase text-primary hover:text-accent transition-colors flex items-center gap-1.5">
                Enquire <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Strategic Consultancy */}
            <div className="bg-background p-6 md:p-10 flex flex-col">
              <span className="text-[10px] tracking-[0.22em] uppercase text-primary mb-5">Project-based</span>
              <h3
                className="text-2xl font-light mb-4 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Strategic Consultancy
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-8">
                Ad-hoc and time-bound engagements anchored to clear commercial outcomes.
              </p>
              <div className="space-y-6 flex-1">
                {consultancyProjects.map((p) => (
                  <div key={p.name} className="border-l border-primary pl-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="text-xs text-foreground font-medium leading-snug">{p.name}</p>
                      <span className="text-xs text-primary shrink-0 font-medium">Enquire</span>
                    </div>
                    <ul className="space-y-1">
                      {p.deliverables.map((d) => (
                        <li key={d} className="text-[11px] text-muted-foreground">
                          · {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollTo("contact")} className="mt-6 text-[10px] tracking-[0.16em] uppercase text-primary hover:text-accent transition-colors flex items-center gap-1.5">
                Enquire <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
          </FadeUp>
        </div>
      </section>

      {/* ── WORKSHOPS ── */}
      <section id="workshops" className="py-16 md:py-24 px-6 md:px-12 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto">
          <SectionLabel label="Workshops & Advisory Sessions" />
          <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
            <div>
              <h3
                className="text-3xl font-light mb-4 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Leadership Sessions & Executive Workshops
              </h3>
              <p className="text-sm text-muted-foreground mb-10 leading-relaxed max-w-lg">
                Bespoke workshops and 1-1 advisory sessions on the most pressing topics shaping digital commerce across APAC/SEA.
              </p>
              <div>
                {workshopTopics.map((topic, i) => (
                  <div
                    key={topic}
                    className="flex items-start gap-5 py-4 border-b border-border last:border-0 group"
                  >
                    <span className="text-[10px] text-primary/40 font-mono mt-0.5 shrink-0 w-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-200 leading-snug">
                      {topic}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <p className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-4">
                  Additional Scope
                </p>
                <ul className="space-y-2">
                  {[
                    { label: "Buy-side to sell-side matching", note: "Finders Fee — Enquire" },
                    { label: "Client / Brand to Agency Introductory", note: "Match Fee — Enquire" },
                    { label: "Agency to Agency Introductory", note: "Match Fee — Enquire" },
                  ].map((item) => (
                    <li key={item.label} className="text-xs text-muted-foreground flex items-start justify-between gap-4">
                      <span className="flex items-start gap-2">
                        <span className="text-primary shrink-0">›</span>
                        <span>{item.label}</span>
                      </span>
                      <span className="text-primary shrink-0 text-[10px] tracking-[0.08em]">{item.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="border border-border p-5 md:p-8">
                <p className="text-[10px] tracking-[0.22em] uppercase text-primary mb-6">Session Rates</p>
                <div>
                  {workshopRates.map((r) => (
                    <div
                      key={r.format}
                      className="flex items-center justify-between py-5 border-b border-border last:border-0"
                    >
                      <p className="text-sm text-foreground font-light">{r.format}</p>
                      <span
                        className="text-sm font-light text-primary"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Enquire
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => scrollTo("contact")}
                  className="mt-6 text-[10px] tracking-[0.16em] uppercase text-primary hover:text-accent transition-colors flex items-center gap-1.5"
                >
                  Enquire <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="bg-secondary p-5 md:p-8">
                <p className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-5">Profile</p>
                <div className="space-y-3">
                  {[
                    "Client – Agency – Platform – Enabler expertise",
                    "Singapore-based · available for regional travel",
                    "Full funnel: Social Commerce, Retail Media, E-commerce, Programmatic",
                    "Active across TikTok, Meta, Google, DTC, and emerging platforms",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-xs text-muted-foreground">
                      <span className="text-primary shrink-0 mt-0.5">·</span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-16 md:py-32 px-6 md:px-12 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left — copy + links */}
            <div>
              <div className="flex items-center gap-4 mb-12">
                <div className="w-10 h-px bg-primary" />
                <span className="text-[10px] tracking-[0.28em] uppercase text-primary">Start a Conversation</span>
              </div>
              <h2
                className="font-light leading-[0.92] mb-10"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,4.5vw,4rem)" }}
              >
                Turn ambition into
                <br />
                <span style={{ color: "var(--primary)" }}>measurable progress.</span>
              </h2>
              <div className="space-y-4 mb-14">
                {[
                  "Move from possibility to performance.",
                  "Let's shape the next stage of your growth.",
                  "Discover how the right guidance can take your business further.",
                  "Bring clarity to your next move — and confidence to what comes after.",
                  "Partner with us to unlock sharper strategy, stronger execution, and lasting growth.",
                ].map((line, i) => (
                  <p key={i} className="text-sm leading-relaxed" style={{ color: i === 0 ? "var(--foreground)" : "var(--muted-foreground)" }}>
                    {line}
                  </p>
                ))}
              </div>
              <p className="text-[10px] tracking-[0.24em] uppercase text-muted-foreground mb-4">Contact</p>
              <div className="flex flex-col gap-4">
                <a href="mailto:bianca.loo@icloud.com" className="inline-flex items-center gap-4 group">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-lg font-light text-foreground group-hover:text-primary transition-colors duration-200" style={{ fontFamily: "var(--font-display)" }}>
                    bianca.loo@icloud.com
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </a>
                <a href="https://www.linkedin.com/in/bianca-l-9b337620/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 group">
                  <Linkedin className="w-5 h-5 text-primary" />
                  <span className="text-lg font-light text-foreground group-hover:text-primary transition-colors duration-200" style={{ fontFamily: "var(--font-display)" }}>
                    LinkedIn
                  </span>
                  <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </a>
              </div>
            </div>

            {/* Right — contact form */}
            <ContactForm />
          </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 md:px-12 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">MaxQ Digital</span>
          <div className="flex flex-wrap items-center gap-6">
            <a href="mailto:bianca.loo@icloud.com" className="text-[10px] tracking-[0.08em] text-muted-foreground hover:text-primary transition-colors duration-200">
              bianca.loo@icloud.com
            </a>
            <a href="https://www.linkedin.com/in/bianca-l-9b337620/" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.08em] text-muted-foreground hover:text-primary transition-colors duration-200">
              LinkedIn
            </a>
            <p className="text-[10px] tracking-[0.08em] text-muted-foreground">
              © 2026 Bianca T. Loo · All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ── BACK TO TOP ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 transition-all duration-300"
        style={{
          opacity: showTop ? 1 : 0,
          pointerEvents: showTop ? "auto" : "none",
          transform: showTop ? "translateY(0)" : "translateY(8px)",
          width: "2.5rem",
          height: "2.5rem",
          border: "1px solid var(--primary)",
          background: "var(--background)",
          color: "var(--primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 12V2M2 7l5-5 5 5" />
        </svg>
      </button>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", organisation: "", industry: "", query: "", contact: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.organisation.trim()) e.organisation = "Required";
    if (!form.industry.trim()) e.industry = "Required";
    if (!form.contact.trim()) e.contact = "Required";
    if (!form.query.trim()) e.query = "Required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const subject = encodeURIComponent(`Enquiry from ${form.name} — ${form.organisation}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nOrganisation: ${form.organisation}\nIndustry: ${form.industry}\nContact Details: ${form.contact}\n\nQuery:\n${form.query}`
    );
    window.location.href = `mailto:bianca.loo@icloud.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const baseField = "w-full bg-transparent border-b text-sm text-foreground placeholder:text-muted-foreground/40 py-3 focus:outline-none transition-colors duration-200";

  const fieldClass = (key: string) =>
    `${baseField} ${errors[key] ? "border-red-500/60" : "border-border focus:border-primary"}`;

  const update = (key: string, val: string) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => { const n = { ...e }; delete n[key]; return n; });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <p className="text-[10px] tracking-[0.24em] uppercase text-muted-foreground mb-2">Send an Enquiry</p>
      {[
        { key: "name", label: "Name", type: "text", placeholder: "Your full name" },
        { key: "organisation", label: "Organisation", type: "text", placeholder: "Company or brand" },
        { key: "industry", label: "Industry", type: "text", placeholder: "e.g. Retail, Tech, FMCG" },
        { key: "contact", label: "Contact Details", type: "text", placeholder: "Email or phone number" },
      ].map(({ key, label, type, placeholder }) => (
        <div key={key}>
          <div className="flex items-baseline justify-between mb-1">
            <label className="text-[10px] tracking-[0.16em] uppercase text-muted-foreground">{label}</label>
            {errors[key] && <span className="text-[10px] text-red-400 tracking-wide">{errors[key]}</span>}
          </div>
          <input
            type={type}
            placeholder={placeholder}
            value={form[key as keyof typeof form]}
            onChange={e => update(key, e.target.value)}
            className={fieldClass(key)}
          />
        </div>
      ))}
      <div>
        <div className="flex items-baseline justify-between mb-1">
          <label className="text-[10px] tracking-[0.16em] uppercase text-muted-foreground">Query</label>
          {errors.query && <span className="text-[10px] text-red-400 tracking-wide">{errors.query}</span>}
        </div>
        <textarea
          rows={4}
          placeholder="How can I help you?"
          value={form.query}
          onChange={e => update("query", e.target.value)}
          className={`${fieldClass("query")} resize-none`}
        />
      </div>
      <button
        type="submit"
        className="mt-2 self-start flex items-center gap-3 bg-primary text-primary-foreground px-8 py-3 text-[11px] tracking-[0.14em] uppercase hover:bg-accent transition-all duration-200 font-medium"
      >
        {sent ? "Opening your email client…" : "Send"} <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </form>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[10px] tracking-[0.24em] uppercase text-primary whitespace-nowrap">{label}</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

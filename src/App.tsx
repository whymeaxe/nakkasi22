import { useEffect, useId, useState, type ReactNode } from "react";

type IconProps = { className?: string };

const ArrowUpRight = ({ className = "" }: IconProps) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = ({ className = "" }: IconProps) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDown = ({ className = "" }: IconProps) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MenuIcon = ({ className = "" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CloseIcon = ({ className = "" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Star = ({ className = "" }: IconProps) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="m10 2.5 2.32 4.7 5.18.75-3.75 3.65.89 5.16L10 14.32l-4.64 2.44.89-5.16L2.5 7.95l5.18-.75L10 2.5Z" />
  </svg>
);

const Leaf = ({ className = "" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M19.5 4.5c-6.9.2-11.1 2.2-12.7 6-1.1 2.7.1 5.1 2.9 5.8 3.5.9 7-1.4 8.3-4.9 1-2.5 1.5-4.7 1.5-6.9Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M4.5 20c2.3-4.6 5.7-7.1 10.1-7.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const Ruler = ({ className = "" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="m4.5 15.5 11-11a2 2 0 0 1 2.8 0l1.2 1.2a2 2 0 0 1 0 2.8l-11 11a2 2 0 0 1-2.8 0l-1.2-1.2a2 2 0 0 1 0-2.8Z" stroke="currentColor" strokeWidth="1.4" />
    <path d="m13 7 4 4M10.2 9.8l2 2M7.4 12.6l2 2M4.6 15.4l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const Hand = ({ className = "" }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M7.7 11.2V6.5a1.3 1.3 0 0 1 2.6 0v4.1-5.9a1.3 1.3 0 1 1 2.6 0v5.4-4.6a1.3 1.3 0 1 1 2.6 0v5-3.1a1.3 1.3 0 1 1 2.6 0v6.1c0 4-2.1 6.1-5.8 6.1h-.8c-2.1 0-3.2-.7-4.5-2.4l-2.1-2.8a1.4 1.4 0 0 1 2.2-1.7l.6.6v-2Z" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Check = ({ className = "" }: IconProps) => (
  <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="m4 10.5 3.7 3.7L16 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Logo = ({ light = false }: { light?: boolean }) => (
  <a href="#home" className={`logo-mark ${light ? "text-[#f4f1e9]" : "text-[#25271e]"}`} aria-label="Nakkasi home">
    <span className="logo-symbol" aria-hidden="true"><span /><span /><span /></span>
    <span className="logo-word">nakkasi</span>
  </a>
);

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [visible, setVisible] = useState(false);
  const targetId = useId().replace(/:/g, "");

  useEffect(() => {
    const current = document.getElementById(targetId);
    if (!current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(current);
    return () => observer.disconnect();
  }, [targetId]);

  return <div id={targetId} className={`reveal-target ${visible ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const products = [
  { name: "The Savo Chair", category: "Seating / Oak + saddle leather", price: "From $1,850", image: "https://images.pexels.com/photos/18163083/pexels-photo-18163083.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800", alt: "Close-up of a sculptural wooden chair" },
  { name: "The Taro Table", category: "Dining / American walnut", price: "From $4,900", image: "https://images.pexels.com/photos/8082211/pexels-photo-8082211.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200", alt: "Warm modern dining room with a wood table" },
  { name: "The Nami Credenza", category: "Storage / Fumed oak", price: "From $3,600", image: "https://images.pexels.com/photos/7195582/pexels-photo-7195582.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200", alt: "Elegant wooden credenza in a modern home" },
];

const faqs = [
  { question: "How does made-to-order work?", answer: "Choose a design, select your preferred timber and finish, then we begin making it especially for you. You will receive a material sample and a personal progress update before your piece leaves our studio." },
  { question: "How long will my piece take?", answer: "Most pieces are ready to ship in 8 to 12 weeks. Larger custom commissions take 12 to 18 weeks, and we will give you an exact timeline before you place your order." },
  { question: "Can I customize the size or finish?", answer: "Yes. We make small adjustments to dimensions, timber, edge profiles and finish for every collection. For completely bespoke work, our studio team will guide the design from first sketch to final polish." },
  { question: "Do you ship internationally?", answer: "We deliver throughout the US and to select international destinations. Every piece is blanket-wrapped, insured and delivered by a specialist white-glove partner." },
  { question: "What makes Nakkasi different?", answer: "We keep the chain short: one small studio, a handful of trusted makers and materials chosen for how they will age. The result is furniture with fewer compromises and a much longer life." },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen overflow-hidden bg-[#f4f1e9] text-[#25271e]">
      <header className="nav-shell fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Logo light />
          <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.18em] text-white/80 lg:flex" aria-label="Primary navigation"><a className="nav-link" href="#collection">Collection</a><a className="nav-link" href="#story">Our story</a><a className="nav-link" href="#journal">Journal</a><a className="nav-link" href="#faq">FAQ</a></nav>
          <div className="hidden items-center gap-5 lg:flex"><a href="#contact" className="text-[11px] uppercase tracking-[0.18em] text-white/80 transition hover:text-white">Visit the studio</a><a href="#collection" className="nav-cta">Explore pieces <ArrowUpRight className="h-3.5 w-3.5" /></a></div>
          <button type="button" className="flex h-11 w-11 items-center justify-center text-white lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}</button>
        </div>
        {menuOpen && <nav className="mobile-menu border-t border-white/15 px-6 pb-7 pt-5 text-white lg:hidden" aria-label="Mobile navigation"><a onClick={closeMenu} href="#collection">Collection <ArrowUpRight className="h-4 w-4" /></a><a onClick={closeMenu} href="#story">Our story <ArrowUpRight className="h-4 w-4" /></a><a onClick={closeMenu} href="#journal">Journal <ArrowUpRight className="h-4 w-4" /></a><a onClick={closeMenu} href="#faq">FAQ <ArrowUpRight className="h-4 w-4" /></a></nav>}
      </header>

      <main>
        <section id="home" className="hero-section relative isolate flex min-h-[760px] items-end overflow-hidden bg-[#303329] text-[#f7f3eb] sm:min-h-[830px] lg:min-h-[880px]">
          <img className="absolute inset-0 -z-20 h-full w-full object-cover object-[64%_center]" src="https://images.pexels.com/photos/7045765/pexels-photo-7045765.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1600&w=2200" alt="A calm, refined living room with warm wooden furniture" />
          <div className="hero-overlay absolute inset-0 -z-10" /><div className="hero-glow absolute -right-24 top-28 -z-10 h-80 w-80 rounded-full bg-[#d7774a]/25 blur-3xl" />
          <div className="mx-auto w-full max-w-[1440px] px-5 pb-14 pt-44 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24"><div className="max-w-[750px]">
            <Reveal delay={40}><p className="eyebrow mb-7 text-[#e5b69c]">Handcrafted furniture / Est. 2014</p></Reveal>
            <Reveal delay={130}><h1 className="max-w-[730px] text-[clamp(4.5rem,12vw,10.8rem)] leading-[0.78] tracking-[-0.08em] text-[#f7f3eb]"><span className="font-display italic">Nakkasi</span><br /><span className="font-sans text-[0.57em] font-light tracking-[-0.055em]">objects for a<br className="sm:hidden" /> life well lived.</span></h1></Reveal>
            <Reveal delay={220}><div className="mt-10 flex flex-col items-start gap-7 sm:flex-row sm:items-center"><p className="max-w-[300px] text-sm leading-6 text-white/75 sm:max-w-[320px]">Quietly considered pieces, made by hand in our Brooklyn studio and designed to become part of your story.</p><a href="#collection" className="button button-light group">Shop the collection <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></a></div></Reveal>
          </div><div className="mt-20 flex items-center justify-between border-t border-white/25 pt-4 text-[10px] uppercase tracking-[0.2em] text-white/60 sm:mt-28"><span>New York / Made slowly</span><a href="#collection" className="hidden items-center gap-2 transition hover:text-white sm:flex">Scroll to explore <span className="scroll-line" /></a><span className="sm:hidden">Scroll to explore</span></div></div>
        </section>

        <section className="border-b border-[#25271e]/15 bg-[#e9e4d9]" aria-label="As featured in"><div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-7 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12"><p className="eyebrow text-[#7d806d]">As seen in</p><div className="flex flex-wrap items-center gap-x-7 gap-y-4 text-[#5f6253] sm:gap-x-11"><span className="featured-word font-serif text-xl italic">domino</span><span className="featured-word text-[12px] font-semibold tracking-[0.12em]">ARCHITECTURAL DIGEST</span><span className="featured-word text-xl tracking-[-0.05em]">goop</span><span className="featured-word font-serif text-lg italic">Kinfolk</span><span className="featured-word text-[11px] font-semibold tracking-[0.16em]">D E Z E E N</span></div></div></section>

        <section id="story" className="relative bg-[#f4f1e9] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40"><div className="mx-auto max-w-[1440px]"><div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24"><Reveal className="lg:pt-4"><p className="eyebrow text-[#d26f45]">The Nakkasi approach</p><h2 className="mt-6 max-w-[360px] font-display text-5xl leading-[0.98] tracking-[-0.06em] text-[#25271e] sm:text-6xl">Good design should feel inevitable.</h2></Reveal><Reveal delay={120}><p className="max-w-[780px] text-[clamp(1.55rem,3vw,2.7rem)] font-light leading-[1.15] tracking-[-0.045em] text-[#45483b]">We make the pieces you notice every day, then keep noticing for years. No excess. No shortcuts. Just honest materials, generous proportions and the small human marks that make a thing yours.</p><a href="#journal" className="arrow-link mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.18em]">Read our story <ArrowRight className="h-4 w-4" /></a></Reveal></div><div className="mt-20 grid border-t border-[#25271e]/20 sm:grid-cols-3 sm:mt-32">{[{ icon: <Leaf className="h-6 w-6" />, number: "01", title: "Materials with a future", body: "Solid timber, vegetable-tanned leather and natural oils selected to patina beautifully." }, { icon: <Hand className="h-6 w-6" />, number: "02", title: "Made by real hands", body: "Small-batch production in our Brooklyn studio, never rushed and never anonymous." }, { icon: <Ruler className="h-6 w-6" />, number: "03", title: "Considered to the inch", body: "Proportions tuned for the way you live, with custom sizing available on every design." }].map((item, index) => <Reveal key={item.number} delay={index * 100} className="border-b border-[#25271e]/20 py-8 sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0 lg:py-10"><div className="flex items-center justify-between text-[#d26f45]"><span>{item.icon}</span><span className="text-[10px] tracking-[0.2em] text-[#888a7b]">{item.number}</span></div><h3 className="mt-8 text-lg tracking-[-0.02em]">{item.title}</h3><p className="mt-3 max-w-[300px] text-sm leading-6 text-[#6f7264]">{item.body}</p></Reveal>)}</div></div></section>

        <section id="collection" className="bg-[#25271e] px-5 py-24 text-[#f4f1e9] sm:px-8 sm:py-32 lg:px-12 lg:py-40"><div className="mx-auto max-w-[1440px]"><div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end"><Reveal><p className="eyebrow text-[#dca184]">The current collection</p><h2 className="mt-5 max-w-[610px] font-display text-5xl leading-[0.94] tracking-[-0.06em] sm:text-7xl">Pieces with a quiet presence.</h2></Reveal><Reveal delay={120} className="sm:pb-2"><a href="#investment" className="arrow-link arrow-link-light inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.18em]">View all pieces <ArrowUpRight className="h-4 w-4" /></a></Reveal></div><div className="mt-14 grid gap-x-5 gap-y-14 md:grid-cols-3 lg:mt-20">{products.map((product, index) => <Reveal key={product.name} delay={index * 120} className={index === 1 ? "md:mt-16" : ""}><a href="#contact" className="product-item group block"><div className="product-image-wrap overflow-hidden bg-[#3b3d31]"><img src={product.image} alt={product.alt} className="h-[390px] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045] sm:h-[480px]" /><span className="product-arrow"><ArrowUpRight className="h-5 w-5" /></span></div><div className="mt-5 flex items-start justify-between gap-4"><div><h3 className="text-xl tracking-[-0.03em]">{product.name}</h3><p className="mt-2 text-[10px] uppercase tracking-[0.17em] text-white/45">{product.category}</p></div><p className="pt-1 text-xs text-[#dca184]">{product.price}</p></div></a></Reveal>)}</div></div></section>

        <section className="bg-[#d9ddd0] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40"><div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-24"><Reveal><div className="image-frame overflow-hidden"><img src="https://images.pexels.com/photos/11363693/pexels-photo-11363693.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1300&w=900" alt="Detailed wooden chair beside a table and greenery" className="h-[540px] w-full object-cover object-center transition duration-700 hover:scale-[1.025] sm:h-[680px]" /></div></Reveal><Reveal delay={120}><p className="eyebrow text-[#65705b]">Made slow, lived in deeply</p><h2 className="mt-6 max-w-[560px] font-display text-5xl leading-[0.95] tracking-[-0.06em] text-[#25271e] sm:text-7xl">A better kind of beautiful.</h2><p className="mt-7 max-w-[520px] text-base leading-7 text-[#596052]">Luxury is not about having more. It is about having the right thing, made well enough to stay with you. Nakkasi pieces are designed to gather a little history with every season.</p><div className="mt-10 space-y-5 border-t border-[#25271e]/20 pt-6">{["Heirloom-grade construction", "White-glove delivery, wherever you are", "A lifetime of studio support"].map((benefit) => <div key={benefit} className="flex items-center gap-4 text-sm text-[#3f4438]"><span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#687360]/50 text-[#d26f45]"><Check className="h-3.5 w-3.5" /></span>{benefit}</div>)}</div><a href="#contact" className="button button-dark group mt-10">Meet the makers <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></a></Reveal></div></section>

        <section id="journal" className="bg-[#f4f1e9] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40"><div className="mx-auto max-w-[1440px]"><Reveal className="mx-auto max-w-[760px] text-center"><div className="flex justify-center gap-1 text-[#d26f45]" aria-label="5 out of 5 stars"><Star className="h-4 w-4" /><Star className="h-4 w-4" /><Star className="h-4 w-4" /><Star className="h-4 w-4" /><Star className="h-4 w-4" /></div><blockquote className="mt-8 font-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.98] tracking-[-0.06em] text-[#25271e]">“The table is somehow both the quietest and most important thing in the room. Everyone asks where it is from.”</blockquote><p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-[#85897a]">Maya + Alex / Hudson Valley, NY</p></Reveal></div></section>

        <section id="investment" className="border-y border-[#25271e]/15 bg-[#e9e4d9] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40"><div className="mx-auto max-w-[1440px]"><div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24"><Reveal><p className="eyebrow text-[#d26f45]">Find your piece</p><h2 className="mt-6 max-w-[420px] font-display text-5xl leading-[0.95] tracking-[-0.06em] sm:text-6xl">An investment in how home feels.</h2><p className="mt-6 max-w-[370px] text-sm leading-6 text-[#6f7264]">Every Nakkasi design is available in a range of materials and made to order for your space.</p></Reveal><Reveal delay={120}><div className="border-t border-[#25271e]/25">{[{ title: "The essentials", detail: "Small objects and considered accents", price: "From $420" }, { title: "The collection", detail: "Signature seating, tables and storage", price: "From $1,850" }, { title: "The commission", detail: "A one-of-one piece, made together", price: "By consultation" }].map((tier, index) => <a href="#contact" key={tier.title} className="pricing-row group flex items-end justify-between gap-5 border-b border-[#25271e]/25 py-7 sm:py-9"><div className="flex items-start gap-5 sm:gap-10"><span className="pt-1 text-[10px] tracking-[0.18em] text-[#d26f45]">0{index + 1}</span><div><h3 className="text-xl tracking-[-0.03em] sm:text-2xl">{tier.title}</h3><p className="mt-2 text-sm text-[#777b6c]">{tier.detail}</p></div></div><div className="flex shrink-0 items-center gap-4"><span className="text-xs text-[#727666]">{tier.price}</span><ArrowUpRight className="h-5 w-5 text-[#d26f45] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></div></a>)}</div></Reveal></div></div></section>

        <section id="faq" className="bg-[#f4f1e9] px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40"><div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24"><Reveal><p className="eyebrow text-[#d26f45]">A little more detail</p><h2 className="mt-6 max-w-[360px] font-display text-5xl leading-[0.95] tracking-[-0.06em] sm:text-6xl">Questions, answered.</h2></Reveal><Reveal delay={120}><div className="border-t border-[#25271e]/20">{faqs.map((faq, index) => { const isOpen = openFaq === index; return <div key={faq.question} className="faq-item border-b border-[#25271e]/20"><button type="button" className="flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen}><span className="text-lg tracking-[-0.02em] text-[#303329]">{faq.question}</span><span className={`faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#25271e]/25 transition duration-300 ${isOpen ? "rotate-180 bg-[#25271e] text-[#f4f1e9]" : "text-[#25271e]"}`}><ChevronDown className="h-4 w-4" /></span></button><div className={`faq-answer grid transition-[grid-template-rows,opacity] duration-300 ${isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"}`}><p className="min-h-0 max-w-[620px] overflow-hidden pr-8 text-sm leading-6 text-[#6f7264]">{faq.answer}</p></div></div>; })}</div></Reveal></div></section>

        <section id="contact" className="cta-section relative isolate flex min-h-[650px] items-center overflow-hidden bg-[#25271e] text-[#f4f1e9] sm:min-h-[700px]"><img src="https://images.pexels.com/photos/8092433/pexels-photo-8092433.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=2200" alt="Sunlit dining space with warm wood furniture" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" /><div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#25271e]/95 via-[#25271e]/65 to-[#25271e]/20" /><div className="mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12"><Reveal><p className="eyebrow text-[#e5b69c]">Your space, considered</p><h2 className="mt-6 max-w-[700px] font-display text-6xl leading-[0.9] tracking-[-0.07em] sm:text-8xl">Make room for something beautiful.</h2><p className="mt-8 max-w-[370px] text-sm leading-6 text-white/70">Tell us what you are dreaming up. Our studio team will help you find the right piece, finish and fit.</p><a href="mailto:studio@nakkasi.com" className="button button-light group mt-9">Start a conversation <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></a></Reveal></div></section>
      </main>

      <footer className="bg-[#25271e] px-5 pb-8 pt-16 text-[#f4f1e9] sm:px-8 lg:px-12"><div className="mx-auto max-w-[1440px]"><div className="grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1fr]"><div><Logo light /><p className="mt-6 max-w-[300px] text-sm leading-6 text-white/55">Furniture for a slower, more beautiful life. Designed in Brooklyn. Made to last anywhere.</p></div><div><p className="eyebrow text-[#dca184]">Explore</p><div className="mt-5 space-y-3 text-sm text-white/65"><a className="footer-link block" href="#collection">Collection</a><a className="footer-link block" href="#story">Our story</a><a className="footer-link block" href="#journal">Journal</a></div></div><div><p className="eyebrow text-[#dca184]">Connect</p><div className="mt-5 space-y-3 text-sm text-white/65"><a className="footer-link block" href="mailto:studio@nakkasi.com">Email us</a><a className="footer-link block" href="#contact">Book a visit</a><a className="footer-link block" href="#contact">Instagram</a></div></div><div><p className="eyebrow text-[#dca184]">The Nakkasi note</p><p className="mt-5 text-sm leading-6 text-white/55">New pieces, studio notes and good things for your home. Once a month, never noisy.</p><form className="mt-5 flex border-b border-white/35 pb-3" onSubmit={(event) => event.preventDefault()}><label className="sr-only" htmlFor="email">Your email address</label><input id="email" type="email" placeholder="Your email address" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/45" required /><button aria-label="Subscribe" type="submit" className="text-[#dca184] transition hover:text-white"><ArrowRight className="h-5 w-5" /></button></form></div></div><div className="flex flex-col justify-between gap-4 pt-7 text-[10px] uppercase tracking-[0.16em] text-white/40 sm:flex-row"><p>© 2024 Nakkasi Studio</p><div className="flex gap-5"><a className="footer-link" href="#home">Privacy</a><a className="footer-link" href="#home">Terms</a><span>Made with intention</span></div></div></div></footer>
    </div>
  );
}

export default App;

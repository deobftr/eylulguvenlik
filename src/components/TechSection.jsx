import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const TECH_DATA = [
  {
    link: "#",
    text: "Çalıştığımız Firmalar",
    items: [
      { name: "", url: "/brand-audio.png" },
      { name: "", url: "/brand-hikvision.png" },
      { name: "", url: "/brand-dahua.png" },
      { name: "", url: "/brand-multitek.png" },
      { name: "", url: "/brand-nade.png" },
      { name: "", url: "/brand-visio.png" },
      { name: "", url: "/brand-makim.png" },
      { name: "", url: "/brand-unv.png" },
    ],
  },
];

const MarqueeItem = ({ link, text, items, speed, marqueeBgColor, isFirst }) => {
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);
  const [copies, setCopies] = useState(2);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const calcCopies = () => {
      if (!marqueeRef.current) return;
      const part = marqueeRef.current.querySelector(".marquee__part");
      if (part) setCopies(Math.ceil(window.innerWidth / part.offsetWidth) + 2);
    };
    calcCopies();
    window.addEventListener("resize", calcCopies);
    return () => window.removeEventListener("resize", calcCopies);
  }, [items]);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const part = marqueeRef.current.querySelector(".marquee__part");
    if (!part) return;
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        x: -part.offsetWidth,
        duration: (part.offsetWidth / 200) * speed,
        ease: "none",
        repeat: -1,
      });
    }, marqueeRef);
    return () => ctx.revert();
  }, [items, copies, speed]);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div
      className={`menu__item ${isOpen ? "is-open" : ""}`}
      ref={containerRef}
      style={{ borderTop: isFirst ? "none" : "1px solid black" }}
    >
      <a className="menu__item-link" href={link} onClick={handleToggle}>
        <span className="menu__item-text">{text}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="menu__item-arrow"
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </a>
      <div className="marquee" style={{ backgroundColor: marqueeBgColor }} onClick={handleClose}>
        <div className="marquee__inner" ref={marqueeRef}>
          {[...Array(copies)].map((_, i) => (
            <div className="marquee__part" key={i}>
              {items.map((item, j) => (
                <div className="marquee__icon-box" key={j}>
                  <img src={item.url} alt={item.name} className="marquee__icon" style={{ height: "6vh", width: "auto", objectFit: "contain" }} />
                  {item.name && <span className="marquee__text">{item.name}</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TechSection = () => (
  <section className="min-h-screen bg-white text-black font-sans flex flex-col justify-center">
    <div className="w-full px-6 md:px-12 lg:px-16 pt-24 pb-12 md:pt-12 md:pb-12 bg-white z-10 md:flex-shrink-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-5 gap-y-8"
      >
        <div className="md:col-span-1">
          <h2 className="text-xs font-bold uppercase tracking-widest">Ürünler</h2>
        </div>
        <div className="md:col-span-4">
          <blockquote className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase leading-tight">
            "Güvenlikte Teknoloji, Teknolojide Güven"
          </blockquote>
          <p className="mt-6">—Eylül Elektronik</p>
        </div>
      </motion.div>
    </div>
    <div className="w-full border-t border-black/10 py-10 overflow-hidden bg-white">
      <div className="marquee-selected-works">
        <div className="marquee-selected-works__track" style={{ gap: "4rem" }}>
          {[...Array(4)].map((_, setIdx) => (
            <div key={setIdx} className="marquee-selected-works__segment" style={{ gap: "4rem", paddingRight: "4rem" }}>
              {TECH_DATA[0].items.map((item, i) => (
                <img
                  key={`${setIdx}-${i}`}
                  src={item.url}
                  alt={item.name}
                  style={{ height: "5rem", width: "auto", objectFit: "contain", flexShrink: 0, opacity: 0.6, filter: "grayscale(100%)", transition: "all 0.4s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.filter = 'grayscale(0%)'; e.currentTarget.style.opacity = '1'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(100%)'; e.currentTarget.style.opacity = '0.6'; }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TechSection;

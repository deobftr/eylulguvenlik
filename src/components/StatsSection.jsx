import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const CameraIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#F7941D"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8"
    style={{ width: "2rem", height: "2rem" }}
    aria-hidden="true"
  >
    <path d="M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97" />
    <path d="M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z" />
    <path d="M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15" />
    <path d="M2 21v-4" />
    <circle cx="7" cy="9" r="1" fill="#F7941D" />
  </svg>
);

const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#F7941D"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8"
    style={{ width: "2rem", height: "2rem" }}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const BuildingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#F7941D"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8"
    style={{ width: "2rem", height: "2rem" }}
    aria-hidden="true"
  >
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
    <path d="M12 6h.01" />
    <path d="M12 10h.01" />
    <path d="M12 14h.01" />
    <path d="M16 10h.01" />
    <path d="M16 14h.01" />
    <path d="M8 10h.01" />
    <path d="M8 14h.01" />
  </svg>
);

const HeadsetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#F7941D"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8"
    style={{ width: "2rem", height: "2rem" }}
    aria-hidden="true"
  >
    <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
    <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
  </svg>
);

const StatCounter = ({ value, suffix, label, description, icon, index = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const animate = () => {
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / 1200, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <div ref={ref} className="flex flex-col items-start group">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.85 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="mb-5 inline-flex"
      >
        <motion.div
          animate={{ y: [0, -3.5, 0] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.4,
          }}
          whileHover={{ scale: 1.15, rotate: index % 2 === 0 ? 5 : -5 }}
          className="text-[#F7941D] cursor-default transition-all duration-300 drop-shadow-[0_2px_8px_rgba(247,148,29,0.25)] hover:drop-shadow-[0_0_14px_rgba(247,148,29,0.55)]"
          style={{ width: "2rem", height: "2rem" }}
        >
          {icon}
        </motion.div>
      </motion.div>
      <span className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-white">{label}</span>
      <h3 className="mb-6 font-sans text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none">
        {count.toLocaleString()}{suffix}
      </h3>
      <p className="max-w-sm font-sans text-base leading-6 text-white/65">{description}</p>
    </div>
  );
};

const StatsSection = () => (
  <section className="w-full bg-black text-white py-20 md:py-32 relative border-t border-[#F7941D]/20">
    <div
      className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F7941D]/40 to-transparent pointer-events-none"
      aria-hidden="true"
    />
    <div className="mx-auto max-w-7xl px-6">
      <div className="mb-12 md:mb-24">
        <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em]">Hakkımızda</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16 md:gap-y-40">
        <StatCounter
          index={0}
          icon={<CameraIcon />}
          value={10000}
          suffix="+"
          label="Kurulu Sistem"
          description="Konut, ticari alan ve sanayi tesislerinde başarıyla kurulumunu tamamladığımız kamera, alarm ve interkom altyapıları."
        />
        <StatCounter
          index={1}
          icon={<ClockIcon />}
          value={10}
          suffix="+"
          label="Yıl Tecrübe"
          description="Elektronik güvenlik ve Audio interkom sistemleri sektöründe 10 yılı aşkın uzmanlık ve güvenilir saha deneyimi."
        />
        <StatCounter
          index={2}
          icon={<BuildingIcon />}
          value={500}
          suffix="+"
          label="Kurumsal Müşteri"
          description="Ankara ve çevre illerde güvenliğini emanet eden, uzun vadeli iş ortaklığı yürüttüğümüz kurumsal çözüm ortaklarımız."
        />
        <StatCounter
          index={3}
          icon={<HeadsetIcon />}
          value={24}
          suffix="/7"
          label="Teknik Destek"
          description="7/24 kesintisiz teknik destek, periyodik sistem bakımı ve hızlı arıza müdahale hizmetiyle daima yanınızdayız."
        />
      </div>
    </div>
  </section>
);

export default StatsSection;

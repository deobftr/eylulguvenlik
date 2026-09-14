import { motion } from "framer-motion";

const CTAButton = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className="absolute md:z-30 lg:z-10 hidden md:flex items-center justify-center"
    style={{ bottom: "4rem", right: "4rem" }}
  >
    <style>{`
      @keyframes ctaSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .cta-ring { animation: ctaSpin var(--cta-spin-duration, 10s) linear infinite; transform-origin: center; }
      .cta-wrap:hover .cta-ring { --cta-spin-duration: 3s; }
      .cta-wrap { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
      .cta-wrap:hover { transform: scale(1.08); }
    `}</style>
    <a href="#contact" className="cta-wrap group relative flex items-center justify-center w-[130px] h-[130px]" aria-label="Get in touch">
      <svg viewBox="0 0 130 130" className="absolute inset-0 w-full h-full pointer-events-none">
        <circle cx="65" cy="65" r="62" fill="none" stroke="rgba(247,148,29,0.4)" strokeWidth="1.5" />
      </svg>
      <svg viewBox="0 0 130 130" className="cta-ring absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <path id="cta-circle-path" d="M65,65 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" />
        </defs>
        <text fill="#F7941D" fontSize="8.5" fontFamily="'Inter', sans-serif" fontWeight="900" letterSpacing="4">
          <textPath href="#cta-circle-path">HIZLI İLETİŞİM · HIZLI İLETİŞİM · HIZLI İLETİŞİM · </textPath>
        </text>
      </svg>
      <span className="absolute inset-4 rounded-full bg-[#F7941D] scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out" style={{ transformOrigin: "center" }} />
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="relative z-10 w-6 h-6 text-[#F7941D] group-hover:text-black" style={{ transition: "color 0.3s ease" }}>
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </a>
  </motion.div>
);

export default CTAButton;

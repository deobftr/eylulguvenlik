import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Hakkımızda", href: "#about", number: "01" },
  { label: "Hizmetler", href: "#work", number: "02" },
  { label: "Ürünler", href: "#philosophy", number: "03" },
  { label: "İletişim", href: "#contact", number: "04" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/eylul_guvenlik/" },
  { label: "Email", href: "mailto:info@eylulguvenlik.com" },
];

const EASE = [0.76, 0, 0.24, 1];
const EASE_OUT = [0.16, 1, 0.3, 1];

const menuVariants = {
  closed: { clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 1, ease: EASE } },
  open: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1, ease: EASE } },
};

const itemVariants = {
  closed: { y: 40, opacity: 0, transition: { duration: 0.8, ease: EASE } },
  open: (i) => ({ y: 0, opacity: 1, transition: { duration: 1, delay: 0.4 + i * 0.1, ease: EASE_OUT } }),
};

const socialVariants = {
  closed: { opacity: 0, y: 10, transition: { duration: 0.6, ease: EASE } },
  open: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 + i * 0.08, ease: "easeOut" } }),
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button */}
      <div className="fixed top-6 right-6 md:top-8 md:right-10 z-[200]" style={{ transform: "translateZ(0)", willChange: "transform" }}>
        <button
          onClick={() => setIsOpen((v) => !v)}
          className="flex flex-col items-center justify-center gap-[5px] w-14 h-14 md:w-16 md:h-16 rounded-full bg-black transition-colors duration-300 relative"
          style={{ boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.6)", WebkitFontSmoothing: "antialiased" }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6.5, scaleX: 0.8 } : { rotate: 0, y: 0, scaleX: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="absolute block h-[1.5px] w-[22px] bg-white origin-center"
            style={{ top: "35%" }}
          />
          <motion.span
            animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute block h-[1.5px] w-[22px] bg-white origin-center"
            style={{ top: "50%", marginTop: "-0.75px" }}
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6.5, scaleX: 0.8 } : { rotate: 0, y: 0, scaleX: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="absolute block h-[1.5px] w-[22px] bg-white origin-center"
            style={{ bottom: "35%" }}
          />
        </button>
      </div>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[100] bg-black flex flex-col justify-between px-8 md:px-16 pt-16 pb-10 md:pt-20 md:pb-14"
          >
            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-4 pt-10 md:pt-0">
              <p className="text-sm text-white/70 uppercase tracking-widest font-mono mr-2">Socials</p>
              {SOCIAL_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  custom={i}
                  variants={socialVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="text-base md:text-lg font-medium text-white hover:opacity-40"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Nav Items */}
            <nav className="flex flex-col gap-0">
              {NAV_ITEMS.map((item, i) => (
                <div key={item.label} className="overflow-hidden border-b border-white/25 py-3 md:py-4">
                  <motion.a
                    href={item.href}
                    onClick={closeMenu}
                    custom={i}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="flex items-baseline justify-between group cursor-pointer"
                  >
                    <span className="text-5xl md:text-7xl lg:text-8xl font-semibold text-white uppercase tracking-tight leading-none group-hover:translate-x-3 transition-transform duration-300 ease-out">
                      {item.label}
                    </span>
                    <span className="text-xs text-white/55 font-mono tracking-widest self-start mt-2">
                      {item.number}
                    </span>
                  </motion.a>
                </div>
              ))}
            </nav>

            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1.2, duration: 0.8 } }}
              exit={{ opacity: 0, transition: { duration: 0.6 } }}
              className="text-xs text-white/20 font-mono tracking-widest mt-8 md:mt-0 md:self-end"
            >
              © 2025 Eylül Elektronik
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;

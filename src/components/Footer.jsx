import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const Footer = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <footer
      ref={ref}
      className="bg-black text-white font-sans border-t border-white/10 min-h-screen md:h-screen flex flex-col justify-between overflow-hidden relative"
    >
      {/* Top horizontal orange gradient line */}
      <div
        className="w-full absolute top-0 left-0 z-10 pointer-events-none"
        style={{ height: '2px', background: 'linear-gradient(to right, transparent, #F7941D, transparent)' }}
      />
      <motion.div
        className="w-full flex-1 flex flex-col justify-between"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Top Grid */}
        <motion.div
          className="px-6 md:px-12 lg:px-16 max-w-[1600px] mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 sm:gap-y-10 md:gap-x-12 shrink-0 pt-12 md:pt-36"
          variants={containerVariants}
        >
          {/* Services */}
          <motion.div variants={itemVariants} className="flex flex-col gap-1">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest mb-4 text-white/80">
              Hizmetler
            </h3>
            <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide leading-relaxed text-[#F7941D]">
              Eylül Elektronik
            </p>
            <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide leading-relaxed text-white/60">
              Güvenlik Kamera Sistemleri
            </p>
            <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide leading-relaxed text-white/60">
              Alarm & Yangın Sistemleri
            </p>
            <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide leading-relaxed text-white/60">
              Geçiş Kontrol & İnterkom
            </p>
          </motion.div>

          {/* Media */}
          <motion.div variants={itemVariants} className="flex flex-col gap-1">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest mb-4 text-white/80">
              MEDYA
            </h3>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:info@eylulguvenlik.com"
                className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide hover:underline underline-offset-4 decoration-1 w-fit flex items-center gap-1 text-white/80 hover:text-[#F7941D] transition-colors"
              >
                Email ↗
              </a>
              <a
                href="https://www.instagram.com/eylul_guvenlik/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide hover:underline underline-offset-4 decoration-1 w-fit flex items-center gap-1 text-white/80 hover:text-[#F7941D] transition-colors"
              >
                İnstagram ↗
              </a>
              <a
                href="https://wa.me/905434011265"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide hover:underline underline-offset-4 decoration-1 w-fit flex items-center gap-1 text-white/80 hover:text-[#F7941D] transition-colors"
              >
                Whatsapp ↗
              </a>
            </div>
          </motion.div>

          {/* Contacts */}
          <motion.div variants={itemVariants} className="flex flex-col gap-1 sm:col-span-2 md:col-span-1">
            <h3 className="font-sans text-xs font-bold uppercase tracking-widest mb-4 text-white/80">
              Bize Ulaşın
            </h3>
            <div className="flex flex-col gap-2 text-white/60">
              <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide leading-relaxed">
                Ankara/Etimesgut, Eryaman Mah. Akıncı Cad. 29/A
              </p>
              <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide leading-relaxed">
                Tel: 0543 401 12 65
              </p>
              <p className="font-sans text-xs md:text-sm font-medium uppercase tracking-wide leading-relaxed">
                E-Posta: info@eylulguvenlik.com
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Logo */}
        <motion.div
          style={{ opacity, scale }}
          className="w-full flex-1 flex flex-col justify-center items-center overflow-hidden select-none py-6 md:pb-4 px-6"
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Subtle orange glow behind logo */}
            <div
              className="absolute -inset-6 md:-inset-10 rounded-full pointer-events-none blur-2xl md:blur-3xl opacity-25"
              style={{
                background: "radial-gradient(ellipse at center, #F7941D 0%, rgba(247, 148, 29, 0.4) 45%, transparent 75%)",
              }}
            />
            <img
              src={`${import.meta.env.BASE_URL}logo.webp`}
              alt="Eylül Elektronik Logo"
              className="relative z-10 h-[8vh] sm:h-[10vh] md:h-[15vh] max-h-[90px] md:max-h-[140px] w-auto object-contain opacity-90 brightness-100 contrast-125 drop-shadow-[0_0_25px_rgba(247,148,29,0.25)]"
            />
          </div>
          <p className="font-sans font-black text-[9px] md:text-xs tracking-[0.4em] uppercase text-white/30 mt-3 md:mt-6 text-center">
            AUDIO ANA BAYİSİ - ANKARA
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

import Logo from "../components/Logo";
import CustomCursor from "../components/CustomCursor";
import Navigation from "../components/Navigation";
import StatusIndicator from "../components/StatusIndicator";
import SocialSidebar from "../components/SocialSidebar";
import CTAButton from "../components/CTAButton";
import MobileSocials from "../components/MobileSocials";
import SplashCursor from "../components/SplashCursor";
import LocationSection from "../components/LocationSection";
import ServicesSection from "../components/ServicesSection";
import PhilosophySection from "../components/PhilosophySection";
import StatsSection from "../components/StatsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

const Index = () => {
  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });
  const footerY = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <div className="min-h-screen relative bg-black selection:bg-white selection:text-black">
      {/* Fixed Elements */}
      <Logo />
      <CustomCursor />
      <Navigation />

      {/* Background WebGL Fluid */}
      <div className="fixed inset-0 z-0 bg-white text-black">
        <LocationSection />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen bg-black flex flex-col px-6 py-12 md:px-16 md:py-16 z-20 overflow-hidden">
        {/* Premium Gradient Overlays */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 0% 100%, rgba(247, 148, 29, 0.15) 0%, transparent 70%),
              radial-gradient(ellipse 60% 50% at 100% 0%, rgba(247, 148, 29, 0.06) 0%, transparent 60%),
              radial-gradient(ellipse 50% 80% at 50% 120%, rgba(247, 148, 29, 0.12) 0%, transparent 60%)
            `,
          }}
        />
        {/* Subtle noise texture overlay */}
        <div
          className="hidden md:block absolute inset-0 pointer-events-none z-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Bottom gradient fade for depth */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-[1]"
          style={{
            background: "linear-gradient(to top, rgba(247, 148, 29, 0.08) 0%, transparent 100%)",
          }}
        />
        {/* Animated glow orb */}
        <div
          className="hidden md:block absolute pointer-events-none z-0 animate-pulse"
          style={{
            bottom: "-10%",
            left: "-5%",
            width: "40vw",
            height: "40vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(247, 148, 29, 0.1) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="hidden md:block absolute pointer-events-none z-0"
          style={{
            top: "10%",
            right: "-10%",
            width: "30vw",
            height: "30vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(247, 148, 29, 0.05) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "pulse 4s ease-in-out infinite alternate",
          }}
        />

        {/* Floating Particles */}
        <div className="hidden md:block absolute inset-0 pointer-events-none z-[1] overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `rgba(247, 148, 29, ${0.15 + Math.random() * 0.25})`,
                animation: `float-particle ${8 + Math.random() * 12}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <StatusIndicator />
        <SocialSidebar />
        <CTAButton />

        {/* Desktop Splash Cursor */}
        <div className="hidden lg:block">
          <SplashCursor />
        </div>

        {/* Mobile spacer */}
        <div className="h-[32px] w-full md:hidden" />

        {/* Mobile Socials */}
        <div className="flex-1 flex flex-col items-end justify-center md:hidden pr-0 z-10 pointer-events-none">
          <div className="pointer-events-auto">
            <MobileSocials />
          </div>
        </div>

        {/* Hero Content */}
        <div className="z-10 mt-auto mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-fit"
          >
            {/* Mobile CTA */}
            <a
              href="#contact"
              className="group relative overflow-hidden border border-white/30 px-5 py-3 flex items-center gap-3 hover:border-[#F7941D] transition-colors duration-500 w-fit mb-6 md:hidden"
            >
              <span className="absolute inset-0 bg-[#F7941D] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out" />
              <span className="relative font-sans font-black text-[10px] tracking-[0.25em] uppercase text-white group-hover:text-black transition-colors duration-300 z-10">
                HIZLI İLETİŞİM
              </span>
              <svg
                className="relative w-3 h-3 text-white group-hover:text-black transition-colors duration-300 z-10"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M1 6h10M6 1l5 5-5 5" />
              </svg>
            </a>

            {/* Main Heading */}
            <h1 className="font-sans font-bold text-4xl sm:text-6xl md:text-8xl lg:text-8xl xl:text-[8.5rem] leading-[0.9] tracking-tighter text-white uppercase text-left">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                Güvenliğiniz
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#F7941D] via-[#FFB347] to-[#F7941D]"
              >
                Bizim İşimiz
              </motion.span>
            </h1>
          </motion.div>
        </div>

        {/* Hero Subtitle */}
        <div className="z-10 grid grid-cols-1 md:grid-cols-12 w-full gap-4 mb-8 md:mb-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="col-span-1 md:col-span-5 lg:col-span-4"
          >
            <div className="w-12 h-[2px] bg-[#F7941D] mb-6 md:hidden" />
            <p className="font-sans text-xs md:text-sm font-medium text-white/80 leading-relaxed tracking-wide uppercase text-left">
              Ankara merkezli profesyonel elektronik güvenlik sistemleri ve Audio yetkili bayisi olarak; kamera, alarm, yangın algılama ve geçiş kontrol sistemleriyle yaşam alanlarınızı ve işletmenizi güvence altına alıyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="relative z-20 w-full bg-transparent">
        {/* About spacer */}
        <div id="about" className="h-screen w-full pointer-events-none" />

        {/* Services */}
        <div id="work" className="bg-black text-white relative z-20">
          <ServicesSection />
        </div>

        {/* Philosophy / Tech */}
        <div className="bg-white text-black relative z-20">
          <PhilosophySection />
        </div>

        {/* Stats */}
        <div className="bg-black text-white relative z-20">
          <StatsSection />
        </div>

        {/* Contact */}
        <div id="contact" className="relative z-20 bg-white text-black">
          <ContactSection />
        </div>
      </div>

      {/* Footer */}
      <div ref={footerRef} className="relative z-0 min-h-screen md:h-screen w-full overflow-hidden bg-black text-white">
        <motion.div style={{ y: footerY }} className="h-full w-full">
          <Footer />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;

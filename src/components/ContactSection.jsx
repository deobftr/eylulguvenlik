import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const ContactSection = () => (
  <section className="h-screen w-full bg-white text-black font-sans px-4 md:px-8 lg:px-12 overflow-hidden flex items-center justify-center relative">
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-16 max-w-[1400px] w-full mx-auto"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="lg:col-span-7 flex flex-col justify-between h-full py-2">
        <motion.div variants={itemVariants} className="mb-8 lg:mb-0">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tight text-left">
            İLETİŞİM <br />BİLGİLERİ <span className="inline-block ml-2">→</span>
          </h1>
        </motion.div>
        <motion.div variants={itemVariants} className="mt-8 lg:mt-0 hidden lg:block">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-black/60">Doğrudan Bağlantı</h2>
          <p className="text-base md:text-lg font-normal leading-relaxed text-black/80 max-w-md text-left">
            Form doldurmakla vakit kaybetmeyin. Bizimle doğrudan WhatsApp, telefon veya e-posta kanalları üzerinden anında iletişime geçebilirsiniz.
          </p>
        </motion.div>
      </div>
      <motion.div className="lg:col-span-5 flex flex-col justify-center" variants={itemVariants}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 border-b border-black/20 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-black/40">Hızlı İletişim</span>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
              <span className="text-lg font-medium">7/24 WhatsApp Canlı Destek</span>
              <a href="https://wa.me/905434011265" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-[#F7941D] hover:opacity-80 transition-opacity flex items-center gap-1 w-fit">
                Mesaj Gönder ↗
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-1 border-b border-black/20 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-black/40">Telefon</span>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
              <span className="text-lg font-medium">Müşteri İlişkileri</span>
              <a href="tel:+905434011265" className="text-lg font-bold text-[#F7941D] hover:underline underline-offset-4 transition-all w-fit">
                0543 401 12 65 ↗
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-1 border-b border-black/20 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-black/40">E-Posta</span>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
              <span className="text-lg font-medium">Proje & Teklif</span>
              <a href="mailto:info@eylulguvenlik.com" className="text-lg font-bold hover:text-[#F7941D] transition-colors w-fit">
                info@eylulguvenlik.com ↗
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-1 border-b border-black/20 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-black/40">Ofis</span>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div className="flex flex-col">
                <span className="text-lg font-bold">Ankara / Etimesgut</span>
                <span className="text-sm font-medium text-black/60">Eryaman Mah. Akıncı Cad. 29/A</span>
              </div>
              <a href="https://maps.app.goo.gl/RH1KxTEuQdZDo7AA9" target="_blank" rel="noopener noreferrer" className="text-sm font-bold uppercase tracking-wider border border-black px-4 py-2 hover:bg-black hover:text-white transition-all duration-300 w-fit shrink-0 mt-1 sm:mt-0">
                Haritada Gör ↗
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default ContactSection;

import { useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const LocationSection = () => {
  const [height, setHeight] = useState(typeof window !== "undefined" ? window.innerHeight : 800);

  useEffect(() => {
    const onResize = () => setHeight(window.innerHeight);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, height * 0.4], [80, 0]);
  const o1 = useTransform(scrollY, [0, height * 0.3], [0, 1]);
  const y2 = useTransform(scrollY, [height * 0.1, height * 0.5], [80, 0]);
  const o2 = useTransform(scrollY, [height * 0.1, height * 0.4], [0, 1]);
  const y3 = useTransform(scrollY, [height * 0.2, height * 0.6], [80, 0]);
  const o3 = useTransform(scrollY, [height * 0.2, height * 0.5], [0, 1]);
  const y4 = useTransform(scrollY, [height * 0.3, height * 0.7], [80, 0]);
  const o4 = useTransform(scrollY, [height * 0.3, height * 0.6], [0, 1]);

  return (
    <section className="h-screen w-full bg-white text-black font-sans px-6 md:px-12 lg:px-16 overflow-hidden flex items-center justify-center relative">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-12 w-full max-w-[1600px] mx-auto">
        <motion.div className="md:col-span-3 lg:col-span-3 pt-2" style={{ y: y1, opacity: o1 }}>
          <h2 className="font-sans text-xs md:text-sm font-bold uppercase tracking-widest">
            Neredeyiz/ Bize Ulaşın...
          </h2>
        </motion.div>
        <div className="md:col-span-9 lg:col-span-9 flex flex-col justify-center">
          <motion.div style={{ y: y2, opacity: o2 }} className="flex flex-col gap-4">
            <h3 className="font-sans text-xs md:text-sm font-bold uppercase tracking-wide opacity-100 mb-1 text-[#F7941D]">İLETİŞİM ADRESİ VE KONUM</h3>
            <div className="flex flex-col">
              <p className="font-sans text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
                Ankara/Etimesgut
              </p>
              <p className="font-sans text-2xl md:text-3xl lg:text-4xl font-normal text-black/70 leading-tight tracking-tight mt-2">
                Eryaman Mahallesi Akıncı Caddesi 29/A
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;

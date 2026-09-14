import { motion } from "framer-motion";

const StatusIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="absolute z-10 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 pointer-events-none"
    style={{ top: "2.25rem" }}
  >
    <span className="relative flex h-1.5 w-1.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F7941D] opacity-75" />
      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#F7941D]" />
    </span>
    <span className="font-sans font-black text-[9px] tracking-[0.25em] uppercase text-white">
      Ankara/Eryaman
    </span>
  </motion.div>
);

export default StatusIndicator;

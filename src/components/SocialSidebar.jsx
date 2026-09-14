import { motion } from "framer-motion";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/eylul_guvenlik/" },
  { label: "Email", href: "mailto:info@eylulguvenlik.com" },
];

const SocialSidebar = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="absolute z-20 hidden md:flex flex-col items-center"
    style={{ right: "64px", top: "112px", bottom: "194px", justifyContent: "center", gap: "1rem" }}
  >
    <span className="w-[1px] h-8 bg-white/30 flex-shrink-0" />
    {SOCIAL_LINKS.map(({ label, href }) => (
      <a
        key={label}
        href={href}
        target={href.startsWith("mailto") ? "_self" : "_blank"}
        rel="noopener noreferrer"
        title={label}
        className="group flex-shrink-0"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        <span className="font-sans font-black text-[10px] tracking-[0.22em] uppercase text-white group-hover:opacity-100 transition-opacity duration-300">
          {label}
        </span>
      </a>
    ))}
    <span className="w-[1px] h-8 bg-white/30 flex-shrink-0" />
  </motion.div>
);

export default SocialSidebar;

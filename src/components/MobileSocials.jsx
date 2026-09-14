import { motion } from "framer-motion";
import { Instagram, Mail } from "lucide-react";

const LINKS = [
  { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/eylul_guvenlik/" },
  { label: "Email", icon: Mail, href: "mailto:info@eylulguvenlik.com" },
];

const MobileSocials = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
    className="flex flex-col items-center gap-6"
  >
    {LINKS.map(({ label, icon: Icon, href }) => (
      <a
        key={label}
        href={href}
        target={href.startsWith("mailto") ? "_self" : "_blank"}
        rel="noopener noreferrer"
        className="text-white hover:opacity-75 transition-opacity duration-300 block"
      >
        <Icon size={18} strokeWidth={2.5} />
      </a>
    ))}
  </motion.div>
);

export default MobileSocials;

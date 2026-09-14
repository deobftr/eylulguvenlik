import { useEffect } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 100, mass: 0.8 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-gray-400/50 rounded-full pointer-events-none z-[9999] hidden lg:block backdrop-blur-[1px]"
      style={{ x: smoothX, y: smoothY }}
    />
  );
};

export default CustomCursor;

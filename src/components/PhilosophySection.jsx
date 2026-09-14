import { useRef, useState, useEffect, useCallback } from "react";
import { useLenis } from "lenis/react";
import TechSection from "./TechSection";

function customEase(t) {
  const s = 2.28;
  const o = 3 * (0.24 - 0.76) - s;
  const a = 1 - s - o;
  const l = 3 * 0;
  const u = 3 * 1 - l;
  const c = 1 - l - u;

  let f = t;
  for (let d = 0; d < 8; d++) {
    const h = ((a * f + o) * f + s) * f - t;
    const x = (3 * a * f + 2 * o) * f + s;
    if (Math.abs(x) < 1e-7) break;
    f -= h / x;
  }
  return ((c * f + u) * f + l) * f;
}

const PhilosophySection = () => {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const cardRef = useRef(null);
  const innerRef = useRef(null);
  const svgContainerRef = useRef(null);
  const sectionTopRef = useRef(0);
  const pathLengthRef = useRef(0);
  const animFrameRef = useRef(0);
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cardWidth = 340;
  const cardHeight = 220;

  const measure = useCallback(() => {
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);

    if (sectionRef.current) {
      sectionTopRef.current = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let pathD = "";

    if (mobile) {
      const startX = vw / 2;
      const startY = -10;
      const endX = vw / 2;
      const endY = vh / 2 - cardHeight / 2;
      pathD = `M ${startX},${startY} L ${endX},${endY}`;
    } else {
      const scale = vw / 3000;
      const startX = (1500 + 1100 * Math.cos((196 * Math.PI) / 180)) * scale;
      const endX = vw / 2 - cardWidth / 2;
      const endY = vh / 2;
      const radius = 1100 * scale;
      pathD = `M ${startX},0 A ${radius},${radius} 0 0,0 ${endX},${endY}`;
    }

    if (pathRef.current) {
      pathRef.current.setAttribute("d", pathD);
      try {
        const len = pathRef.current.getTotalLength();
        if (len > 0) pathLengthRef.current = len;
      } catch {}
    }

    if (innerRef.current && sectionRef.current) {
      const contentHeight = innerRef.current.scrollHeight;
      const totalHeight = vh * 1.2 + contentHeight;
      sectionRef.current.style.height = `${totalHeight}px`;
      sectionRef.current.style.minHeight = `${totalHeight}px`;
    }

    setIsReady(true);
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      measure();
      setTimeout(measure, 150);
    });
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [measure]);

  useLenis(({ scroll }) => {
    if (!isReady) return;

    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(() => {
      const path = pathRef.current;
      const card = cardRef.current;
      const inner = innerRef.current;
      const svgC = svgContainerRef.current;
      const pathLength = pathLengthRef.current;

      if (!card || !inner) return;

      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const localScroll = scroll - sectionTopRef.current;

      // SVG path reveal
      if (path && svgC && pathLength > 0) {
        const pathProgress = Math.min(Math.max((localScroll + vh) / vh, 0), 1);
        path.style.strokeDasharray = `${pathLength}`;
        path.style.strokeDashoffset = `${(pathLength - pathProgress * pathLength).toFixed(1)}`;
      }

      // Card visibility
      if (localScroll < -vh * 0.35) {
        card.style.visibility = "hidden";
        card.style.opacity = "0";
      } else {
        card.style.visibility = "visible";
        card.style.opacity = "1";
      }

      // Card animation
      if (localScroll <= 0) {
        card.style.position = "absolute";
        card.style.top = "50vh";
        card.style.transform = "translate3d(0, 0, 0) scale(1)";
        if (svgC) {
          svgC.style.position = "absolute";
          svgC.style.top = "0";
        }
        inner.style.transform = "scale(1)";
        card.style.overflow = "hidden";
      } else {
        const animDuration = vh * 1.2;
        const progress = Math.min(Math.max(localScroll / animDuration, 0), 1);

        if (progress < 1) {
          card.style.position = "fixed";
          card.style.top = "50%";
          if (svgC) {
            svgC.style.position = "fixed";
            svgC.style.top = "0";
          }
          card.style.overflow = "hidden";
        } else {
          card.style.position = "absolute";
          card.style.top = `${animDuration + vh / 2}px`;
          if (svgC) {
            svgC.style.position = "absolute";
            svgC.style.top = `${animDuration}px`;
          }
          card.style.overflow = "visible";
        }

        const eased = customEase(progress);
        const scaleX = 1 + eased * (vw / cardWidth - 1);
        const scaleY = 1 + eased * (vh / cardHeight - 1);
        card.style.transform = `translate3d(0, 0, 0) scale(${scaleX.toFixed(4)}, ${scaleY.toFixed(4)})`;
        inner.style.transform = `scale(${(1 / scaleX).toFixed(4)}, ${(1 / scaleY).toFixed(4)})`;

        const borderOpacity = Math.max(0, 1 - eased / 0.5);
        card.style.borderWidth = borderOpacity < 0.01 ? "0px" : "2px";
        card.style.borderColor = `rgba(0,0,0,${borderOpacity.toFixed(3)})`;
      }
    });
  });

  return (
    <section ref={sectionRef} className="relative bg-white text-black" style={{ minHeight: "320vh" }}>
      <div
        id="urunler"
        style={{ position: "absolute", top: "120vh", left: 0, height: "1px", width: "1px", pointerEvents: "none" }}
      />

      {/* SVG Path */}
      <div
        ref={svgContainerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 10,
          willChange: "transform, top, position",
        }}
      >
        <svg width="100%" height="100%" style={{ overflow: "visible" }}>
          <path
            ref={pathRef}
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            style={{
              strokeWidth: isMobile ? "0.8vw" : "10px",
              strokeDasharray: "99999",
              strokeDashoffset: "99999",
            }}
          />
        </svg>
      </div>

      {/* Expanding Card */}
      <div
        ref={cardRef}
        style={{
          position: "absolute",
          top: "50vh",
          left: "50%",
          width: `${cardWidth}px`,
          height: `${cardHeight}px`,
          marginLeft: `-${cardWidth / 2}px`,
          marginTop: `-${cardHeight / 2}px`,
          background: "white",
          border: "2px solid black",
          visibility: "hidden",
          opacity: 0,
          zIndex: 50,
          overflow: "hidden",
          transformOrigin: "center center",
        }}
      >
        <div
          ref={innerRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100vw",
            height: "100vh",
            marginLeft: "-50vw",
            marginTop: "-50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transformOrigin: "center center",
          }}
        >
          <div style={{ width: "100%", height: "100%" }}>
            <TechSection />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;

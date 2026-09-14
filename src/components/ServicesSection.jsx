import { useRef, useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import StarBorder from "./StarBorder";

const PROJECTS = [
  {
    id: "001",
    title: "Güvenlik Kamera Sistemleri",
    stack: "CCTV / IP Kamera / DVR / NVR",
    description: "Yüksek çözünürlüklü IP ve gece görüşlü CCTV kamera sistemleri ile ev, iş yeri ve tesisleriniz için 7/24 kesintisiz izleme, akıllı video analiz ve profesyonel kayıt çözümleri sunuyoruz.",
    links: { live: "#contact", code: "#" },
    image: `${import.meta.env.BASE_URL}p1.jpg`,
    cta: "Detaylı Bilgi",
  },
  {
    id: "002",
    title: "Alarm ve Yangın Algılama",
    stack: "Hırsız Alarmı / Yangın Alarmı / Duman Dedektörü",
    description: "Ev ve iş yerlerinizi izinsiz girişlere, yangın ve duman tehlikelerine karşı koruyan yüksek hassasiyetli dedektörler ve 7/24 alarm takip merkezi entegrasyonu.",
    links: { live: "#contact", code: "#" },
    image: `${import.meta.env.BASE_URL}p2.jpg`,
    cta: "Detaylı Bilgi",
  },
  {
    id: "003",
    title: "Geçiş Kontrol Sistemleri",
    stack: "Kartlı Geçiş / Turnike / Bariyer",
    description: "Personel devam kontrol (PDKS), biyometrik parmak izi, yüz tanıma, kartlı geçiş ve araç otopark bariyer sistemleriyle alan güvenliği ve giriş-çıkış takibi.",
    links: { live: "#contact", code: "#" },
    image: `${import.meta.env.BASE_URL}p3.jpg`,
    cta: "Detaylı Bilgi",
  },
  {
    id: "004",
    title: "İnterkom ve Audio Sistemleri",
    stack: "Audio İnterkom / Daire İçi / Apartman",
    description: "Audio yetkili ana bayisi güvencesiyle; apartman, rezidans ve sitelere özel görüntülü diafon, dokunmatik daire içi paneller ve modern villa interkom sistemleri.",
    links: { live: "#contact", code: "#" },
    image: `${import.meta.env.BASE_URL}p4.webp`,
    cta: "Detaylı Bilgi",
  },
];

const STACK_CONFIG = {
  itemDistance: 100,
  itemScale: 0.015,
  itemStackDistance: 18,
  stackPosition: 0.08,
  scaleEndPosition: 0.05,
  baseScale: 0.92,
};

const ProjectCard = ({ project }) => (
  <StarBorder
    as="div"
    className="scroll-stack-card"
    color="#F7941D, #FF7700, #FFA500"
    speed="8s"
  >
    <div className="card-top-row">
      <div className="id-brand-group">
        <span className="huge-number">{project.id}</span>
        <div className="client-info">
          <span className="label">{project.title}</span>
          <span className="client-name">{project.stack}</span>
        </div>
      </div>
      <StarBorder
        as="a"
        href={project.links.live}
        className="live-btn-star"
        color="#F7941D, #FFB347"
        speed="3s"
      >
        {project.cta}
      </StarBorder>
    </div>
    <div className="content-grid">
      <img
        src={project.image}
        className="main-image w-full h-auto object-contain"
        alt={project.title}
        onLoad={() => window.dispatchEvent(new Event("resize"))}
      />
      <div className="project-description">
        <p>{project.description}</p>
      </div>
    </div>
  </StarBorder>
);

const ServicesSection = () => {
  const cardsRef = useRef([]);
  const positionsRef = useRef([]);
  const totalHeightRef = useRef(0);
  const containerRef = useRef(null);
  const containerTopRef = useRef(0);
  const scrollStackRef = useRef(null);
  const svgContainerRef = useRef(null);
  const pathRef = useRef(null);
  const progressLengthRef = useRef(null);
  const totalLengthRef = useRef(0);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);
  const textRef4 = useRef(null);
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useLenis(({ scroll }) => {
    if (!ready) return;
    const cards = cardsRef.current;
    const positions = positionsRef.current;
    const totalHeight = totalHeightRef.current;
    const containerTop = containerTopRef.current;
    if (!cards.length || !positions.length) return;

    const vh = window.innerHeight;
    const cardHeight = cards[0].offsetHeight;
    const stackCenter = (vh - cardHeight) / 2;
    const scaleEnd = stackCenter - (STACK_CONFIG.stackPosition - STACK_CONFIG.scaleEndPosition) * vh;
    const lastCardPos = positions[cards.length - 1] - scaleEnd;
    const exitZone = vh * 1.2;

    let exitProgress = 0;
    if (scroll > lastCardPos) {
      exitProgress = (scroll - lastCardPos) / exitZone;
      exitProgress = Math.min(Math.max(exitProgress, 0), 1);
    }

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const pos = positions[i];
      const stackStart = pos - stackCenter - STACK_CONFIG.itemStackDistance * i;
      const stackEnd = pos - scaleEnd;
      const moveStart = stackStart;
      const lastPos = Math.max(totalHeight - vh * 0.5, lastCardPos + exitZone);

      let stackProgress = 0;
      if (scroll >= stackEnd) {
        stackProgress = 1;
      } else if (scroll > stackStart) {
        stackProgress = (scroll - stackStart) / (stackEnd - stackStart);
      }
      stackProgress = Math.min(Math.max(stackProgress, 0), 1);

      const targetScale = STACK_CONFIG.baseScale + i * STACK_CONFIG.itemScale;
      const scale = Number((1 - stackProgress * (1 - targetScale)).toFixed(4));

      let translateY = 0;
      if (scroll >= moveStart && scroll <= lastPos) {
        translateY = scroll - pos + stackCenter + STACK_CONFIG.itemStackDistance * i;
      } else if (scroll > lastPos) {
        translateY = lastPos - pos + stackCenter + STACK_CONFIG.itemStackDistance * i;
      }

      card.style.transform = `translate3d(0, ${Math.round(translateY * 10) / 10}px, 0) scale(${scale})`;
    }

    // Handle scroll stack container exit animation
    const scrollStack = scrollStackRef.current;
    const container = containerRef.current;
    if (scrollStack && container) {
      const viewCenter = scroll + vh / 2 - containerTop;
      container.style.perspectiveOrigin = `50% ${viewCenter}px`;
      container.style.perspective = "1500px";

      if (exitProgress > 0) {
        if (isMobile) {
          const fadeP = Math.min(exitProgress / 0.25, 1);
          const opacity = 1 - fadeP;
          scrollStack.style.transformOrigin = `50% ${viewCenter}px`;
          scrollStack.style.transform = "translate3d(0, 0, 0) scale(1)";
          scrollStack.style.opacity = Math.max(0, opacity).toFixed(3);
          scrollStack.style.visibility = fadeP >= 1 ? "hidden" : "visible";
        } else {
          const p = Math.pow(exitProgress, 1.5);
          const z = -p * 3000;
          const s = 1 - p;
          const fadeVal = 1 - Math.pow(exitProgress, 2.5);
          scrollStack.style.transformOrigin = `50% ${viewCenter}px`;
          scrollStack.style.transform = `translate3d(0, 0, ${z}px) scale(${Math.max(0, s).toFixed(4)})`;
          scrollStack.style.opacity = Math.max(0, fadeVal).toFixed(3);
          scrollStack.style.visibility = exitProgress >= 1 ? "hidden" : "visible";
        }
      } else {
        scrollStack.style.transformOrigin = "";
        scrollStack.style.transform = "";
        scrollStack.style.opacity = "1";
        scrollStack.style.visibility = "visible";
      }
    }
  });

  useEffect(() => {
    const measure = () => {
      const cards = cardsRef.current.filter(Boolean);
      if (!cards.length) return;

      const positions = cards.map((card) => {
        const rect = card.getBoundingClientRect();
        return rect.top + window.scrollY;
      });
      positionsRef.current = positions;

      const parent = cards[0].parentElement;
      if (parent) {
        totalHeightRef.current = parent.scrollHeight + parent.getBoundingClientRect().top + window.scrollY;
      }

      if (containerRef.current) {
        containerTopRef.current = containerRef.current.getBoundingClientRect().top + window.scrollY;
      }

      setReady(true);
    };

    requestAnimationFrame(() => {
      measure();
      setTimeout(measure, 300);
    });

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div ref={containerRef} style={{ perspective: "1500px" }}>
      <div ref={scrollStackRef} className="scroll-stack-inner">
        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => (cardsRef.current[i] = el)}
            style={{ willChange: "transform" }}
          >
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;

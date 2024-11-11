import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  // Explicitly type the refs as HTMLDivElement
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Type guard to ensure refs are not null
    if (!rootRef.current || !scrollRef.current) return;

    const root: HTMLDivElement = rootRef.current;
    const scroll: HTMLDivElement = scrollRef.current;

    // Store current scroll position
    let currentScroll: number = 0;

    // Set initial height
    const setHeight = (): void => {
      document.body.style.height = `${scroll.getBoundingClientRect().height}px`;
    };

    // Smooth scrolling animation
    const smoothScroll = (): void => {
      currentScroll = window.scrollY;

      gsap.to(scroll, {
        y: -currentScroll,
        duration: 1.5,
        ease: "power2.out",
      });
    };

    // Initialize
    setHeight();
    smoothScroll();

    // Update ScrollTrigger
    ScrollTrigger.refresh();

    // Event listeners
    window.addEventListener("scroll", smoothScroll);
    window.addEventListener("resize", setHeight);

    // Cleanup function
    return (): void => {
      window.removeEventListener("scroll", smoothScroll);
      window.removeEventListener("resize", setHeight);
    };
  }, []);

  // Define root styles as a constant with proper types
  const rootStyles: React.CSSProperties = {
    overflow: "hidden",
    position: "fixed",
    width: "100%",
    height: "100vh",
    top: 0,
    left: 0,
  };

  return (
    <div ref={rootRef} style={rootStyles}>
      <div ref={scrollRef}>{children}</div>
    </div>
  );
};

export default SmoothScroll;

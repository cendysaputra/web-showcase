import { useState, useEffect, useRef } from "react";
import "@fontsource/bricolage-grotesque/600.css";
import Lenis from "@studio-freight/lenis";
import DotGrid from "./components/DotGrid";
import Header from "./components/Header";
import Footer from "./components/Footer";
import VariableProximity from "./components/VariableProximity";
import CurvedLoop from "./components/CurvedLoop";
// import RunningText from "./components/RunningText";
import EyeAnimation from "./components/EyeAnimation";
import Folder from "./components/Folder";
import SvgTextDraw from "./components/SvgTextDraw";

import cendySaputraLogo from "./assets/images/Cendy Saputra.svg";
import folderImgLeft from "./assets/images/folder-img-left.png";
import folderImgCenter from "./assets/images/folder-img-center.png";
import folderImgRight from "./assets/images/folder-img-right.png";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupOrigin, setPopupOrigin] = useState({ x: 0, y: 0 });
  const [isClosing, setIsClosing] = useState(false);
  const [imageScale, setImageScale] = useState(0.7);
  const imageRef = useRef(null);
  const textContainerRef = useRef(null);
  const textSectionRef = useRef(null);
  const [textOpacity, setTextOpacity] = useState(0);
  const hasAutoShownRef = useRef(false);
  const isAutoOpenedRef = useRef(false);
  const [folderOpen, setFolderOpen] = useState(false);
  const twoColumnSectionRef = useRef(null);
  const folderRef = useRef(null);
  const [arrowVisible, setArrowVisible] = useState(false);
  const arrowRef = useRef(null);

  // Auto-show popup for first-time visitors
  useEffect(() => {
    // Check if popup was already shown
    const popupShownData = localStorage.getItem("ruangArtefakPopupShown");

    if (popupShownData) {
      const { timestamp } = JSON.parse(popupShownData);
      const twoDaysInMs = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds
      const now = Date.now();

      // Check if 2 days have passed
      if (now - timestamp < twoDaysInMs) {
        // Session still valid, don't auto-show popup
        hasAutoShownRef.current = true;
        return;
      }
    }

    // Auto-show popup after 3 seconds for first-time or expired session
    if (!hasAutoShownRef.current) {
      const timer = setTimeout(() => {
        // Get approximate position at bottom right (where footer text is)
        const position = {
          x: window.innerWidth - 100,
          y: window.innerHeight - 40,
        };
        setPopupOrigin(position);
        setIsClosing(false);
        setShowPopup(true);
        hasAutoShownRef.current = true;
        isAutoOpenedRef.current = true; // Mark as auto-opened

        // Save timestamp to localStorage
        localStorage.setItem(
          "ruangArtefakPopupShown",
          JSON.stringify({
            timestamp: Date.now(),
          }),
        );
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Auto-close popup on scroll if it was auto-opened
  useEffect(() => {
    if (!showPopup || !isAutoOpenedRef.current) return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / documentHeight) * 100;

      // Close popup if scrolled 40% or more
      if (scrollPercentage >= 40 && isAutoOpenedRef.current) {
        handleClosePopup();
        isAutoOpenedRef.current = false; // Reset flag
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showPopup]);

  // Disable browser zoom
  useEffect(() => {
    // Disable zoom via viewport meta
    const setViewport = () => {
      const viewport = document.querySelector("meta[name=viewport]");
      if (viewport) {
        viewport.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover");
      }
    };
    setViewport();

    // Prevent zoom with keyboard shortcuts
    const preventZoom = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "+" || e.key === "-" || e.key === "=" || e.key === "0" || e.keyCode === 187 || e.keyCode === 189 || e.keyCode === 48)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Prevent zoom with mouse wheel + ctrl/cmd
    const preventWheelZoom = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Prevent pinch zoom on touchpad/touchscreen
    const preventTouchZoom = (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Prevent double-tap zoom on mobile
    let lastTouchEnd = 0;
    const preventDoubleTapZoom = (e) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      lastTouchEnd = now;
    };

    // Prevent gesture zoom on trackpad
    const preventGestureZoom = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Add all event listeners
    document.addEventListener("keydown", preventZoom, { passive: false, capture: true });
    document.addEventListener("wheel", preventWheelZoom, { passive: false, capture: true });
    document.addEventListener("touchstart", preventTouchZoom, { passive: false, capture: true });
    document.addEventListener("touchmove", preventTouchZoom, { passive: false, capture: true });
    document.addEventListener("touchend", preventDoubleTapZoom, { passive: false, capture: true });
    document.addEventListener("gesturestart", preventGestureZoom, { passive: false, capture: true });
    document.addEventListener("gesturechange", preventGestureZoom, { passive: false, capture: true });
    document.addEventListener("gestureend", preventGestureZoom, { passive: false, capture: true });

    return () => {
      document.removeEventListener("keydown", preventZoom, { capture: true });
      document.removeEventListener("wheel", preventWheelZoom, { capture: true });
      document.removeEventListener("touchstart", preventTouchZoom, { capture: true });
      document.removeEventListener("touchmove", preventTouchZoom, { capture: true });
      document.removeEventListener("touchend", preventDoubleTapZoom, { capture: true });
      document.removeEventListener("gesturestart", preventGestureZoom, { capture: true });
      document.removeEventListener("gesturechange", preventGestureZoom, { capture: true });
      document.removeEventListener("gestureend", preventGestureZoom, { capture: true });
    };
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.4,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Image scale animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;

      const imageSection = imageRef.current;
      const rect = imageSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll progress
      // When image is at bottom of screen, scale = 0.7
      // When image is centered, scale = 1
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));

      // Scale from 0.7 to 1 based on scroll progress
      const scale = 0.7 + scrollProgress * 0.3;
      setImageScale(scale);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Text fade in animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!textSectionRef.current) return;

      const textSection = textSectionRef.current;
      const rect = textSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start animation when section is 20% into viewport
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top - windowHeight * 0.2) / (windowHeight * 0.6)));

      setTextOpacity(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Auto open/close folder when folder is visible/hidden in viewport
  useEffect(() => {
    const currentRef = folderRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Folder intersection observed
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Wait a bit before opening the folder for a nice effect
            setTimeout(() => {
              // Open folder when visible
              setFolderOpen(true);
            }, 300);
          } else if (!entry.isIntersecting || entry.intersectionRatio < 0.3) {
            // Close folder when it's out of view or less than 30% visible
            setFolderOpen(false);
          }
        });
      },
      {
        threshold: [0, 0.3, 0.5], // Multiple thresholds to track visibility
        rootMargin: "0px",
      },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Auto show arrow when text is visible in viewport
  useEffect(() => {
    const currentRef = arrowRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Wait a bit before showing the arrow for a nice effect (same delay as folder)
            setTimeout(() => {
              setArrowVisible(true);
            }, 300);
          } else if (!entry.isIntersecting || entry.intersectionRatio < 0.3) {
            // Hide arrow when it's out of view or less than 30% visible
            setArrowVisible(false);
          }
        });
      },
      {
        threshold: [0, 0.3, 0.5], // Multiple thresholds to track visibility
        rootMargin: "0px",
      },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleTogglePopup = (position) => {
    if (showPopup) {
      // Close popup
      setIsClosing(true);
      setTimeout(() => {
        setShowPopup(false);
        setIsClosing(false);
      }, 400);
    } else {
      // Open popup
      setPopupOrigin(position);
      setIsClosing(false);
      setShowPopup(true);
      isAutoOpenedRef.current = false; // Mark as manually opened

      // Update session when manually opened
      if (!hasAutoShownRef.current) {
        localStorage.setItem(
          "ruangArtefakPopupShown",
          JSON.stringify({
            timestamp: Date.now(),
          }),
        );
        hasAutoShownRef.current = true;
      }
    }
  };

  const handleClosePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowPopup(false);
      setIsClosing(false);
    }, 400);
  };

  return (
    <>
      {/* Popup */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            bottom: "60px",
            right: "20px",
            zIndex: 999,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              padding: "20px",
              maxWidth: "400px",
              width: "100%",
              position: "relative",
              border: "2px solid #1b1b1b",
              transformOrigin: `calc(100% - ${window.innerWidth - popupOrigin.x}px) calc(100% + 20px + ${window.innerHeight - popupOrigin.y}px)`,
              animation: isClosing ? "macCloseAnimation 0.4s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards" : "macOpenAnimation 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
            }}
          >
            <button
              onClick={handleClosePopup}
              style={{
                position: "absolute",
                top: "4px",
                right: "8px",
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#666",
                lineHeight: 1,
                padding: "5px",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#000")}
              onMouseLeave={(e) => (e.target.style.color = "#666")}
            >
              ×
            </button>
            <p
              style={{
                fontFamily: "'Mona Sans', sans-serif",
                fontSize: "13px",
                lineHeight: "1.6",
                color: "#333",
                margin: "0",
                paddingRight: "14px",
              }}
            >
              Every completed project is a story worth recording. The Artifact Room was born from my desire to celebrate that process. Here, you'll see the final results, as well as how I think and experiment through visual art.
            </p>
          </div>
        </div>
      )}

      {/* Background DotGrid */}
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1,
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <DotGrid dotSize={4} gap={20} baseColor="#EEE" activeColor="#EEE" proximity={80} shockRadius={180} shockStrength={5} resistance={750} returnDuration={1.5} />
      </div>

      {/* Konten utama - atas background */}
      <div className="relative">
        <Header />

        {/* Hero Banner */}
        <div
          className="hero-banner"
          style={{
            position: "relative",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              pointerEvents: "none",
              position: "relative",
            }}
          >
            {/* Eye Animation SVG */}
            <EyeAnimation
              className="eye-animation"
              style={{
                position: "absolute",
                height: "auto",
                zIndex: 10,
                opacity: 0,
              }}
            />
            <h1
              className="hero-title shiny-text"
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                color: "#000",
                margin: 0,
                fontWeight: 600,
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                textAlign: "center",
                overflow: "hidden",
                paddingBottom: "20px",
                position: "relative",
              }}
            >
              <span className="hero-word" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                {"Ruang".split("").map((char, index) => (
                  <span
                    key={index}
                    style={{
                      display: "inline-block",
                      overflow: "hidden",
                      verticalAlign: "bottom",
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        animation: `slideUp 0.8s cubic-bezier(0.77, 0, 0.175, 1) ${index * 0.05}s forwards`,
                        transform: "translateY(100%)",
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      }}
                    >
                      {char}
                    </span>
                  </span>
                ))}
              </span>{" "}
              <span className="hero-word" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                {"Artefak".split("").map((char, index) => (
                  <span
                    key={index + 5}
                    style={{
                      display: "inline-block",
                      overflow: "hidden",
                      verticalAlign: "bottom",
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        animation: `slideUp 0.8s cubic-bezier(0.77, 0, 0.175, 1) ${(index + 6) * 0.05}s forwards`,
                        transform: "translateY(100%)",
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                      }}
                    >
                      {char}
                    </span>
                  </span>
                ))}
              </span>
            </h1>
            <style>{`
            /* Responsive Hero Banner */
            .hero-banner {
              padding: 0;
            }
            @media (max-width: 767px) {
              .hero-banner {
                height: auto !important;
                min-height: 100vh;
                padding: 120px 16px !important;
              }
            }
            @media (max-width: 480px) {
              .hero-banner {
                height: auto !important;
                min-height: 100vh;
                padding: 120px 16px !important;
              }
            }

            /* Responsive Eye Animation */
            .eye-animation {
              width: 90px;
              left: calc(50% - 380px);
              top: 60px;
              animation: fadeIn 0.8s cubic-bezier(0.77, 0, 0.175, 1) 0.5s forwards;
            }
            @media (max-width: 1199px) {
              .eye-animation {
                width: 60px;
                left: calc(50% - 220px);
                top: 40px;
              }
            }
            @media (max-width: 767px) {
              .eye-animation {
                width: 50px;
                left: 20px;
                top: 30px;
              }
            }
            @media (max-width: 480px) {
              .eye-animation {
                width: 45px;
                left: 15px;
                top: 25px;
              }
            }

            /* Responsive Hero Title */
            .hero-title {
              font-size: 200px;
              white-space: nowrap;
              font-family: 'Bricolage Grotesque', sans-serif !important;
            }
            .hero-title * {
              font-family: 'Bricolage Grotesque', sans-serif !important;
            }
            .hero-word {
              display: inline-block;
              font-family: 'Bricolage Grotesque', sans-serif !important;
            }

            /* Shiny Text Effect */
            .shiny-text {
              overflow: hidden;
              position: relative;
            }
            .shiny-text::before {
              content: '';
              position: absolute;
              top: -100%;
              left: -100%;
              width: 200%;
              height: 200%;
              background: linear-gradient(135deg,
                transparent 0%,
                rgba(255, 255, 255, 0.1) 45%,
                rgba(255, 255, 255, 0.3) 50%,
                rgba(255, 255, 255, 0.1) 55%,
                transparent 100%);
              animation: shineMove 8s ease-in-out infinite;
              animation-delay: 2s;
              pointer-events: none;
              z-index: 1;
            }
            .shiny-text > * {
              position: relative;
              z-index: 0;
            }
            @media (max-width: 1199px) {
              .hero-title {
                font-size: 100px;
                white-space: normal;
              }
              .hero-word {
                display: block;
              }
            }
            @media (max-width: 767px) {
              .hero-title {
                font-size: 85px;
                white-space: normal;
              }
              .hero-word {
                display: block;
              }
            }
            @media (max-width: 480px) {
              .hero-title {
                font-size: 85px;
                white-space: normal;
              }
              .hero-word {
                display: block;
              }
            }

            /* Responsive Cendy Saputra Logo */
            .cendy-logo {
              width: auto;
              height: auto;
              margin-top: -80px;
            }
            @media (max-width: 1199px) {
              .cendy-logo {
                margin-top: -60px;
                max-width: 200px;
              }
            }
            @media (max-width: 767px) {
              .cendy-logo {
                margin: -50px auto 0 !important;
                right: 0 !important;
                max-width: 200px;
              }
            }
            @media (max-width: 480px) {
              .cendy-logo {
                margin: -50px auto 0 !important;
                right: 0 !important;
                max-width: 200px;
              }
            }

            /* Responsive Button */
            .pill-button {
              padding: 16px 40px;
              font-size: 18px;
            }
            @media (max-width: 767px) {
              .pill-button {
                padding: 12px 30px;
                font-size: 16px;
              }
            }
            @media (max-width: 480px) {
              .pill-button {
                padding: 10px 24px;
                font-size: 14px;
              }
            }

            @keyframes slideUp {
              to {
                transform: translateY(0);
              }
            }
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            @keyframes shineMove {
              0% {
                top: -100%;
                left: -100%;
              }
              100% {
                top: 100%;
                left: 100%;
              }
            }
            @keyframes fadeOut {
              from {
                opacity: 1;
              }
              to {
                opacity: 0;
              }
            }
            @keyframes slideInRight {
              from {
                transform: translateX(100%);
                opacity: 0;
              }
              to {
                transform: translateX(0);
                opacity: 1;
              }
            }
            @keyframes macOpenAnimation {
              0% {
                opacity: 0;
                transform: scale(0.01);
              }
              1% {
                opacity: 1;
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }
            @keyframes macCloseAnimation {
              0% {
                opacity: 1;
                transform: scale(1);
              }
              99% {
                opacity: 1;
              }
              100% {
                opacity: 0;
                transform: scale(0.01);
              }
            }
            .flip-button {
              position: relative;
              transform-style: preserve-3d;
              transition: transform 0.6s;
            }
            .flip-button:hover {
              transform: rotateX(360deg);
            }
            .flip-button:hover .button-front {
              background-color: #1b1b1b;
              color: #fff;
            }
          `}</style>
            <img
              src={cendySaputraLogo}
              alt="Cendy Saputra"
              className="cendy-logo"
              style={{
                display: "block",
                marginLeft: "auto",
                position: "relative",
                right: "-40px",
                opacity: 0,
                animation: "fadeInUp 0.8s cubic-bezier(0.77, 0, 0.175, 1) 0.7s forwards",
              }}
            />

            {/* View Project Button */}
            <div
              style={{
                margin: "40px auto 0",
                width: "fit-content",
                opacity: 0,
                animation: "fadeInUp 0.8s cubic-bezier(0.77, 0, 0.175, 1) 1.2s forwards",
              }}
            >
              <button
                className="pill-button"
                style={{
                  position: "relative",
                  border: "2px solid #1b1b1b",
                  borderRadius: "50px",
                  fontFamily: "'Mona Sans', sans-serif",
                  fontWeight: 600,
                  cursor: "pointer",
                  pointerEvents: "auto",
                  overflow: "hidden",
                }}
              >
                <span className="hover-circle" />
                <span className="label-stack">
                  <span className="pill-label">View Project Now</span>
                  <span className="pill-label-hover">View Project Now</span>
                </span>
              </button>
            </div>
            <style>{`
            .pill-button {
              --pill-height: 56px;
              background-color: #FFD700 !important;
              transition: background-color 0.6s cubic-bezier(0.77, 0, 0.175, 1);
            }

            .hover-circle {
              position: absolute;
              left: 50%;
              bottom: 0;
              background-color: #1b1b1b;
              border-radius: 50%;
              pointer-events: none;
              transform: translateX(-50%) scale(0);
              transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
            }

            .label-stack {
              position: relative;
              display: inline-block;
            }

            .pill-label {
              display: block;
              color: #000;
              transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
            }

            .pill-label-hover {
              display: block;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              color: #fff;
              opacity: 0;
              transform: translateY(60px);
              transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.6s cubic-bezier(0.77, 0, 0.175, 1);
            }

            .pill-button:hover {
              background-color: #1b1b1b !important;
            }

            .pill-button:hover .hover-circle {
              transform: translateX(-50%) scale(1.2);
            }

            .pill-button:hover .pill-label {
              transform: translateY(-60px);
            }

            .pill-button:hover .pill-label-hover {
              transform: translateY(0);
              opacity: 1;
            }

            .pill-button:active {
              transform: scale(0.955);
            }
          `}</style>
          </div>
        </div>

        {/* Video Section - YouTube */}
        <div
          ref={imageRef}
          className="image-section"
          style={{
            position: "relative",
            zIndex: 100,
            padding: "0 20px 80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              maxWidth: "1440px",
              width: "100%",
              margin: "0 auto",
              padding: "16px",
              borderRadius: "20px",
              border: "1px solid #1b1b1b",
              transform: `scale(${imageScale})`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                borderRadius: "12px",
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/4obkMThkU_I?autoplay=1&mute=1&loop=1&playlist=4obkMThkU_I&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3&disablekb=1"
                style={{
                  position: "absolute",
                  top: "-60px",
                  left: 0,
                  width: "100%",
                  height: "calc(100% + 120px)",
                  border: "none",
                  borderRadius: "12px",
                  pointerEvents: "none",
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Text Section with Variable Proximity */}
        <div
          ref={textSectionRef}
          className="text-section-container"
          style={{
            position: "relative",
            zIndex: 100,
            position: "relative",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "240px 20px 40px",
          }}
        >
          <div
            ref={textContainerRef}
            style={{
              maxWidth: "1100px",
              width: "100%",
              margin: "0 auto",
              position: "relative",
              opacity: textOpacity,
              transform: `translateY(${(1 - textOpacity) * 50}px)`,
              transition: "opacity 0.1s ease-out, transform 0.1s ease-out",
            }}
          >
            <p
              className="text-section-paragraph"
              style={{
                fontFamily: "'Mona Sans Variable', 'Mona Sans', sans-serif",
                fontSize: "40px",
                lineHeight: "1.4",
                color: "#1b1b1b",
                textAlign: "center",
                margin: 0,
                cursor: "default",
                userSelect: "none",
              }}
            >
              <>
                <VariableProximity
                  label="None of the projects you see here started with a tool. Instead, they all began with a single question:"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={textContainerRef}
                  radius={100}
                  falloff="linear"
                />
                <br />
                <span
                  style={{
                    display: "inline-block",
                    position: "relative",
                  }}
                >
                  <span style={{ position: "relative", zIndex: 1 }}>
                    <VariableProximity label="'What story do we want to tell?'" fromFontVariationSettings="'wght' 400, 'opsz' 9" toFontVariationSettings="'wght' 1000, 'opsz' 40" containerRef={textContainerRef} radius={100} falloff="linear" />
                  </span>
                  <svg
                    style={{
                      position: "absolute",
                      bottom: "4px",
                      left: 0,
                      width: "100%",
                      height: "8px",
                      transformOrigin: "left",
                      transform: `scaleX(${textOpacity})`,
                      transition: "transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)",
                      overflow: "visible",
                      zIndex: 0,
                    }}
                    viewBox="0 0 100 8"
                    preserveAspectRatio="none"
                  >
                    <path d="M 0,4 Q 5,2 10,3.5 T 20,4 Q 25,5 30,3.8 T 40,4.2 Q 45,3 50,4.5 T 60,3.8 Q 65,5 70,4 T 80,4.3 Q 85,3 90,4.2 T 100,4" fill="none" stroke="#F04F23" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </>
            </p>
          </div>
        </div>
        <style>{`
          /* Responsive Text Section */
          .text-section-paragraph {
            font-size: 40px;
          }
          @media (max-width: 1199px) {
            .text-section-paragraph {
              font-size: 36px !important;
            }
          }
          @media (max-width: 767px) {
            .text-section-paragraph {
              font-size: 28px !important;
            }
          }
          @media (max-width: 480px) {
            .text-section-paragraph {
              font-size: 24px !important;
            }
          }
        `}</style>

        {/* Running Text Section */}
        {/* Curved Text Section */}
        <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", paddingBottom: "40px" }}>
            <CurvedLoop 
              marqueeText="UI/UX • Graphic Design • 3D Modeling • Wordpress Developer • Frontend Web Developer" 
              speed={0.7} 
              curveAmount={600} 
              interactive={false}
              textColor="#f5f5f5"
            />
        </div>

        {/* Two Column Section */}
        <div
          ref={twoColumnSectionRef}
          style={{
            position: "relative",
            zIndex: 100,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "120px 20px",
          }}
          className="two-column-section"
        >
          <div
            style={{
              maxWidth: "1440px",
              width: "100%",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "end",
              height: "100%",
            }}
            className="two-column-grid"
          >
            {/* Left Column - Text */}
            <div
              ref={arrowRef}
              style={{
                width: "100%",
                alignSelf: "start",
                paddingTop: "0",
              }}
            >
              <p
                style={{
                  fontFamily: "'Mona Sans', sans-serif",
                  fontSize: "40px",
                  lineHeight: "1.4",
                  color: "#1b1b1b",
                  margin: 0,
                }}
                className="two-column-text"
              >
                Here are the answers we found.
                <br />
                Each work is a visual chapter where narrative and technology unite into an unforgettable experience.
              </p>

              {/* Arrow with Linear Draw Animation */}
              <div
                style={{
                  marginTop: "40px",
                  width: "110px",
                  height: "45px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <svg
                  width="110"
                  height="45"
                  viewBox="0 0 110 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <defs>
                    <clipPath id="arrowClip">
                      <rect
                        x="0"
                        y="0"
                        width={arrowVisible ? "110" : "0"}
                        height="45"
                        style={{
                          transition: "width 1.2s cubic-bezier(0.77, 0, 0.175, 1)",
                        }}
                      />
                    </clipPath>
                  </defs>
                  <g clipPath="url(#arrowClip)">
                    <path
                      d="M85.3404 0C86.6065 0.000810169 87.6338 1.0087 87.643 2.25458V2.25754C87.6432 2.26646 87.6428 2.28819 87.6445 2.32111C87.6479 2.38847 87.6575 2.50399 87.6745 2.66263C87.7088 2.98165 87.7799 3.47291 87.9295 4.09225C88.2289 5.33086 88.8388 7.08095 90.0806 9.01242C92.4556 12.7061 97.2963 17.3004 107.315 20.1493C108.473 19.9558 109.613 20.6586 109.924 21.7992C109.987 22.0337 110.009 22.2699 109.997 22.5C110.009 22.7301 109.987 22.9663 109.924 23.2008C109.626 24.2917 108.571 24.9796 107.466 24.8684C107.287 24.9256 107.098 24.9599 106.902 24.9719C97.1633 27.8285 92.4227 32.345 90.0806 35.9876C88.8388 37.919 88.2289 39.6691 87.9295 40.9077C87.7799 41.5271 87.7088 42.0183 87.6745 42.3374C87.6575 42.496 87.6479 42.6115 87.6445 42.6789C87.6428 42.7118 87.6432 42.7335 87.643 42.7425V42.7454C87.6338 43.9913 86.6065 44.9992 85.3404 45C84.0681 45 83.0351 43.983 83.0348 42.7292H85.0929C83.0348 42.729 83.0333 42.7247 83.0333 42.7247L83.0348 42.7129C83.0348 42.7066 83.0347 42.6988 83.0348 42.6907C83.035 42.6748 83.0357 42.6556 83.0363 42.6331C83.0374 42.5866 83.0385 42.5247 83.0423 42.4512C83.0498 42.3044 83.0653 42.1048 83.0918 41.8584C83.1448 41.365 83.2477 40.6811 83.4473 39.8551C83.8468 38.2024 84.6348 35.9727 86.1879 33.5571C88.0353 30.6838 90.9096 27.6327 95.3414 24.9793H25.3452C24.0726 24.9793 23.0411 23.9626 23.0411 22.7085C23.0411 21.4543 24.0726 20.4376 25.3452 20.4376H96.0569C91.2162 17.69 88.1329 14.468 86.1879 11.4429C84.6348 9.02727 83.8468 6.79764 83.4473 5.14488C83.2477 4.31889 83.1448 3.63503 83.0918 3.14163C83.0653 2.89516 83.0498 2.69563 83.0423 2.54879C83.0385 2.47532 83.0374 2.41338 83.0363 2.36694C83.0357 2.3444 83.035 2.32515 83.0348 2.30928C83.0347 2.30118 83.0348 2.29343 83.0348 2.28711L83.0333 2.27528C83.0333 2.27528 83.0348 2.27103 85.0929 2.27085H83.0348C83.0351 1.01696 84.0681 4.03363e-05 85.3404 0Z"
                      fill="#F04F23"
                    />
                    <path d="M14.5927 20.4376C15.8652 20.4376 16.8968 21.4543 16.8968 22.7085C16.8968 23.9626 15.8652 24.9793 14.5927 24.9793H2.30411C1.03158 24.9793 0 23.9626 0 22.7085C0 21.4543 1.03158 20.4376 2.30411 20.4376H14.5927Z" fill="#F04F23" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Right Column - Folder */}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                paddingRight: "100px",
                paddingBottom: "0",
              }}
            >
              <div
                ref={folderRef}
                style={{
                  width: "fit-content",
                  height: "fit-content",
                  pointerEvents: "auto",
                }}
              >
                <Folder
                  color="#ff4000"
                  size={1.9}
                  className="custom-folder"
                  open={folderOpen}
                  items={[
                    <img key="left" src={folderImgLeft} alt="Left" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "10px" }} />,
                    <img key="center" src={folderImgCenter} alt="Center" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "10px" }} />,
                    <img key="right" src={folderImgRight} alt="Right" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "10px" }} />,
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        <style>{`
          /* Two Column Responsive */
          .two-column-text {
            font-size: 40px;
          }

          /* Custom Folder Styles - Only clickable on folder element */
          .custom-folder {
            pointer-events: auto;
          }

          .custom-folder > * {
            pointer-events: none;
          }

          .custom-folder .folder {
            pointer-events: auto;
          }

          @media (max-width: 1199px) {
            .two-column-text {
              font-size: 36px !important;
            }
          }
          @media (max-width: 767px) {
            .two-column-grid {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
            .two-column-text {
              font-size: 28px !important;
            }
            .two-column-section {
              min-height: auto !important;
              padding: 80px 20px !important;
            }
          }
          @media (max-width: 480px) {
            .two-column-text {
              font-size: 24px !important;
            }
          }
        `}</style>
      </div>



      {/* SVG Text Drawing Section */}
      <SvgTextDraw />

      {/* Footer - floating di bawah */}
      <Footer onOpenPopup={handleTogglePopup} />
    </>
  );
}

export default App;

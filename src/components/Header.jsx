import { useState } from 'react';
import logoCense from '../assets/images/logo-cense.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkStyle = {
    color: '#333',
    textDecoration: 'none',
    fontFamily: 'Mona Sans',
    fontSize: '16px',
    fontWeight: 500,
    position: 'relative',
    paddingBottom: '4px'
  };

  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} style={{ transitionDelay: `${0.5 + index * 0.03}s` }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      backgroundColor: 'transparent'
    }}>
      <style>{`
        .menu-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background-color: #F04F23;
          transition: width 0.3s ease;
        }
        .menu-link:hover::after {
          width: 100%;
        }
        .header-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 24px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 102;
        }
        @media (min-width: 768px) {
          .header-container {
            padding: 24px;
          }
        }
        @media (min-width: 1200px) {
          .header-container {
            padding: 24px 0;
          }
        }
        .logo-cense {
          width: 100px;
          height: auto;
        }
        @media (min-width: 1200px) {
          .logo-cense {
            width: 132px;
          }
        }

        /* Hamburger Button */
        .hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          z-index: 101;
          position: relative;
          width: 40px;
          height: 40px;
        }
        .hamburger span {
          width: 24px;
          height: 2px;
          background-color: #1b1b1b;
          transition: all 0.3s ease;
          position: absolute;
        }
        .hamburger span:nth-child(1) {
          top: 11px;
        }
        .hamburger span:nth-child(2) {
          top: 19px;
        }
        .hamburger span:nth-child(3) {
          top: 27px;
        }
        .hamburger.open span:nth-child(1) {
          top: 19px;
          transform: rotate(45deg);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open span:nth-child(3) {
          top: 19px;
          transform: rotate(-45deg);
        }
        @media (min-width: 1200px) {
          .hamburger {
            display: none;
          }
        }

        /* Desktop Nav */
        .desktop-nav {
          display: none;
        }
        @media (min-width: 1200px) {
          .desktop-nav {
            display: flex;
            gap: 40px;
          }
        }

        /* Mobile Flyout Menu - Circle Expand Animation */
        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          width: 100vw;
          height: 100vh;
          z-index: 100;
          pointer-events: none;
          overflow: hidden;
        }
        .mobile-menu::before {
          content: '';
          position: absolute;
          top: 32px;
          right: 16px;
          width: 48px;
          height: 48px;
          background-color: #fff;
          border-radius: 50%;
          transform: scale(0);
          transform-origin: center;
          transition: transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        @media (min-width: 768px) {
          .mobile-menu::before {
            top: 40px;
            right: 24px;
          }
        }
        .mobile-menu.open {
          pointer-events: auto;
        }
        .mobile-menu.open::before {
          transform: scale(50);
          transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
        }
        .mobile-menu:not(.open)::before {
          transition: transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .mobile-menu-content {
          position: relative;
          z-index: 101;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          gap: 40px;
          padding: 0 40px;
        }
        .mobile-menu a {
          color: #1b1b1b;
          text-decoration: none;
          font-family: 'Mona Sans', sans-serif;
          font-size: 48px;
          font-weight: 700;
          position: relative;
          overflow: hidden;
          display: inline-block;
        }
        @media (max-width: 480px) {
          .mobile-menu a {
            font-size: 36px;
          }
        }
        .mobile-menu a span {
          display: inline-block;
          transform: translateY(100%);
          transition: transform 0.5s cubic-bezier(0.77, 0, 0.175, 1);
        }
        .mobile-menu.open a span {
          transform: translateY(0);
        }
        .mobile-menu:not(.open) a span {
          transition: none;
          transform: translateY(100%);
        }
        @media (min-width: 1200px) {
          .mobile-menu {
            display: none;
          }
        }

        /* Overlay */
        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 99;
          opacity: 0;
          pointer-events: none;
          transition: opacity 1s ease;
        }
        .menu-overlay.open {
          opacity: 1;
          pointer-events: auto;
          transition: opacity 0.3s ease;
        }
        @media (min-width: 1200px) {
          .menu-overlay {
            display: none;
          }
        }
      `}</style>
      {/* Overlay */}
      <div
        className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div className="header-container">
        {/* Logo KIRI */}
        <img
          src={logoCense}
          alt="Logo CENSE"
          className="logo-cense"
        />

        {/* Hamburger Button - Mobile/Tablet */}
        <button
          className={`hamburger ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <a href="#home" className="menu-link" style={linkStyle}>Home</a>
          <a href="#about" className="menu-link" style={linkStyle}>About Us</a>
          <a href="#portfolio" className="menu-link" style={linkStyle}>Portfolio</a>
          <a href="#kontak" className="menu-link" style={linkStyle}>Kontak</a>
        </nav>
      </div>

      {/* Mobile Flyout Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <a href="#home" onClick={() => setIsMenuOpen(false)}>
            {splitText('Home')}
          </a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>
            {splitText('About Us')}
          </a>
          <a href="#portfolio" onClick={() => setIsMenuOpen(false)}>
            {splitText('Portfolio')}
          </a>
          <a href="#kontak" onClick={() => setIsMenuOpen(false)}>
            {splitText('Kontak')}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

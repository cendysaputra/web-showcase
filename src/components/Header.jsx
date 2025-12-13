import logoCense from '../assets/images/logo-cense.png';

const Header = () => {
  const linkStyle = {
    color: '#333',
    textDecoration: 'none',
    fontFamily: 'Mona Sans',
    fontSize: '16px',
    fontWeight: 500,
    position: 'relative',
    paddingBottom: '4px'
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
      `}</style>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '24px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo KIRI */}
        <img
          src={logoCense}
          alt="Logo CENSE"
          style={{ width: '140px', height: 'auto' }}
        />

        {/* Menu KANAN */}
        <nav style={{ display: 'flex', gap: '40px' }}>
          <a href="#home" className="menu-link" style={linkStyle}>Home</a>
          <a href="#about" className="menu-link" style={linkStyle}>About Us</a>
          <a href="#portfolio" className="menu-link" style={linkStyle}>Portfolio</a>
          <a href="#kontak" className="menu-link" style={linkStyle}>Kontak</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

function Footer() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 102
      }}
    >
      <style>{`
        .footer-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 24px 16px;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        @media (min-width: 768px) {
          .footer-container {
            padding: 24px;
          }
        }
        @media (min-width: 1200px) {
          .footer-container {
            padding: 24px 0;
          }
        }
        .footer-text {
          margin: 0;
          padding: 0;
          font-size: 14px;
          color: #1b1b1b;
          font-family: Mona Sans, sans-serif;
          line-height: 1;
        }
        @media (min-width: 1200px) {
          .footer-text {
            font-size: 16px;
          }
        }
      `}</style>
      <div className="footer-container">
        <p className="footer-text">
          © 2025 All rights reserved
        </p>
        <p className="footer-text">
          HelloWorld
        </p>
      </div>
    </div>
  )
}

export default Footer

function Footer({ onOpenPopup }) {
  const handleInfoClick = (e) => {
    const rect = e.target.getBoundingClientRect()
    const position = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }
    onOpenPopup(position)
  }

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
          font-size: 12px;
          color: #1b1b1b;
          font-family: Mona Sans, sans-serif;
          line-height: 1;
        }
        @media (min-width: 1200px) {
          .footer-text {
            font-size: 16px;
          }
        }
        .info-footer {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .info-link {
          cursor: pointer;
          transition: opacity 0.3s ease;
        }
        .info-link:hover {
          opacity: 0.7;
        }
        .footer-divider {
          margin: 0;
          padding: 0;
        }
      `}</style>
      <div className="footer-container">
        <p className="footer-text">
          © 2025 All rights reserved
        </p>
        <div className="info-footer">
          <p className="footer-text info-link" onClick={handleInfoClick}>
            What is an Ruang Artefak?
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer

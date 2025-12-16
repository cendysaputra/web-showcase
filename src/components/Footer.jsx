function Footer() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '24px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline'
        }}
      >
        <p style={{ margin: 0, padding: 0, fontSize: '16px', color: '#1b1b1b', fontFamily: 'Mona Sans, sans-serif', lineHeight: 1 }}>
          © 2025 All rights reserved
        </p>
        <p style={{ margin: 0, padding: 0, fontSize: '16px', color: '#1b1b1b', fontFamily: 'Mona Sans, sans-serif', lineHeight: 1 }}>
          hello world
        </p>
      </div>
    </div>
  )
}

export default Footer

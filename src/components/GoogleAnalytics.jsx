import { useEffect } from 'react';

const GoogleAnalytics = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    // Hanya load Google Analytics jika measurement ID tersedia
    if (!measurementId) {
      console.warn('Google Analytics Measurement ID tidak ditemukan di environment variables');
      return;
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script1);

    // Initialize Google Analytics
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}', {
        send_page_view: true
      });
    `;
    document.head.appendChild(script2);

    // Cleanup function
    return () => {
      // Hapus scripts saat component unmount (optional)
      if (script1.parentNode) script1.parentNode.removeChild(script1);
      if (script2.parentNode) script2.parentNode.removeChild(script2);
    };
  }, [measurementId]);

  return null; // Komponen ini tidak render apapun
};

export default GoogleAnalytics;

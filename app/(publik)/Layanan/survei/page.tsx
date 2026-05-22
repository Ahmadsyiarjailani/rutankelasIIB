"use client";

import React, { useState } from 'react';

export default function SurveiLayanan() {
  const [isHover, setIsHover] = useState(false);

  const containerStyle = {
    padding: '60px 0',
    fontFamily: '"Roboto", Arial, sans-serif',
    backgroundColor: '#ffffff',
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
  };

  const wrapperStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 24px',
    width: '100%',
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #f1f5f9',
    boxShadow: '0 4px 25px rgba(0, 0, 0, 0.03)',
    display: 'grid',
    gridTemplateColumns: '1fr',
    overflow: 'hidden',
  };

  const sidePanelStyle = {
    background: 'linear-gradient(135deg, #093b77 0%, #052347 100%)',
    color: '#ffffff',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center' as const,
    position: 'relative' as const,
    fontFamily: '"Roboto", Arial, sans-serif',
  };

  const iconContainerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '80px',
    height: '80px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
    fontSize: '32px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  };

  const contentPanelStyle = {
    padding: '50px 40px',
  };

  const headerTitleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#093b77',
    marginBottom: '12px',
    fontFamily: '"Roboto", Arial, sans-serif',
  };

  const headerSubStyle = {
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '32px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: '"Roboto", Arial, sans-serif',
  };

  const textContainerStyle = {
    color: '#475569',
    fontSize: '15px',
    lineHeight: '1.85',
    fontFamily: '"Roboto", Arial, sans-serif',
  };

  const paragraphStyle = {
    marginBottom: '20px',
  };

  const linkBoxStyle = {
    margin: '40px 0 0 0',
  };

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    backgroundColor: isHover ? '#052347' : '#093b77',
    color: '#ffffff',
    padding: '16px 32px',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '16px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(9, 59, 119, 0.15)',
    transform: isHover ? 'translateY(-2px)' : 'translateY(0)',
    fontFamily: '"Roboto", Arial, sans-serif',
  };

  const arrowIconStyle = {
    transition: 'transform 0.3s ease',
    transform: isHover ? 'translateX(4px)' : 'translateX(0)',
  };

  const footerTextStyle = {
    color: '#64748b',
    fontSize: '14px',
    lineHeight: '1.6',
    borderTop: '1px solid #f1f5f9',
    paddingTop: '24px',
    marginTop: '32px',
    fontFamily: '"Roboto", Arial, sans-serif',
  };

  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        <div className="survei-grid-card" style={cardStyle}>
          
          <div style={sidePanelStyle}>
            <div style={iconContainerStyle}>
              <i className="fa-solid fa-square-poll-horizontal"></i>
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '12px', margin: 0, fontFamily: '"Roboto", Arial, sans-serif' }}>Survei Mandiri</h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: '8px 0 0 0', lineHeight: '1.5', maxWidth: '240px', fontFamily: '"Roboto", Arial, sans-serif' }}>
              Membangun perbaikan dan peningkatan layanan rutan yang bersih dan berintegritas.
            </p>
          </div>

          <div style={contentPanelStyle}>
            <h1 style={headerTitleStyle}>Survei Kepuasan Masyarakat</h1>
            <div style={headerSubStyle}>
              <i className="fa-solid fa-calendar-days" style={{ color: '#093b77' }}></i>
              <span>Periode: <strong>Mei 2026</strong></span>
            </div>

            <div style={textContainerStyle}>
              <p style={{ ...paragraphStyle, fontWeight: 'bold', color: '#093b77', fontSize: '16px' }}>
                Assalamualaikum Warahmatullahi Wabarakatuh
              </p>
              <p style={paragraphStyle}>
                Dalam rangka memberikan pelayanan publik yang berkualitas kepada masyarakat, perlu dilaksanakan survei untuk mengukur tingkat kepuasan masyarakat sebagai pengguna layanan Rutan Kelas II Sinjai.
              </p>
              <p style={{ ...paragraphStyle, margin: 0 }}>
                Kami meminta partisipasi Bapak/Ibu dalam pengisian <strong>Survei Mandiri Persepsi Anti Korupsi</strong> dan <strong>Survei Persepsi Kualitas Pelayanan</strong> melalui tautan resmi di bawah ini:
              </p>
            </div>

            <div style={linkBoxStyle}>
              <a 
                href="https://star-survei3a.kemenimipas.go.id/ly/PTZN9Xyo" 
                target="_blank" 
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                style={buttonStyle}
              >
                <span>Mulai Pengisian Survei</span>
                <i className="fa-solid fa-arrow-right" style={arrowIconStyle}></i>
              </a>
            </div>

            <div style={footerTextStyle}>
              <p style={{ marginBottom: '8px', fontWeight: 'bold', color: '#093b77' }}>
                Sebelumnya kami ucapkan terima kasih atas partisipasi Bapak/Ibu.
              </p>
              <p style={{ margin: 0, color: '#64748b', fontStyle: 'italic' }}>
                Partisipasi Bapak/Ibu/Saudara berarti dalam membangun perbaikan dan peningkatan layanan kami.
              </p>
            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 768px) {
          .survei-grid-card {
            grid-template-columns: 320px 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
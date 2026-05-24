"use client";
import React from 'react';

export default function MarsKeminipasPage() {
  const textStyle: React.CSSProperties = {
    fontSize: '1.1rem',
    lineHeight: '2',
    color: '#333',
    fontWeight: '500',
    marginBottom: '15px'
  };

  return (
    <div className="container" style={{ 
      padding: '60px 20px', 
      margin: '0 auto', 
      maxWidth: '800px', 
      textAlign: 'center',
      fontFamily: 'sans-serif' 
    }}>
      <h1 style={{ color: '#093b77', marginBottom: '40px' }}>Mars Kementerian Imigrasi dan Pemasyarakatan</h1>
      
      <div style={textStyle}>
        <p>SATUKAN VISI, MELANGKAH DENGAN BERANI</p>
        <p>‘TUK MENGGAPAI CITA MULIA</p>
        <p>JUNJUNG KEADILAN, WUJUDKAN RASA AMAN</p>
        <p>DI ATAS TANAH BUMI PERTIWI</p>
        <br />
        <p>KEMENTERIAN IMIGRASI DAN PEMASYARAKATAN</p>
        <p>REPUBLIK INDONESIA</p>
        <br />
        <p>GARDA TERDEPAN MENJAGA KEDAULATAN</p>
        <p>MENGAWASI DAN MENGAYOMI</p>
        <p>BERWIBAWA, BERINTEGRITAS</p>
        <p>TERHORMAT DAN TERPERCAYA</p>
        <br />
        <p>PEDULI, MENDAMPINGI</p>
        <p>TANGGUH HADAPI RINTANGAN</p>
        <br />
        <p>KAMI SIAP ‘TUK MENGABDI</p>
        <p>MENJAGA DAN MELINDUNGI</p>
        <p>SELURUH JIWA RAGA KAMI</p>
        <p>UNTUK NEGARA</p>
        <br />
        <p>KAMI SIAP ‘TUK BERBAKTI</p>
        <p>MENUNTUN DAN MELAYANI</p>
        <p>BERIKAN YANG TERBAIK</p>
        <p>UNTUK NEGARA</p>
        <br />
        <p>KEMENTERIAN IMIGRASI DAN PEMASYARAKATAN</p>
        <p>REPUBLIK INDONESIA</p>
      </div>
    </div>
  );
}
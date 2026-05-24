"use client";
import React from 'react';

export default function TugasFungsiPage() {
  return (
    <div className="container" style={{ padding: '60px 0', lineHeight: '1.8', color: '#333' }}>
      <h1 style={{ color: '#093b77', marginBottom: '30px' }}>Tugas Pokok dan Fungsi Kementerian Imigrasi dan Pemasyarakatan</h1>
      
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#093b77', marginBottom: '15px' }}>Tugas</h2>
        <p style={{ fontSize: '1.1rem', fontStyle: 'italic', padding: '15px', backgroundColor: '#f9f9f9'}}>
          "Kementerian mempunyai tugas menyelenggarakan suburusan pemerintahan di bidang imigrasi dan pemasyarakatan yang merupakan lingkup urusan pemerintahan di bidang hukum untuk membantu Presiden dalam menyelenggarakan pemerintahan negara."
        </p>
      </section>

      <section>
        <h2 style={{ color: '#093b77', marginBottom: '15px' }}>Fungsi</h2>
        <p style={{ marginBottom: '20px' }}>
          Dalam melaksanakan tugas sebagaimana dimaksud dalam Pasal 5 Peraturan Menteri Imigrasi dan Pemasyarakatan Nomor 1 Tahun 2024, Kementerian Imigrasi dan Pemasyarakatan menyelenggarakan fungsi:
        </p>
        <ul style={{ paddingLeft: '20px', fontSize: '1rem' }}>
          <li style={{ marginBottom: '8px' }}>Perumusan, penetapan dan pelaksanaan kebijakan di bidang keimigrasian dan pemasyarakatan.</li>
          <li style={{ marginBottom: '8px' }}>Pelaksanaan bimbingan teknis, dan supervisi atas pelaksanaan urusan keimigrasian dan pemasyarakatan di daerah.</li>
          <li style={{ marginBottom: '8px' }}>Koordinasi pelaksanaan tugas, pembinaan dan pemberian dukungan administrasi kepada seluruh unsur organisasi di lingkungan Kementerian.</li>
          <li style={{ marginBottom: '8px' }}>Pengelolaan barang milik negara/kekayaan negara yang menjadi tanggung jawab Kementerian.</li>
          <li style={{ marginBottom: '8px' }}>Pengawasan atas pelaksanaan tugas di lingkungan Kementerian.</li>
          <li style={{ marginBottom: '8px' }}>Pelaksanaan pengembangan sumber daya manusia di bidang keimigrasian dan pemasyarakatan.</li>
          <li style={{ marginBottom: '8px' }}>Pelaksanaan kegiatan teknis yang berskala nasional.</li>
          <li style={{ marginBottom: '8px' }}>Pelaksanaan tugas pokok sampai ke daerah.</li>
          <li style={{ marginBottom: '8px' }}>Pelaksanaan dukungan yang bersifat substantif kepada seluruh unsur organisasi di lingkungan Kementerian Imigrasi dan Pemasyarakatan.</li>
          <li style={{ marginBottom: '8px' }}>Pelaksanaan fungsi lain yang diberikan oleh Presiden.</li>
        </ul>
      </section>
    </div>
  );
}
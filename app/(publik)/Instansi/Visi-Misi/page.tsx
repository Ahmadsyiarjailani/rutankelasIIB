"use client";
import React from 'react';

export default function VisiMisiPage() {
  return (
    <div className="container" style={{ padding: '60px 0', lineHeight: '1.8', color: '#333' }}>
      <h1 style={{ color: '#093b77', marginBottom: '30px' }}>Visi dan Misi</h1>
      
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#093b77', marginBottom: '15px' }}>Visi</h2>
        <p style={{ fontSize: '1.1rem', fontWeight: '500', fontStyle: 'italic' }}>
          "Terwujudnya Penegakan Hukum dan Pelayanan Keimigrasian dan Pemasyarakatan untuk Stabilitas Keamanan yang Tangguh menuju Indonesia Emas 2045"
        </p>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#093b77', marginBottom: '15px' }}>Misi</h2>
        <ul style={{ paddingLeft: '20px', fontSize: '1rem' }}>
          <li style={{ marginBottom: '10px' }}>
            Mewujudkan Penegakan Hukum dan pelayanan serta jaminan pelindungan Imigrasi dan Pemasyarakatan yang transparan dan berkeadilan.
          </li>
          <li style={{ marginBottom: '10px' }}>
            Meningkatkan kapasitas kelembagaan Imigrasi dan Pemasyarakatan yang modern, profesional, dan berintegritas.
          </li>
        </ul>
      </section>

      <section>
        <h2 style={{ color: '#093b77', marginBottom: '15px' }}>Tujuan</h2>
        <ul style={{ paddingLeft: '20px', fontSize: '1rem' }}>
          <li style={{ marginBottom: '10px' }}>
            Menciptakan penegakan dan pelayanan hukum untuk mendukung kedaulatan negara serta reintegrasi sosial secara transparan dan berkeadilan.
          </li>
          <li style={{ marginBottom: '10px' }}>
            Menciptakan sistem keimigrasian dan pemasyarakatan yang modern, terintegrasi dan akuntabel melalui peningkatan kompetensi dan profesionalisme sumber daya manusia yang berintegritas, responsif dan adaptif di bidang Imigrasi dan Pemasyarakatan.
          </li>
        </ul>
      </section>
    </div>
  );
}
"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';

const supabase = createClient(
  'https://xnwqcxaehvaqxzodqidc.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhud3FjeGFlaHZhcXh6b2RxaWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0OTE4NDAsImV4cCI6MjA4NTA2Nzg0MH0.RLjUPr-7Qez5gUcAQUOJ-3TPPIf_CfGeOE2gSKqHz7s'
);

export default function PengaduanPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHover, setIsHover] = useState(false);
  
  const [namaPelapor, setNamaPelapor] = useState('');
  const [kontak, setKontak] = useState('');
  const [isiPengaduan, setIsiPengaduan] = useState('');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loading(true);

    try {
      const { error } = await supabase
        .from('daftar_pengaduan')
        .insert([
          { 
            pelapor: namaPelapor, 
            kontak: kontak, 
            isi: isiPengaduan    
          }
        ]);

      if (error) throw error;

      alert("Laporan Anda telah berhasil terkirim!");
      setNamaPelapor('');
      setKontak('');
      setIsiPengaduan('');

    } catch (error: any) {
      console.error(error);
      alert("Gagal mengirim! Pastikan tabel 'daftar_pengaduan' sudah benar di Supabase.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: '60px 20px', backgroundColor: '#ffffff', minHeight: '70vh', fontFamily: '"Roboto", Arial, sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ background: '#ffffff', padding: isMobile ? '30px 20px' : '50px 40px', borderRadius: '16px', boxShadow: '0 4px 25px rgba(0, 0, 0, 0.03)', border: '1px solid #f1f5f9' }}
        >
          <h2 style={{ textAlign: 'center', color: '#093b77', marginBottom: '35px', fontWeight: 'bold', fontSize: '28px', fontFamily: '"Roboto", Arial, sans-serif' }}>Layanan Pengaduan Publik</h2>
          
          <form onSubmit={handleSubmit} style={{ fontFamily: '"Roboto", Arial, sans-serif' }}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#093b77', fontSize: '15px' }}>Nama Lengkap Pelapor:</label>
              <input type="text" required value={namaPelapor} onChange={(e) => setNamaPelapor(e.target.value)} style={{ width: '100%', padding: '14px 16px', border: '1px solid #e2e8f0', borderRadius: '12px', outline: 'none', fontSize: '15px', color: '#475569', fontFamily: '"Roboto", Arial, sans-serif', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#093b77', fontSize: '15px' }}>Email / No. HP (Kontak):</label>
              <input type="text" required value={kontak} onChange={(e) => setKontak(e.target.value)} style={{ width: '100%', padding: '14px 16px', border: '1px solid #e2e8f0', borderRadius: '12px', outline: 'none', fontSize: '15px', color: '#475569', fontFamily: '"Roboto", Arial, sans-serif', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#093b77', fontSize: '15px' }}>Isi Detail Pengaduan:</label>
              <textarea required value={isiPengaduan} onChange={(e) => setIsiPengaduan(e.target.value)} style={{ width: '100%', padding: '14px 16px', border: '1px solid #e2e8f0', borderRadius: '12px', minHeight: '160px', outline: 'none', fontSize: '15px', color: '#475569', fontFamily: '"Roboto", Arial, sans-serif', boxSizing: 'border-box', resize: 'vertical', lineHeight: '1.6' }}></textarea>
            </div>

            <button type="submit" disabled={loading} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
              style={{ width: '100%', padding: '16px 32px', backgroundColor: loading ? '#94a3b8' : (isHover ? '#052347' : '#093b77'), color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(9, 59, 119, 0.15)', transform: isHover && !loading ? 'translateY(-2px)' : 'translateY(0)', fontFamily: '"Roboto", Arial, sans-serif' }}>
              {loading ? 'Sedang Mengirim...' : 'Kirim Laporan Pengaduan'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
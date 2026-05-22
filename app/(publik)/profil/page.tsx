"use client";

import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { supabase } from '../../../lib/supabase';

export default function ProfilPage() {
  const navy = '#0b2d57';

  const [pejabat, setPejabat] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPejabat();
  }, []);

  const fetchPejabat = async () => {
    try {
      const { data, error } = await supabase
        .from('daftar_pejabat')
        .select('*')
        .order('urutan', { ascending: true });

      if (error) throw error;
      setPejabat(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <div style={{ padding: '60px 0', backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: '"Roboto", Arial, sans-serif' }}>
      <style>{`
        .grid-pejabat {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 25px;
          padding: 20px;
        }

        @media (max-width: 640px) {
          .grid-pejabat {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            padding: 10px;
          }
          .card-text-name { font-size: 13px !important; }
          .card-text-pos { font-size: 10px !important; }
        }

        .card-pejabat-item {
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
          border: 1px solid #f1f5f9;
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), 
                      box-shadow 0.5s ease, 
                      border-color 0.5s ease;
          transform: scale(1);
          cursor: pointer;
          position: relative;
          z-index: 1;
        }

        .card-pejabat-item:hover {
          transform: scale(1.03);
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
          border-color: #e2e8f0;
          z-index: 10;
        }

        .card-pejabat-item:active {
          transform: scale(1);
          box-shadow: none;
          border-color: #cbd5e1;
          transition: all 0.1s ease;
        }

        .img-area {
          position: relative;
          width: 100%;
          aspect-ratio: 1/1; 
          overflow: hidden;
          background: #f8fafc;
        }

        .img-pejabat {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top; 
        }

        .wave-bottom {
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          line-height: 0;
        }

        .custom-section-title {
          color: #093b77;
          font-size: 26px;
          font-weight: bold;
          margin-bottom: 7px;
          font-family: "Roboto", Arial, sans-serif;
          text-align: center;
        }

        .profile-desc-p {
          font-size: 15px;
          color: #475569;
          line-height: 1.85;
          margin-bottom: 20px;
          text-align: justify;
          font-family: "Roboto", Arial, sans-serif;
        }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '60px' }}
        >
          <h2 className="custom-section-title">Profil Rumah Tahanan Negara</h2>
          <div style={{ width: '50px', height: '4px', background: '#ddb309', margin: '12px auto 25px', borderRadius: '2px' }}></div>
          
          <div style={{ marginTop: '20px' }}>
            <p className="profile-desc-p">
              Rumah Tahanan Negara (Rutan) merupakan unit pelaksana teknis di bawah Direktorat Jenderal Pemasyarakatan Kementerian Hukum dan Hak Asasi Manusia yang mempunyai tugas pokok untuk melaksanakan pemasyarakatan narapidana dan tahanan. Rutan berfungsi sebagai tempat penahanan sementara bagi tersangka atau terdakwa selama proses penyidikan, penuntutan, and pemeriksaan di sidang pengadilan.
            </p>
            <p className="profile-desc-p">
              Dalam menjalankan tugasnya, Rutan berkomitmen penuh untuk menyelenggarakan pelayanan, perawatan, serta pengelolaan tata tertib secara profesional dan transparan. Melalui penyediaan sarana dan prasarana yang memadai serta program pembinaan kepribadian maupun kemandirian, seluruh warga binaan diarahkan agar siap berintegrasi kembali secara sehat di tengah-tengah kehidupan masyarakat.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '30px', marginTop: '60px' }}
        >
          <h1 className="custom-section-title">Profil Pejabat Structural</h1>
          <div style={{ width: '50px', height: '4px', background: '#ddb309', margin: '12px auto 0', borderRadius: '2px' }}></div>
        </motion.div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px', color: '#093b77', fontWeight: 'bold', fontFamily: '"Roboto", Arial, sans-serif' }}>Memuat data...</div>
        ) : (
          <motion.div 
            className="grid-pejabat"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {pejabat.map((p, index) => (
              <motion.div 
                key={p.id || index} 
                className="card-pejabat-item"
                variants={itemVariants}
              >
                <div className="img-area">
                  <img 
                    className="img-pejabat"
                    src={p.foto || "https://via.placeholder.com/400x400"} 
                    alt={p.nama} 
                  />
                  <div className="wave-bottom">
                    <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '40px', width: '100%' }}>
                      <path 
                        d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" 
                        style={{ stroke: 'none', fill: '#ffffff' }}
                      ></path>
                    </svg>
                  </div>
                </div>
                
                <div style={{ padding: '12px 10px 18px', textAlign: 'center', fontFamily: '"Roboto", Arial, sans-serif' }}>
                  <h3 className="card-text-name" style={{ fontSize: '1rem', color: '#093b77', fontWeight: 'bold', marginBottom: '4px', lineHeight: '1.2', fontFamily: '"Roboto", Arial, sans-serif' }}>
                    {p.nama}
                  </h3>
                  <p className="card-text-pos" style={{ fontSize: '11px', color: '#64748b', marginBottom: '0', fontWeight: 'normal', letterSpacing: '0.5px', fontFamily: '"Roboto", Arial, sans-serif' }}>
                    {p.jabatan}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
"use client";
import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';

interface BannerMenuProps {
  daftarBanner: any[];
  fetchBanner: () => void;
  handleDelete: (id: number, table: string) => void;
}

export default function BannerMenu({ daftarBanner = [], fetchBanner, handleDelete }: BannerMenuProps) {
  const [uploading, setUploading] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleUploadBanner = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('banners')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('banners').getPublicUrl(fileName);
      const publicUrl = urlData.publicUrl;

      const { error: dbError } = await supabase
        .from('daftar_banner')
        .insert([{ img_url: publicUrl, created_at: new Date() }]);

      if (dbError) throw dbError;

      alert("Banner berhasil ditambahkan!");
      fetchBanner();
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#FFFFFF', borderRadius: '20px', fontFamily: '"Arial"' }}>
      <style>{`
        .btn-act:active {
          filter: brightness(0.85);
          opacity: 0.9;
          transform: scale(0.98);
        }
      `}</style>

      <div style={{ marginBottom: '35px' }}>
        <h3 style={{ color: '#093b77', fontSize: '24px', fontWeight: '700', margin: '0 0 5px 0', letterSpacing: '-0.5px' }}>
          Manajemen Banner Header
        </h3>
        <p style={{ color: '#718096', fontSize: '14px', margin: 0, letterSpacing: '-0.2px' }}>
          Upload gambar baru untuk mengganti slider di halaman depan publik.
        </p>
        
        <div style={{ marginTop: '25px' }}>
          <label 
            className="btn-act"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={{ 
              display: 'inline-block', 
              padding: '14px 24px', 
              backgroundColor: isHover ? '#072e5c' : '#093b77', 
              color: '#fff', 
              borderRadius: '12px', 
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '14px',
              letterSpacing: '-0.2px',
              transition: '0.2s',
              fontFamily: '"Arial"'
            }}
          >
            {uploading ? 'Mengunggah...' : 'Tambah Banner Baru'}
            <input 
              type="file" 
              hidden 
              accept="image/*" 
              onChange={handleUploadBanner} 
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      <div style={{ height: '1px', backgroundColor: '#EDF2F7', margin: '45px 0' }} />

      <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#093b77', marginBottom: '25px', letterSpacing: '-0.3px' }}>
        Daftar Banner Aktif
      </h4>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {daftarBanner.map((banner) => (
          <div key={banner.id} style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <img 
              src={banner.img_url} 
              alt="Banner" 
              style={{ width: '100%', height: '160px', objectFit: 'cover' }} 
            />
            <div style={{ padding: '15px', display: 'flex', justifyContent: 'flex-end', backgroundColor: '#fff', borderTop: '1px solid #F1F5F9' }}>
              <button 
                className="btn-act"
                onClick={() => handleDelete(banner.id, 'daftar_banner')}
                style={{ 
                  backgroundColor: '#FFF5F5', 
                  color: '#E53E3E', 
                  border: '1px solid #FED7D7', 
                  padding: '6px 14px', 
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '700',
                  letterSpacing: '-0.2px',
                  fontFamily: '"Arial"',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: '0.2s'
                }}
              >
                <i className="fa-solid fa-trash-can"></i>
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {daftarBanner.length === 0 && (
        <div style={{ textAlign: 'center', padding: '100px 20px', color: '#A0AEC0', fontSize: '14px', border: '1px solid #E2E8F0', borderRadius: '16px', backgroundColor: '#F8FAFC', letterSpacing: '-0.2px' }}>
          Belum ada banner yang diunggah.
        </div>
      )}
    </div>
  );
}
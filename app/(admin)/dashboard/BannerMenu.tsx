"use client";
import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';

interface BannerMenuProps {
  daftarBanner: any[];
  fetchBanner: () => void;
  handleDelete: (id: number, table: string) => void;
}

export default function BannerMenu({ daftarBanner, fetchBanner, handleDelete }: BannerMenuProps) {
  const [uploading, setUploading] = useState(false);

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
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
        <h2 style={{ color: '#093661', marginBottom: '10px' }}>Manajemen Banner Header</h2>
        <p style={{ color: '#666', fontSize: '14px' }}>Upload gambar baru untuk mengganti slider di halaman depan publik.</p>
        
        <div style={{ marginTop: '20px' }}>
          <label style={{ 
            display: 'inline-block', 
            padding: '12px 20px', 
            backgroundColor: '#093661', 
            color: '#fff', 
            borderRadius: '8px', 
            cursor: 'pointer',
            fontWeight: '600'
          }}>
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {daftarBanner.map((banner) => (
          <div key={banner.id} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <img 
              src={banner.img_url} 
              alt="Banner" 
              style={{ width: '100%', height: '150px', objectFit: 'cover' }} 
            />
            <div style={{ padding: '10px', display: 'flex', justifyContent: 'flex-end', backgroundColor: '#fff' }}>
              <button 
                onClick={() => handleDelete(banner.id, 'daftar_banner')}
                style={{ 
                  backgroundColor: '#FFF5F5', 
                  color: '#E53E3E', 
                  border: '1px solid #FED7D7', 
                  padding: '5px 10px', 
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                <i className="fa-solid fa-trash-can" style={{ marginRight: '5px' }}></i>
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {daftarBanner.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#A0AEC0' }}>
          Belum ada banner yang diunggah.
        </div>
      )}
    </div>
  );
}
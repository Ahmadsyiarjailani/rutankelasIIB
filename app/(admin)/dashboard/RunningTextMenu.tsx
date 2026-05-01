"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

export default function RunningTextMenu() {
  const [runningText, setRunningText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    fetchRunningText();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchRunningText = async () => {
    const { data, error } = await supabase
      .from('running_text')
      .select('*')
      .single();
    if (data) setRunningText(data.content);
  };

  const handleUpdate = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('running_text')
      .update({ content: runningText })
      .eq('id', 1);

    if (!error) {
      alert("Running Text diperbarui!");
    } else {
      alert("Gagal memperbarui: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: isMobile ? '20px' : '40px', backgroundColor: '#FFFFFF', borderRadius: '20px', fontFamily: "'Inter', sans-serif" }}>
      
      <div style={{ marginBottom: '35px' }}>
        <h3 style={{ color: '#093661', fontSize: '24px', fontWeight: '700', margin: '0 0 5px 0' }}>
          Pengaturan Running Text
        </h3>
        <p style={{ color: '#718096', fontSize: '14px', margin: 0 }}>
          Panel konfigurasi teks berjalan pada layar informasi utama.
        </p>
      </div>

      <div style={{ backgroundColor: '#F8FAFC', padding: '30px', borderRadius: '18px', border: '1px solid #E2E8F0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={labelStyle}>Isi Pesan Running Text</label>
            <textarea
              value={runningText}
              onChange={(e) => setRunningText(e.target.value)}
              style={{
                ...inputStyle,
                height: '120px',
                resize: 'none',
                padding: '16px'
              }}
              placeholder="Masukkan teks yang akan berjalan di landing page..."
            />
          </div>
          
          <button
            onClick={handleUpdate}
            disabled={loading}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={{
              ...buttonStyle,
              width: isMobile ? '100%' : 'fit-content',
              minWidth: '200px',
              backgroundColor: loading ? '#718096' : (isHover ? '#0d4a85' : '#093661'),
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Menyimpan...' : 'Simpan Perubahan Teks'}
          </button>
        </div>
      </div>
    </div>
  );
}

const labelStyle = { display: 'block', marginBottom: '10px', fontSize: '13px', fontWeight: '700', color: '#2D3748' };
const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: '10px', border: '2px solid #E2E8F0', outline: 'none', fontSize: '14px', boxSizing: 'border-box' as 'border-box', backgroundColor: 'white', transition: '0.3s' };
const buttonStyle: any = { padding: '16px 30px', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', transition: '0.3s' };
"use client";
import React, { useState, useEffect } from 'react';

export default function PengaduanMenu({ 
  pengaduanForm, setPengaduanForm, 
  handleSimpanPengaduan, daftarPengaduan, 
  toggleStatusPengaduan, handleDelete 
}: any) {
  const [isHover, setIsHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'selesai':
        return { bg: '#E6FFFA', text: '#285E61' };
      case 'proses':
        return { bg: '#EBF8FF', text: '#2C5282' };
      default:
        return { bg: '#E6FFFA', text: '#285E61' };
    }
  };

  return (
    <div style={{ padding: isMobile ? '20px' : '40px', backgroundColor: '#FFFFFF', borderRadius: '20px', fontFamily: '"Arial"' }}>
      
      {selectedDetail && (
        <div style={modalOverlayStyle} onClick={() => setSelectedDetail(null)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #EDF2F7', paddingBottom: '15px' }}>
              <h4 style={{ margin: 0, color: '#093b77', fontWeight: '700', letterSpacing: '-0.3px' }}>Detail Pengaduan</h4>
              <button onClick={() => setSelectedDetail(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: '#CBD5E0' }}>&times;</button>
            </div>
            <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#4A5568', maxHeight: '60vh', overflowY: 'auto', letterSpacing: '-0.1px' }}>
              {selectedDetail}
            </div>
            <button onClick={() => setSelectedDetail(null)} style={closeBtnStyle}>Tutup Detail</button>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '35px' }}>
        <h3 style={{ color: '#093b77', fontSize: '24px', fontWeight: '700', margin: '0 0 5px 0', letterSpacing: '-0.5px' }}>
          Manajemen Pengaduan Layanan
        </h3>
        <p style={{ color: '#718096', fontSize: '14px', margin: 0, letterSpacing: '-0.2px' }}>
          Panel kendali laporan masyarakat Rutan Kelas IIB Sinjai.
        </p>
      </div>

      <div style={{ backgroundColor: '#F8FAFC', padding: '30px', borderRadius: '18px', border: '1px solid #E2E8F0', marginBottom: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={labelStyle}>Nama Pelapor</label>
            <input 
              style={inputStyle} 
              placeholder="Contoh: Budi Santoso" 
              value={pengaduanForm.pelapor} 
              onChange={(e: any) => setPengaduanForm({...pengaduanForm, pelapor: e.target.value})} 
            />
          </div>
          <div>
            <label style={labelStyle}>Email / No. HP</label>
            <input 
              style={inputStyle} 
              placeholder="0812xxxx atau email@mail.com" 
              value={pengaduanForm.kontak} 
              onChange={(e: any) => setPengaduanForm({...pengaduanForm, kontak: e.target.value})} 
            />
          </div>
          <div style={{ gridColumn: isMobile ? 'span 1' : 'span 2' }}>
            <label style={labelStyle}>Detail Laporan</label>
            <textarea 
              style={{ ...inputStyle, height: '120px', resize: 'none' }} 
              placeholder="Tuliskan keluhan atau saran Anda secara rinci..." 
              value={pengaduanForm.isi} 
              onChange={(e: any) => setPengaduanForm({...pengaduanForm, isi: e.target.value})}
            ></textarea>
          </div>
          
          <button 
            onClick={handleSimpanPengaduan} 
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={{ 
              ...buttonStyle, 
              gridColumn: isMobile ? 'span 1' : 'span 2',
              backgroundColor: isHover ? '#072e5c' : '#093b77',
            }}
          >
            Kirim Laporan Pengaduan
          </button>
        </div>
      </div>

      <div style={{ height: '1px', backgroundColor: '#EDF2F7', margin: '45px 0' }} />

      <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#093b77', marginBottom: '25px', letterSpacing: '-0.3px' }}>
        Daftar Laporan Masyarakat
      </h4>

      <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', tableLayout: 'fixed' }}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #EDF2F7' }}>
              <th style={{ ...thStyle, width: '25%', textAlign: 'left' }}>INFORMASI PELAPOR</th>
              <th style={{ ...thStyle, width: '35%', textAlign: 'left' }}>DETAIL</th>
              <th style={{ ...thStyle, width: '20%', textAlign: 'left' }}>STATUS</th>
              <th style={{ ...thStyle, width: '20%', textAlign: 'center' }}>NAVIGASI</th>
            </tr>
          </thead>
          <tbody>
            {daftarPengaduan.length > 0 ? (
              daftarPengaduan.map((item: any) => {
                const style = getStatusStyle(item.status);
                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: '700', color: '#2D3748', fontSize: '14px', letterSpacing: '-0.3px', lineHeight: '1.2' }}>{item.pelapor}</div>
                      <div style={{ fontSize: '12px', color: '#093b77', fontWeight: '700', marginTop: '4px', letterSpacing: '-0.2px' }}>{item.kontak}</div>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                         <span style={{ maxWidth: isMobile ? '80px' : '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '13px', color: '#4A5568', letterSpacing: '-0.2px' }}>
                           {item.isi}
                         </span>
                         <button onClick={() => setSelectedDetail(item.isi)} style={viewBtnStyle}>Lihat</button>
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <button 
                        onClick={() => toggleStatusPengaduan(item.id, item.status)} 
                        style={{ ...statusBtnBase, backgroundColor: style.bg, color: style.text }}
                      >
                        {item.status?.toLowerCase() === 'proses' ? 'Proses' : 'Selesai'}
                      </button>
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <button onClick={() => handleDelete(item.id, 'daftar_pengaduan')} style={deleteBtnStyle}>
                        Hapus
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '60px 20px', color: '#A0AEC0', fontSize: '14px', verticalAlign: 'middle', letterSpacing: '-0.2px' }}>
                  Belum ada data pengaduan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const modalOverlayStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px', backdropFilter: 'blur(4px)' };
const modalContentStyle: React.CSSProperties = { backgroundColor: 'white', padding: '30px', borderRadius: '20px', width: '100%', maxWidth: '500px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', position: 'relative' };
const closeBtnStyle: React.CSSProperties = { marginTop: '25px', width: '100%', padding: '14px', backgroundColor: '#093b77', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', fontSize: '14px', fontFamily: '"Arial"', letterSpacing: '-0.2px' };

const labelStyle = { display: 'block', marginBottom: '10px', fontSize: '13px', fontWeight: '700', color: '#2D3748', fontFamily: '"Arial"', letterSpacing: '-0.2px' };
const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: '10px', border: '2px solid #E2E8F0', outline: 'none', fontSize: '14px', boxSizing: 'border-box' as 'border-box', backgroundColor: 'white', fontFamily: '"Arial"', letterSpacing: '-0.2px' };
const buttonStyle: any = { padding: '16px', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', transition: '0.3s', fontFamily: '"Arial"', letterSpacing: '-0.2px' };
const thStyle = { padding: '18px 20px', fontSize: '11px', color: '#718096', letterSpacing: '0.5px', fontWeight: '700', fontFamily: '"Arial"' };
const tdStyle = { padding: '20px', fontSize: '14px', fontFamily: '"Arial"' };
const deleteBtnStyle = { color: '#E53E3E', border: '1px solid #FED7D7', background: '#FFF5F5', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', fontFamily: '"Arial"', letterSpacing: '-0.2px' };
const viewBtnStyle = { padding: '6px 12px', fontSize: '11px', borderRadius: '8px', border: '1px solid #E2E8F0', cursor: 'pointer', background: '#FFF', color: '#093b77', fontWeight: '700', fontFamily: '"Arial"', letterSpacing: '-0.1px' };
const statusBtnBase = { padding: '6px 12px', borderRadius: '8px', border: 'none', fontSize: '11px', cursor: 'pointer', fontWeight: '700', fontFamily: '"Arial"', letterSpacing: '-0.1px' };
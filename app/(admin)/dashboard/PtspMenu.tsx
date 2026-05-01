"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PtspMenu() {
  const [riwayat, setRiwayat] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tabAktif, setTabAktif] = useState('kunjungan');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    
    const data = JSON.parse(localStorage.getItem('data_ptsp') || '[]');
    setRiwayat(data.reverse());
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const hapusRiwayat = (id) => {
    const updatedData = riwayat.filter(item => item.id !== id);
    setRiwayat(updatedData);
    localStorage.setItem('data_ptsp', JSON.stringify(updatedData));
  };

  const cetakUlang = (item) => {
    setSelectedItem(item);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const dataKunjungan = riwayat.filter(item => item.kunjungan.nama !== "");
  const dataTitipan = riwayat.filter(item => item.titipan.namaWbp !== "");

  return (
    <div style={{ padding: isMobile ? '20px' : '40px', backgroundColor: '#FFFFFF', borderRadius: '20px', fontFamily: "'Inter', sans-serif" }}>
      <div className="no-print">
        <div style={{ marginBottom: '35px' }}>
          <h3 style={{ color: '#093661', fontSize: '24px', fontWeight: '700', margin: '0 0 5px 0' }}>
            Riwayat Pelayanan PTSP
          </h3>
          <p style={{ color: '#718096', fontSize: '14px', margin: 0 }}>
            Manajemen data pendaftaran kunjungan dan titipan makanan
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '2px solid #EDF2F7' }}>
          <button 
            onClick={() => setTabAktif('kunjungan')}
            style={{
              padding: '12px 20px',
              cursor: 'pointer',
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '14px',
              fontWeight: '800',
              color: tabAktif === 'kunjungan' ? '#093661' : '#A0AEC0',
              borderBottom: tabAktif === 'kunjungan' ? '3px solid #093661' : '3px solid transparent',
              transition: '0.3s',
              marginBottom: '-2px'
            }}
          >
            Antrian Pengunjung ({dataKunjungan.length})
          </button>
          <button 
            onClick={() => setTabAktif('titipan')}
            style={{
              padding: '12px 20px',
              cursor: 'pointer',
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '14px',
              fontWeight: '800',
              color: tabAktif === 'titipan' ? '#093661' : '#A0AEC0',
              borderBottom: tabAktif === 'titipan' ? '3px solid #093661' : '3px solid transparent',
              transition: '0.3s',
              marginBottom: '-2px'
            }}
          >
            Titipan Barang ({dataTitipan.length})
          </button>
        </div>
      </div>

      <div className="no-print" style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
        {tabAktif === 'kunjungan' ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', minWidth: '1000px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #EDF2F7' }}>
                <th style={thStyle}>No. Antrian</th>
                <th style={thStyle}>Data Pengunjung</th>
                <th style={thStyle}>Alamat</th>
                <th style={thStyle}>WBP / Hubungan</th>
                <th style={thStyle}>Pengikut</th>
                <th style={thStyle}>Tanggal</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Navigasi</th>
              </tr>
            </thead>
            <tbody>
              {dataKunjungan.length > 0 ? dataKunjungan.map((item, index) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={tdStyle}>
                    <span style={{ backgroundColor: '#EBF8FF', color: '#2C5282', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '800' }}>
                      {(dataKunjungan.length - index).toString().padStart(3, '0')}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: '800', color: '#2D3748', fontSize: '14px' }}>{item.kunjungan.nama}</div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontSize: '13px', color: '#4A5568', maxWidth: '200px' }}>{item.kunjungan.alamat}</div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: '800', color: '#2D3748', fontSize: '14px' }}>{item.kunjungan.wbp}</div>
                    <div style={{ fontSize: '12px', color: '#093661', fontWeight: '700' }}>{item.kunjungan.hubungan}</div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontSize: '12px', color: '#4A5568', fontWeight: '600' }}>
                      L:{item.kunjungan.laki} | P:{item.kunjungan.perempuan} | A:{item.kunjungan.anak} | B:{item.kunjungan.bayi}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontSize: '13px', color: '#4A5568' }}>{item.kunjungan.tanggal}</div>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button onClick={() => cetakUlang({ ...item, customAntrian: (dataKunjungan.length - index) })} style={viewBtnStyle}>Cetak</button>
                      <button onClick={() => hapusRiwayat(item.id)} style={deleteBtnStyle}>Hapus</button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '100px 20px', color: '#A0AEC0', fontSize: '14px' }}>Tidak ada data kunjungan.</td></tr>
              )}
            </tbody>
          </table>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', minWidth: '1000px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #EDF2F7' }}>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Nama WBP</th>
                <th style={thStyle}>Status / Alamat WBP</th>
                <th style={thStyle}>Barang / Jumlah</th>
                <th style={thStyle}>Pengirim</th>
                <th style={thStyle}>Waktu Input</th>
                <th style={{ ...thStyle, textAlign: 'center' }}>Navigasi</th>
              </tr>
            </thead>
            <tbody>
              {dataTitipan.length > 0 ? dataTitipan.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={tdStyle}>
                    <span style={{ backgroundColor: '#E6FFFA', color: '#285E61', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '800' }}>
                      TITIPAN
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: '800', color: '#2D3748', fontSize: '14px' }}>{item.titipan.namaWbp}</div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: '800', color: '#093661', fontSize: '12px' }}>{item.titipan.statusWbp}</div>
                    <div style={{ fontSize: '12px', color: '#4A5568', maxWidth: '200px' }}>{item.titipan.alamatWbp}</div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: '800', color: '#2D3748', fontSize: '14px' }}>{item.titipan.jenisBarang}</div>
                    <div style={{ fontSize: '12px', color: '#718096', fontWeight: '600' }}>Jumlah: {item.titipan.jumlah}</div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontSize: '14px', color: '#2D3748', fontWeight: '700' }}>{item.kunjungan.nama}</div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontSize: '13px', color: '#4A5568' }}>{item.waktuInput}</div>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button onClick={() => cetakUlang(item)} style={viewBtnStyle}>Cetak</button>
                      <button onClick={() => hapusRiwayat(item.id)} style={deleteBtnStyle}>Hapus</button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '100px 20px', color: '#A0AEC0', fontSize: '14px' }}>Tidak ada data titipan.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {selectedItem && (
        <div className="print-area">
          {selectedItem.kunjungan.nama && (
            <div className={`thermal-ticket ${selectedItem.titipan.namaWbp ? 'page-break' : ''}`}>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: '0', fontSize: '14px' }}>BUKTI PENDAFTARAN KUNJUNGAN</h3>
                <p style={{ margin: '5px 0', fontWeight: 'bold', fontSize: '16px' }}>NO. ANTRIAN: {(selectedItem.customAntrian || 0).toString().padStart(3, '0')}</p>
              </div>
              <div style={{ borderTop: '1px dashed #000', margin: '10px 0' }}></div>
              <table style={{ width: '100%', fontSize: '12px' }}>
                <tbody>
                  <tr><td width="80">Nama</td><td>: {selectedItem.kunjungan.nama}</td></tr>
                  <tr><td>Alamat</td><td>: {selectedItem.kunjungan.alamat}</td></tr>
                  <tr><td colSpan={2}><div style={{ borderTop: '1px dashed #000', margin: '5px 0' }}></div></td></tr>
                  <tr><td>WBP</td><td>: {selectedItem.kunjungan.wbp}</td></tr>
                  <tr><td>Hubungan</td><td>: {selectedItem.kunjungan.hubungan}</td></tr>
                  <tr><td>L / P</td><td>: {selectedItem.kunjungan.laki} / {selectedItem.kunjungan.perempuan}</td></tr>
                  <tr><td>Anak / Bayi</td><td>: {selectedItem.kunjungan.anak} / {selectedItem.kunjungan.bayi}</td></tr>
                  <tr><td colSpan={2}><div style={{ borderTop: '1px dashed #000', margin: '5px 0' }}></div></td></tr>
                  <tr><td>Tanggal</td><td>: {selectedItem.kunjungan.tanggal}</td></tr>
                </tbody>
              </table>
              <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '10px' }}>*** Terima Kasih ***</div>
            </div>
          )}

          {selectedItem.titipan.namaWbp && (
            <div className="thermal-ticket">
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: '0', fontSize: '14px' }}>BUKTI PENDAFTARAN TITIPAN MAKANAN</h3>
              </div>
              <div style={{ borderTop: '1px dashed #000', margin: '10px 0' }}></div>
              <table style={{ width: '100%', fontSize: '12px' }}>
                <tbody>
                  <tr><td width="80">Nama WBP</td><td>: {selectedItem.titipan.namaWbp}</td></tr>
                  <tr><td>Status</td><td>: {selectedItem.titipan.statusWbp}</td></tr>
                  <tr><td>Alamat WBP</td><td>: {selectedItem.titipan.alamatWbp}</td></tr>
                  <tr><td colSpan={2}><div style={{ borderTop: '1px dashed #000', margin: '5px 0' }}></div></td></tr>
                  <tr><td>Pengirim</td><td>: {selectedItem.kunjungan.nama}</td></tr>
                  <tr><td>Barang</td><td>: {selectedItem.titipan.jenisBarang}</td></tr>
                  <tr><td>Jumlah</td><td>: {selectedItem.titipan.jumlah}</td></tr>
                </tbody>
              </table>
              <div style={{ borderTop: '1px dashed #000', margin: '10px 0' }}></div>
              <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '10px' }}>
                <p>Petugas Pemeriksa</p>
                <br/><br/>
                <p>( ..................... )</p>
              </div>
            </div>
          )}
        </div>
      )}

      <style jsx global>{`
        .print-area { display: none; }
        @media print {
          body * { visibility: hidden; }
          .no-print { display: none !important; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { display: block !important; position: absolute; left: 0; top: 0; width: 80mm; }
          .thermal-ticket { width: 72mm; padding: 10px; font-family: 'Courier New', Courier, monospace; color: #000; background: white; display: block; }
          .page-break { page-break-after: always !important; break-after: page !important; display: block; }
          @page { size: 80mm auto; margin: 0; }
        }
      `}</style>
    </div>
  );
}

const thStyle = { padding: '18px 20px', textAlign: 'left' as 'left', fontSize: '11px', color: '#718096', textTransform: 'uppercase' as 'uppercase', letterSpacing: '1px', fontWeight: '800' };
const tdStyle = { padding: '20px', fontSize: '14px' };
const deleteBtnStyle = { color: '#E53E3E', border: '1px solid #FED7D7', background: '#FFF5F5', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px' };
const viewBtnStyle = { padding: '6px 12px', fontSize: '11px', borderRadius: '8px', border: '1px solid #E2E8F0', cursor: 'pointer', background: '#FFF', color: '#093661', fontWeight: '800' };
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../../lib/supabase';

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
    
    const fetchRiwayat = async () => {
      const { data, error } = await supabase
        .from('riwayat_ptsp')
        .select('*')
        .order('id', { ascending: true });
      
      if (!error && data) {
        setRiwayat(data);
      }
    };

    fetchRiwayat();

    const channel = supabase
      .channel('realtime_riwayat_ptsp')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'riwayat_ptsp' }, () => {
        fetchRiwayat();
      })
      .subscribe();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      supabase.removeChannel(channel);
    };
  }, []);

  const hapusRiwayat = async (id) => {
    const { error } = await supabase
      .from('riwayat_ptsp')
      .delete()
      .eq('id', id);

    if (!error) {
      setRiwayat(riwayat.filter(item => item.id !== id));
    }
  };

  const cetakUlang = (item, indexKunjungan) => {
    setSelectedItem({ ...item, customAntrian: indexKunjungan });
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const dataKunjungan = riwayat.filter(item => item.kunjungan && item.kunjungan.nama !== "");
  const dataTitipan = riwayat.filter(item => item.titipan && item.titipan.namaWbp !== "");

  const riwayatTampilKunjungan = [...dataKunjungan].reverse();

  return (
    <div style={{ padding: isMobile ? '20px' : '40px', backgroundColor: '#FFFFFF', borderRadius: '20px', fontFamily: '"Arial"' }}>
      <div className="no-print">
        <div style={{ marginBottom: '35px' }}>
          <h3 style={{ color: '#093b77', fontSize: '24px', fontWeight: '700', margin: '0 0 5px 0', fontFamily: '"Arial"', letterSpacing: '-0.5px' }}>
            Riwayat Pelayanan PTSP
          </h3>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0, fontFamily: '"Arial"', letterSpacing: '-0.2px' }}>
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
              fontWeight: '700',
              color: tabAktif === 'kunjungan' ? '#093b77' : '#A0AEC0',
              borderBottom: tabAktif === 'kunjungan' ? '3px solid #093b77' : '3px solid transparent',
              transition: '0.3s',
              marginBottom: '-2px',
              fontFamily: '"Arial"',
              letterSpacing: '-0.2px'
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
              fontWeight: '700',
              color: tabAktif === 'titipan' ? '#093b77' : '#A0AEC0',
              borderBottom: tabAktif === 'titipan' ? '3px solid #093b77' : '3px solid transparent',
              transition: '0.3s',
              marginBottom: '-2px',
              fontFamily: '"Arial"',
              letterSpacing: '-0.2px'
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
              {riwayatTampilKunjungan.length > 0 ? riwayatTampilKunjungan.map((item, index) => {
                const nomorAntrianKunjungan = dataKunjungan.indexOf(item) + 1;
                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={tdStyle}>
                      <span style={{ backgroundColor: '#EBF8FF', color: '#014a99', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', letterSpacing: '-0.1px' }}>
                        {nomorAntrianKunjungan.toString().padStart(3, '0')}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: '700', color: '#093b77', fontSize: '14px', letterSpacing: '-0.2px' }}>{item.kunjungan?.nama}</div>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ fontSize: '13px', color: '#475569', maxWidth: '200px', letterSpacing: '-0.2px' }}>{item.kunjungan?.alamat}</div>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: '700', color: '#093b77', fontSize: '14px', letterSpacing: '-0.2px' }}>{item.kunjungan?.wbp}</div>
                      <div style={{ fontSize: '12px', color: '#475569c0', fontWeight: '70', letterSpacing: '-0.1px' }}>{item.kunjungan?.hubungan}</div>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ fontSize: '12px', color: '#475569', fontWeight: '700', letterSpacing: '-0.1px' }}>
                        L:{item.kunjungan?.laki} | P:{item.kunjungan?.perempuan} | A:{item.kunjungan?.anak} | B:{item.kunjungan?.bayi}
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <div style={{ fontSize: '13px', color: '#475569', letterSpacing: '-0.2px' }}>{item.kunjungan?.tanggal}</div>
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <button onClick={() => cetakUlang(item, nomorAntrianKunjungan)} style={viewBtnStyle}>Cetak</button>
                        <button onClick={() => hapusRiwayat(item.id)} style={deleteBtnStyle}>Hapus</button>
                      </div>
                    </td>
                  </tr>
                );
              }) : (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '100px 20px', color: '#A0AEC0', fontSize: '14px', fontFamily: '"Arial"', letterSpacing: '-0.2px' }}>Tidak ada data kunjungan.</td></tr>
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
              {dataTitipan.length > 0 ? [...dataTitipan].reverse().map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={tdStyle}>
                    <span style={{ backgroundColor: '#EBF8FF', color: '#014a99', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', letterSpacing: '-0.1px' }}>
                      TITIPAN
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: '700', color: '#475569', fontSize: '14px', letterSpacing: '-0.2px' }}>{item.titipan?.namaWbp}</div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: '700', color: '#093b77', fontSize: '12px', letterSpacing: '-0.1px' }}>{item.titipan?.statusWbp}</div>
                    <div style={{ fontSize: '12px', color: '#475569', maxWidth: '200px', letterSpacing: '-0.1px' }}>{item.titipan?.alamatWbp}</div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: '700', color: '#475569', fontSize: '14px', letterSpacing: '-0.2px' }}>{item.titipan?.jenisBarang}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', letterSpacing: '-0.1px' }}>Jumlah: {item.titipan?.jumlah}</div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontSize: '14px', color: '#475569', fontWeight: '700', letterSpacing: '-0.2px' }}>{item.kunjungan?.nama}</div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontSize: '13px', color: '#475569', letterSpacing: '-0.2px' }}>{item.waktuInput}</div>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button onClick={() => cetakUlang(item, 0)} style={viewBtnStyle}>Cetak</button>
                      <button onClick={() => hapusRiwayat(item.id)} style={deleteBtnStyle}>Hapus</button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '100px 20px', color: '#A0AEC0', fontSize: '14px', fontFamily: '"Arial"', letterSpacing: '-0.2px' }}>Tidak ada data titipan.</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {selectedItem && (
        <div className="print-area">
          {selectedItem.kunjungan?.nama && (
            <div className={`thermal-ticket ${selectedItem.titipan?.namaWbp ? 'page-break' : ''}`}>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: '0', fontSize: '14px', fontFamily: '"Arial"', fontWeight: '700', letterSpacing: '-0.3px' }}>BUKTI PENDAFTARAN KUNJUNGAN</h3>
                <p style={{ margin: '5px 0', fontWeight: '700', fontSize: '16px', fontFamily: '"Arial"', letterSpacing: '-0.4px' }}>NO. ANTRIAN: {(selectedItem.customAntrian || 0).toString().padStart(3, '0')}</p>
              </div>
              <div style={{ borderTop: '1px dashed #000', margin: '10px 0' }}></div>
              <table style={{ width: '100%', fontSize: '12px', fontFamily: '"Arial"' }}>
                <tbody>
                  <tr><td width="80" style={{ fontWeight: '700' }}>Nama</td><td>: {selectedItem.kunjungan?.nama}</td></tr>
                  <tr><td style={{ fontWeight: '700' }}>Alamat</td><td>: {selectedItem.kunjungan?.alamat}</td></tr>
                  <tr><td colSpan={2}><div style={{ borderTop: '1px dashed #000', margin: '5px 0' }}></div></td></tr>
                  <tr><td style={{ fontWeight: '700' }}>WBP</td><td>: {selectedItem.kunjungan?.wbp}</td></tr>
                  <tr><td style={{ fontWeight: '700' }}>Hubungan</td><td>: {selectedItem.kunjungan?.hubungan}</td></tr>
                  <tr><td style={{ fontWeight: '700' }}>L / P</td><td>: {selectedItem.kunjungan?.laki} / {selectedItem.kunjungan?.perempuan}</td></tr>
                  <tr><td style={{ fontWeight: '700' }}>Anak / Bayi</td><td>: {selectedItem.kunjungan?.anak} / {selectedItem.kunjungan?.bayi}</td></tr>
                  <tr><td colSpan={2}><div style={{ borderTop: '1px dashed #000', margin: '5px 0' }}></div></td></tr>
                  <tr><td style={{ fontWeight: '700' }}>Tanggal</td><td>: {selectedItem.kunjungan?.tanggal}</td></tr>
                </tbody>
              </table>
              <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '10px', fontFamily: '"Arial"', fontWeight: '700' }}>*** Terima Kasih ***</div>
            </div>
          )}

          {selectedItem.titipan?.namaWbp && (
            <div className="thermal-ticket">
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: '0', fontSize: '14px', fontFamily: '"Arial"', fontWeight: '700', letterSpacing: '-0.3px' }}>BUKTI PENDAFTARAN TITIPAN MAKANAN</h3>
              </div>
              <div style={{ borderTop: '1px dashed #000', margin: '10px 0' }}></div>
              <table style={{ width: '100%', fontSize: '12px', fontFamily: '"Arial"' }}>
                <tbody>
                  <tr><td width="80" style={{ fontWeight: '700' }}>Nama WBP</td><td>: {selectedItem.titipan?.namaWbp}</td></tr>
                  <tr><td style={{ fontWeight: '700' }}>Status</td><td>: {selectedItem.titipan?.statusWbp}</td></tr>
                  <tr><td style={{ fontWeight: '700' }}>Alamat WBP</td><td>: {selectedItem.titipan?.alamatWbp}</td></tr>
                  <tr><td colSpan={2}><div style={{ borderTop: '1px dashed #000', margin: '5px 0' }}></div></td></tr>
                  <tr><td style={{ fontWeight: '700' }}>Pengirim</td><td>: {selectedItem.kunjungan?.nama}</td></tr>
                  <tr><td style={{ fontWeight: '700' }}>Barang</td><td>: {selectedItem.titipan?.jenisBarang}</td></tr>
                  <tr><td style={{ fontWeight: '700' }}>Jumlah</td><td>: {selectedItem.titipan?.jumlah}</td></tr>
                </tbody>
              </table>
              <div style={{ borderTop: '1px dashed #000', margin: '10px 0' }}></div>
              <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '10px', fontFamily: '"Arial"' }}>
                <p style={{ fontWeight: '700' }}>Petugas Pemeriksa</p>
                <br/><br/>
                <p style={{ fontWeight: '700' }}>( ..................... )</p>
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
          .thermal-ticket { width: 72mm; padding: 10px; font-family: "Arial" !important; color: #000; background: white; display: block; }
          .page-break { page-break-after: always !important; break-after: page !important; display: block; }
          @page { size: 80mm auto; margin: 0; }
        }
      `}</style>
    </div>
  );
}

const thStyle = { padding: '18px 20px', textAlign: 'left' as 'left', fontSize: '11px', color: '#64748b', textTransform: 'uppercase' as 'uppercase', letterSpacing: '0.5px', fontWeight: '700', fontFamily: '"Arial"' };
const tdStyle = { padding: '20px', fontSize: '14px', fontFamily: '"Arial"' };
const deleteBtnStyle = { color: '#E53E3E', border: '1px solid #FED7D7', background: '#FFF5F5', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', fontFamily: '"Arial"', letterSpacing: '-0.1px', transition: '0.2s' };
const viewBtnStyle = { padding: '6px 12px', fontSize: '11px', borderRadius: '8px', border: '1px solid #E2E8F0', cursor: 'pointer', background: '#FFF', color: '#093b77', fontWeight: '700', fontFamily: '"Arial"', letterSpacing: '-0.1px', transition: '0.2s' };
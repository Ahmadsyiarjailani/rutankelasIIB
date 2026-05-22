"use client";

import React, { useState, useEffect } from 'react';

export default function WBPMenu({ wbpForm, setWbpForm, handleSimpanWBP, daftarWBP, handleDelete, handleUpdate, setSelectedImage }: any) {
  const [isHover, setIsHover] = useState(false);
  const [viewFilter, setViewFilter] = useState('Narapidana');
  const [editId, setEditId] = useState<number | null>(null);
  const [tempData, setTempData] = useState<any>({});
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoverBtnId, setHoverBtnId] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (wbpForm.status_wbp) {
      setViewFilter(wbpForm.status_wbp);
    }
  }, [wbpForm.status_wbp]);

  const filteredData = daftarWBP.filter((item: any) => {
    const matchesFilter = viewFilter === 'Narapidana' 
      ? (!item.status_wbp || item.status_wbp === 'Narapidana')
      : item.status_wbp === 'Tahanan';
    
    const namaWBP = item.nama || "";
    const nikWBP = item.nik || "";
    
    const matchesSearch = namaWBP.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          nikWBP.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const startEdit = (item: any) => {
    setEditId(item.id);
    setTempData({ ...item });
  };

  const cancelEdit = () => {
    setEditId(null);
    setTempData({});
  };

  const saveEdit = async () => {
    let dataToUpdate = { ...tempData };
    
    if (tempData.foto instanceof File) {
      try {
        const formData = new FormData();
        formData.append('file', tempData.foto);
        
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const uploadRes = await res.json();
          if (uploadRes.url) {
            dataToUpdate.foto_url = uploadRes.url;
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    delete dataToUpdate.foto;
    await handleUpdate(dataToUpdate);
    setEditId(null);
    setTempData({});
  };

  const handleFileChange = (e: any, isEdit = false) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (isEdit) {
        setTempData({ ...tempData, foto: file, foto_url: URL.createObjectURL(file) });
      } else {
        setWbpForm({ ...wbpForm, foto: file });
      }
    }
  };

  return (
    <div style={{ ...containerStyle, padding: isMobile ? '20px' : '40px' }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      
      <div style={{ marginBottom: '35px' }}>
        <h3 style={headerTitleStyle}>Manajemen Data WBP</h3>
        <p style={headerSubStyle}>Sistem administrasi data narapidana dan tahanan Rutan Sinjai.</p>
      </div>

      <div style={{ ...formContainerStyle, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
        <div style={{ gridColumn: isMobile ? 'span 1' : 'span 2' }}>
          <label style={labelStyle}>Kategori WBP</label>
          <select 
            style={selectStyle}
            value={wbpForm.status_wbp || 'Narapidana'} 
            onChange={(e) => setWbpForm({...wbpForm, status_wbp: e.target.value})}
          >
            <option value="Narapidana">Narapidana</option>
            <option value="Tahanan">Tahanan</option>
          </select>
        </div>

        <FormInput label="Nama Lengkap" placeholder="Nama Lengkap WBP" value={wbpForm.nama} onChange={(e: any) => setWbpForm({...wbpForm, nama: e.target.value})} />
        <FormInput label="2/3 Masa Pidana" placeholder="Contoh: BI.05/2026" value={wbpForm.nik} onChange={(e: any) => setWbpForm({...wbpForm, nik: e.target.value})} />
        <FormInput label="Perkara" placeholder="Contoh: Maling" value={wbpForm.kasus} onChange={(e: any) => setWbpForm({...wbpForm, kasus: e.target.value})} />
        <FormInput label="Tanggal Bebas" type="date" value={wbpForm.ekspirasi} onChange={(e: any) => setWbpForm({...wbpForm, ekspirasi: e.target.value})} />
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={labelStyle}>Foto WBP</label>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e)} style={inputStyle} />
          {wbpForm.foto && (
            <div style={{ position: 'relative', width: '60px', marginTop: '10px' }}>
              <img 
                src={wbpForm.foto instanceof File ? URL.createObjectURL(wbpForm.foto) : wbpForm.foto} 
                alt="Preview" 
                onClick={() => setSelectedImage?.(wbpForm.foto instanceof File ? URL.createObjectURL(wbpForm.foto) : wbpForm.foto)}
                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', cursor: 'zoom-in', border: '1px solid #E2E8F0' }} 
              />
              <button onClick={() => setWbpForm({...wbpForm, foto: null})} style={removeFotoBadgeStyle}>×</button>
            </div>
          )}
        </div>

        <button 
          onClick={handleSimpanWBP} 
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          style={{ 
            ...submitButtonStyle, 
            gridColumn: isMobile ? 'span 1' : 'span 2',
            backgroundColor: isHover ? '#072e5c' : '#093b77'
          }}
        >
          Simpan Data {wbpForm.status_wbp || 'Narapidana'}
        </button>
      </div>

      <div style={dividerStyle} />

      <div style={{ ...tableHeaderActionStyle, flexDirection: isMobile ? 'column' : 'row' }}>
        <h4 style={tableTitleStyle}>
          Daftar Aktif : <span style={{color: '#093b77', marginLeft: '5px'}}>{viewFilter}</span>
        </h4>
        
        <div style={{ display: 'flex', gap: '15px', width: isMobile ? '100%' : 'auto', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <i className="fa fa-search" style={searchIconStyle}></i>
            <input 
              type="text" 
              placeholder="Cari Nama atau Data WBP..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ ...searchInputStyle, width: isMobile ? '100%' : '250px' }}
            />
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <span style={{fontSize: '12px', fontWeight: '700', color: '#64748b', fontFamily: '"Arial"'}}>TAMPILKAN:</span>
            <select style={filterSelectStyle} value={viewFilter} onChange={(e) => setViewFilter(e.target.value)}>
              <option value="Narapidana">Narapidana</option>
              <option value="Tahanan">Tahanan</option>
            </select>
          </div>
        </div>
      </div>

      <div style={tableWrapperStyle}>
        <table style={{...tableStyle, width: '100%'}}>
          <thead>
            <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #EDF2F7' }}>
              <th style={{ ...thStyle, width: '80px' }}>FOTO</th>
              <th style={{ ...thStyle, width: '30%' }}>NAMA LENGKAP</th>
              <th style={{ ...thStyle, width: '25%' }}>2/3 MASA PIDANA</th>
              <th style={{ ...thStyle, width: '30%' }}>PERKARA</th>
              <th style={{ ...thStyle, width: '15%' }}>TANGGAL BEBAS</th>
              <th style={{ ...thStyle, textAlign: 'center', width: '150px' }}>NAVIGASI</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item: any) => (
                <tr key={item.id} style={trStyle}>
                  <td style={tdStyle}>
                    <div 
                      style={avatarWrapperStyle} 
                      onClick={() => setSelectedImage?.(editId === item.id ? tempData.foto_url : item.foto_url)}
                    >
                      {(editId === item.id ? tempData.foto_url : item.foto_url) ? (
                        <img src={editId === item.id ? tempData.foto_url : item.foto_url} style={avatarImgStyle} />
                      ) : (
                        <i className="fa fa-user" style={{ color: '#CBD5E0' }}></i>
                      )}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    {editId === item.id ? (
                      <input style={editInputStyle} value={tempData.nama} onChange={(e) => setTempData({...tempData, nama: e.target.value})} placeholder="Nama" />
                    ) : (
                      <div style={{ fontWeight: '700', fontSize: '14px', color: '#093b77', fontFamily: '"Arial"', letterSpacing: '-0.2px' }}>{item.nama}</div>
                    )}
                  </td>
                  <td style={tdStyle}>
                    {editId === item.id ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <input style={editInputStyle} value={tempData.nik} onChange={(e) => setTempData({...tempData, nik: e.target.value})} placeholder="2/3 Masa Pidana" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <label style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', fontFamily: '"Arial"' }}>GANTI / HAPUS FOTO:</label>
                          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, true)} style={{ fontSize: '11px', fontFamily: '"Arial"' }} />
                          {tempData.foto_url && (
                            <button onClick={() => setTempData({...tempData, foto: null, foto_url: ""})} style={deleteFotoTextStyle}>
                              <i className="fa fa-trash-can"></i> Hapus Foto
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div style={{ fontSize: '13px', color: '#475569', fontWeight: '700', fontFamily: '"Arial"', letterSpacing: '-0.2px' }}>{item.nik}</div>
                    )}
                  </td>
                  <td style={tdStyle}>
                    {editId === item.id ? (
                      <input style={editInputStyle} value={tempData.kasus} onChange={(e) => setTempData({...tempData, kasus: e.target.value})} placeholder="Perkara" />
                    ) : (
                      <div style={{ fontSize: '13px', color: '#475569', fontWeight: '400', fontFamily: '"Arial"', letterSpacing: '-0.1px' }}>{item.kasus}</div>
                    )}
                  </td>
                  <td style={tdStyle}>
                    {editId === item.id ? (
                      <input type="date" style={editInputStyle} value={tempData.ekspirasi} onChange={(e) => setTempData({...tempData, ekspirasi: e.target.value})} />
                    ) : (
                      <span style={{ ...badgeStyle, backgroundColor: '#FFF5F5', color: '#C53030' }}>{item.ekspirasi || '-'}</span>
                    )}
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'center' }}>
                    <div style={{display: 'flex', justifyContent: 'center', gap: '8px'}}>
                      {editId === item.id ? (
                        <>
                          <button 
                            onMouseEnter={() => setHoverBtnId(`simpan-${item.id}`)}
                            onMouseLeave={() => setHoverBtnId(null)}
                            onClick={saveEdit} 
                            style={{
                              ...btnEditInline, 
                              backgroundColor: hoverBtnId === `simpan-${item.id}` ? '#2F855A' : '#38A169', 
                              color: 'white',
                              border: 'none'
                            }}>Simpan</button>
                          <button 
                            onMouseEnter={() => setHoverBtnId(`batal-${item.id}`)}
                            onMouseLeave={() => setHoverBtnId(null)}
                            onClick={cancelEdit} 
                            style={{
                              ...btnEditInline,
                              backgroundColor: hoverBtnId === `batal-${item.id}` ? '#E2E8F0' : 'white'
                            }}>Batal</button>
                        </>
                      ) : (
                        <button 
                          onMouseEnter={() => setHoverBtnId(`edit-${item.id}`)}
                          onMouseLeave={() => setHoverBtnId(null)}
                          onClick={() => startEdit(item)} 
                          style={{
                            ...btnEditInline,
                            backgroundColor: hoverBtnId === `edit-${item.id}` ? '#EBF8FF' : 'white',
                            borderColor: hoverBtnId === `edit-${item.id}` ? '#3182CE' : '#E2E8F0',
                            color: hoverBtnId === `edit-${item.id}` ? '#3182CE' : '#093b77'
                          }}>Edit</button>
                      )}
                      <button 
                        onMouseEnter={() => setHoverBtnId(`hapus-${item.id}`)}
                        onMouseLeave={() => setHoverBtnId(null)}
                        onClick={() => handleDelete(item.id, 'daftar_wbp')} 
                        style={{
                          ...btnDeleteInline,
                          backgroundColor: hoverBtnId === `hapus-${item.id}` ? '#E53E3E' : '#FFF5F5',
                          color: hoverBtnId === `hapus-${item.id}` ? 'white' : '#E53E3E',
                          borderColor: hoverBtnId === `hapus-${item.id}` ? '#C53030' : '#FED7D7'
                        }}>Hapus</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '100px 20px', color: '#A0AEC0', fontStyle: 'italic', fontFamily: '"Arial"' }}>Data tidak ditemukan</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FormInput({ label, value, ...props }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={labelStyle}>{label}</label>
      <input style={inputStyle} value={value ?? ""} {...props} />
    </div>
  );
}

const removeFotoBadgeStyle: any = { position: 'absolute', top: '-5px', right: '-5px', backgroundColor: '#E53E3E', color: 'white', border: 'none', borderRadius: '50%', width: '18px', height: '18px', cursor: 'pointer', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Arial"' };
const containerStyle = { backgroundColor: '#FFFFFF', borderRadius: '20px', fontFamily: '"Arial"' };
const headerTitleStyle = { color: '#093b77', fontSize: '24px', fontWeight: '700', margin: '0 0 5px 0', fontFamily: '"Arial"', letterSpacing: '-0.5px' };
const headerSubStyle = { color: '#64748b', fontSize: '14px', margin: 0, fontFamily: '"Arial"', letterSpacing: '-0.2px' };
const formContainerStyle = { display: 'grid', gap: '20px', padding: '30px', backgroundColor: '#F8FAFC', borderRadius: '18px', marginTop: '20px', border: '1px solid #E2E8F0' };
const labelStyle = { display: 'block', marginBottom: '10px', fontSize: '13px', fontWeight: '700', color: '#093b77', fontFamily: '"Arial"', letterSpacing: '-0.1px' };
const inputStyle = { padding: '12px 16px', borderRadius: '10px', border: '2px solid #E2E8F0', fontSize: '14px', outline: 'none', backgroundColor: 'white', fontFamily: '"Arial"', color: '#475569' };
const selectStyle = { ...inputStyle, width: '100%', cursor: 'pointer', fontWeight: '700', color: '#093b77', fontFamily: '"Arial"' };
const submitButtonStyle: any = { padding: '16px', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '15px', transition: '0.3s', marginTop: '10px', fontFamily: '"Arial"' };
const dividerStyle = { height: '1px', backgroundColor: '#EDF2F7', margin: '45px 0' };
const tableHeaderActionStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', gap: '15px', fontFamily: '"Arial"' };
const tableTitleStyle = { fontSize: '18px', fontWeight: '700', color: '#093b77', margin: 0, fontFamily: '"Arial"', letterSpacing: '-0.3px' };
const searchInputStyle = { padding: '10px 15px 10px 35px', borderRadius: '10px', border: '2px solid #E2E8F0', fontSize: '13px', outline: 'none', fontFamily: '"Arial"', color: '#475569' };
const searchIconStyle: any = { position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#A0AEC0', fontSize: '13px' };
const filterSelectStyle = { padding: '10px 15px', borderRadius: '10px', border: '2px solid #093b77', fontSize: '13px', fontWeight: '700', color: '#093b77', outline: 'none', cursor: 'pointer', fontFamily: '"Arial"' };
const tableWrapperStyle = { overflowX: 'auto' as 'auto', border: '1px solid #E2E8F0', borderRadius: '12px' };
const tableStyle = { borderCollapse: 'collapse' as 'collapse' };
const thStyle = { padding: '18px 15px', textAlign: 'left' as 'left', fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' as 'uppercase', letterSpacing: '1px', fontFamily: '"Arial"' };
const tdStyle = { padding: '15px', fontSize: '14px', borderBottom: '1px solid #F1F5F9', verticalAlign: 'top' as 'top', fontFamily: '"Arial"' };
const trStyle = { transition: '0.2s' };
const avatarWrapperStyle = { width: '45px', height: '55px', backgroundColor: '#F1F5F9', borderRadius: '6px', overflow: 'hidden', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-in' };
const avatarImgStyle = { width: '100%', height: '100%', objectFit: 'cover' as 'cover' };
const editInputStyle = { width: '100%', padding: '6px 10px', borderRadius: '6px', border: '2px solid #093b77', outline: 'none', fontSize: '13px', fontFamily: '"Arial"', color: '#475569' };
const badgeStyle = { padding: '4px 10px', borderRadius: '6px', backgroundColor: '#FFF5F5', color: '#C53030', fontSize: '12px', fontWeight: '700', fontFamily: '"Arial"' };
const btnEditInline = { border: '1px solid #E2E8F0', background: 'white', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', transition: 'all 0.2s', fontFamily: '"Arial"' };
const btnDeleteInline = { border: '1px solid #FED7D7', background: '#FFF5F5', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '12px', transition: 'all 0.2s', fontFamily: '"Arial"' };
const deleteFotoTextStyle: any = { fontSize: '11px', color: '#E53E3E', background: 'none', border: 'none', cursor: 'pointer', padding: '0', textAlign: 'left', fontWeight: '700', marginTop: '4px', fontFamily: '"Arial"' };
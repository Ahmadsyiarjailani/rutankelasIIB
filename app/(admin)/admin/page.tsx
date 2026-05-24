"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch('/api/wbp/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
      router.push('/dashboard'); 
    } else {
      alert("Username atau Password Salah!");
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#093661',
      margin: 0,
      padding: isMobile ? '20px' : '0',
      position: 'fixed',
      top: 0,
      left: 0,
      boxSizing: 'border-box',
      fontFamily: '"Arial"'
    }}>
      <form onSubmit={handleLogin} style={{ 
        backgroundColor: 'white', 
        padding: isMobile ? '30px 20px' : '40px', 
        borderRadius: '20px', 
        width: isMobile ? '100%' : '380px', 
        maxWidth: '400px',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        boxSizing: 'border-box',
        border: '1px solid #E2E8F0',
        fontFamily: '"Arial"'
      }}>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <img 
            src="/assets/logo.png" 
            alt="Logo" 
            style={{ width: isMobile ? '160px' : '200px', height: '70px', objectFit: 'contain' }} 
          />
        </div>

        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <h1 style={{ fontSize: isMobile ? '19px' : '21px', fontWeight: '700', color: '#093661', margin: 0, letterSpacing: '-0.5px', fontFamily: '"Arial"' }}>
            Rutan Kelas IIB Sinjai
          </h1>
        </div>
        
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          style={{ 
            width: '100%', 
            padding: '12px 16px', 
            margin: '8px 0', 
            borderRadius: '10px', 
            border: '2px solid #E2E8F0', 
            boxSizing: 'border-box',
            outlineColor: '#093661',
            fontSize: '14px',
            fontFamily: '"Arial"',
            letterSpacing: '-0.2px',
            backgroundColor: 'white'
          }} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ 
            width: '100%', 
            padding: '12px 16px', 
            margin: '8px 0', 
            borderRadius: '10px', 
            border: '2px solid #E2E8F0', 
            boxSizing: 'border-box',
            outlineColor: '#093661',
            fontSize: '14px',
            fontFamily: '"Arial"',
            letterSpacing: '-0.2px',
            backgroundColor: 'white'
          }} 
        />
        
        <button 
          type="submit" 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); setIsActive(false); }}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
          onTouchStart={() => setIsActive(true)}
          onTouchEnd={() => setIsActive(false)}
          style={{ 
            width: '100%', 
            padding: '14px', 
            backgroundColor: isActive ? '#05213d' : isHovered ? '#0d4a85' : '#093661',
            color: 'white', 
            border: 'none', 
            borderRadius: '12px', 
            cursor: 'pointer', 
            fontWeight: '700', 
            marginTop: '15px',
            fontSize: '15px',
            transform: isActive ? 'scale(0.96)' : 'scale(1)',
            transition: 'all 0.2s ease',
            fontFamily: '"Arial"',
            letterSpacing: '-0.2px'
          }}
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
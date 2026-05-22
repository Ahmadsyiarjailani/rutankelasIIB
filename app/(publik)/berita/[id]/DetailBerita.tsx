"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function DetailBeritaClient({ initialBerita, initialList }: { initialBerita: any, initialList: any[] }) {
  const params = useParams();
  const router = useRouter();
  const [berita] = useState(initialBerita);
  const [beritaLain] = useState(initialList);
  const [beritaDisplay, setBeritaDisplay] = useState(initialList.slice(0, 5));
  const [kategoriAktif, setKategoriAktif] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterKategori = (kat: string) => {
    setKategoriAktif(kat);
    setSearchTerm('');
    setBeritaDisplay(beritaLain.filter(item => item.status?.toString().toLowerCase() === kat.toLowerCase()));
  };

  const resetFilter = () => {
    setKategoriAktif(null);
    setSearchTerm('');
    setBeritaDisplay(beritaLain.slice(0, 5));
  };

  const handleSearch = () => {
    setKategoriAktif(null);
    if (!searchTerm.trim()) {
      setBeritaDisplay(beritaLain.slice(0, 5));
      return;
    }
    setBeritaDisplay(beritaLain.filter(item => item.judul.toLowerCase().includes(searchTerm.toLowerCase())));
  };
}
import { createClient } from '@supabase/supabase-js';
import DetailBeritaClient from './DetailBerita';

const supabase = createClient(
  'https://xnwqcxaehvaqxzodqidc.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhud3FjeGFlaHZhcXh6b2RxaWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0OTE4NDAsImV4cCI6MjA4NTA2Nzg0MH0.RLjUPr-7Qez5gUcAQUOJ-3TPPIf_CfGeOE2gSKqHz7s'
);

export async function generateStaticParams() {
  const { data: list } = await supabase.from('daftar_berita').select('id');
  return list ? list.map((item) => ({ id: String(item.id) })) : [];
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const { data: berita } = await supabase.from('daftar_berita').select('*').eq('id', id).maybeSingle();
  const { data: list } = await supabase.from('daftar_berita').select('id, judul, tanggal, status, img').neq('id', id);

  return <DetailBeritaClient initialBerita={berita} initialList={list || []} />;
}
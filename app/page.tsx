const programs = [
  ['Digitalisasi UMKM','Adopsi teknologi untuk meningkatkan produktivitas dan daya saing bisnis.'],
  ['UMKM Naik Kelas','Penguatan kapasitas usaha, manajemen, branding, dan strategi pertumbuhan.'],
  ['Learning & Certification','Pelatihan praktis untuk membangun kompetensi pelaku UMKM.'],
  ['Business Matching','Mempertemukan UMKM dengan buyer, partner, dan peluang kolaborasi.'],
  ['Financing','Membuka akses informasi dan koneksi ke sumber pembiayaan.'],
  ['Go Export','Mendorong produk UMKM Indonesia memasuki pasar global.'],
];

export default function Home() {
  return (
    <main>
      <nav style={{background:'#fff',borderBottom:'1px solid #e5e7eb',position:'sticky',top:0,zIndex:20}}>
        <div className="container" style={{height:72,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <a href="/" style={{fontFamily:'Poppins',fontWeight:800,fontSize:20,color:'var(--primary)'}}>UMKM NAIK KELAS</a>
          <div style={{display:'flex',gap:24,fontSize:14,fontWeight:600}}>
            <a href="#program">Program</a><a href="#tentang">Tentang</a><a href="#berita">Berita</a><a href="/auth/login">Masuk</a>
            <a href="/auth/register" style={{background:'var(--primary)',color:'#fff',padding:'11px 18px',borderRadius:10}}>Gabung</a>
          </div>
        </div>
      </nav>

      <section style={{background:'linear-gradient(135deg,#005BAC,#00AEEF)',color:'#fff',padding:'96px 0 110px'}}>
        <div className="container" style={{maxWidth:1180}}>
          <div style={{maxWidth:760}}>
            <span style={{display:'inline-block',padding:'7px 12px',border:'1px solid rgba(255,255,255,.35)',borderRadius:999,fontSize:13,marginBottom:22}}>EKOSISTEM UMKM INDONESIA</span>
            <h1 style={{fontSize:'clamp(42px,6vw,72px)',lineHeight:1.05,margin:'0 0 22px'}}>Bersama Tumbuh,<br/>Bersama Naik Kelas.</h1>
            <p style={{fontSize:19,lineHeight:1.7,maxWidth:680,opacity:.94}}>Membangun UMKM Indonesia melalui pembelajaran, digitalisasi, kolaborasi, akses pasar, dan ekosistem usaha.</p>
            <div style={{display:'flex',gap:12,marginTop:30,flexWrap:'wrap'}}>
              <a href="/auth/register" style={{background:'#fff',color:'var(--primary)',padding:'14px 22px',borderRadius:10,fontWeight:700}}>Gabung Komunitas</a>
              <a href="#program" style={{border:'1px solid rgba(255,255,255,.5)',padding:'14px 22px',borderRadius:10,fontWeight:700}}>Jelajahi Program</a>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{marginTop:-42,position:'relative'}}>
        <div style={{background:'#fff',borderRadius:18,padding:28,display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:18,boxShadow:'0 15px 45px rgba(16,24,40,.12)'}}>
          {['Member','Provinsi','Kab/Kota','Program','Partner'].map((x,i)=><div key={x} style={{textAlign:'center'}}><strong style={{display:'block',fontSize:30,color:'var(--primary)'}}>{['100K+','38','500+','20+','100+'][i]}</strong><span style={{fontSize:13,color:'#667085'}}>{x}</span></div>)}
        </div>
      </section>

      <section id="program" className="container" style={{padding:'90px 0'}}>
        <p style={{color:'var(--primary)',fontWeight:700,marginBottom:8}}>PROGRAM UNGGULAN</p><h2 style={{fontSize:42,margin:'0 0 14px'}}>Dari belajar menjadi bertumbuh.</h2><p style={{maxWidth:650,color:'#667085',lineHeight:1.7}}>Program komunitas dirancang untuk membantu UMKM meningkatkan kapabilitas dan membuka peluang baru.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:18,marginTop:36}}>{programs.map(([title,desc],i)=><article key={title} style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:16,padding:26}}><div style={{fontSize:13,fontWeight:800,color:'var(--primary)'}}>0{i+1}</div><h3 style={{fontSize:22,margin:'12px 0 8px'}}>{title}</h3><p style={{color:'#667085',lineHeight:1.6,margin:0}}>{desc}</p></article>)}</div>
      </section>

      <section id="tentang" style={{background:'#fff',padding:'80px 0'}}><div className="container" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:50,alignItems:'center'}}><div><p style={{color:'var(--primary)',fontWeight:700}}>TENTANG KOMUNITAS</p><h2 style={{fontSize:40,margin:'10px 0 18px'}}>Rumah digital bagi UMKM Indonesia.</h2><p style={{color:'#667085',lineHeight:1.8}}>Komunitas UMKM Naik Kelas menjadi ruang untuk belajar, membangun jejaring, mendapatkan peluang, dan berkolaborasi menuju pertumbuhan usaha yang berkelanjutan.</p></div><div style={{background:'#F0F7FF',borderRadius:20,padding:34}}><h3 style={{marginTop:0}}>Ekosistem terbuka</h3><p style={{color:'#667085',lineHeight:1.7}}>Menghubungkan UMKM dengan mentor, pemerintah, korporasi, kampus, investor, lembaga keuangan, dan mitra teknologi.</p></div></div></section>

      <section id="berita" className="container" style={{padding:'80px 0'}}><p style={{color:'var(--primary)',fontWeight:700}}>BERITA & AGENDA</p><h2 style={{fontSize:40,margin:'10px 0 30px'}}>Aktivitas terbaru komunitas.</h2><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:18}}>{['Kabar Komunitas','Program UMKM Naik Kelas','Agenda & Event'].map(x=><div key={x} style={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:16,padding:25}}><div style={{height:130,borderRadius:12,background:'#EAF5FF',marginBottom:18}}/><h3>{x}</h3><p style={{color:'#667085'}}>Konten dinamis akan dikelola melalui CMS Supabase.</p></div>)}</div></section>

      <section style={{background:'#005BAC',color:'#fff',padding:'70px 0'}}><div className="container" style={{display:'flex',justifyContent:'space-between',gap:30,alignItems:'center',flexWrap:'wrap'}}><div><h2 style={{fontSize:36,margin:'0 0 8px'}}>Siap naik kelas?</h2><p style={{margin:0,opacity:.85}}>Bergabung dan tumbuh bersama komunitas UMKM Indonesia.</p></div><a href="/auth/register" style={{background:'#fff',color:'#005BAC',padding:'14px 22px',borderRadius:10,fontWeight:700}}>Daftar Sekarang</a></div></section>
      <footer style={{background:'#0B1F33',color:'#fff',padding:'35px 0'}}><div className="container" style={{display:'flex',justifyContent:'space-between',gap:20,flexWrap:'wrap',fontSize:13}}><span>© 2026 Komunitas UMKM Naik Kelas</span><span>Bersama Tumbuh, Bersama Naik Kelas</span></div></footer>
    </main>
  );
}

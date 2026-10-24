import { useState } from 'react'

type Screen = 'home' | 'priority' | 'air' | 'notifications' | 'advice' | 'devices' | 'history' | 'detail' | 'deviceDetail' | 'preferences' | 'settings' | 'report' | 'reportSuccess' | 'announcement' | 'announcementHistory'
type UserRole = 'citizen' | 'government' | 'firefighter'
type IconName = 'home' | 'flame' | 'bell' | 'cpu' | 'history' | 'map' | 'arrow' | 'shield' | 'user' | 'building' | 'users' | 'chevron' | 'nav' | 'check' | 'clock' | 'filter' | 'droplet' | 'thermo' | 'smoke' | 'mountain' | 'close' | 'mail' | 'lock' | 'eye' | 'eyeOff' | 'more' | 'settings' | 'moon' | 'signal' | 'battery'

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>,
    flame: <path d="M12 22c4.4 0 8-3.1 8-7.2 0-3-1.8-5.6-4.5-7.8.1 2.2-1 3.7-2.3 4.4.2-3.5-1.8-6.8-5-9.4.2 4.2-4.2 6.8-4.2 12.8C4 18.9 7.6 22 12 22Z"/>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    cpu: <><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 9h6v6H9zM9 1v4m6-4v4M9 19v4m6-4v4M1 9h4m-4 6h4m14-6h4m-4 6h4"/></>,
    history: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z"/><path d="M9 3v15m6-12v15"/></>,
    arrow: <path d="m15 18-6-6 6-6"/>,
    shield: <><path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z"/><path d="m9 12 2 2 4-5"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 22c.5-5 3-7 8-7s7.5 2 8 7"/></>,
    building: <><path d="M4 22V3h12v19M16 9h4v13M8 7h4M8 11h4M8 15h4M8 19h4"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    nav: <><path d="m3 11 19-9-9 19-2-8-8-2Z"/><path d="m11 13 4-4"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    filter: <path d="M4 5h16M7 12h10M10 19h4"/>,
    droplet: <path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z"/>,
    thermo: <><path d="M14 14.8V5a4 4 0 0 0-8 0v9.8a6 6 0 1 0 8 0Z"/><path d="M10 9v8"/></>,
    smoke: <><path d="M4 18c0-2 1.5-3 3-3s3-1 3-3-1.5-3-3-3M11 20c0-2 1.5-3 3-3s3-1 3-3-1.5-3-3-3M15 8c1.5 0 3-1 3-3"/></>,
    mountain: <path d="m3 20 6-12 4 7 2-3 6 8Z"/>,
    close: <path d="M18 6 6 18M6 6l12 12"/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></>,
    eyeOff: <><path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.8 5.2A11 11 0 0 1 12 5c6.5 0 10 7 10 7a18 18 0 0 1-2.1 3M6.2 6.2C3.5 8 2 12 2 12s3.5 7 10 7a10 10 0 0 0 3.8-.8"/></>,
    more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19 14.5v-5l-2.2-.8-.7-1.7 1-2-3.6-2-1.5 1.6L10.2 5 8.5 3.4 5 5.5l1 2-.8 1.7L3 10v4l2.2.8.8 1.7-1 2L8.5 21l1.7-1.6 1.8.5 1.5 1.6 3.5-2-1-2 .8-1.7Z"/></>,
    moon: <path d="M20 15.5A8 8 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/>,
    signal: <path d="M5 20v-3M10 20v-7M15 20V9M20 20V4"/>,
    battery: <><rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 10v4M5 10h10v4H5z"/></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{paths[name]}</svg>
}

const events = [
  { location: 'Hutan Lindung Bukit Barisan', area: 2450, priority: 'Tinggi', time: '10 menit lalu', status: 'Baru' },
  { location: 'Taman Nasional Way Kambas', area: 1280, priority: 'Tinggi', time: '28 menit lalu', status: 'Ditangani' },
  { location: 'Hutan Register 38', area: 640, priority: 'Sedang', time: '1 jam lalu', status: 'Ditangani' },
  { location: 'Kawasan Hutan Sukadana', area: 180, priority: 'Rendah', time: '3 jam lalu', status: 'Selesai' },
]

function Badge({ children, tone = 'gray' }: { children: React.ReactNode; tone?: string }) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

function Header({ title, subtitle, back, menu }: { title: string; subtitle?: string; back?: () => void; menu?: () => void }) {
  return <header className="page-header">
    <div className="header-title">
      {back && <button className="icon-button" onClick={back} aria-label="Kembali"><Icon name="arrow" /></button>}
      <div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>
    </div>
    {!back && <button className="profile-button" onClick={menu} aria-label={menu ? 'Buka menu' : 'Profil'}><Icon name={menu ? 'more' : 'user'} size={18} /></button>}
  </header>
}

function BrandHeader() {
  return <>
    <div className="brand-mark"><Icon name="flame" size={34} /></div>
    <div className="login-heading">
      <div className="eyebrow">SISTEM PERINGATAN DINI</div>
      <h1>Fire<span>Watch</span></h1>
      <p>Pantau. Cegah. Lindungi.</p>
    </div>
  </>
}

function StartScreen({ onCitizen, onGovernment, onFirefighter }: { onCitizen: () => void; onGovernment: () => void; onFirefighter: () => void }) {
  return <main className="login-screen start-screen">
    <BrandHeader />
    <section className="login-card">
      <div className="login-title"><strong>Pilih akses Anda</strong><small>Sesuaikan informasi dan fitur yang Anda perlukan</small></div>
      <div className="access-list">
        <button className="access-card citizen" onClick={onCitizen}>
          <span className="access-icon"><Icon name="users" /></span>
          <span><strong>Warga</strong><small>Terima peringatan kebakaran di sekitar tempat tinggal</small></span>
          <Icon name="chevron" size={18} />
        </button>
        <button className="access-card firefighter" onClick={onFirefighter}>
          <span className="access-icon"><Icon name="shield" /></span>
          <span><strong>Pemadam Kebakaran</strong><small>Akses penanganan insiden, perlu login</small></span>
          <Icon name="chevron" size={18} />
        </button>
        <button className="access-card government" onClick={onGovernment}>
          <span className="access-icon"><Icon name="building" /></span>
          <span><strong>Pemerintah Daerah</strong><small>Pemantauan wilayah dan laporan, perlu login</small></span>
          <Icon name="chevron" size={18} />
        </button>
      </div>
    </section>
    <div className="secure-note"><Icon name="shield" size={15} /> Terhubung aman ke jaringan IoT FireWatch</div>
  </main>
}

function CitizenData({ onContinue, onBack }: { onContinue: () => void; onBack: () => void }) {
  return <main className="login-screen data-screen">
    <BrandHeader />
    <section className="login-card">
      <button className="back-link" onClick={onBack}><Icon name="arrow" size={16} /> Kembali</button>
      <div className="login-title"><strong>Data Warga</strong><small>Data ini digunakan untuk menyesuaikan peringatan di sekitar Anda</small></div>
      <form className="login-form" onSubmit={(event) => { event.preventDefault(); onContinue() }}>
        <label><span>Nama lengkap</span><div className="input-wrap"><Icon name="user" size={17} /><input type="text" placeholder="Masukkan nama lengkap" required /></div></label>
        <label><span>Desa / kelurahan</span><div className="input-wrap"><Icon name="map" size={17} /><input type="text" placeholder="Contoh: Sukadana" required /></div></label>
        <div className="address-grid">
          <label><span>Kecamatan</span><div className="input-wrap"><input type="text" placeholder="Kecamatan" required /></div></label>
          <label><span>Kabupaten</span><div className="input-wrap"><input type="text" placeholder="Kabupaten" required /></div></label>
        </div>
        <button type="submit" className="primary-button">Lanjutkan <Icon name="chevron" size={18} /></button>
      </form>
    </section>
  </main>
}

function Login({ onLogin, onBack, government = false }: { onLogin: () => void; onBack: () => void; government?: boolean }) {
  const [showPassword, setShowPassword] = useState(false)
  return <main className="login-screen">
    <BrandHeader />
    <section className="login-card">
      <button className="back-link" onClick={onBack}><Icon name="arrow" size={16} /> Kembali</button>
      <div className="login-title">
        <strong>Login {government ? 'Pemerintah Daerah' : 'Pemadam Kebakaran'}</strong>
        <small>{government ? 'Masuk untuk memantau seluruh wilayah' : 'Masuk untuk mengakses penanganan insiden'}</small>
      </div>
      <form className="login-form" onSubmit={(event) => { event.preventDefault(); onLogin() }}>
        <label>
          <span>Email atau username</span>
          <div className="input-wrap"><Icon name="mail" size={17} /><input type="text" placeholder="nama@email.com" autoComplete="username" required /></div>
        </label>
        <label>
          <span>Kata sandi</span>
          <div className="input-wrap">
            <Icon name="lock" size={17} />
            <input type={showPassword ? 'text' : 'password'} placeholder="Masukkan kata sandi" autoComplete="current-password" required />
            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}><Icon name={showPassword ? 'eyeOff' : 'eye'} size={18} /></button>
          </div>
        </label>
        <button type="button" className="forgot-link">Lupa kata sandi?</button>
        <button type="submit" className="primary-button">Masuk <Icon name="chevron" size={18} /></button>
      </form>
      <div className="admin-note"><Icon name="shield" size={15} /><span>Akun {government ? 'pemerintah daerah' : 'pemadam'} dibuat oleh administrator</span></div>
    </section>
    <div className="secure-note"><Icon name="shield" size={15} /> Terhubung aman ke jaringan IoT FireWatch</div>
  </main>
}

function MapCard({ compact = false }: { compact?: boolean }) {
  return <div className={`map-card ${compact ? 'compact' : ''}`}>
    <div className="road r1" /><div className="road r2" /><div className="road r3" />
    <div className="river" />
    <div className="map-label l1">Bukit Barisan</div><div className="map-label l2">Sukadana</div>
    <span className="marker green m1"><Icon name="cpu" size={12} /></span>
    <span className="marker yellow m2"><Icon name="cpu" size={12} /></span>
    <span className="marker red m3"><Icon name="flame" size={13} /></span>
    {!compact && <div className="legend"><span><i className="dot green" />Aman</span><span><i className="dot yellow" />Waspada</span><span><i className="dot red" />Bahaya</span></div>}
  </div>
}

function Home({ onDetail, onAlarm, onReport, onAnnouncement, role, onMenu }: { onDetail: () => void; onAlarm: () => void; onReport: () => void; onAnnouncement: () => void; role: UserRole; onMenu: () => void }) {
  const citizen = role === 'citizen'
  const government = role === 'government'
  const hasLocalFire = true
  return <><Header menu={onMenu} title={citizen ? 'Halo, Warga Sukadana' : government ? 'Ringkasan Wilayah Lampung' : 'Selamat pagi, Komandan'} subtitle="Lampung • Selasa, 24 Juni" />
    <div className="content">
      {citizen && <>
      <section className="government-notice"><span className="notice-icon"><Icon name="building"/></span><span><Badge tone="red">Pengumuman Pemerintah</Badge><strong>Hindari pembakaran lahan</strong><small>Pemkab Lampung Timur • 20 menit lalu</small></span></section>
      <div className="section-head condition-heading"><h2>Kondisi Terkini</h2><span className="live"><i /> DIPERBARUI</span></div>
      {hasLocalFire ? <section className="local-alert">
        <div className="local-alert-head"><span className="pulse-icon"><Icon name="flame" /></span><span><small>PERINGATAN WILAYAH</small><h2>Kebakaran di daerah Anda</h2></span></div>
        <strong>Hutan Lindung Bukit Barisan</strong>
        <p>Terdeteksi 14.32 WIB, 12 menit lalu</p>
        <div className="local-fire-grid"><span><small>Luas api</small><b>2.450 m²</b></span><span><small>Jarak dari Anda</small><b>8,4 km</b></span><span><small>Penyiraman</small><Badge tone="blue">Aktif</Badge></span><span><small>Penanganan</small><Badge tone="orange">Baru</Badge></span></div>
        <div className="citizen-location-note"><Icon name="map" size={15}/> Bukit Barisan • sekitar 8,4 km dari alamat Anda</div>
      </section> : <section className="local-safe"><span><Icon name="check"/></span><div><h2>Tidak ada kebakaran di sekitar Anda</h2><p>Terakhir diperbarui hari ini, 14.44 WIB</p></div></section>}
      <section className="weather-strip">
        <span><small>Kualitas udara</small><b>72 <em>Sedang</em></b></span>
        <span><small>Suhu</small><b>32°C</b></span>
        <span><small>Angin</small><b>12 km/j</b><em>Timur Laut</em></span>
      </section>
      <section className="safety-card">
        <div className="section-head no-margin"><h2>Saran Keselamatan</h2><Icon name="shield" size={18}/></div>
        <ul><li>Jauhi area kebakaran dan akses petugas</li><li>Gunakan masker saat berada di luar</li><li>Ikuti arahan petugas dan pemerintah setempat</li></ul>
        <div className="emergency-actions"><button><Icon name="bell" size={16}/> Hubungi 112</button><button><Icon name="flame" size={16}/> Pemadam 113</button></div>
      </section>
      <div className="section-head"><h2>Kejadian Terbaru di Sekitar</h2><button>Lihat semua</button></div>
      <div className="nearby-list">
        {events.slice(0,3).map((event) => <div className="nearby-item" key={event.location}><span className="nearby-dot"><Icon name="flame" size={14}/></span><span><strong>{event.location}</strong><small>{event.time} • sekitar {event.area > 1000 ? '8,4' : '14,2'} km</small></span><Badge tone={event.status === 'Baru' ? 'red' : 'orange'}>{event.status}</Badge></div>)}
      </div>
      <div className="section-head"><h2>Peta Kebakaran Sekitar</h2></div><MapCard />
      <div className="section-head"><h2>Laporan Saya</h2><button onClick={onReport}>Buat laporan</button></div>
      <div className="my-reports">
        <div><span><strong>Asap di lahan kosong</strong><small>Hari ini, 13.18 • Sukadana</small></span><Badge tone="yellow">Menunggu Verifikasi</Badge></div>
        <div><span><strong>Api kecil dekat kebun</strong><small>22 Jun, 17.42 • Sukadana</small></span><Badge tone="green">Terverifikasi</Badge></div>
        <div><span><strong>Asap pembakaran sampah</strong><small>18 Jun, 09.10 • Pasar Lama</small></span><Badge tone="gray">Ditolak</Badge></div>
      </div>
      </>}
      {!citizen && <>
      {government && <section className="announcement-shortcut"><span className="shortcut-icon"><Icon name="bell"/></span><span><strong>Pengumuman ke Warga</strong><small>Kirim imbauan atau peringatan wilayah</small></span><button onClick={onAnnouncement}>Buat <Icon name="chevron" size={15}/></button></section>}
      {role === 'firefighter' && <section className="incoming-reports"><div className="section-head no-margin"><h2>Laporan Warga Masuk</h2><Badge tone="yellow">2 belum diverifikasi</Badge></div><div className="incoming-item"><span className="report-thumb"><Icon name="smoke"/></span><span><strong>Asap tebal dekat kebun</strong><small>Sukadana • 6 menit lalu • 4,2 km</small></span><div><button className="verify">Verifikasi</button><button>Tolak</button></div></div><small className="incoming-note">Laporan terverifikasi otomatis masuk Daftar Prioritas.</small></section>}
      <div className="section-head"><h2>Ringkasan Sistem</h2></div>
      <section className="summary-grid">
        <div className="summary-card"><span className="summary-icon safe"><Icon name="cpu" /></span><strong>42</strong><small>Perangkat aktif</small></div>
        <button className="summary-card danger-card" onClick={citizen ? onDetail : onAlarm}><span className="summary-icon danger"><Icon name="flame" /></span><strong>2</strong><small>Kebakaran aktif</small></button>
        <div className="summary-card"><span className="summary-icon warning"><Icon name="smoke" /></span><strong>156</strong><small>AQI terburuk • Way Jepara</small></div>
      </section>
      <div className="section-head"><h2>Peta Pemantauan</h2><button>Lihat semua</button></div>
      <MapCard />
      <div className="section-head"><h2>Status Terbaru</h2><span className="live"><i /> LANGSUNG</span></div>
      <button className="incident-card" onClick={onDetail}>
        <span className="incident-icon"><Icon name="flame" /></span>
        <span className="incident-copy"><span><Badge tone="red">BAHAYA</Badge><small>10 menit lalu</small></span><strong>Hutan Lindung Bukit Barisan</strong><small>Luas api 2.450 m² • Penyiraman aktif</small></span>
        <Icon name="chevron" size={18} />
      </button>
      <div className="status-card"><span className="status-line yellow" /><span className="status-main"><strong>Sensor FW-017</strong><small>Asap meningkat • Register 38</small></span><Badge tone="yellow">Waspada</Badge></div>
      </>}
    </div>
    {citizen && <button className="report-fab" onClick={onReport}><Icon name="flame" size={18}/> Lapor</button>}
  </>
}

function Priority({ onDetail }: { onDetail: () => void }) {
  const [filter, setFilter] = useState('Semua')
  return <><Header title="Prioritas Kebakaran" subtitle="Diurutkan berdasarkan luas api" />
    <div className="content">
      <div className="filter-row">
        {['Semua', 'Baru', 'Ditangani'].map(x => <button className={filter === x ? 'active' : ''} onClick={() => setFilter(x)} key={x}>{x}</button>)}
        <button className="filter-button"><Icon name="filter" size={16} /> Prioritas</button>
      </div>
      <div className="sort-note"><Icon name="flame" size={16} /><span><strong>Urutan respons</strong><small>Berdasarkan luas api terbesar, bukan suhu</small></span></div>
      <div className="event-list">
        {events.filter(e => filter === 'Semua' || e.status === filter).map((event, i) => <button className="event-card" key={event.location} onClick={onDetail}>
          <span className="rank">{i + 1}</span>
          <span className="event-content">
            <span className="event-top"><Badge tone={event.priority === 'Tinggi' ? 'red' : event.priority === 'Sedang' ? 'yellow' : 'green'}>Prioritas {event.priority}</Badge><Badge tone={event.status === 'Baru' ? 'blue' : event.status === 'Selesai' ? 'green' : 'orange'}>{event.status}</Badge></span>
            <strong>{event.location}</strong>
            <span className="area"><Icon name="flame" size={16} /><b>{event.area.toLocaleString('id-ID')} m²</b><small><Icon name="clock" size={13} />{event.time}</small></span>
          </span><Icon name="chevron" size={18} />
        </button>)}
      </div>
    </div>
  </>
}

function Gauge({ icon, label, value, unit, percent, dangerAt }: { icon: IconName; label: string; value: string; unit: string; percent: number; dangerAt: number }) {
  return <div className="gauge">
    <div className="gauge-head"><span className="gauge-icon"><Icon name={icon} size={18} /></span><span><small>{label}</small><strong>{value}<em>{unit}</em></strong></span></div>
    <div className="gauge-track"><i className="gauge-fill" style={{ width: `${percent}%` }} /><span className="threshold t1" /><span className="threshold t2" /></div>
    <div className="gauge-labels"><span>Aman</span><span>Waspada</span><span>Bahaya ≥ {dangerAt}</span></div>
  </div>
}

function Detail({ onBack, role }: { onBack: () => void; role: UserRole }) {
  const [step, setStep] = useState(0)
  const firefighter = role === 'firefighter'
  return <div className="route-screen"><Header title="Rute ke Lokasi" subtitle="Rute tercepat tersedia" back={onBack} />
    <div className="route-map">
      <div className="road r1" /><div className="road r2" /><div className="road r3" /><div className="river" />
      <svg className="route-lines" viewBox="0 0 390 430"><path className="alt-route" d="M75 365 C100 270 250 300 305 110"/><path className="main-route" d="M75 365 C165 345 145 205 305 110"/></svg>
      <span className="user-marker"><i /></span><span className="fire-marker"><Icon name="flame" size={18} /></span>
      <div className="route-chip"><b>8,4 km</b><span>•</span> 18 menit</div>
    </div>
    <section className="route-sheet">
      <span className="sheet-handle" />
      <div className="route-title"><span><Badge tone="red">Prioritas Tinggi</Badge><h2>Hutan Lindung Bukit Barisan</h2></span><span className="route-time"><b>18</b><small>menit</small></span></div>
      <div className="route-stats"><span><small>Jarak</small><b>8,4 km</b></span><span><small>Luas api</small><b>2.450 m²</b></span><span><small>Ketinggian</small><b>624 m</b></span></div>
      <div className="coordinate-line"><Icon name="map" size={15} /> -5.44782, 104.32891</div>
      <div className="terrain-warning"><Icon name="mountain" size={18} /><span><strong>Medan curam / ada jurang di sekitar lokasi</strong><small>Kurangi kecepatan saat mendekati titik</small></span></div>
      <button className="primary-button"><Icon name="nav" size={18} /> Mulai Navigasi</button>
      <section className="crew-status"><div className="section-head no-margin"><h2>Status Regu Pemadam</h2><Badge tone={step === 2 ? 'green' : 'orange'}>{step === 2 ? 'Api Padam' : step === 1 ? 'Tiba di Lokasi' : 'Dalam Perjalanan'}</Badge></div>
        <div className="status-stepper">{['Dalam Perjalanan','Tiba di Lokasi','Api Padam'].map((label,i)=><span className={i <= step ? 'done' : ''} key={label}><i>{i < step ? <Icon name="check" size={12}/> : i+1}</i><small>{label}</small><em>{i <= step ? `${14+i*18}.${i ? '02' : '44'} WIB` : 'Menunggu'}</em></span>)}</div>
        {firefighter && step < 2 && <button className="outline-button route-handle" onClick={() => setStep(step+1)}>Konfirmasi: {step === 0 ? 'Tiba di Lokasi' : 'Api Padam'} <Icon name="chevron" size={17}/></button>}
      </section>
      <section className="field-notes"><div className="section-head no-margin"><h2>Catatan Lapangan</h2>{!firefighter && <Badge tone="gray">Hanya lihat</Badge>}</div>
        {firefighter && <div className="note-compose"><textarea placeholder="Tulis kondisi lapangan..."/><div><button><Icon name="map" size={15}/> Tambah Foto</button><button className="note-send">Tambah Catatan</button></div></div>}
        <div className="field-note-item"><span className="avatar-note">AR</span><span><strong>Andi Rahman • Regu 2</strong><p>Tim menuju sisi timur. Akses cukup curam, unit air sudah mendekat.</p><small>Hari ini, 14.46 WIB</small></span></div>
      </section>
    </section>
  </div>
}

const notices = [
  { type: 'Bahaya', location: 'Hutan Lindung Bukit Barisan', coord: '-5.44782, 104.32891', altitude: '624 m', time: '10 menit lalu', desc: '3 kriteria terpenuhi • Penyiraman aktif' },
  { type: 'Waspada', location: 'Hutan Register 38', coord: '-5.21940, 104.51732', altitude: '412 m', time: '1 jam lalu', desc: 'Api kecil, belum menyebar • Informasi' },
  { type: 'Waspada', location: 'Kawasan Hutan Sukadana', coord: '-5.06421, 105.53918', altitude: '86 m', time: '3 jam lalu', desc: 'Kepekatan asap meningkat • Informasi' },
]

function Notifications({ onDetail, citizen = false }: { onDetail: () => void; citizen?: boolean }) {
  return <><Header title="Notifikasi" subtitle="3 pemberitahuan belum dibaca" /><div className="content">
    {citizen && <section className="government-notice notification-announcement"><span className="notice-icon"><Icon name="building"/></span><span><Badge tone="red">Pengumuman Pemerintah</Badge><strong>Hindari pembakaran lahan</strong><small>Untuk seluruh wilayah • 20 menit lalu</small></span></section>}
    <div className="notice-explain"><span><i className="dot yellow" /><b>Waspada</b> Informasi awal</span><span><i className="dot red" /><b>Bahaya</b> Perlu respons</span></div>
    {notices.map((n, i) => <button className={`notice-card ${n.type.toLowerCase()}`} onClick={onDetail} key={i}>
      <span className="notice-icon"><Icon name={n.type === 'Bahaya' ? 'flame' : 'bell'} /></span><span className="notice-body"><span><Badge tone={n.type === 'Bahaya' ? 'red' : 'yellow'}>{n.type}</Badge><small>{n.time}</small></span><strong>{n.location}</strong><p>{n.desc}</p><div><small><Icon name="map" size={13} /> {n.coord}</small><small><Icon name="mountain" size={13} /> {n.altitude}</small></div></span>
    </button>)}
  </div></>
}

const devices = [
  ['FW-001', 'Bukit Barisan • Sektor A', 'Aktif', '32°C • Asap 12%'],
  ['FW-017', 'Hutan Register 38', 'Aktif', '48°C • Asap 62%'],
  ['FW-024', 'Way Kambas • Pos Timur', 'Aktif', '29°C • Asap 8%'],
  ['FW-031', 'Sukadana • Sektor C', 'Nonaktif', 'Terakhir 2 jam lalu'],
]
function Devices({ onDevice }: { onDevice: () => void }) {
  return <><Header title="Perangkat" subtitle="42 dari 45 alat aktif" /><div className="content">
    <div className="device-health"><div><span>93%</span><small>Kesehatan jaringan</small></div><div className="health-bar"><i /></div></div>
    <div className="filter-row"><button className="active">Semua 45</button><button>Aktif 42</button><button>Nonaktif 3</button></div>
    {devices.map(d => <button className="device-card" onClick={onDevice} key={d[0]}><span className={`device-icon ${d[2] === 'Nonaktif' ? 'offline' : ''}`}><Icon name="cpu" /></span><span><span><strong>{d[0]}</strong><Badge tone={d[2] === 'Aktif' ? 'green' : 'gray'}>{d[2]}</Badge></span><small>{d[1]}</small><em>{d[3]}</em></span><Icon name="chevron" size={17} /></button>)}
  </div></>
}

function Sparkline({ tone = 'safe' }: { tone?: string }) {
  return <svg className={`sparkline ${tone}`} viewBox="0 0 100 28"><path d="M1 22 12 18 22 20 34 10 45 15 56 8 68 14 79 5 90 9 99 3"/></svg>
}

function DeviceDetail({ onBack, canControl }: { onBack: () => void; canControl: boolean }) {
  return <><Header title="Sensor Bukit A-01" subtitle="ID FW-001" back={onBack} /><div className="content device-detail">
    <div className="device-status-head"><span className="device-icon"><Icon name="cpu" /></span><span><strong>Sensor Bukit A-01</strong><small>Bukit Barisan • Sektor A</small></span><Badge tone="green">Online</Badge></div>
    <div className="device-meta"><span><Icon name="battery" /><b>86%</b><small>Baterai</small></span><span><Icon name="signal" /><b>Kuat</b><small>Sinyal</small></span><span><Icon name="clock" /><b>1 mnt</b><small>Data terakhir</small></span></div>
    <div className="section-head"><h2>Pembacaan Saat Ini</h2><span className="live"><i /> LANGSUNG</span></div>
    <div className="sensor-cards">
      {[['thermo','Suhu','32°C','Aman','safe'],['smoke','Kepekatan Asap','12%','Aman','safe'],['flame','Luas Api','0 m²','Aman','safe']].map(x => <div className="sensor-card" key={x[1]}><span><Icon name={x[0] as IconName} size={17}/><small>{x[1]}</small></span><strong>{x[2]}</strong><Badge tone="green">{x[3]}</Badge><Sparkline tone={x[4]} /></div>)}
    </div>
    <section className="card"><div className="section-head no-margin"><h2>Sistem Penyiram</h2><Badge tone="green">Normal</Badge></div><div className="pump-row"><span><Icon name="droplet" /><small>Pompa</small><b>Nonaktif</b></span><span><small>Air tandon</small><b>78%</b><i><em /></i></span></div></section>
    <section className="card"><div className="section-head no-margin"><h2>Lokasi Perangkat</h2></div><MapCard compact /><div className="coords"><span><small>Latitude</small><strong>-5.44782</strong></span><span><small>Longitude</small><strong>104.32891</strong></span><span><small>Ketinggian</small><strong>624 m</strong></span></div></section>
    <section className="card"><div className="section-head no-margin"><h2>Riwayat Perangkat</h2></div><div className="mini-history"><span><i className="dot yellow"/><b>Asap meningkat</b><small>Hari ini, 08.14</small></span><span><i className="dot green"/><b>Uji sistem berhasil</b><small>23 Jun, 16.30</small></span></div></section>
    {canControl && <div className="device-actions"><button className="outline-button"><Icon name="bell"/> Uji Alarm</button><button className="primary-button"><Icon name="droplet"/> Nyalakan Pompa Manual</button></div>}
  </div></>
}

function Preferences({ dark, setDark, onBack }: { dark: boolean; setDark: (v: boolean) => void; onBack: () => void }) {
  return <><Header title="Preferensi" back={onBack}/><div className="content"><div className="setting-row"><span className="setting-icon"><Icon name="moon"/></span><span><strong>Mode Gelap</strong><small>Nyaman digunakan pada malam hari</small></span><button className={`toggle ${dark ? 'on' : ''}`} onClick={() => setDark(!dark)}><i/></button></div></div></>
}

function SettingsScreen({ onBack }: { onBack: () => void }) {
  return <><Header title="Pengaturan" back={onBack}/><div className="content">
    <section className="card"><div className="section-head no-margin"><h2>Bahasa</h2></div><div className="language-row"><button className="selected">Indonesia</button><button>English</button></div></section>
    <section className="card"><div className="section-head no-margin"><h2>Ganti Lokasi</h2></div><div className="input-wrap"><Icon name="map" size={17}/><input placeholder="Cari alamat atau wilayah pantau"/></div><MapCard compact/><button className="primary-button location-save">Simpan Lokasi</button></section>
  </div></>
}

function MoreMenu({ onClose, go }: { onClose: () => void; go: (screen: Screen) => void }) {
  return <><button className="menu-backdrop" onClick={onClose} aria-label="Tutup menu"/><div className="more-menu">
    <button onClick={() => go('preferences')}><Icon name="moon"/><span><b>Preferensi</b><small>Mode gelap</small></span></button>
    <button onClick={() => go('history')}><Icon name="history"/><span><b>Riwayat</b><small>Kejadian selesai</small></span></button>
    <button onClick={() => go('settings')}><Icon name="settings"/><span><b>Pengaturan</b><small>Bahasa & lokasi</small></span></button>
  </div></>
}

function HistoryScreen({ onBack, role }: { onBack: () => void; role: UserRole }) {
  const citizen = role === 'citizen'
  return <><Header title={citizen ? 'Riwayat Notifikasi' : 'Riwayat Kejadian'} subtitle={citizen ? 'Peringatan yang pernah diterima' : 'Kejadian yang telah selesai'} back={onBack} /><div className="content">
    <button className="date-filter"><Icon name="history" size={18} /><span><small>Rentang tanggal</small><strong>1–24 Juni 2025</strong></span><Icon name="chevron" size={17} /></button>
    {!citizen && <><div className="history-summary"><div><strong>18</strong><small>Kejadian selesai</small></div><div><strong>7.840 m²</strong><small>Total area terbakar</small></div></div><button className="outline-button export-button">Ekspor Laporan</button></>}
    <div className="timeline">
      {[
        ['18 Jun', 'Kawasan Hutan Sukadana', citizen ? 'Bahaya' : '180 m²', citizen ? 'Diterima pukul 14.32' : 'Selesai dalam 42 menit'],
        ['12 Jun', 'Way Kambas • Pos Utara', '420 m²', 'Selesai dalam 1j 15m'],
        ['05 Jun', 'Hutan Register 38', '95 m²', 'Selesai dalam 28 menit'],
      ].map(x => <div className="history-item" key={x[1]}><span className="timeline-dot"><Icon name="check" size={13} /></span><span><small>{x[0]}</small><strong>{x[1]}</strong><p><b>{x[2]}</b> • {x[3]}</p></span><Icon name="chevron" size={17} /></div>)}
    </div>
  </div></>
}

function AirQuality() {
  const regions = [
    ['Kec. Way Jepara', '156', 'Tidak Sehat', 'red'],
    ['Desa Sukadana', '112', 'Tidak Sehat', 'orange'],
    ['Kec. Labuhan Ratu', '78', 'Sedang', 'yellow'],
    ['Kec. Braja Selebah', '42', 'Baik', 'green'],
  ]
  return <><Header title="Kualitas Udara" subtitle="Pemantauan sensor FireWatch"/><div className="content air-content">
    <div className="air-map">
      <span className="air-zone z1 red"/><span className="air-zone z2 orange"/><span className="air-zone z3 yellow"/><span className="air-zone z4 green"/><span className="air-zone z5 purple"/>
      <div className="road r1"/><div className="road r2"/><span className="air-location"><i/> Lokasi Anda</span>
      <div className="air-legend">{[['green','Baik'],['yellow','Sedang'],['orange','Tidak Sehat'],['red','Sangat Tidak Sehat'],['purple','Berbahaya']].map(x=><span key={x[1]}><i className={x[0]}/>{x[1]}</span>)}</div>
    </div>
    <section className="aqi-card">
      <div><small>KUALITAS UDARA DI LOKASI ANDA</small><span><strong>72</strong><Badge tone="yellow">Sedang</Badge></span><p>Kelompok sensitif disarankan mengurangi aktivitas berat di luar ruangan.</p></div>
      <span className="aqi-ring"><Icon name="smoke" size={27}/></span>
    </section>
    <div className="section-head"><h2>Detail Polutan</h2></div>
    <div className="pollutant-grid"><span><small>PM2.5</small><strong>28</strong><em>µg/m³</em></span><span><small>PM10</small><strong>64</strong><em>µg/m³</em></span><span><small>CO</small><strong>1,2</strong><em>mg/m³</em></span></div>
    <section className="card trend-card"><div className="section-head no-margin"><h2>Tren 24 Jam</h2><Badge tone="yellow">Sedang</Badge></div><svg viewBox="0 0 320 95"><path className="trend-area" d="M0 77 C35 70 45 36 78 48S130 72 160 42 210 18 240 38 280 68 320 25V95H0Z"/><path className="trend-line" d="M0 77 C35 70 45 36 78 48S130 72 160 42 210 18 240 38 280 68 320 25"/><path className="trend-guide" d="M0 55H320"/></svg><div><span>00.00</span><span>06.00</span><span>12.00</span><span>18.00</span><span>Sekarang</span></div></section>
    <div className="section-head"><h2>Kualitas Udara per Daerah</h2><small>Terburuk dahulu</small></div>
    <div className="region-list">{regions.map(x=><div key={x[0]}><span className={`region-rank ${x[3]}`}/><span><strong>{x[0]}</strong><small>Indeks kualitas udara</small></span><b>{x[1]}</b><Badge tone={x[3]}>{x[2]}</Badge></div>)}</div>
    <div className="data-source"><Icon name="cpu" size={14}/> Diperbarui 2 menit lalu • Sumber: Sensor FireWatch</div>
  </div></>
}

function SafetyAdvice() {
  return <><Header title="Saran Keselamatan" subtitle="Panduan untuk warga"/><div className="content">
    <section className="safety-hero"><Icon name="shield" size={30}/><span><strong>Tetap aman dan siaga</strong><small>Ikuti panduan saat ada kebakaran atau kualitas udara memburuk.</small></span></section>
    {[
      ['flame','Jauhi area kebakaran','Jangan mendekati titik api dan pastikan akses kendaraan petugas tetap terbuka.'],
      ['smoke','Gunakan masker','Gunakan masker yang sesuai ketika asap mulai tercium atau kualitas udara menurun.'],
      ['bell','Ikuti arahan petugas','Pantau notifikasi FireWatch dan ikuti instruksi evakuasi dari petugas.'],
    ].map((x,i)=><section className="advice-card" key={x[1]}><span>{i+1}</span><Icon name={x[0] as IconName}/><div><strong>{x[1]}</strong><p>{x[2]}</p></div></section>)}
    <div className="section-head"><h2>Kontak Darurat</h2></div><div className="emergency-actions large"><button><Icon name="bell"/> Darurat 112</button><button><Icon name="flame"/> Pemadam 113</button></div>
  </div></>
}

function CitizenReport({ onBack, onSent }: { onBack: () => void; onSent: () => void }) {
  const [kind, setKind] = useState('Api')
  return <><Header title="Laporkan Api atau Asap" subtitle="Bantu petugas merespons lebih cepat" back={onBack}/><div className="content report-screen">
    <label className="photo-upload"><input type="file" accept="image/*"/><span><Icon name="map" size={25}/><strong>Ambil atau Unggah Foto</strong><small>Foto membantu proses verifikasi petugas</small></span></label>
    <section className="card"><div className="section-head no-margin"><h2>Jenis Laporan</h2></div><div className="choice-row">{['Api','Asap','Keduanya'].map(x=><button className={kind===x?'selected':''} onClick={()=>setKind(x)} key={x}>{x}</button>)}</div></section>
    <label className="field-label">Deskripsi singkat <em>Opsional</em><textarea placeholder="Jelaskan kondisi yang Anda lihat..."/></label>
    <section className="card"><div className="section-head no-margin"><h2>Lokasi Otomatis</h2><Badge tone="green">GPS Aktif</Badge></div><MapCard compact/><div className="gps-row"><Icon name="map" size={16}/><span><strong>Desa Sukadana, Lampung Timur</strong><small>-5.06421, 105.53918</small></span><button>Ubah lokasi</button></div></section>
    <button className="primary-button" onClick={onSent}><Icon name="flame" size={17}/> Kirim Laporan</button>
  </div></>
}

function ReportSuccess({ onDone }: { onDone: () => void }) {
  return <main className="success-screen"><span><Icon name="check" size={38}/></span><h1>Laporan terkirim</h1><p>Menunggu verifikasi petugas. Kami akan memberi tahu Anda melalui notifikasi.</p><div><small>ID LAPORAN</small><strong>#WGR-2406-018</strong></div><button className="primary-button" onClick={onDone}>Kembali ke Beranda</button></main>
}

function Announcement({ onBack, onHistory }: { onBack: () => void; onHistory: () => void }) {
  const [type, setType] = useState('Imbauan')
  return <><Header title="Buat Pengumuman" subtitle="Kirim informasi resmi ke warga" back={onBack}/><div className="content announcement-form">
    <button className="history-link" onClick={onHistory}><Icon name="history" size={16}/> Riwayat Pengumuman</button>
    <section className="card"><div className="section-head no-margin"><h2>Jenis Pengumuman</h2></div><div className="announcement-types">{['Imbauan','Peringatan Evakuasi','Larangan Membakar Lahan'].map(x=><button className={type===x?'selected':''} onClick={()=>setType(x)} key={x}>{x}</button>)}</div></section>
    <label className="field-label">Judul<input placeholder="Masukkan judul pengumuman"/></label>
    <label className="field-label">Isi pesan<textarea placeholder="Tulis pesan untuk warga..."/></label>
    <section className="card"><div className="section-head no-margin"><h2>Wilayah Tujuan</h2></div><div className="choice-row"><button className="selected">Semua Wilayah</button><button>Pilih Wilayah</button></div><div className="input-wrap target-search"><Icon name="map" size={16}/><input placeholder="Cari kecamatan atau desa"/></div></section>
    <button className="primary-button"><Icon name="bell" size={17}/> Kirim ke Warga</button>
  </div></>
}

function AnnouncementHistory({ onBack }: { onBack: () => void }) {
  return <><Header title="Riwayat Pengumuman" subtitle="Pengumuman yang telah dikirim" back={onBack}/><div className="content announcement-history">{[
    ['Larangan Membakar Lahan','Seluruh wilayah','Hari ini, 09.15 WIB','red'],
    ['Waspada asap tebal','Kec. Way Jepara','Kemarin, 16.40 WIB','orange'],
    ['Imbauan penggunaan masker','Desa Sukadana','22 Jun, 10.30 WIB','blue'],
  ].map(x=><section className="card" key={x[0]}><Badge tone={x[3]}>{x[0].includes('Larangan')?'Larangan':'Imbauan'}</Badge><strong>{x[0]}</strong><span><Icon name="map" size={13}/>{x[1]}</span><small>{x[2]}</small></section>)}</div></>
}

function Alarm({ onClose, onDetail }: { onClose: () => void; onDetail: () => void }) {
  return <div className="alarm">
    <button className="alarm-close" onClick={onClose} aria-label="Tutup"><Icon name="close" /></button>
    <div className="alarm-rings"><span /><span /><div><Icon name="flame" size={48} /></div></div>
    <div className="alarm-copy"><small>ALARM DARURAT</small><h1>BAHAYA KEBAKARAN</h1><p>Tiga kriteria bahaya terpenuhi.<br/>Penyiraman otomatis telah aktif.</p></div>
    <div className="alarm-location"><Icon name="map" /><span><small>LOKASI</small><strong>Hutan Lindung<br/>Bukit Barisan</strong><em>-5.44782, 104.32891 • 624 m</em></span></div>
    <button className="alarm-button" onClick={onDetail}>Lihat Detail Kejadian <Icon name="chevron" /></button>
  </div>
}

function BottomNav({ screen, setScreen, role }: { screen: Screen; setScreen: (s: Screen) => void; role: UserRole }) {
  const items: [Screen, IconName, string][] = role === 'citizen'
    ? [['home','home','Beranda'],['air','smoke','Udara'],['notifications','bell','Notifikasi'],['advice','shield','Saran']]
    : [['home','home','Beranda'],['priority','flame','Prioritas'],['air','smoke','Udara'],['notifications','bell','Notifikasi'],['devices','cpu','Perangkat']]
  return <nav className={`bottom-nav ${role === 'citizen' ? 'citizen-nav' : ''}`}>{items.map(([id, icon, label]) => <button className={screen === id ? 'active' : ''} onClick={() => setScreen(id)} key={id}><span><Icon name={icon} size={20} />{id === 'notifications' && <i>3</i>}</span><small>{label}</small></button>)}</nav>
}

export default function App() {
  const [stage, setStage] = useState<'start' | 'citizenData' | 'governmentLogin' | 'firefighterLogin' | 'app'>('start')
  const [userType, setUserType] = useState<UserRole>('citizen')
  const [screen, setScreen] = useState<Screen>('home')
  const [alarm, setAlarm] = useState(false)
  const [menu, setMenu] = useState(false)
  const [dark, setDark] = useState(false)
  if (stage === 'start') return <div className="app-shell"><StartScreen onCitizen={() => setStage('citizenData')} onGovernment={() => setStage('governmentLogin')} onFirefighter={() => setStage('firefighterLogin')} /></div>
  if (stage === 'citizenData') return <div className="app-shell"><CitizenData onBack={() => setStage('start')} onContinue={() => { setUserType('citizen'); setStage('app') }} /></div>
  if (stage === 'firefighterLogin') return <div className="app-shell"><Login onBack={() => setStage('start')} onLogin={() => { setUserType('firefighter'); setStage('app') }} /></div>
  if (stage === 'governmentLogin') return <div className="app-shell"><Login government onBack={() => setStage('start')} onLogin={() => { setUserType('government'); setStage('app') }} /></div>
  const citizen = userType === 'citizen'
  const content = screen === 'home' ? <Home onMenu={() => setMenu(true)} role={userType} onReport={() => setScreen('report')} onAnnouncement={() => setScreen('announcement')} onDetail={() => setScreen('detail')} onAlarm={() => userType === 'firefighter' ? setAlarm(true) : setScreen('detail')} /> :
    screen === 'priority' ? <Priority onDetail={() => setScreen('detail')} /> :
    screen === 'notifications' ? <Notifications citizen={citizen} onDetail={() => { if (!citizen) setScreen('detail') }} /> :
    screen === 'air' ? <AirQuality /> :
    screen === 'advice' ? <SafetyAdvice /> :
    screen === 'devices' ? <Devices onDevice={() => setScreen('deviceDetail')} /> :
    screen === 'history' ? <HistoryScreen role={userType} onBack={() => setScreen('home')} /> :
    screen === 'deviceDetail' ? <DeviceDetail canControl={userType === 'firefighter'} onBack={() => setScreen('devices')} /> :
    screen === 'preferences' ? <Preferences dark={dark} setDark={setDark} onBack={() => setScreen('home')} /> :
    screen === 'settings' ? <SettingsScreen onBack={() => setScreen('home')} /> :
    screen === 'report' ? <CitizenReport onBack={() => setScreen('home')} onSent={() => setScreen('reportSuccess')}/> :
    screen === 'reportSuccess' ? <ReportSuccess onDone={() => setScreen('home')}/> :
    screen === 'announcement' ? <Announcement onBack={() => setScreen('home')} onHistory={() => setScreen('announcementHistory')}/> :
    screen === 'announcementHistory' ? <AnnouncementHistory onBack={() => setScreen('announcement')}/> : <Detail role={userType} onBack={() => setScreen('priority')} />
  const detailScreen = ['detail','deviceDetail','history','preferences','settings','report','reportSuccess','announcement','announcementHistory'].includes(screen)
  return <div className={`app-shell ${dark ? 'dark' : ''}`}><main className="app-main">{content}</main>{!detailScreen && <BottomNav role={userType} screen={screen} setScreen={setScreen} />}{menu && <MoreMenu onClose={() => setMenu(false)} go={(next) => { setScreen(next); setMenu(false) }}/>} {alarm && userType === 'firefighter' && <Alarm onClose={() => setAlarm(false)} onDetail={() => { setAlarm(false); setScreen('detail') }} />}</div>
}

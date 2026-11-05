/* ==========================================================================
   AMIR RENTAL – style.css
   Daftar isi:
   1. Token warna dan font      6. Kartu mobil dan filter
   2. Reset dan dasar           7. Lokasi dan peta
   3. Tombol                    8. Rating, tentang kami, tanya jawab
   4. Navbar                    9. Footer, dialog booking, tombol melayang
   5. Beranda                  10. Responsif dan aksesibilitas
   ========================================================================== */


/* 1. TOKEN ------------------------------------------------------------------ */
/* Tema terang adalah default. Tema gelap mengikuti perangkat, atau dipaksa
   lewat atribut data-theme (diatur tombol "Ganti tema" di footer).
   Nilai gelap ditulis dua kali karena CSS tidak bisa berbagi blok
   antara media query dan selector atribut. */
:root {
  --bg: #fff;
  --fg: #111;
  --mut: #5d5d5d;
  --line: #dcdcdc;
  --card: #f4f4f2;
  --sky: #8cc8f0;
  --onsky: #0b0b0b;
  --onbox: #fff;          /* teks di dalam .box: putih saat tema terang */
  --btn: #111;
  --onbtn: #fff;

  --h: 'Bricolage Grotesque', 'Arial Black', sans-serif;
  --b: 'DM Sans', Arial, sans-serif;

  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
    --bg: #0c0c0c;
    --fg: #f2f2f2;
    --mut: #a3a3a3;
    --line: #2c2c2c;
    --card: #171717;
    --btn: #f2f2f2;
    --onbtn: #0c0c0c;
    --onbox: #111;          /* teks di dalam .box: gelap saat tema gelap */
  }
}

:root[data-theme="dark"] {
  color-scheme: dark;
  --bg: #0c0c0c;
  --fg: #f2f2f2;
  --mut: #a3a3a3;
  --line: #2c2c2c;
  --card: #171717;
  --btn: #f2f2f2;
  --onbtn: #0c0c0c;
  --onbox: #111;          /* teks di dalam .box: gelap saat tema gelap */
}


/* 2. RESET DAN DASAR -------------------------------------------------------- */
* {
  box-sizing: border-box;
  margin: 0;
}

[hidden] {
  display: none !important;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: calc(84px + env(safe-area-inset-top, 0px));
}

body {
  background: var(--bg);
  color: var(--fg);
  font: 400 17px/1.6 var(--b);
}

h1, h2, h3 {
  font-family: var(--h);
  line-height: 1.05;
  letter-spacing: -.02em;
}

h1 {
  font-size: clamp(2.8rem, 8vw, 6rem);
  font-weight: 800;
}

h2 {
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  max-width: 14ch;
  margin-bottom: 34px;
}

a {
  color: inherit;
}

section {
  padding: 84px 0;
  border-top: 1px solid var(--line);
}

.w {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 22px;
}

.row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.grid {
  display: grid;
  gap: 18px;
}
.g2 { grid-template-columns: repeat(2, 1fr); }
.g3 { grid-template-columns: repeat(3, 1fr); }

.note {
  color: var(--mut);
  font-size: 15px;
  margin-top: 20px;
}

/* Fokus keyboard yang terlihat di semua elemen interaktif */
a:focus-visible,
input:focus-visible,
select:focus-visible,
summary:focus-visible,
.btn:focus-visible,
.chip:focus-visible,
.fab:focus-visible,
.tg:focus-visible {
  outline: 3px solid var(--sky);
  outline-offset: 2px;
}

.box {
  background: var(--sky);   /* warna kotak di belakang teks */
  color: var(--onbox);      /* putih saat tema terang, gelap saat tema gelap */
  padding: 0 14px;          /* ruang kiri-kanan antara teks dan tepi kotak */
  border-radius: 6px;       /* sudut agak membulat, hapus kalau mau tajam */
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;   /* kotak tetap utuh kalau heading turun baris */
}

/* 3. TOMBOL ----------------------------------------------------------------- */
.btn {
  display: inline-block;
  border: 2px solid var(--btn);
  background: var(--btn);
  color: var(--onbtn);
  padding: 11px 20px;
  font: 700 15px var(--b);
  text-decoration: none;
  cursor: pointer;
  border-radius: 3px;
}
.btn.sky {
  background: var(--sky);
  border-color: var(--sky);
  color: var(--onsky);
}
.btn.out {
  background: transparent;
  color: var(--fg);
}


/* 4. NAVBAR ----------------------------------------------------------------- */
header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--bg);
  border-bottom: 1px solid var(--line);
}

.nav {
  display: flex;
  align-items: center;
  gap: 18px;
  height: 72px;
}

.logo {
  text-decoration: none;
  line-height: 1.1;
  margin-right: auto;
}
.logo b {
  font: 800 22px var(--h);
  display: block;
}
.logo small {
  color: var(--mut);
  font-size: 12px;
}

.menu {
  display: flex;
  gap: 4px;
  list-style: none;
  padding: 0;
}
.menu > li {
  position: relative;
}
.menu a,
.menu button.dd {
  font: 500 15px var(--b);
  color: var(--fg);
  background: none;
  border: 0;
  padding: 10px;
  cursor: pointer;
  text-decoration: none;
  display: block;
}
.menu a:hover,
.menu button.dd:hover {
  color: var(--mut);
}

/* Dropdown Layanan */
.sub {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 270px;
  background: var(--bg);
  border: 1px solid var(--fg);
  list-style: none;
  padding: 6px;
  z-index: 5;
}
.sub.open {
  display: block;
}
.sub button {
  width: 100%;
  text-align: left;
  background: none;
  border: 0;
  color: var(--fg);
  padding: 10px;
  cursor: pointer;
  font: 700 15px var(--b);
  border-radius: 3px;
}
.sub button:hover {
  background: var(--card);
}
.sub small {
  display: block;
  font-weight: 400;
  color: var(--mut);
  font-size: 13px;
}

.cta {
  display: flex;
  gap: 8px;
}

.burger {
  display: none;
  background: none;
  border: 2px solid var(--fg);
  color: var(--fg);
  width: 44px;
  height: 40px;
  cursor: pointer;
  border-radius: 3px;
}


/* 5. BERANDA ---------------------------------------------------------------- */
.hero {
  padding: 70px 0 84px;
  border: 0;
}
.hero .g {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 48px;
  align-items: end;
}
.hero p {
  max-width: 46ch;
  color: var(--mut);
  margin: 22px 0 26px;
  font-size: 19px;
}

h1 em {
  font-style: normal;
  background: var(--sky);
  color: var(--onsky);
  padding: 0 .12em;
}

.plate {
  display: inline-block;
  margin-top: 34px;
  border: 3px solid var(--fg);
  border-radius: 6px;
  padding: 2px 14px;
  font: 800 24px var(--h);
  letter-spacing: .12em;
}
.plate span {
  background: var(--sky);
  color: var(--onsky);
  padding: 0 6px;
  border-radius: 3px;
}

.stats {
  display: flex;
  gap: 34px;
  margin-top: 44px;
  flex-wrap: wrap;
}
.stats b {
  font: 800 34px var(--h);
  display: block;
}
.stats span {
  color: var(--mut);
  font-size: 14px;
  max-width: 16ch;
  display: block;
}

/* Kartu "Paling sering dipesan" */
.pop {
  background: var(--sky);
  color: var(--onsky);
  padding: 28px;
  border-radius: 3px;
}
.pop small {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .06em;
  font-size: 12px;
}
.pop h3 {
  font-size: 2rem;
  margin: 10px 0 6px;
}
.pop p {
  color: #111;
  margin: 0 0 18px;
  font-size: 16px;
}
.pop .btn {
  background: #111;
  border-color: #111;
  color: #fff;
}
.pop .ph {
  height: 140px;
  margin-bottom: 18px;
}


/* 6. KARTU MOBIL DAN FILTER ------------------------------------------------- */
.card {
  background: var(--card);
  border: 1px solid var(--line);
  padding: 26px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.card h3 {
  font-size: 1.6rem;
}
.card p,
.card li {
  color: var(--mut);
}
.card ul {
  padding-left: 18px;
}
.card .btn {
  margin-top: auto;
  align-self: flex-start;
}

/* Kartu mobil berwarna biru awan (warna ada di kartu, bukan di foto) */
.card.col {
  background: var(--sky);
  color: #111;
  border-color: transparent;
}
.card.col p,
.card.col .price,
.card.col .price small {
  color: #111;
}
.card.col .btn {
  background: #111;
  border-color: #111;
  color: #fff;
}
.card.col .ph {
  background: transparent;
}

.price {
  font: 800 1.5rem var(--h);
  color: var(--fg);
}
.price small {
  font: 400 14px var(--b);
  color: var(--mut);
}

/* Area foto mobil */
.ph {
  position: relative;
  height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;          /* kotak terang dihapus */
}
.ph::before {
  content: "";
  position: absolute;
  left: 6%;
  right: 6%;
  top: 14%;
  bottom: 4%;
  background: rgba(255, 255, 255, .45);
  border-radius: 50%;
}
.ph img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;       /* mobil utuh, tidak di-crop jadi kotak */
  mix-blend-mode: multiply;  /* putih JPG melebur ke warna di belakang */
}
.ph svg {
  position: relative;
  width: 74%;
  height: auto;
}

/* Filter jenis mobil */
.chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: -10px 0 24px;
}
.chip {
  border: 2px solid var(--fg);
  background: transparent;
  color: var(--fg);
  padding: 7px 16px;
  font: 700 14px var(--b);
  border-radius: 999px;
  cursor: pointer;
}
.chip[aria-pressed="true"] {
  background: var(--sky);
  border-color: var(--sky);
  color: var(--onsky);
}


/* 7. LOKASI DAN PETA -------------------------------------------------------- */
.loc {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 34px;
}
.loc dt {
  font-weight: 700;
  margin-top: 14px;
}
.loc dd {
  color: var(--mut);
  margin: 0;
}

.map {
  display: block;
  position: relative;
  border: 1px solid var(--fg);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 14px;
}
.map svg {
  display: block;
  width: 100%;
  height: auto;
}
.map .land { fill: var(--card); }
.map .wt   { fill: var(--sky); opacity: .65; }
.map .rd   { fill: none; stroke: var(--bg); stroke-width: 11; stroke-linecap: round; }
.map .rd2  { fill: none; stroke: var(--line); stroke-width: 5; }

.mcard {
  position: absolute;
  left: 12px;
  bottom: 12px;
  background: var(--bg);
  border: 1px solid var(--fg);
  padding: 9px 13px;
  border-radius: 3px;
  font-weight: 700;
  line-height: 1.3;
}
.mcard small {
  display: block;
  font-weight: 400;
  color: var(--mut);
  font-size: 13px;
}


/* 8. RATING, TENTANG KAMI, TANYA JAWAB -------------------------------------- */
.rv {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 40px;
}
.rv .item {
  border-top: 1px solid var(--line);
  padding: 18px 0;
}
.rv .item small {
  color: var(--mut);
  display: block;
}

.score {
  font: 800 4.5rem var(--h);
  line-height: 1;
}
.stars {
  display: inline-flex;
  gap: 2px;
  vertical-align: middle;
}
.stars svg {
  width: 18px;
  height: 18px;
}

.about {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 48px;
}
.about p {
  color: var(--mut);
  margin-bottom: 14px;
}
.about .st b {
  font: 800 3rem var(--h);
  display: block;
  line-height: 1;
}
.about .st span {
  color: var(--mut);
  display: block;
  margin-bottom: 22px;
}

.faq {
  max-width: 780px;
}
.faq details {
  border-top: 1px solid var(--line);
  padding: 16px 0;
}
.faq details:last-child {
  border-bottom: 1px solid var(--line);
}
.faq summary {
  cursor: pointer;
  font: 700 18px var(--b);
}
.faq p {
  color: var(--mut);
  margin-top: 10px;
}


/* 9. FOOTER, DIALOG BOOKING, TOMBOL MELAYANG -------------------------------- */
footer {
  border-top: 1px solid var(--line);
  padding: 34px 0;
  color: var(--mut);
  font-size: 15px;
}
footer .w {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.tg {
  background: none;
  border: 1px solid var(--line);
  color: var(--mut);
  padding: 6px 12px;
  border-radius: 3px;
  font: 500 14px var(--b);
  cursor: pointer;
}

.fab {
  position: fixed;
  right: 16px;
  bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  z-index: 15;
  box-shadow: 0 8px 24px rgba(0, 0, 0, .3);
}

dialog {
  border: 2px solid var(--fg);
  background: var(--bg);
  color: var(--fg);
  padding: 26px;
  width: min(480px, 92vw);
  border-radius: 3px;
  margin: auto;
}
dialog::backdrop {
  background: rgba(0, 0, 0, .6);
}
dialog h3 {
  font-size: 1.8rem;
  margin-bottom: 16px;
}

label {
  display: block;
  font-weight: 700;
  font-size: 14px;
  margin: 12px 0 4px;
}
input,
select {
  width: 100%;
  padding: 11px;
  border: 1px solid var(--fg);
  background: var(--bg);
  color: var(--fg);
  font: 16px var(--b);
  border-radius: 3px;
}

.est {
  background: var(--sky);
  color: var(--onsky);
  padding: 14px;
  margin: 18px 0 6px;
  font-weight: 700;
  border-radius: 3px;
}
.err {
  color: #c62828;
  font-size: 14px;
  min-height: 20px;
}


/* 10. RESPONSIF DAN AKSESIBILITAS ------------------------------------------- */
@media (max-width: 900px) {
  section {
    padding: 60px 0;
  }

  .burger { display: block; }
  .cta    { display: none; }

  .menu {
    display: none;
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    background: var(--bg);
    border-bottom: 1px solid var(--line);
    flex-direction: column;
    padding: 10px 22px 18px;
  }
  .menu.open {
    display: flex;
  }

  .sub {
    position: static;
    border: 0;
    border-left: 3px solid var(--sky);
    margin-left: 12px;
    min-width: 0;
  }

  .hero .g,
  .loc,
  .rv,
  .about,
  .g2,
  .g3 {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

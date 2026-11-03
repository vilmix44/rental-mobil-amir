"use strict";

/* ==========================================================================
   AMIR RENTAL – script.js
   Daftar isi:
   1. Pengaturan          6. Filter jenis mobil
   2. Data                7. Tanya jawab
   3. Helper              8. Tema
   4. Render halaman      9. Menu navbar
   5. Tautan dan tombol  10. Form booking

   Keamanan: semua teks lewat textContent (tanpa innerHTML), input
   divalidasi, dan pilihan mobil/layanan dicocokkan dengan daftar resmi.
   ========================================================================== */


/* 1. PENGATURAN ------------------------------------------------------------- */
/* Nomor WhatsApp: format internasional, tanpa "+" dan tanpa 0 di depan. */
const WA_NUMBER = "628125370459";

const CFG = Object.freeze({
  ig: "https://www.instagram.com/amirrental",
  maps: "https://www.google.com/maps/search/?api=1&query=4.142633706858203, 117.6595930473617",
});


/* 2. DATA ------------------------------------------------------------------- */
const SERVICES = Object.freeze([
  {
    id: "Lepas Kunci",
    sub: "Bawa mobil sendiri, bebas atur rute",
    pts: [
      "Syarat: KTP dan SIM A",
      "Harga per hari sesuai tabel",
      "Unit diserahkan dalam kondisi bersih",
    ],
  },
  {
    id: "Sewa + Driver",
    sub: "Duduk tenang, driver kami yang antar",
    pts: [
      "Driver berpengalaman",
      "Rute dan jadwal diatur bersama",
      "Cocok untuk keluarga atau dinas",
    ],
  },
]);

/* Daftar kategori filter. Tulis nama kategori HANYA di sini. */
const KATEGORI = Object.freeze({
  HEMAT: "Hemat",
  KELUARGA: "Keluarga",
  SUV: "SUV",
  ROMBONGAN: "Rombongan",
});

const K = KATEGORI; // singkatan untuk dipakai di data CARS



/* Foto mobil: taruh gambar di folder "foto" di samping index.html, dengan
   nama sesuai field foto (jpg/png/webp). Jika file belum ada, otomatis
   tampil ilustrasi bawaan.
   Field: n = nama, s = deskripsi, p = harga per hari, k = kategori filter. */
const CARS = Object.freeze([
  { n: "Toyota Avanza 2017 merah", s: "5 kursi · manual · irit BBM", p: 300000, foto: "foto/avanza-2017-merah.jpg", k: [K.HEMAT,K.KELUARGA]},
  { n: "Daihatsu Avanza 2017 hitam", s: "5 kursi · manual · irit BBM", p: 330000, foto: "foto/avanza-2017-hitam.jpg", k:[K.HEMAT,K.KELUARGA] },
  { n: "Toyota Avanza 2017 silver", s: "5 kursi · manual · irit BBM", p: 350000, foto: "foto/avanza-2017-silver.jpg", k: [K.HEMAT,K.KELUARGA]},
]);

/* Peringatan di console jika ada kategori yang salah ketik di data CARS. */
const KATEGORI_VALID = new Set(Object.values(KATEGORI));
CARS.forEach((c) =>
  c.k.forEach((x) => {
    if (!KATEGORI_VALID.has(x)) console.warn('Kategori tidak dikenal: "' + x + '" di ' + c.n);
  }),
);

/* Ulasan diisi manual oleh admin. Tambah objek baru di bawah (terbaru di atas).
   Teks permintaan ulasan yang dikirim admin ke pelanggan via WhatsApp:
   "Terima kasih sudah menyewa di Amir Rental. Boleh bantu kami dengan ulasan singkat?
    Balas dengan format: Nama / Bintang 1-5 / Komentar." */
const REVIEWS = Object.freeze([
  {
    nama: "Disamarkan",
    layanan: "Sewa + Driver",
    bintang: 5,
    isi: "Driver ramah dan mobil bersih.",
    tgl: "Sabtu, 31 Oktober 2026",
  },
  {
    nama: "Disamarkan",
    layanan: "Lepas Kunci",
    bintang: 4,
    isi: "Proses cepat, unit sesuai foto.",
    tgl: "Rabu, 21 Oktober 2026",
  },
  {
    nama: "Ardi",
    layanan: "Lepas Kunci",
    bintang: 5,
    isi: "Harga jelas dari awal, tidak ada tambahan.",
    tgl: "Senin, 5 Oktober 2026",
  },
]);

/* Ganti isi sesuai aturan asli Amir Rental. Format: [pertanyaan, jawaban]. */
const FAQ = Object.freeze([
  ["Apa syarat sewa lepas kunci?", "KTP dan SIM A yang masih aktif. Admin akan memverifikasi saat serah terima unit."],
  ["Bagaimana cara pembayaran?", "Pembayaran dikonfirmasi lewat WhatsApp setelah pesanan diterima. "],
  ["Siapa yang menanggung bahan bakar?", "Untuk lepas kunci, bahan bakar ditanggung penyewa. Untuk sewa plus driver, tanyakan rinciannya ke admin."],
  ["Apakah mobil bisa diantar?", "Bisa, untuk wilayah Nunukan. Biaya antar dikonfirmasi lewat WhatsApp."],
  ["Bisa sewa lebih dari 30 hari?", "Form booking dibatasi 30 hari. Untuk sewa lebih lama, hubungi kami lewat WhatsApp."],
]);


/* 3. HELPER ----------------------------------------------------------------- */
const $ = (id) => document.getElementById(id);
const rp = (n) => "Rp" + Number(n).toLocaleString("id-ID");
const SVG_NS = "http://www.w3.org/2000/svg";

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}

function waLink(text) {
  return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
}

/* Nama: hanya huruf, angka, spasi, dan tanda baca dasar; maksimal 60 karakter. */
function cleanName(v) {
  return String(v)
    .replace(/[^\p{L}\p{N} .,'-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 60);
}

function stars(n) {
  const w = el("span", "stars");
  w.setAttribute("role", "img");
  w.setAttribute("aria-label", n + " dari 5 bintang");
  for (let i = 1; i <= 5; i++) {
    const s = document.createElementNS(SVG_NS, "svg");
    s.setAttribute("viewBox", "0 0 24 24");
    const p = document.createElementNS(SVG_NS, "path");
    p.setAttribute("d", "M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7z");
    p.setAttribute("fill", i <= Math.round(n) ? "#8cc8f0" : "none");
    p.setAttribute("stroke", "#8cc8f0");
    p.setAttribute("stroke-width", "1.6");
    s.appendChild(p);
    w.appendChild(s);
  }
  return w;
}

/* Foto mobil: pakai gambar jika path-nya valid (whitelist), kalau gagal
   dimuat atau tidak valid, ganti dengan ilustrasi SVG bawaan. */
const FOTO_OK =
  /^(foto\/[\w.-]+\.(jpe?g|png|webp)|data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+\/=]+)$/i;

function carPhoto(c) {
  const w = el("div", "ph");

  if (FOTO_OK.test(c.foto)) {
    const i = document.createElement("img");
    i.src = c.foto;
    i.alt = "Foto " + c.n;
    i.loading = "lazy";
    i.addEventListener("error", () => w.replaceWith(carPhoto({ n: c.n, foto: "" })));
    w.appendChild(i);
    return w;
  }

  const s = document.createElementNS(SVG_NS, "svg");
  s.setAttribute("viewBox", "0 0 200 90");
  s.setAttribute("role", "img");
  s.setAttribute("aria-label", "Ilustrasi " + c.n);
  [
    ["path", { d: "M10 66L22 46Q30 30 52 28H122Q142 28 154 46L186 52Q194 54 194 64V72H10Z", fill: "#111" }],
    ["path", { d: "M40 46L50 34H84V46ZM92 46V34H120Q130 34 138 46Z", fill: "#fff", opacity: ".85" }],
    ["circle", { cx: "54", cy: "72", r: "13", fill: "#111", stroke: "#fff", "stroke-width": "4" }],
    ["circle", { cx: "150", cy: "72", r: "13", fill: "#111", stroke: "#fff", "stroke-width": "4" }],
  ].forEach(([tag, attrs]) => {
    const e = document.createElementNS(SVG_NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    s.appendChild(e);
  });
  w.appendChild(s);
  return w;
}


/* 4. RENDER HALAMAN --------------------------------------------------------- */
const sub = $("sub"),
  fSvc = $("f-svc"),
  fCar = $("f-car");

/* Layanan: item dropdown navbar, kartu layanan, dan opsi di form booking */
SERVICES.forEach((s) => {
  const li = el("li"),
    b = el("button", null, s.id);
  b.type = "button";
  b.appendChild(el("small", null, s.sub));
  b.addEventListener("click", () => {
    closeMenus();
    openBook({ svc: s.id });
  });
  li.appendChild(b);
  sub.appendChild(li);

  const c = el("div", "card");
  c.appendChild(el("h3", null, s.id));
  c.appendChild(el("p", null, s.sub));
  const ul = el("ul");
  s.pts.forEach((t) => ul.appendChild(el("li", null, t)));
  c.appendChild(ul);
  const bt = el("button", "btn", "Pilih " + s.id);
  bt.type = "button";
  bt.addEventListener("click", () => openBook({ svc: s.id }));
  c.appendChild(bt);
  $("svc").appendChild(c);

  fSvc.appendChild(new Option(s.id, s.id));
});

/* Mobil: kartu "paling sering dipesan" (Avanza), kartu daftar, dan opsi form */
$("popph").appendChild(carPhoto(CARS[0]));

CARS.forEach((c) => {
  const d = el("div", "card col");
  d.dataset.k = c.k.join("|"); // contoh: "Hemat|Keluarga"
  d.appendChild(carPhoto(c));
  d.appendChild(el("h3", null, c.n));
  d.appendChild(el("p", null, c.s));
  const pr = el("div", "price", rp(c.p));
  pr.appendChild(el("small", null, " / hari"));
  d.appendChild(pr);
  const bt = el("button", "btn", "Pesan");
  bt.type = "button";
  bt.addEventListener("click", () => openBook({ car: c.n }));
  d.appendChild(bt);
  $("cars").appendChild(d);

  fCar.appendChild(new Option(c.n + " – " + rp(c.p), c.n));
});

/* Rating: rata-rata dan daftar ulasan */
const avg = REVIEWS.reduce((a, r) => a + r.bintang, 0) / REVIEWS.length;
$("avg").textContent = avg.toFixed(1);
$("avgs").appendChild(stars(avg));
$("cnt").textContent = "dari " + REVIEWS.length + " ulasan";

REVIEWS.forEach((r) => {
  const i = el("div", "item");
  i.appendChild(stars(r.bintang));
  i.appendChild(el("p", null, r.isi));
  i.appendChild(el("small", null, r.nama + " · " + r.layanan));
  i.appendChild(el("small", null, r.tgl));
  $("rvs").appendChild(i);
});


/* 5. TAUTAN DAN TOMBOL ------------------------------------------------------ */
document.querySelectorAll("[data-wa=ask]").forEach((a) => {
  a.href = waLink("Halo Amir Rental, apakah unit tersedia? Saya ingin tanya ketersediaan mobil.");
});

/* Aman: jika elemen dengan id tersebut tidak ada di HTML, dilewati
   (tidak membuat seluruh script berhenti). */
function setHref(id, url) {
  const a = $(id);
  if (a) a.href = url;
}
setHref("maps", CFG.maps);
setHref("maps2", CFG.maps);
setHref("ig", CFG.ig);

document
  .querySelectorAll("[data-book]")
  .forEach((b) => b.addEventListener("click", () => openBook({})));

document
  .querySelectorAll("[data-car]")
  .forEach((b) => b.addEventListener("click", () => openBook({ car: b.dataset.car })));


/* 6. FILTER JENIS MOBIL ----------------------------------------------------- */
const chipBox = $("chips");

/* Semua kategori di KATEGORI selalu dibuatkan chip. Jika belum ada mobil
   di kategori itu, tampil pesan "Belum tersedia". */
const carsBox = $("cars");
const kosong = el("p", "note", "Belum tersedia");
kosong.hidden = true;
carsBox.after(kosong);

["Semua", ...Object.values(KATEGORI)].forEach((k, i) => {
  const b = el("button", "chip", k);
  b.type = "button";
  b.setAttribute("aria-pressed", String(i === 0));
  b.addEventListener("click", () => {
    chipBox
      .querySelectorAll(".chip")
      .forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    let tampil = 0;
    carsBox.querySelectorAll(".card").forEach((c) => {
      c.hidden = k !== "Semua" && !c.dataset.k.split("|").includes(k);
      if (!c.hidden) tampil++;
    });
    kosong.hidden = tampil > 0;
  });
  chipBox.appendChild(b);
});


/* 7. TANYA JAWAB ------------------------------------------------------------ */
FAQ.forEach(([q, a]) => {
  const d = el("details");
  d.appendChild(el("summary", null, q));
  d.appendChild(el("p", null, a));
  $("faq-list").appendChild(d);
});


/* 8. TEMA ------------------------------------------------------------------- */
/* Default mengikuti mode perangkat. Pilihan manual disimpan di localStorage
   dan hanya menerima nilai "light" atau "dark". */
const root = document.documentElement;

try {
  const t = localStorage.getItem("ar-theme");
  if (t === "light" || t === "dark") root.dataset.theme = t;
} catch (e) {}

$("theme").addEventListener("click", () => {
  const dark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  const n = dark ? "light" : "dark";
  root.dataset.theme = n;
  try {
    localStorage.setItem("ar-theme", n);
  } catch (e) {}
});


/* 9. MENU NAVBAR ------------------------------------------------------------ */
const menu = $("menu"),
  ddb = $("ddb"),
  bg = $("bg");

function closeMenus() {
  sub.classList.remove("open");
  ddb.setAttribute("aria-expanded", "false");
  menu.classList.remove("open");
  bg.setAttribute("aria-expanded", "false");
}

ddb.addEventListener("click", (e) => {
  e.stopPropagation();
  const o = sub.classList.toggle("open");
  ddb.setAttribute("aria-expanded", o);
});

bg.addEventListener("click", (e) => {
  e.stopPropagation();
  const o = menu.classList.toggle("open");
  bg.setAttribute("aria-expanded", o);
});

document.addEventListener("click", (e) => {
  if (!sub.contains(e.target) && e.target !== ddb) sub.classList.remove("open");
  if (!menu.contains(e.target)) menu.classList.remove("open");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenus();
});

menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenus));


/* 10. FORM BOOKING ---------------------------------------------------------- */
const dlg = $("dlg"),
  fName = $("f-name"),
  fDate = $("f-date"),
  fDays = $("f-days"),
  err = $("err"),
  send = $("send");

/* Tanggal ambil paling awal: hari ini */
const pad = (n) => String(n).padStart(2, "0"),
  today = new Date();
fDate.min = today.getFullYear() + "-" + pad(today.getMonth() + 1) + "-" + pad(today.getDate());

function openBook(o) {
  if (o.svc) fSvc.value = o.svc;
  if (o.car) fCar.value = o.car;
  if (typeof dlg.showModal === "function") dlg.showModal();
  else dlg.setAttribute("open", "");
  update();
}

/* Baca isian form dengan aman: mobil dan layanan dicocokkan dengan daftar
   resmi, lama sewa dibatasi 0-30 hari, tanggal harus berformat YYYY-MM-DD. */
function state() {
  const car = CARS.find((c) => c.n === fCar.value) || CARS[0];
  const svc = SERVICES.find((s) => s.id === fSvc.value) || SERVICES[0];
  let days = parseInt(fDays.value, 10);
  if (!Number.isFinite(days)) days = 0;
  days = Math.min(Math.max(days, 0), 30);
  return {
    car,
    svc,
    days,
    total: car.p * days,
    name: cleanName(fName.value),
    date: /^\d{4}-\d{2}-\d{2}$/.test(fDate.value) ? fDate.value : "",
  };
}

/* Perbarui estimasi harga dan isi pesan WhatsApp setiap isian berubah */
function update() {
  const s = state();
  $("est").textContent = "Estimasi: " + rp(s.total);

  const tgl = s.date
    ? new Date(s.date + "T00:00:00").toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "-";

  send.href = waLink(
    "Halo Amir Rental, saya ingin booking.\n" +
      "Nama: " + (s.name || "-") + "\n" +
      "Layanan: " + s.svc.id + "\n" +
      "Mobil: " + s.car.n + "\n" +
      "Tanggal ambil: " + tgl + "\n" +
      "Lama: " + s.days + " hari\n" +
      "Estimasi: " + rp(s.total),
  );
}

[fName, fSvc, fCar, fDate, fDays].forEach((e) => e.addEventListener("input", update));

send.addEventListener("click", (e) => {
  const s = state();
  err.textContent = "";
  if (!s.name) err.textContent = "Isi nama dengan huruf atau angka.";
  else if (!s.date || s.date < fDate.min) err.textContent = "Pilih tanggal ambil yang valid.";
  else if (s.days < 1) err.textContent = "Lama sewa minimal 1 hari, maksimal 30 hari.";
  if (err.textContent) e.preventDefault();
});

$("close").addEventListener("click", () => dlg.close());

dlg.addEventListener("click", (e) => {
  if (e.target === dlg) dlg.close();
});

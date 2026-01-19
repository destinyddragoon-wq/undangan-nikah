// =========================================
// 1. VARIABEL GLOBAL (Taruh paling atas)
// =========================================
let isPlaying = false;
const lagu = document.getElementById("wedding-song");
const musicBtn = document.getElementById("music-control");
const musicIcon = document.getElementById("music-icon");

// =========================================
// 2. FUNGSI MUSIK (ON/OFF)
// =========================================
function toggleMusic() {
    if (!lagu) return; // Keamanan jika elemen tidak ditemukan

    if (lagu.paused) {
        lagu.play().catch(e => console.log("Menunggu interaksi user untuk putar musik"));
        isPlaying = true;
        musicIcon.innerHTML = "🎵"; 
        musicBtn.classList.add("rotate-music"); 
    } else {
        lagu.pause();
        isPlaying = false;
        musicIcon.innerHTML = "🔇"; 
        musicBtn.classList.remove("rotate-music"); 
    }
}

// =========================================
// 3. FUNGSI BUKA UNDANGAN (Hanya satu versi)
// =========================================
function bukaUndangan() {
    const hero = document.querySelector('.hero');
    const konten = document.getElementById("undangan");
    const navBawah = document.querySelector(".bottom-nav");
    const navAtas = document.querySelector(".navbar-top");

    // Efek transisi menghilang pada Hero
    hero.style.opacity = '0';
    hero.style.transition = '0.8s';

    setTimeout(() => {
        hero.style.display = 'none';
        konten.style.display = "block";
        document.body.style.overflow = "auto";

        // Memunculkan Navbar
        if (navAtas) navAtas.classList.add("show");
        if (navBawah) navBawah.classList.add("show");

        // Munculkan tombol toggle nav
        const toggleBtn = document.getElementById("toggle-nav-btn");
        if (toggleBtn) {
            toggleBtn.style.opacity = "1";
            toggleBtn.style.pointerEvents = "auto";
        }

        // MEMICU MUSIK SAAT BUKA UNDANGAN
        if (musicBtn && lagu) {
            musicBtn.style.display = "flex"; // Munculkan tombol musik
            lagu.play().then(() => {
                isPlaying = true;
                musicBtn.classList.add("rotate-music");
                musicIcon.innerHTML = "🎵";
            }).catch(e => console.log("Autoplay dicegah browser"));
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
}

// =========================================
// 4. COUNTDOWN
// =========================================
// ATUR TANGGAL TUJUAN
const tanggalTujuan = new Date("June 20, 2026 08:00:00").getTime();

const hitungMundur = setInterval(function() {
    const sekarang = new Date().getTime();
    const selisih = tanggalTujuan - sekarang;

    // Perhitungan Waktu
    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
    const jam = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const menit = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60));
    const detik = Math.floor((selisih % (1000 * 60)) / 1000);

    // Formating angka (tambah 0 di depan jika < 10)
    const h = hari < 10 ? "0" + hari : hari;
    const j = jam < 10 ? "0" + jam : jam;
    const m = menit < 10 ? "0" + menit : menit;
    const s = detik < 10 ? "0" + detik : detik;

    // 1. UPDATE COUNTDOWN DI HERO (ID: days, hours, dll)
    if (document.getElementById("days")) {
        document.getElementById("days").innerHTML = h;
        document.getElementById("hours").innerHTML = j;
        document.getElementById("minutes").innerHTML = m;
        document.getElementById("seconds").innerHTML = s;
    }

    // 2. UPDATE COUNTDOWN DI ATAS GALERI (ID: days-galeri, hours-galeri, dll)
    if (document.getElementById("days-galeri")) {
        document.getElementById("days-galeri").innerHTML = h;
        document.getElementById("hours-galeri").innerHTML = j;
        document.getElementById("minutes-galeri").innerHTML = m;
        document.getElementById("seconds-galeri").innerHTML = s;
    }

    // JIKA WAKTU HABIS
    if (selisih < 0) {
        clearInterval(hitungMundur);
        const msg = "<h3>Acara Sedang Berlangsung!</h3>";
        if(document.getElementById("countdown")) document.getElementById("countdown").innerHTML = msg;
        if(document.getElementById("days-galeri")) {
            document.querySelector(".countdown-section-two").innerHTML = msg;
        }
    }
}, 1000);

// =========================================
// 5. RSVP & INITIAL STATE
// =========================================
document.addEventListener('DOMContentLoaded', function() {
    // Kunci scroll awal
    document.body.style.overflow = 'hidden';

    // Load nav visibility state from localStorage
    const navVisible = localStorage.getItem("navVisible");
    const navBawah = document.querySelector(".bottom-nav");

    if (navVisible === "true" && navBawah) {
        navBawah.classList.add("show");
    } else {
        if (navBawah) navBawah.classList.remove("show");
    }

    const formDoa = document.getElementById('doa-form');
    if (formDoa) {
        formDoa.addEventListener('submit', function(e) {
            e.preventDefault();
            const nama = document.getElementById('nama').value;
            const hadir = document.getElementById('kehadiran').value;
            const ucapan = document.getElementById('ucapan').value;
            const displayBox = document.getElementById('display-ucapan');

            const emptyMsg = displayBox.querySelector('.empty-msg');
            if (emptyMsg) emptyMsg.remove();

            const ucapanBaru = document.createElement('div');
            ucapanBaru.className = 'ucapan-item';
            ucapanBaru.innerHTML = `<strong>${nama} <span class="status-hadir">${hadir}</span></strong><p>${ucapan}</p>`;
            displayBox.insertBefore(ucapanBaru, displayBox.firstChild);
            formDoa.reset();
        });
    }
});

// =========================================
// 6. TOGGLE BOTTOM NAVIGATION
// =========================================
function toggleBottomNav() {
    const navBawah = document.querySelector(".bottom-nav");
    const toggleBtn = document.getElementById("toggle-nav-btn");

    if (navBawah.classList.contains("show")) {
        navBawah.classList.remove("show");
        localStorage.setItem("navVisible", "false");
        toggleBtn.innerHTML = "☰"; // Hamburger icon
    } else {
        navBawah.classList.add("show");
        localStorage.setItem("navVisible", "true");
        toggleBtn.innerHTML = "✕"; // Close icon
    }
}

// =========================================
// 7. COPY REKENING
// =========================================
function copyToClipboard() {
    const norek = document.getElementById("norek").innerText;
    navigator.clipboard.writeText(norek).then(() => {
        alert("Nomor rekening berhasil disalin!");
    }).catch(err => {
        console.error('Gagal menyalin: ', err);
    });
}

// =========================================
// 7. GALLERY MODAL
// =========================================
document.addEventListener('DOMContentLoaded', function() {
    // Gallery modal functionality
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.modal-close');

    // Add click event to all gallery images
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            modalCaption.innerHTML = this.alt;
        });
    });

    // Close modal when clicking close button
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
});

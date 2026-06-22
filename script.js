/* =============================================
   FIRMA HUKUM MAS - script.js (FINAL VERSION)
   Moh Ainul Yakin & Partners
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. NAVBAR & SCROLL TOP =====
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 60) {
                navbar.classList.add('scrolled');
                if (scrollTopBtn) scrollTopBtn.classList.add('visible');
            } else {
                navbar.classList.remove('scrolled');
                if (scrollTopBtn) scrollTopBtn.classList.remove('visible');
            }
        }
        updateActiveNav();
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== 2. HAMBURGER MENU (RESPONSIVE HP) =====
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
            // Cegah scroll body saat menu terbuka
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });

        // Close nav on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ===== 3. ACTIVE NAV ON SCROLL =====
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) {
                if (scrollPos >= top && scrollPos < bottom) {
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }

    // ===== 4. HERO SLIDER (HANYA DI INDEX) =====
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    if (slides.length > 0) {
        let currentSlide = 0;
        let sliderInterval;
        const totalSlides = slides.length;

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (index + totalSlides) % totalSlides;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        const nextBtn = document.getElementById('nextSlide');
        const prevBtn = document.getElementById('prevSlide');

        if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetSliderInterval(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetSliderInterval(); });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                goToSlide(parseInt(dot.dataset.index));
                resetSliderInterval();
            });
        });

        function startSliderInterval() { sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 5500); }
        function resetSliderInterval() { clearInterval(sliderInterval); startSliderInterval(); }
        startSliderInterval();
    }

    // ===== 5. TYPEWRITER EFFECT (HANYA DI INDEX) =====
    const typewriterEl = document.getElementById('typewriter');
    if (typewriterEl) {
        const typewriterWords = ['yang Profesional', 'yang Berintegritas', 'yang Tepat & Cepat', 'untuk Anda', 'yang Terpercaya'];
        let wordIndex = 0; let charIndex = 0; let isDeleting = false; let typeDelay = 120;

        function typeWriter() {
            const currentWord = typewriterWords[wordIndex];
            if (!isDeleting) {
                typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentWord.length) { isDeleting = true; typeDelay = 1800; } else { typeDelay = 90; }
            } else {
                typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % typewriterWords.length; typeDelay = 400; } else { typeDelay = 50; }
            }
            setTimeout(typeWriter, typeDelay);
        }
        setTimeout(typeWriter, 800);
    }

    // ===== 6. SCROLL REVEAL & COUNT UP =====
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.stat-num').forEach(num => {
                        const target = parseInt(num.dataset.target);
                        let start = 0;
                        const timer = setInterval(() => {
                            start += target / 100;
                            if (start >= target) { num.textContent = target; clearInterval(timer); }
                            else { num.textContent = Math.floor(start); }
                        }, 16);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        statsObserver.observe(statsBar);
    }

    // ===== 7. CONTACT FORM (SEND TO WHATSAPP) =====
    const kontakForm = document.getElementById('kontakForm');
    if (kontakForm) {
        kontakForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = this.querySelector('.btn-submit');
            const originalHTML = btn.innerHTML;

            // Ambil Data
            const nama = document.getElementById('nama').value;
            const nohp = document.getElementById('nohp').value;
            const email = document.getElementById('email').value || '-';
            const layanan = document.getElementById('layanan') ? document.getElementById('layanan').value : 'Konsultasi Umum';
            const pesan = document.getElementById('pesan').value;

            // Animasi Loading
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Membuka WhatsApp...';
            btn.disabled = true;

            setTimeout(() => {
                const nomorWA = "6285335254018"; // FIX NOMOR
                const teksPesan = `Halo Firma Hukum MAS, saya ingin berkonsultasi.%0A%0A` +
                    `*Data Klien:*%0A` +
                    `- Nama: ${encodeURIComponent(nama)}%0A` +
                    `- No. WA: ${encodeURIComponent(nohp)}%0A` +
                    `- Email: ${encodeURIComponent(email)}%0A` +
                    `- Layanan: ${encodeURIComponent(layanan)}%0A%0A` +
                    `*Pesan:*%0A${encodeURIComponent(pesan)}`;

                window.open(`https://wa.me/${nomorWA}?text=${teksPesan}`, '_blank');

                btn.innerHTML = '<i class="fas fa-check"></i> Terhubung!';
                btn.style.background = '#25D366';
                
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.disabled = false;
                    this.reset();
                }, 3000);
            }, 1000);
        });
    }

    // ===== 8. SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

});

// ===== 9. MODAL DATA & FUNCTIONS (GLOBAL) =====
const serviceData = {
    perdata: { icon: 'fas fa-file-contract', title: 'Hukum Perdata', desc: 'Penyelesaian sengketa hak keperdataan secara profesional.', features: ['Wanprestasi', 'Ganti Rugi', 'Hutang Piutang', 'Sengketa Kontrak'] },
    pidana: { icon: 'fas fa-gavel', title: 'Hukum Pidana', desc: 'Pendampingan hukum dari penyelidikan hingga persidangan.', features: ['Pendampingan Polisi', 'Pembelaan Sidang', 'Upaya Hukum', 'Konsultasi Pidana'] },
    bisnis: { icon: 'fas fa-briefcase', title: 'Hukum Bisnis & Korporasi', desc: 'Layanan hukum komprehensif untuk pelaku usaha.', features: ['Pendirian PT/CV', 'Review Kontrak', 'Legal Compliance', 'Merger & Akuisisi'] },
    sengketa: { icon: 'fas fa-handshake', title: 'Penyelesaian Sengketa', desc: 'Representasi litigasi dan non-litigasi.', features: ['Litigasi Mahkamah Agung', 'Mediasi', 'Negosiasi', 'Eksekusi Putusan'] },
    ketenagakerjaan: { icon: 'fas fa-users', title: 'Hukum Ketenagakerjaan', desc: 'Pendampingan hubungan kerja pengusaha dan karyawan.', features: ['Kontrak PKWT', 'Kasus PHK', 'Perselisihan Industrial', 'Peraturan Perusahaan'] },
    pertanahan: { icon: 'fas fa-home', title: 'Hukum Pertanahan', desc: 'Penanganan sengketa aset dan legalitas properti.', features: ['Sengketa Sertifikat', 'Jual Beli', 'Gugatan PTUN', 'Pengurusan Hak'] },
    keluarga: { icon: 'fas fa-heart', title: 'Hukum Keluarga', desc: 'Pendampingan perkara perceraian dan waris.', features: ['Perceraian', 'Hak Asuh Anak', 'Gono Gini', 'Waris & Hibah'] },
    perizinan: { icon: 'fas fa-clipboard-check', title: 'Perizinan & Kepatuhan', desc: 'Pengurusan izin usaha dan mitigasi risiko.', features: ['Izin OSS NIB', 'Legal Audit', 'Compliance', 'Pemeriksaan'] },
    arbitrase: { icon: 'fas fa-comments', title: 'Arbitrase & Mediasi', desc: 'Penyelesaian sengketa cepat dan rahasia.', features: ['BANI', 'Klausul Arbitrase', 'Perdamaian', 'Eksekusi Arbitrase'] },
    konsultan: { icon: 'fas fa-building', title: 'Pendampingan Hukum Tetap', desc: 'Konsultan hukum in-house untuk perusahaan.', features: ['Retainer Hukum', 'Rapat Umum Pemegang Saham', 'Advis Kebijakan', 'Laporan Berkala'] }
};

function openModal(serviceKey) {
    const data = serviceData[serviceKey];
    if (!data) return;
    document.getElementById('modalIcon').className = data.icon;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDesc').textContent = data.desc;
    const featuresEl = document.getElementById('modalFeatures');
    featuresEl.innerHTML = data.features.map(f => `<div class="modal-feature"><i class="fas fa-check-circle"></i><span>${f}</span></div>`).join('');
    document.getElementById('modalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
}
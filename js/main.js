document.addEventListener('DOMContentLoaded', () => {

  /* ========== HERO SLIDER ========== */
  const slides = document.querySelectorAll('.hero__slide');
  const pageNums = document.querySelectorAll('.hero__page-num');
  const progressBar = document.querySelector('.hero__progress-bar');
  let current = 0;
  const total = slides.length;
  const duration = 5000; // 5s per slide
  let startTime = null;
  let rafId = null;

  function goToSlide(index) {
    slides[current].classList.remove('active');
    pageNums[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    pageNums[current].classList.add('active');
    startTime = null;
  }

  function animateProgress(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    progressBar.style.width = progress * 100 + '%';

    if (progress >= 1) {
      goToSlide((current + 1) % total);
    }

    rafId = requestAnimationFrame(animateProgress);
  }

  // Start auto-play
  rafId = requestAnimationFrame(animateProgress);

  // Click pagination numbers
  pageNums.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.slide);
      if (idx !== current) {
        goToSlide(idx);
      }
    });
  });

  /* ========== MOBILE MENU ========== */
  const menuBtn = document.getElementById('menuBtn');
  const menuClose = document.getElementById('menuClose');
  const mobileMenu = document.getElementById('mobileMenu');

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  menuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });

  // Close menu on link click
  mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ========== SERVICE ACCORDION ========== */
  const serviceItems = document.querySelectorAll('.service-item');

  serviceItems.forEach(item => {
    item.querySelector('.service-item__header').addEventListener('click', () => {
      const wasActive = item.classList.contains('active');
      // Close all
      serviceItems.forEach(s => s.classList.remove('active'));
      // Open clicked (if wasn't already open)
      if (!wasActive) {
        item.classList.add('active');
      }
    });
  });

  /* ========== SERVICE IMAGE SLIDER ========== */
  const sliderContainer = document.querySelector('.service-item__slides');
  const prevBtn = document.querySelector('.service-item__arrow--prev');
  const nextBtn = document.querySelector('.service-item__arrow--next');

  if (sliderContainer && prevBtn && nextBtn) {
    let sliderPos = 0;
    const slideItems = sliderContainer.querySelectorAll('img, .service-item__video');

    function getSlideWidth() {
      const firstItem = slideItems[0];
      if (!firstItem) return 0;
      const gap = 24;
      return firstItem.offsetWidth + gap;
    }

    function getMaxPos() {
      const containerWidth = sliderContainer.parentElement.offsetWidth;
      const totalWidth = slideItems.length * getSlideWidth() - 24;
      return Math.max(0, totalWidth - containerWidth);
    }

    function updateSlider() {
      sliderContainer.style.transform = `translateX(-${sliderPos}px)`;
    }

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sliderPos = Math.max(0, sliderPos - getSlideWidth());
      updateSlider();
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sliderPos = Math.min(getMaxPos(), sliderPos + getSlideWidth());
      updateSlider();
    });
  }

  /* ========== VIDEO LIGHTBOX ========== */
  const videoModal = document.getElementById('videoModal');
  const videoModalPlayer = document.getElementById('videoModalPlayer');
  const videoModalClose = document.getElementById('videoModalClose');

  const videos = document.querySelectorAll('.service-item__video');
  videos.forEach(video => {
    video.addEventListener('click', () => {
      const src = video.dataset.src;
      videoModalPlayer.src = src;
      videoModal.classList.add('open');
      videoModalPlayer.play();
    });
  });

  function closeVideoModal() {
    videoModal.classList.remove('open');
    videoModalPlayer.pause();
    videoModalPlayer.src = '';
  }

  videoModalClose.addEventListener('click', closeVideoModal);
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeVideoModal();
  });

  /* ========== SMOOTH SCROLL FOR ANCHOR LINKS ========== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ========== SCROLL REVEAL ANIMATIONS ========== */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

});

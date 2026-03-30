/* =============================================
   서울클리어교정치과 부산서면점 - 메인 스크립트
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  // ==================== POPUP ====================
  const popupOverlay = document.getElementById('popup-overlay');
  const popupTodayClose = document.getElementById('popup-today-close');

  function closePopup() {
    if (popupTodayClose && popupTodayClose.checked) {
      const now = new Date();
      now.setHours(23, 59, 59, 999);
      localStorage.setItem('popup-hide-until', now.getTime());
    }
    popupOverlay.classList.add('hidden');
  }

  function checkPopup() {
    const hideUntil = localStorage.getItem('popup-hide-until');
    if (hideUntil && Date.now() < Number(hideUntil)) {
      popupOverlay.classList.add('hidden');
    }
  }

  if (popupOverlay) {
    checkPopup();
    popupOverlay.addEventListener('click', function (e) {
      if (e.target === popupOverlay) closePopup();
    });
  }

  window.closePopup = closePopup;


  // ==================== HEADER SCROLL ====================
  const header = document.getElementById('header');
  const quickMenu = document.getElementById('quick-menu');

  function onScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (quickMenu) {
      if (scrollY > 400) {
        quickMenu.classList.add('visible');
      } else {
        quickMenu.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  // ==================== MOBILE NAV ====================
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const mobileNavClose = document.getElementById('mobile-nav-close');

  function openMobileNav() {
    mobileNav.classList.add('active');
    mobileNavOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('active');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMobileNav);
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
  if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMobileNav);

  document.querySelectorAll('.mobile-nav a').forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });


  // ==================== HERO SWIPER ====================
  new Swiper('.hero-swiper', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    speed: 800,
    pagination: {
      el: '.hero-pagination',
      clickable: true,
    },
  });


  // ==================== CASES SWIPER ====================
  new Swiper('.cases-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: {
      prevEl: '.cases-prev',
      nextEl: '.cases-next',
    },
  });


  // ==================== NAV ACTIVE STATE ====================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-desktop a');

  function updateActiveNav() {
    const scrollY = window.scrollY + 150;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });


  // ==================== SCROLL TO TOP ====================
  const btnTop = document.getElementById('btn-top');
  if (btnTop) {
    btnTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});

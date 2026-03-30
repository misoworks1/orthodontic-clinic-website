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
    // 팝업 외부 클릭 시 닫기
    popupOverlay.addEventListener('click', function (e) {
      if (e.target === popupOverlay) closePopup();
    });
  }

  // closePopup을 전역으로 노출 (onclick에서 사용)
  window.closePopup = closePopup;


  // ==================== HEADER SCROLL ====================
  const header = document.getElementById('header');
  const quickMenuDesktop = document.getElementById('quick-menu-desktop');
  let lastScrollY = 0;

  function onScroll() {
    const scrollY = window.scrollY;

    // 헤더 배경 변화
    if (scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // 퀵메뉴 표시
    if (quickMenuDesktop) {
      if (scrollY > 400) {
        quickMenuDesktop.classList.add('visible');
      } else {
        quickMenuDesktop.classList.remove('visible');
      }
    }

    lastScrollY = scrollY;
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

  // 모바일 메뉴 링크 클릭 시 닫기
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


  // ==================== CASES FILTER ====================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const caseCards = document.querySelectorAll('.case-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = this.dataset.filter;

      // 버튼 활성화
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      // 카드 필터링
      caseCards.forEach(function (card) {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });


  // ==================== SCROLL TO TOP ====================
  const btnTop = document.getElementById('btn-top');
  if (btnTop) {
    btnTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // ==================== AOS INIT ====================
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
  });

});

/* =============================================
   서울클리어교정치과 부산서면점 - 메인 스크립트
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  // ==================== POPUP ====================
  var popupOverlay = document.getElementById('popup-overlay');
  var popupTodayClose = document.getElementById('popup-today-close');

  function closePopup() {
    if (popupTodayClose && popupTodayClose.checked) {
      var now = new Date();
      now.setHours(23, 59, 59, 999);
      localStorage.setItem('popup-hide-until', now.getTime());
    }
    popupOverlay.classList.add('hidden');
  }

  function checkPopup() {
    var hideUntil = localStorage.getItem('popup-hide-until');
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


  // ==================== HEADER SCROLL (Headroom-style) ====================
  var header = document.getElementById('header');
  var quickMenu = document.getElementById('quick-menu');
  var lastScrollY = 0;
  var ticking = false;

  function onScroll() {
    var scrollY = window.scrollY;

    // Header background
    if (scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Header hide/show on scroll direction
    if (scrollY > 300) {
      if (scrollY > lastScrollY + 5) {
        header.classList.add('header-hidden');
      } else if (scrollY < lastScrollY - 5) {
        header.classList.remove('header-hidden');
      }
    } else {
      header.classList.remove('header-hidden');
    }

    // Quick menu visibility
    if (quickMenu) {
      if (scrollY > 400) {
        quickMenu.classList.add('visible');
      } else {
        quickMenu.classList.remove('visible');
      }
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  onScroll();


  // ==================== MOBILE NAV ====================
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobile-nav');
  var mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  var mobileNavClose = document.getElementById('mobile-nav-close');

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
    autoplay: { delay: 5000, disableOnInteraction: false },
    effect: 'fade',
    fadeEffect: { crossFade: true },
    speed: 1000,
    pagination: { el: '.hero-pagination', clickable: true },
  });


  // ==================== CASES SWIPER ====================
  new Swiper('.cases-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: {
      prevEl: '.cases-prev',
      nextEl: '.cases-next',
    },
    breakpoints: {
      768: { spaceBetween: 24 },
    },
  });


  // ==================== NAV ACTIVE STATE ====================
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-desktop a');

  function updateActiveNav() {
    var scrollY = window.scrollY + 150;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
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


  // ==================== SCROLL REVEAL ====================
  var revealElements = document.querySelectorAll('.reveal');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px',
  });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });


  // ==================== STATS COUNTER ====================
  var statNums = document.querySelectorAll('.stat-num[data-count]');
  var statsObserved = false;

  var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !statsObserved) {
        statsObserved = true;
        animateCounters();
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  if (statNums.length > 0) {
    statsObserver.observe(statNums[0].closest('.stats-section'));
  }

  function animateCounters() {
    statNums.forEach(function (el) {
      var target = parseInt(el.dataset.count, 10);
      var duration = 1800;
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);
        el.textContent = current.toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target.toLocaleString();
        }
      }

      requestAnimationFrame(step);
    });
  }


  // ==================== CV MODAL ====================
  var btnCvMore = document.getElementById('btn-cv-more');
  var cvModal = document.getElementById('cv-modal');

  if (btnCvMore && cvModal) {
    var modalClose = cvModal.querySelector('.modal-close');

    btnCvMore.addEventListener('click', function () {
      cvModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    function closeCvModal() {
      cvModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeCvModal);

    cvModal.addEventListener('click', function (e) {
      if (e.target === cvModal) closeCvModal();
    });
  }


  // ==================== CONTACT FORM ====================
  var contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var phone = document.getElementById('form-phone').value;
      var phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;

      if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        alert('올바른 연락처를 입력해주세요.');
        return;
      }

      var submitBtn = contactForm.querySelector('.form-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = '접수 중...';

      // 실제 서버 연동 전 임시 처리
      setTimeout(function () {
        alert('상담 신청이 접수되었습니다.\n빠른 시간 내에 연락드리겠습니다.');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = '상담 신청하기';
      }, 1000);
    });
  }


  // ==================== SCROLL TO TOP ====================
  var btnTop = document.getElementById('btn-top');
  if (btnTop) {
    btnTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});

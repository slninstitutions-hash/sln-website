/* --------------- footer year --------------- */
(function setFooterYear(){
  try {
    const el = document.getElementById('footer-year');
    if(el) el.textContent = new Date().getFullYear();
  } catch (e) {
    // silent
  }
})();

/* --------------- mobile menu (robust) --------------- */
(function mobileMenu(){
  const menuBtn = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if(!menuBtn || !mobileNav) return;

  function openMenu(){
    mobileNav.style.display = 'flex';
    mobileNav.setAttribute('aria-hidden','false');
    menuBtn.setAttribute('aria-expanded','true');
  }
  function closeMenu(){
    mobileNav.style.display = 'none';
    mobileNav.setAttribute('aria-hidden','true');
    menuBtn.setAttribute('aria-expanded','false');
  }

  // init closed
  closeMenu();

  menuBtn.addEventListener('click', function(){
    if(mobileNav.style.display === 'flex') closeMenu();
    else openMenu();
  });

  // keyboard support
  menuBtn.addEventListener('keydown', function(e){
    if(e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      menuBtn.click();
    }
  });

  // close menu after link click
  mobileNav.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', function(){
      setTimeout(closeMenu, 80);
    });
  });

  // close menu on resize (desktop)
  window.addEventListener('resize', function(){
    if(window.innerWidth > 900) closeMenu();
  });
})();

/* --------------- sticky header shadow & active nav --------------- */
(function headerAndActiveNav(){
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if(!header) return;

  function onScroll(){
    // header shadow
    if(window.scrollY > 18) header.classList.add('shadow');
    else header.classList.remove('shadow');

    // active nav highlight
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if(window.scrollY >= top) current = sec.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href') || '';

      try {
        if(current && href.includes('#' + current)) {
          link.classList.add('active');
        } else {
          if(window.location.pathname.endsWith('results.html') && href.includes('results.html')) {
            link.classList.add('active');
          }
        }
      } catch(e) {}
    });
  }

  window.addEventListener('scroll', onScroll);
  window.addEventListener('load', onScroll);
  setTimeout(onScroll, 200);
})();

/* --------------- reveal animations on scroll --------------- */
(function revealOnScroll(){
  const els = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .slide-up');
  if(!els || els.length === 0) return;

  function reveal(){
    const trigger = window.innerHeight * 0.85;
    els.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if(top < trigger) el.classList.add('show');
    });
  }

  window.addEventListener('scroll', reveal);
  window.addEventListener('load', reveal);
  setTimeout(reveal, 200);
})();

/* --------------- counters (if used) --------------- */
(function counters(){
  const counters = document.querySelectorAll('.counter');
  if(!counters || counters.length === 0) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target') || 0;
          const duration = 1200;
          const start = performance.now();

          function step(now){
            const progress = Math.min((now - start) / duration, 1);
            counter.textContent = Math.floor(progress * target);
            if(progress < 1) requestAnimationFrame(step);
            else counter.textContent = target;
          }

          requestAnimationFrame(step);
        });
        obs.disconnect();
      }
    });
  }, {threshold: 0.4});

  counters.forEach(c => obs.observe(c));
})();

/* --------------- contact form demo handler --------------- */
(function contactForm(){
  const form = document.getElementById('contact-form');
  if(!form) return;

  form.addEventListener('submit', function(e){
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    if(submitBtn) {
      const origText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      setTimeout(()=> {
        alert('Form demo — replace with real server endpoint. Thank you!');
        submitBtn.disabled = false;
        submitBtn.textContent = origText;
        form.reset();
      }, 800);

    } else {
      alert('Form demo — replace with real server endpoint. Thank you!');
      form.reset();
    }
  });
})();

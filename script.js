// script.js — Interactivity: loader, nav, theme, typewriter, progress animation, form validation
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const loader = document.getElementById('loader');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const typewriterEl = document.getElementById('typewriter');
  const yearEl = document.getElementById('year');

  // Hide loader after full load (also fallback)
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
      loader.style.transition = 'opacity 350ms';
      setTimeout(()=> loader.remove(), 600);
    }, 600);
  });

  // Year in footer
  yearEl.textContent = new Date().getFullYear();

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });

  // Close mobile nav when link clicked
  document.querySelectorAll('[data-link]').forEach(a => {
    a.addEventListener('click', (e) => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Theme toggle: persist in localStorage
  const currentTheme = localStorage.getItem('theme') || 'light';
  setTheme(currentTheme);

  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(next);
  });

  function setTheme(theme){
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if(theme === 'dark'){
      themeIcon.className = 'fa-solid fa-sun';
    } else {
      themeIcon.className = 'fa-regular fa-moon';
    }
  }

  // Typewriter effect
  const textToType = 'Mahasiswa Informatika | Web Developer Pemula | Tech Enthusiast';
  typeWriter(typewriterEl, textToType, 40);

  function typeWriter(elem, text, speed=50){
    let i=0;
    elem.textContent = '';
    const t = setInterval(()=>{
      elem.textContent += text.charAt(i);
      i++;
      if(i>text.length-1) clearInterval(t);
    }, speed);
  }

  // Initialize AOS
  if(window.AOS) {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out'
    });
  }

  // Animate progress bars when section in view (use IntersectionObserver)
  const progressBars = document.querySelectorAll('.progress-bar');
  const progObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const bar = entry.target;
        const val = bar.getAttribute('data-skill') || 60;
        bar.style.width = val + '%';
        progObserver.unobserve(bar);
      }
    });
  }, {threshold: .4});

  progressBars.forEach(pb => progObserver.observe(pb));

  // Smooth offset for sticky navbar (adjust scroll so sections not hidden)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if(!targetId) return;
      const target = document.getElementById(targetId);
      if(target){
        e.preventDefault();
        const navHeight = document.querySelector('.navbar-container').offsetHeight || 72;
        const y = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    });
  });

  // Contact form validation
  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const msgInput = document.getElementById('message');
  const errName = document.getElementById('error-name');
  const errEmail = document.getElementById('error-email');
  const errMsg = document.getElementById('error-message');
  const formSuccess = document.getElementById('form-success');

  function validateEmail(email){
    // simple regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    errName.textContent = ''; errEmail.textContent = ''; errMsg.textContent = ''; formSuccess.textContent = '';

    if(nameInput.value.trim().length < 2){
      errName.textContent = 'Masukkan nama yang valid.';
      valid = false;
    }
    if(!validateEmail(emailInput.value.trim())){
      errEmail.textContent = 'Masukkan email yang valid.';
      valid = false;
    }
    if(msgInput.value.trim().length < 6){
      errMsg.textContent = 'Pesan terlalu singkat.';
      valid = false;
    }

    if(!valid) return;

    // Simulate send (replace with actual send logic / API)
    formSuccess.textContent = 'Pesan berhasil dikirim. Terima kasih!';
    form.reset();
  });

  // Close mobile nav if clicked outside
  document.addEventListener('click', (e) => {
    const target = e.target;
    if(!navLinks.contains(target) && !hamburger.contains(target)){
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

});
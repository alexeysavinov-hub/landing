/* ============================================================
   BytePlay — интерактив и анимации
   ============================================================ */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- watchdog видимости ----
     В offscreen/throttled-окружениях CSS-переходы из opacity:0 могут
     не доигрываться. Если по истечении времени элемент всё ещё невидим —
     принудительно показываем его (без перехода). Для реальных браузеров
     это no-op: переход уже завершился, элемент видим. */
  function ensureVisible(el, delay) {
    if (!el) return;
    setTimeout(function () {
      if (parseFloat(getComputedStyle(el).opacity) < 0.9) {
        el.style.setProperty('transition', 'none', 'important');
        el.style.setProperty('opacity', '1', 'important');
        el.style.setProperty('transform', 'none', 'important');
      }
    }, delay);
  }

  /* ---- запуск стартовых анимаций ----
     preload-класс стоит на <html> (inline-скрипт в <head>): контент скрыт
     только при работающем JS. Здесь раскрываем + ставим watchdog. */
  function reveal() {
    document.documentElement.classList.add('ready');
    var heroEls = document.querySelectorAll('.hero-copy > *, .phone-stage');
    heroEls.forEach(function (el) { ensureVisible(el, 1800); });
  }
  window.addEventListener('load', function () { requestAnimationFrame(reveal); });
  setTimeout(reveal, 700);

  /* ---- навигация: фон при скролле ---- */
  var nav = document.querySelector('.nav');
  function onScrollNav() {
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* ---- мобильное меню ---- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  /* ---- активная ссылка по секциям ---- */
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var sections = navAnchors.map(function (a) {
    var id = a.getAttribute('href').slice(1);
    return { a: a, el: document.getElementById(id) };
  }).filter(function (s) { return s.el; });

  function onScrollActive() {
    var y = window.scrollY + window.innerHeight * 0.32;
    var current = null;
    sections.forEach(function (s) {
      if (s.el.offsetTop <= y) current = s;
    });
    navAnchors.forEach(function (a) { a.classList.remove('active'); });
    if (current) current.a.classList.add('active');
  }
  onScrollActive();
  window.addEventListener('scroll', onScrollActive, { passive: true });

  /* ---- scroll reveal ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          ensureVisible(e.target, 1300);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- счётчики ---- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var dec = (el.getAttribute('data-dec') === '1');
    var dur = 1600, start = null;
    if (reduce) { el.textContent = dec ? target.toFixed(1) : target; return; }
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = dec ? val.toFixed(1) : Math.floor(val);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = dec ? target.toFixed(1) : target;
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---- параллакс листьев (scroll + mouse) ---- */
  var leaves = Array.prototype.slice.call(document.querySelectorAll('.leaf'));
  var phoneStage = document.querySelector('.phone-stage');
  var mx = 0, my = 0, tmx = 0, tmy = 0, sy = 0;

  if (!reduce) {
    window.addEventListener('mousemove', function (e) {
      tmx = (e.clientX / window.innerWidth - 0.5);
      tmy = (e.clientY / window.innerHeight - 0.5);
    }, { passive: true });

    window.addEventListener('scroll', function () { sy = window.scrollY; }, { passive: true });

    var raf = function () {
      mx += (tmx - mx) * 0.06;
      my += (tmy - my) * 0.06;
      leaves.forEach(function (leaf, i) {
        var depth = (i + 1) * 6;
        var sd = (i % 2 === 0 ? 1 : -1) * (i + 1) * 0.04;
        var baseRot = leaf.getAttribute('data-rot') || '0';
        leaf.style.transform =
          'translate(' + (mx * depth) + 'px,' + (my * depth + sy * sd) + 'px) rotate(' + baseRot + 'deg)';
      });
      if (phoneStage) {
        phoneStage.style.transform = 'translate(' + (mx * -14) + 'px,' + (my * -10) + 'px)';
      }
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  /* ---- дрейфующие частицы-листья в герое ---- */
  var heroLeavesLayer = document.querySelector('.leaves');
  function spawnDrift() {
    if (reduce || !heroLeavesLayer) return;
    var hero = document.querySelector('.hero');
    if (window.scrollY > window.innerHeight) return; // только пока герой виден
    var d = document.createElement('div');
    d.className = 'drift';
    var size = 14 + Math.random() * 26;
    d.style.width = size + 'px';
    d.style.height = size + 'px';
    d.style.left = (Math.random() * 90) + '%';
    d.style.top = '-6%';
    d.innerHTML = '<svg viewBox="0 0 100 100" fill="currentColor"><path d="M50 4 C24 28 16 60 50 96 C84 60 76 28 50 4 Z"/></svg>';
    hero.appendChild(d);
    var dx = (Math.random() - 0.5) * 160;
    var dur = 9000 + Math.random() * 8000;
    var rot = (Math.random() - 0.5) * 540;
    var maxOp = 0.18 + Math.random() * 0.22;
    var anim = d.animate([
      { transform: 'translate(0,0) rotate(0deg)', opacity: 0 },
      { opacity: maxOp, offset: 0.12 },
      { opacity: maxOp, offset: 0.8 },
      { transform: 'translate(' + dx + 'px,' + (window.innerHeight * 1.15) + 'px) rotate(' + rot + 'deg)', opacity: 0 }
    ], { duration: dur, easing: 'ease-in' });
    anim.onfinish = function () { d.remove(); };
  }
  setInterval(spawnDrift, 1400);

  /* ---- плавный скролл с учётом фикс-навбара ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      var top = t.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
    });
  });

  /* ---- форма ---- */
  var form = document.getElementById('contact-form');
  if (form) {
    var success = document.getElementById('form-success');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      var fields = form.querySelectorAll('.field');
      fields.forEach(function (f) {
        var input = f.querySelector('input, textarea');
        if (!input) return;
        var msg = f.querySelector('.msg');
        var val = input.value.trim();
        var bad = false, text = '';
        if (input.hasAttribute('required') && !val) { bad = true; text = 'Заполните это поле'; }
        else if (input.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { bad = true; text = 'Проверьте адрес почты'; }
        if (bad) { f.classList.add('err'); if (msg) msg.textContent = text; ok = false; }
        else { f.classList.remove('err'); if (msg) msg.textContent = ''; }
      });
      if (!ok) return;
      form.style.display = 'none';
      if (success) success.classList.add('show');
    });
    form.querySelectorAll('input, textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        var f = input.closest('.field');
        if (f) f.classList.remove('err');
      });
    });
  }

  /* ---- год в футере ---- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();

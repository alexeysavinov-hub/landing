/* ============================================================
   BytePlay — интерактив (IT / cloud редакция)
   ============================================================ */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- watchdog видимости (offscreen/throttled окружения) ---- */
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

  function reveal() {
    document.documentElement.classList.add('ready');
    document.querySelectorAll('.hero-copy > *, .hero-visual').forEach(function (el) { ensureVisible(el, 1800); });
  }
  window.addEventListener('load', function () { requestAnimationFrame(reveal); });
  setTimeout(reveal, 700);

  /* ---- навигация: фон при скролле ---- */
  var nav = document.querySelector('.nav');
  function onScrollNav() { nav.classList.toggle('scrolled', window.scrollY > 30); }
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* ---- мобильное меню ---- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle) {
    toggle.addEventListener('click', function () { links.classList.toggle('open'); });
    links.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { links.classList.remove('open'); }); });
  }

  /* ---- активная ссылка ---- */
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var sections = navAnchors.map(function (a) {
    return { a: a, el: document.getElementById(a.getAttribute('href').slice(1)) };
  }).filter(function (s) { return s.el; });
  function onScrollActive() {
    var y = window.scrollY + window.innerHeight * 0.32, cur = null;
    sections.forEach(function (s) { if (s.el.offsetTop <= y) cur = s; });
    navAnchors.forEach(function (a) { a.classList.remove('active'); });
    if (cur) cur.a.classList.add('active');
  }
  onScrollActive();
  window.addEventListener('scroll', onScrollActive, { passive: true });

  /* ---- scroll reveal ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); ensureVisible(e.target, 1300); io.unobserve(e.target); }
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
      var val = target * (1 - Math.pow(1 - p, 3));
      el.textContent = dec ? val.toFixed(1) : Math.floor(val);
      if (p < 1) requestAnimationFrame(step); else el.textContent = dec ? target.toFixed(1) : target;
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { co.observe(el); });
  } else { counters.forEach(animateCount); }

  /* ---- параллакс: сетка, орбы, визуал, чипы ---- */
  var grid = document.querySelector('.hero .grid');
  var orbs = Array.prototype.slice.call(document.querySelectorAll('.hero .orb'));
  var visual = document.querySelector('.code-window');
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip-float'));
  var mx = 0, my = 0, tmx = 0, tmy = 0, sy = 0;

  if (!reduce) {
    window.addEventListener('mousemove', function (e) {
      tmx = (e.clientX / window.innerWidth - 0.5);
      tmy = (e.clientY / window.innerHeight - 0.5);
    }, { passive: true });
    window.addEventListener('scroll', function () { sy = window.scrollY; }, { passive: true });

    (function raf() {
      mx += (tmx - mx) * 0.06; my += (tmy - my) * 0.06;
      if (grid) grid.style.transform = 'translate(' + (mx * 18) + 'px,' + (my * 18 + sy * 0.06) + 'px)';
      orbs.forEach(function (o, i) {
        var d = (i === 0 ? 28 : -22);
        o.style.transform = 'translate(' + (mx * d) + 'px,' + (my * d + sy * (i === 0 ? 0.08 : -0.05)) + 'px)';
      });
      if (visual) visual.style.transform = 'perspective(1400px) rotateY(' + (mx * -5) + 'deg) rotateX(' + (my * 4) + 'deg) translateY(' + (my * -8) + 'px)';
      chips.forEach(function (c, i) {
        var d = (i + 2) * 7;
        c.style.transform = 'translate(' + (mx * d) + 'px,' + (my * d) + 'px)';
      });
      requestAnimationFrame(raf);
    })();
  }

  /* ---- дрейфующие байт-частицы ---- */
  var heroEl = document.querySelector('.hero');
  var GLYPHS = ['0', '1', '01', '10', '{}', '</>', '0x', '11', '00', 'fn', '=>'];
  function spawnByte() {
    if (reduce || !heroEl || window.scrollY > window.innerHeight) return;
    var b = document.createElement('div');
    b.className = 'byte';
    b.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    b.style.fontSize = (11 + Math.random() * 12) + 'px';
    b.style.left = (Math.random() * 92) + '%';
    b.style.top = '102%';
    b.style.color = Math.random() > 0.5 ? 'var(--cyan)' : 'var(--blue-bright)';
    heroEl.appendChild(b);
    var dx = (Math.random() - 0.5) * 80;
    var dur = 7000 + Math.random() * 6000;
    var maxOp = 0.25 + Math.random() * 0.35;
    var anim = b.animate([
      { transform: 'translate(0,0)', opacity: 0 },
      { opacity: maxOp, offset: 0.15 },
      { opacity: maxOp, offset: 0.8 },
      { transform: 'translate(' + dx + 'px,-' + (window.innerHeight * 1.12) + 'px)', opacity: 0 }
    ], { duration: dur, easing: 'linear' });
    anim.onfinish = function () { b.remove(); };
  }
  setInterval(spawnByte, 900);

  /* ---- ЛУДУС арт: искры + лёгкий параллакс ---- */
  var artWrap = document.querySelector('.featured-art.has-img');
  var artImg = document.querySelector('.art-img');
  if (artWrap && !reduce) {
    // параллакс изображения при наведении
    artWrap.addEventListener('mousemove', function (e) {
      var r = artWrap.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      artImg.style.transition = 'transform .25s ease-out';
      artImg.style.animation = 'none';
      artImg.style.transform = 'scale(1.12) translate(' + (px * -3.5) + '%,' + (py * -3.5) + '%)';
    });
    artWrap.addEventListener('mouseleave', function () {
      artImg.style.transition = 'transform .8s var(--ease)';
      artImg.style.transform = '';
      setTimeout(function () { artImg.style.animation = ''; artImg.style.transition = ''; }, 800);
    });

    // поднимающиеся искры от взрыва
    var artVisible = false;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (en) { artVisible = en.isIntersecting; });
      }, { threshold: 0.15 }).observe(artWrap);
    } else { artVisible = true; }

    function spawnSpark() {
      if (!artVisible) return;
      var r = artWrap.getBoundingClientRect();
      var s = document.createElement('div');
      s.className = 'spark';
      var size = 2 + Math.random() * 4;
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      var warm = Math.random();
      s.style.background = warm > 0.5 ? '#ffd27a' : '#ff9b46';
      s.style.boxShadow = '0 0 ' + (4 + size) + 'px ' + (warm > 0.5 ? 'rgba(255,200,110,.9)' : 'rgba(255,140,60,.9)');
      // старт из зоны взрыва (центр-право-низ)
      s.style.left = (45 + Math.random() * 38) + '%';
      s.style.top = (55 + Math.random() * 30) + '%';
      artWrap.appendChild(s);
      var dx = (Math.random() - 0.4) * 70;
      var dy = -(60 + Math.random() * 130);
      var dur = 1400 + Math.random() * 1600;
      var anim = s.animate([
        { transform: 'translate(0,0) scale(1)', opacity: 0 },
        { opacity: 1, offset: 0.15 },
        { opacity: .9, offset: 0.7 },
        { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.2)', opacity: 0 }
      ], { duration: dur, easing: 'cubic-bezier(.3,.6,.4,1)' });
      anim.onfinish = function () { s.remove(); };
    }
    setInterval(spawnSpark, 280);
  }

  /* ---- плавный скролл с учётом навбара ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 70, behavior: reduce ? 'auto' : 'smooth' });
    });
  });

  /* ---- форма ---- */
  var form = document.getElementById('contact-form');
  if (form) {
    var success = document.getElementById('form-success');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll('.field').forEach(function (f) {
        var input = f.querySelector('input, textarea');
        if (!input) return;
        var msg = f.querySelector('.msg'), val = input.value.trim(), bad = false, text = '';
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
      input.addEventListener('input', function () { var f = input.closest('.field'); if (f) f.classList.remove('err'); });
    });
  }

  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();

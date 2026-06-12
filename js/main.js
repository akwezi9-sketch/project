/* WORLD OF GA — shared behaviour */
(function () {
  'use strict';

  /* mobile menu */
  var toggle = document.querySelector('.menu-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav-overlay a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* scroll reveals */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* work-grid category filters */
  var chips = document.querySelectorAll('.chip[data-filter]');
  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('is-on'); });
        chip.classList.add('is-on');
        var f = chip.getAttribute('data-filter');
        document.querySelectorAll('.work-card[data-tags]').forEach(function (card) {
          var show = f === 'all' || card.getAttribute('data-tags').indexOf(f) !== -1;
          card.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  /* lightbox for gallery photos */
  var phs = Array.prototype.slice.call(document.querySelectorAll('.masonry .ph'));
  if (phs.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-label', 'Image viewer');
    lb.innerHTML =
      '<button class="lb-btn lb-close" aria-label="Close">&#10005;</button>' +
      '<button class="lb-btn lb-prev" aria-label="Previous image">&#8592;</button>' +
      '<img alt="">' +
      '<p class="lb-cap"></p>' +
      '<button class="lb-btn lb-next" aria-label="Next image">&#8594;</button>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('.lb-cap');
    var cur = 0;

    function show(i) {
      cur = (i + phs.length) % phs.length;
      var img = phs[cur].querySelector('img');
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt;
      var cap = phs[cur].querySelector('.ph-cap');
      lbCap.textContent = cap ? cap.textContent : img.alt;
    }
    function openLb(i) { show(i); lb.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
    function closeLb() { lb.classList.remove('is-open'); document.body.style.overflow = ''; }

    phs.forEach(function (ph, i) {
      ph.addEventListener('click', function () { openLb(i); });
    });
    lb.querySelector('.lb-close').addEventListener('click', closeLb);
    lb.querySelector('.lb-prev').addEventListener('click', function () { show(cur - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { show(cur + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
    });
  }

  /* contact form -> opens visitor's mail client (no backend needed) */
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#cf-name').value.trim();
      var email = form.querySelector('#cf-email').value.trim();
      var type = form.querySelector('#cf-type') ? form.querySelector('#cf-type').value : '';
      var msg = form.querySelector('#cf-msg').value.trim();
      var subject = encodeURIComponent('Booking enquiry — ' + (type || 'General') + ' — ' + name);
      var body = encodeURIComponent(msg + '\n\n— ' + name + '\n' + email);
      window.location.href = 'mailto:info.garaartproductions@gmail.com?subject=' + subject + '&body=' + body;
      var note = form.querySelector('.form-note');
      if (note) note.textContent = 'Your email app should open now — if not, write to info.garaartproductions@gmail.com';
    });
  }

  /* footer year */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

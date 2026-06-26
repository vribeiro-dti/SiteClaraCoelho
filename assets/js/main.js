/* ============================================================
   INSTITUTO CLAARA COELHO — main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── SCROLL SUAVE para âncoras ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        closeMobileMenu();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── NAV ── */
  var nav = document.querySelector('.nav');
  window.addEventListener('scroll', function () {
    nav.style.background = window.scrollY > 40
      ? 'rgba(13,13,13,0.98)'
      : 'rgba(13,13,13,0.94)';
  }, { passive: true });

  /* ── MENU MOBILE ── */
  var hamburger  = document.querySelector('.nav__hamburger');
  var mobileMenu = document.querySelector('.nav__mobile');

  function closeMobileMenu() {
    if (hamburger)  hamburger.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = this.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileMenu.addEventListener('click', function (e) { if (e.target === this) closeMobileMenu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMobileMenu(); });
  }

  /* ── REVEAL ON SCROLL ── */
  if ('IntersectionObserver' in window) {
    var style = document.createElement('style');
    style.textContent =
      '.reveal{opacity:0;transform:translateY(22px);transition:opacity .6s ease,transform .6s ease}' +
      '.reveal.visible{opacity:1;transform:none}' +
      '.reveal-d1{transition-delay:.1s}.reveal-d2{transition-delay:.2s}.reveal-d3{transition-delay:.3s}';
    document.head.appendChild(style);

    document.querySelectorAll('.serv,.dep,.cred,.contact__item,.sfoto').forEach(function (el, i) {
      el.classList.add('reveal', 'reveal-d' + ((i % 3) + 1));
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  }

  /* ── FORMULÁRIO → WHATSAPP ── */
  var form   = document.getElementById('form-contato');
  var btnEnv = document.getElementById('btn-enviar');

  if (form && btnEnv) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome    = document.getElementById('f-nome').value.trim();
      var tel     = document.getElementById('f-tel').value.trim();
      var servico = document.getElementById('f-servico').value.trim();
      var msg     = document.getElementById('f-msg').value.trim();

      if (!nome) { document.getElementById('f-nome').focus(); return; }

      // Monta mensagem simples e curta para evitar erro do WhatsApp
      var partes = ['Ola! Vim pelo site do Instituto Claara Coelho.'];
      partes.push('Nome: ' + nome);
      if (tel)     partes.push('Telefone: ' + tel);
      if (servico) partes.push('Servico: ' + servico);
      if (msg)     partes.push('Mensagem: ' + msg);

      // Usa %0A para quebra de linha (mais compatível que \n encodado)
      var texto = partes.join('%0A');

      // Número sem +, sem espaços, sem traços
      var numero = '5511945568632'; // formato correto: 55 + DDD + número com 9 dígitos
      var url = 'https://wa.me/' + numero + '?text=' + texto;

      btnEnv.textContent = 'Abrindo WhatsApp...';
      btnEnv.disabled = true;

      setTimeout(function () {
        window.open(url, '_blank');
        btnEnv.textContent = 'Enviar pelo WhatsApp';
        btnEnv.disabled = false;
        form.reset();
      }, 400);
    });
  }

  /* ── BOTÃO WA FLUTUANTE ── */
  var waFloat = document.querySelector('.whats-float');
  if (waFloat) {
    waFloat.style.cssText += 'opacity:0;transform:scale(0.8);transition:opacity .3s,transform .3s;';
    window.addEventListener('scroll', function () {
      var show = window.scrollY > 300;
      waFloat.style.opacity   = show ? '1' : '0';
      waFloat.style.transform = show ? 'scale(1)' : 'scale(0.8)';
    }, { passive: true });
  }

});

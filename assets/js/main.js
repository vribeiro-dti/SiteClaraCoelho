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
      var servico = document.getElementById('f-servico').value;
      var msg     = document.getElementById('f-msg').value.trim();

      if (!nome) { document.getElementById('f-nome').focus(); return; }

      var texto = encodeURIComponent(
        'Olá! Vim pelo site.\n\nNome: ' + nome +
        '\nTelefone: ' + (tel || 'não informado') +
        '\nServiço: '  + (servico || 'não selecionado') +
        '\nMensagem: ' + (msg || 'sem mensagem')
      );

      btnEnv.textContent = 'Redirecionando…';
      btnEnv.disabled = true;

      setTimeout(function () {
        window.open('https://wa.me/551145568632?text=' + texto, '_blank', 'noopener,noreferrer');
        btnEnv.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.553 4.105 1.516 5.836L0 24l6.37-1.495A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.816 9.816 0 01-5.003-1.366l-.358-.213-3.78.887.92-3.676-.234-.375A9.785 9.785 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg> Enviar pelo WhatsApp';
        btnEnv.disabled = false;
        form.reset();
      }, 600);
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

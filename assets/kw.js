// Układ „klindworth": nagłówek po przewinięciu, karuzela usług, przełączane zasady
(function () {
  var head = document.querySelector('.k-head');
  function sc() { if (head) head.classList.toggle('is-scrolled', (window.scrollY || 0) > 30); }
  window.addEventListener('scroll', sc, { passive: true }); sc();

  // karuzela usług: strzałki + pasek postępu
  document.querySelectorAll('.k-car').forEach(function (car) {
    var track = car.querySelector('.k-track'), bar = car.querySelector('.k-bar i');
    if (!track) return;
    function step() { var c = track.querySelector('.k-card'); return c ? c.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : 300; }
    var nx = car.querySelector('[data-next]'), pv = car.querySelector('[data-prev]');
    if (nx) nx.addEventListener('click', function () {
      var end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      track.scrollTo({ left: end ? 0 : track.scrollLeft + step(), behavior: 'smooth' });
    });
    if (pv) pv.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
    function upd() {
      if (!bar) return;
      var w = track.clientWidth / track.scrollWidth, max = track.scrollWidth - track.clientWidth;
      var p = max > 0 ? track.scrollLeft / max : 0;
      bar.style.width = (w * 100) + '%'; bar.style.left = (p * (1 - w) * 100) + '%';
    }
    track.addEventListener('scroll', upd, { passive: true }); window.addEventListener('resize', upd); upd();
  });

  // zasady: jeden cytat naraz, strzałki, samo przełącza się co 7 s
  document.querySelectorAll('.k-kudos').forEach(function (box) {
    var sl = [].slice.call(box.querySelectorAll('.k-slide')); if (sl.length < 2) return;
    var i = 0, t;
    function go(n) { sl[i].classList.remove('is-on'); i = (n + sl.length) % sl.length; sl[i].classList.add('is-on'); }
    function auto() { clearInterval(t); t = setInterval(function () { go(i + 1); }, 7000); }
    var nx = box.querySelector('[data-next]'), pv = box.querySelector('[data-prev]');
    if (nx) nx.addEventListener('click', function () { go(i + 1); auto(); });
    if (pv) pv.addEventListener('click', function () { go(i - 1); auto(); });
    auto();
  });
})();

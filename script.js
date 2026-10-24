// Intro : construit une pièce 3D épaisse en empilant des couches du logo
(function () {
  var intro = document.getElementById('intro');
  var coin = document.getElementById('coin');
  var skip = document.getElementById('skip');
  var depth = 14;

  for (var i = depth; i >= 0; i--) {
    var layer = document.createElement('div');
    var isFace = i === 0 || i === depth;
    layer.className = 'coin-layer' + (isFace ? '' : ' edge');
    var z = depth / 2 - i;
    // la face arrière est retournée pour que le logo reste lisible
    layer.style.transform = 'translateZ(' + z + 'px)' + (i === depth ? ' rotateY(180deg)' : '');
    layer.innerHTML = '<svg><use href="#logo"/></svg>';
    coin.appendChild(layer);
  }

  var done = false;
  function finish() {
    if (done) return;
    done = true;
    intro.classList.add('is-done');
    document.body.classList.remove('is-loading');
    setTimeout(function () { intro.remove(); }, 800);
  }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(finish, reduced ? 600 : 3400);
  skip.addEventListener('click', finish);
})();

// Apparition douce des sections au scroll
(function () {
  var items = document.querySelectorAll('.section > *');
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  items.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
})();

document.getElementById('year').textContent = new Date().getFullYear();

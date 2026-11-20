(function () {
  var btn = document.getElementById('mobile-menu-btn');
  var menu = document.getElementById('mobile-menu');
  var iconMenu = document.getElementById('icon-menu');
  var iconClose = document.getElementById('icon-close');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var open = menu.classList.toggle('hidden');
    iconMenu.classList.toggle('hidden', !open);
    iconClose.classList.toggle('hidden', open);
    btn.setAttribute('aria-expanded', String(!open));
  });
})();

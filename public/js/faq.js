// Accordion — single-open: closing any open item before opening a new one
function closeItem(item) {
  var answer = item.querySelector('.faq-answer');
  var chevron = item.querySelector('.faq-chevron');
  var btn = item.querySelector('.faq-trigger');
  answer.classList.add('hidden');
  chevron.style.transform = '';
  btn.setAttribute('aria-expanded', 'false');
}

function openItem(item) {
  var answer = item.querySelector('.faq-answer');
  var chevron = item.querySelector('.faq-chevron');
  var btn = item.querySelector('.faq-trigger');
  answer.classList.remove('hidden');
  chevron.style.transform = 'rotate(180deg)';
  btn.setAttribute('aria-expanded', 'true');
}

document.querySelectorAll('.faq-trigger').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var item = btn.closest('.faq-item');
    var isOpen = !item.querySelector('.faq-answer').classList.contains('hidden');

    // Close every open item
    document.querySelectorAll('.faq-item').forEach(function(other) {
      if (!other.querySelector('.faq-answer').classList.contains('hidden')) {
        closeItem(other);
      }
    });

    // If the clicked item was closed, open it now
    if (!isOpen) {
      openItem(item);
    }
  });
});

// Open item from URL hash
(function() {
  var hash = window.location.hash.replace('#', '');
  if (!hash) return;
  var el = document.getElementById(hash);
  if (!el || !el.classList.contains('faq-item')) return;
  var btn = el.querySelector('.faq-trigger');
  var answer = el.querySelector('.faq-answer');
  var chevron = el.querySelector('.faq-chevron');
  if (btn && answer) {
    answer.classList.remove('hidden');
    if (chevron) chevron.style.transform = 'rotate(180deg)';
    btn.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(function() {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
})();

// Search
var searchInput = document.getElementById('faq-search');
if (searchInput) {
  searchInput.addEventListener('input', function() {
    var q = this.value.trim().toLowerCase();
    var anyVisible = false;
    document.querySelectorAll('.faq-category').forEach(function(section) {
      var items = section.querySelectorAll('.faq-item');
      var catVisible = false;
      items.forEach(function(item) {
        var show = !q ||
          item.dataset.question.includes(q) ||
          item.dataset.answer.includes(q);
        item.style.display = show ? '' : 'none';
        if (show) catVisible = true;
      });
      section.style.display = catVisible ? '' : 'none';
      if (catVisible) anyVisible = true;
    });
    var noResults = document.getElementById('faq-no-results');
    if (noResults) noResults.classList.toggle('hidden', anyVisible);
  });
}

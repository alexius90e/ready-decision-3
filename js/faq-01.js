const faqItems = document.querySelectorAll('.faq-01__item');

function toggleFaqItem(item) {
  const panel = item.querySelector('.faq-01__item-panel');
  if (!panel) return;

  const isOpen = panel.style.maxHeight;

  if (isOpen) {
    panel.style.maxHeight = null;
    item.classList.remove('active');
  } else {
    panel.style.maxHeight = panel.scrollHeight + 'px';
    item.classList.add('active');
  }
}

function updateFaqItemHeight(item) {
  const panel = item.querySelector('.faq-01__item-panel');
  if (!panel) return;

  if (item.classList.contains('active')) {
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }
}

if (faqItems.length > 0) {
  toggleFaqItem(faqItems[0]);
}

faqItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    const isToggler = event.target.classList.contains('faq-01__item-toggler');
    if (isToggler) {
      toggleFaqItem(item);
    }
  });
});

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    faqItems.forEach((item) => updateFaqItemHeight(item));
  }, 200);
});

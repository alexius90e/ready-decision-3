const faq01Items = document.querySelectorAll('.faq-01__item');

function updateFaq01Item(faq01Item) {
  const panel = faq01Item.querySelector('.faq-01__item-panel');
  if (panel) {
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      faq01Item.classList.remove('active');
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
      faq01Item.classList.add('active');
    }
  }
}

function updateFaq01ItemHeight(faq01Item) {
  const panel = faq01Item.querySelector('.faq-01__item-panel');

  if (panel) {
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }
}

faq01Items.forEach((faq01Item, index) => {
  if (index === 0) {
    faq01Item.classList.add('active');
    updateFaq01Item(faq01Item);
  }

  faq01Item.addEventListener('click', (event) => {
    const isToggler = event.target.classList.contains('faq-01__item-toggler');
    const isActive = event.currentTarget.classList.contains('active');

    if (isToggler) {
      updateFaq01Item(faq01Item);
    }
  });
});

window.addEventListener('resize', () => {
  faq01Items.forEach((faq01Item) => {
    const isActive = faq01Item.classList.contains('active');
    if (isActive) updateFaq01ItemHeight(faq01Item);
  });
});

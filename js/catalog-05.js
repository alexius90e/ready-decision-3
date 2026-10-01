const catalog05CasesBlock = document.querySelector('.catalog-05__cases');
const catalog05Cards = document.querySelectorAll('.catalog-05__card');
const catalog05NavButtons = document.querySelectorAll('.catalog-05__nav-button');

function initMasonry() {
  const casesBlock = document.querySelector('.catalog-05__cases');
  if (!casesBlock) return;

  const masonryBlock = document.createElement('div');
  masonryBlock.className = 'catalog-05__masonry';
  masonryBlock.innerHTML = `
        <div class="catalog-05__masonry-left"></div>
        <div class="catalog-05__masonry-right"></div>
    `;
  casesBlock.before(masonryBlock);
}

function updateCatalog05Cards(category) {
  const casesBlock = document.querySelector('.catalog-05__cases');
  const masonryLeft = document.querySelector('.catalog-05__masonry-left');
  const masonryRight = document.querySelector('.catalog-05__masonry-right');

  if (!casesBlock || !masonryLeft || !masonryRight) return;

  const allCards = [...casesBlock.querySelectorAll('[data-category]')];

  const filtered = category ? allCards.filter((c) => c.dataset.category === category) : allCards;

  allCards.forEach((card) => {
    card.classList.toggle('hidden', !filtered.includes(card));
  });

  masonryLeft.innerHTML = '';
  masonryRight.innerHTML = '';

  filtered.forEach((card, index) => {
    const clone = card.cloneNode(true);
    clone.classList.remove('hidden');
    (index % 2 === 0 ? masonryLeft : masonryRight).appendChild(clone);
  });
}

(function initCatalog05Cards(categoryName = '') {
  catalog05NavButtons.forEach((button) => {
    if (button.dataset.target === categoryName) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
  initMasonry();
  updateCatalog05Cards(categoryName);
})();

catalog05NavButtons.forEach((navButton) => {
  navButton.addEventListener('click', (event) => {
    catalog05NavButtons.forEach((button) => {
      if (button === event.currentTarget) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
    const categoryName = event.currentTarget.dataset.target;
    if (categoryName !== undefined) updateCatalog05Cards(categoryName);
  });
});

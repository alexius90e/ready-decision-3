const catalogSearch01CardEls = document.querySelectorAll('.catalog-search-01__card');
const catalogSearch01MoreButtonEl = document.querySelector(
  '.catalog-search-01__more-button',
);

if (catalogSearch01CardEls) {
  catalogSearch01MoreButtonEl.addEventListener('click', () => {
    catalogSearch01CardEls.forEach((el) => el.classList.remove('hidden'));
  });
}

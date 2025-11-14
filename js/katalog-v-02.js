function adjustKatalogV02CategoriesWidth() {
  const windowWidth = window.innerWidth;
  const windowWidthLimit = 992;
  const list = document.querySelector('.katalog-v-02__categories-list');
  const wrapper = list.parentElement;
  const gapWidth = 16;
  const firstLineItems = [];
  const secondLineItems = [];
  let halfItemsWidth = 0;

  if (windowWidth > windowWidthLimit) {
    list.style.width = null;
    return;
  }

  const items = Array.from(list.children);

  const listItemsMaxWidth = items
    .map((item) => Math.ceil(item.offsetWidth))
    .reduce((item, acc) => item + acc, 0);

  items.forEach((item) => {
    if (halfItemsWidth < listItemsMaxWidth / 2) {
      firstLineItems.push(item);
      halfItemsWidth += item.offsetWidth;
    } else {
      secondLineItems.push(item);
    }
  });

  const firstLineItemsWidth = firstLineItems
    .map((item) => item.offsetWidth)
    .reduce((item, acc) => item + acc, 0);

  const firstLineFullWidth = firstLineItemsWidth + gapWidth * (firstLineItems.length - 1);

  const secondLineItemsWidth = secondLineItems
    .map((item) => item.offsetWidth)
    .reduce((item, acc) => item + acc, 0);

  const secondLineFullWidth = secondLineItemsWidth + gapWidth * (secondLineItems.length - 1);

  if (wrapper.offsetWidth > secondLineFullWidth && wrapper.offsetWidth > firstLineFullWidth) {
    list.style.width = `${wrapper.offsetWidth}px`;
  } else {
    list.style.width = `${firstLineFullWidth}px`;
  }
}

window.addEventListener('load', adjustKatalogV02CategoriesWidth);
window.addEventListener('resize', adjustKatalogV02CategoriesWidth);

const katalogV02CatalogProductEls = document.querySelectorAll('.katalog-v-02__catalog-product');
const katalogV02MoreButtonEl = document.querySelector('.katalog-v-02__catalog-more-button');

if (katalogV02MoreButtonEl) {
  katalogV02MoreButtonEl.addEventListener('click', () => {
    katalogV02CatalogProductEls.forEach((el) => el.classList.remove('hidden'));
  });
}

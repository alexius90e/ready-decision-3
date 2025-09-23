function adjustKatalogV1CategoriesWidth() {
  const list = document.querySelector('.katalog-v-1__categories-list');
  const wrapper = list.parentElement;
  const gapWidth = 16;
  const firstLineItems = [];
  const secondLineItems = [];
  let halfItemsWidth = 0;

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

window.addEventListener('load', adjustKatalogV1CategoriesWidth);
window.addEventListener('resize', adjustKatalogV1CategoriesWidth);

const katalogV1ModalProposal = document.querySelector('.katalog-v-1__modal-proposal');
const katalogV1ModalProposalForm = document.querySelector('.katalog-v-1__modal-proposal-form');
const katalogV1ModalProposalButtons = document.querySelectorAll(
  '.katalog-v-1__catalog-product-order-button '
);

if (katalogV1ModalProposal && katalogV1ModalProposalForm) {
  katalogV1ModalProposalButtons.forEach((button) => {
    button.addEventListener('click', () => {
      katalogV1ModalProposal.classList.add('active');
    });
  });

  katalogV1ModalProposal.addEventListener('click', (event) => {
    const isLayout = event.currentTarget === event.target;
    const isClose = event.target.classList.contains('katalog-v-1__modal-proposal-close-button');
    if (isLayout || isClose) katalogV1ModalProposal.classList.remove('active');
  });

  katalogV1ModalProposalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    katalogV1ModalProposal.classList.remove('active');
  });
}

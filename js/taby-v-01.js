function adjustTabyV1CategoriesWidth() {
  const windowWidth = window.innerWidth;
  const windowWidthLimit = 992;
  const list = document.querySelector('.taby-v-01__buttons-list');
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

window.addEventListener('load', adjustTabyV1CategoriesWidth);
window.addEventListener('resize', adjustTabyV1CategoriesWidth);

const tabyV01Buttons = document.querySelectorAll('.taby-v-01__buttons-list-item');

tabyV01Buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    activateTab(event.currentTarget);
  });
});

function activateTab(tabButton) {
  if (tabButton) {
    const targetTabName = tabButton.dataset.tab;
    const targetTab = document.querySelector(`.taby-v-01__tabs-item[data-tab="${targetTabName}"]`);

    if (targetTab) {
      const buttons = document.querySelectorAll('.taby-v-01__buttons-list-item');
      const tabs = document.querySelectorAll('.taby-v-01__tabs-item');
      [...buttons, ...tabs].forEach((item) => item.classList.remove('active'));
      tabButton.classList.add('active');
      targetTab.classList.add('active');
    }
  }
}

if (tabyV01Buttons[0]) activateTab(tabyV01Buttons[0]);

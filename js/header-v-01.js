const headerBurger = document.querySelector('.header-v-01__top-burger-button');
const headerCatalogBurger = document.querySelector('.header-v-01__bottom-nav-menu-item-burger');
const headerMenu = document.querySelector('.header-v-01__menu');

if (headerBurger && headerMenu && headerCatalogBurger) {
  const burgerButtons = [headerBurger, headerCatalogBurger];

  burgerButtons.forEach((button, _index, array) => {
    button.addEventListener('click', (event) => {
      const isActive = event.currentTarget.classList.contains('active');

      if (isActive) {
        array.forEach((button) => button.classList.remove('active'));
        headerMenu.classList.remove('active');
      } else {
        array.forEach((button) => button.classList.add('active'));
        headerMenu.classList.add('active');
      }
    });
  });
}

const headerLists = document.querySelectorAll('.header-v-01__menu-list');

headerLists.forEach((list) => {
  list.addEventListener('click', (event) => {
    const isListActive = event.currentTarget.classList.contains('active');
    const isMoreBtn = event.target.classList.contains('header-v-01__menu-list-more-button');

    if (isMoreBtn) {
      event.target.innerText = isListActive ? 'Еще...' : 'Скрыть';

      if (isListActive) {
        event.currentTarget.classList.remove('active');
      } else {
        event.currentTarget.classList.add('active');
      }
    }
  });
});

const headerMobileNavItems = document.querySelectorAll('.header-v-01__menu-mobile-nav-item');
const headerMenuContent = document.querySelector('.header-v-01__menu-content');

headerMobileNavItems.forEach((mobileNavItem) => {
  mobileNavItem.addEventListener('click', (event) => {
    const isTitle = event.target.classList.contains('header-v-01__menu-mobile-nav-item-title');
    const isTitleLink = event.target.classList.contains(
      'header-v-01__menu-mobile-nav-item-title-link'
    );
    const isMoreBtn = event.target.classList.contains(
      'header-v-01__menu-mobile-nav-item-more-button'
    );
    const isBackBtn = event.target.classList.contains(
      'header-v-01__menu-mobile-nav-item-back-button'
    );
    const detailsEl = event.currentTarget.querySelector(
      '.header-v-01__menu-mobile-nav-item-details'
    );

    if (isMoreBtn) {
      event.currentTarget.classList.add('active');
      if (headerMenuContent) headerMenuContent.scrollTop = 0;
    }

    if (isTitle) {
      if (detailsEl !== null) {
        event.currentTarget.classList.add('active');
        if (headerMenuContent) headerMenuContent.scrollTop = 0;
      }
    }

    if (isTitleLink) {
      if (headerBurger && headerMenu) {
        headerBurger.classList.remove('active');
        headerMenu.classList.remove('active');
      }
    }

    if (isBackBtn) event.currentTarget.classList.remove('active');
  });
});

////

const headerModal = document.querySelector('.header-v-01__modal');
const headerModalForm = document.querySelector('.header-v-01__modal-form');
const headerCallbackButtons = document.querySelectorAll(
  '.header-v-01__top-contacts-callback-button'
);
const headerCallbackMobButtons = document.querySelectorAll(
  '.header-v-01__menu-mobile-contacts-callback-button'
);
const headerContactButtons = [...headerCallbackButtons, ...headerCallbackMobButtons];

if (headerModal && headerModalForm) {
  headerContactButtons.forEach((button) => {
    button.addEventListener('click', () => {
      headerModal.classList.add('active');
    });
  });

  headerModal.addEventListener('click', (event) => {
    const isLayout = event.currentTarget === event.target;
    const isClose = event.target.classList.contains('header-v-01__modal-close-button');
    if (isLayout || isClose) headerModal.classList.remove('active');
  });

  headerModalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    headerModal.classList.remove('active');
  });
}

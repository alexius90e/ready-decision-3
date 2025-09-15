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
        document.body.style.overflow = null;
      } else {
        array.forEach((button) => button.classList.add('active'));
        headerMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  headerMenu.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      headerMenu.classList.remove('active');
      burgerButtons.forEach((button) => button.classList.remove('active'));
      document.body.style.overflow = null;
    }
  });
}

const headerDesktopMenuItems = document.querySelectorAll('.header-v-01__menu-desktop-menu-item');
const headerDesktopMenuLinks = document.querySelector('.header-v-01__menu-desktop-links');

headerDesktopMenuItems.forEach((item) => {
  item.addEventListener('pointerover', (event) => {
    const currentTarget = event.currentTarget;
    const submenu = currentTarget.querySelector('.header-v-01__menu-desktop-menu-item-submenu');
    headerDesktopMenuItems.forEach((item) => item.classList.remove('active'));
    currentTarget.classList.add('active');

    if (headerDesktopMenuLinks) {
      if (submenu) {
        const clone = submenu.cloneNode(true);
        headerDesktopMenuLinks.innerHTML = '';
        headerDesktopMenuLinks.appendChild(clone);
      } else {
        headerDesktopMenuLinks.innerHTML = '';
      }
    }
  });
});

const headerMobileNavItems = document.querySelectorAll('.header-v-01__menu-mobile-nav-item');
const headerMenuContent = document.querySelector('.header-v-01__menu-content');

headerMobileNavItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    const backBtnClassName = 'header-v-01__menu-mobile-nav-item-back-button';
    const titleClassName = 'header-v-01__menu-mobile-nav-item-title';
    const moreClassName = 'header-v-01__menu-mobile-nav-item-more-button';
    const isBackBtn = event.target.classList.contains(backBtnClassName);
    const isTitle = event.target.classList.contains(titleClassName);
    const isMoreBtn = event.target.classList.contains(moreClassName);

    if (isMoreBtn || isTitle) {
      event.currentTarget.classList.add('active');
      if (headerMenuContent) headerMenuContent.scrollTop = 0;
    }

    if (isBackBtn) event.currentTarget.classList.remove('active');
  });
});

//// Modal

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

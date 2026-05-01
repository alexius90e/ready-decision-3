const headerV04 = document.querySelector('.header-v-04');
const headerV04Burger = document.querySelector('.header-v-04__top-burger-button');
const headerV04CatalogBurger = document.querySelector('.header-v-04__bottom-nav-menu-item-burger');
const headerV04Menu = document.querySelector('.header-v-04__menu');

const scrollLimit = 200;

const minScrollStep = 20;

let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll < lastScroll && lastScroll - currentScroll > minScrollStep) {
    headerV04.classList.remove('hidden');
  } else if (currentScroll > lastScroll && currentScroll > scrollLimit) {
    if (!headerV04Menu.classList.contains('active')) {
      headerV04.classList.add('hidden');
    }
  } else if (currentScroll < scrollLimit) {
    headerV04.classList.remove('hidden');
  }

  lastScroll = currentScroll;
});

if (headerV04Burger && headerV04Menu && headerV04CatalogBurger) {
  const burgerButtons = [headerV04Burger, headerV04CatalogBurger];

  burgerButtons.forEach((button, _index, array) => {
    button.addEventListener('click', (event) => {
      const isActive = event.currentTarget.classList.contains('active');

      if (isActive) {
        array.forEach((button) => button.classList.remove('active'));
        headerV04Menu.classList.remove('active');
        document.body.classList.remove('hidden');
      } else {
        array.forEach((button) => button.classList.add('active'));
        headerV04Menu.classList.add('active');
        document.body.classList.add('hidden');
      }
    });
  });

  headerV04Menu.addEventListener('click', (event) => {
    const isLayout = event.target === event.currentTarget;

    if (isLayout) {
      headerV04Menu.classList.remove('active');
      burgerButtons.forEach((button) => button.classList.remove('active'));
      document.body.classList.remove('hidden');
    }
  });
}

const headerV04DesktopMenuItems = document.querySelectorAll('.header-v-04__menu-desktop-menu-item');
const headerV04DesktopMenuLinks = document.querySelector('.header-v-04__menu-desktop-links');

headerV04DesktopMenuItems.forEach((item) => {
  item.addEventListener('pointerover', (event) => {
    const currentTarget = event.currentTarget;
    const submenu = currentTarget.querySelector('.header-v-04__menu-desktop-menu-item-submenu');
    headerV04DesktopMenuItems.forEach((item) => item.classList.remove('active'));
    currentTarget.classList.add('active');

    if (headerV04DesktopMenuLinks) {
      if (submenu) {
        const clone = submenu.cloneNode(true);
        headerV04DesktopMenuLinks.innerHTML = '';
        headerV04DesktopMenuLinks.appendChild(clone);
      } else {
        headerV04DesktopMenuLinks.innerHTML = '';
      }
    }
  });
});

const headerV04MobileNavItems = document.querySelectorAll('.header-v-04__menu-mobile-nav-item');
const headerV04MenuContent = document.querySelector('.header-v-04__menu-content');

headerV04MobileNavItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    const backBtnClassName = 'header-v-04__menu-mobile-nav-item-back-button';
    const titleClassName = 'header-v-04__menu-mobile-nav-item-title';
    const moreClassName = 'header-v-04__menu-mobile-nav-item-more-button';
    const isBackBtn = event.target.classList.contains(backBtnClassName);
    const isTitle = event.target.classList.contains(titleClassName);
    const isMoreBtn = event.target.classList.contains(moreClassName);

    if (isMoreBtn || isTitle) {
      event.currentTarget.classList.add('active');
      if (headerV04MenuContent) headerV04MenuContent.scrollTop = 0;
    }

    if (isBackBtn) event.currentTarget.classList.remove('active');
  });
});

//// Modal

const headerV04Modal = document.querySelector('.header-v-04__modal');
const headerV04ModalForm = document.querySelector('.header-v-04__modal-form');
const headerV04CallbackButtons = document.querySelectorAll(
  '.header-v-04__top-contacts-callback-button'
);
const headerV04CallbackMobButtons = document.querySelectorAll(
  '.header-v-04__menu-mobile-contacts-callback-button'
);
const headerV04ContactButtons = [...headerV04CallbackButtons, ...headerV04CallbackMobButtons];

if (headerV04Modal && headerV04ModalForm) {
  headerV04ContactButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const isDisabled = event.currentTarget.classList.contains('prevent-default');
      if (!isDisabled) vidzhetSvV01Modal.classList.add('active');
    });
  });

  headerV04Modal.addEventListener('click', (event) => {
    const isLayout = event.currentTarget === event.target;
    const isClose = event.target.classList.contains('header-v-04__modal-close-button');
    if (isLayout || isClose) headerV04Modal.classList.remove('active');
  });

  headerV04ModalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    headerModal.classList.remove('active');
  });
}

const header04 = document.querySelector('.header-04');
const header04Burger = document.querySelector('.header-04__top-burger-button');
const header04CatalogBurger = document.querySelector('.header-04__bottom-nav-menu-item-burger');
const header04Menu = document.querySelector('.header-04__menu');

const scrollLimit = 200;

const minScrollStep = 20;

let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll < lastScroll && lastScroll - currentScroll > minScrollStep) {
    header04.classList.remove('hidden');
  } else if (currentScroll > lastScroll && currentScroll > scrollLimit) {
    if (!header04Menu.classList.contains('active')) {
      header04.classList.add('hidden');
    }
  } else if (currentScroll < scrollLimit) {
    header04.classList.remove('hidden');
  }

  lastScroll = currentScroll;
});

if (header04Burger && header04Menu && header04CatalogBurger) {
  const burgerButtons = [header04Burger, header04CatalogBurger];

  burgerButtons.forEach((button, _index, array) => {
    button.addEventListener('click', (event) => {
      const isActive = event.currentTarget.classList.contains('active');

      if (isActive) {
        array.forEach((button) => button.classList.remove('active'));
        header04Menu.classList.remove('active');
        document.body.classList.remove('hidden');
      } else {
        array.forEach((button) => button.classList.add('active'));
        header04Menu.classList.add('active');
        document.body.classList.add('hidden');
      }
    });
  });

  header04Menu.addEventListener('click', (event) => {
    const isLayout = event.target === event.currentTarget;

    if (isLayout) {
      header04Menu.classList.remove('active');
      burgerButtons.forEach((button) => button.classList.remove('active'));
      document.body.classList.remove('hidden');
    }
  });
}

const header04DesktopMenuItems = document.querySelectorAll('.header-04__menu-desktop-menu-item');
const header04DesktopMenuLinks = document.querySelector('.header-04__menu-desktop-links');

header04DesktopMenuItems.forEach((item) => {
  item.addEventListener('pointerover', (event) => {
    const currentTarget = event.currentTarget;
    const submenu = currentTarget.querySelector('.header-04__menu-desktop-menu-item-submenu');
    header04DesktopMenuItems.forEach((item) => item.classList.remove('active'));
    currentTarget.classList.add('active');

    if (header04DesktopMenuLinks) {
      if (submenu) {
        const clone = submenu.cloneNode(true);
        header04DesktopMenuLinks.innerHTML = '';
        header04DesktopMenuLinks.appendChild(clone);
      } else {
        header04DesktopMenuLinks.innerHTML = '';
      }
    }
  });
});

const header04MobileNavItems = document.querySelectorAll('.header-04__menu-mobile-nav-item');
const header04MenuContent = document.querySelector('.header-04__menu-content');

header04MobileNavItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    const backBtnClassName = 'header-04__menu-mobile-nav-item-back-button';
    const titleClassName = 'header-04__menu-mobile-nav-item-title';
    const moreClassName = 'header-04__menu-mobile-nav-item-more-button';
    const isBackBtn = event.target.classList.contains(backBtnClassName);
    const isTitle = event.target.classList.contains(titleClassName);
    const isMoreBtn = event.target.classList.contains(moreClassName);

    if (isMoreBtn || isTitle) {
      event.currentTarget.classList.add('active');
      if (header04MenuContent) header04MenuContent.scrollTop = 0;
    }

    if (isBackBtn) event.currentTarget.classList.remove('active');
  });
});

//// Modal

const header04Modal = document.querySelector('.header-04__modal');
const header04ModalForm = document.querySelector('.header-04__modal-form');
const header04CallbackButtons = document.querySelectorAll(
  '.header-04__top-contacts-callback-button'
);
const header04CallbackMobButtons = document.querySelectorAll(
  '.header-04__menu-mobile-contacts-callback-button'
);
const header04ContactButtons = [...header04CallbackButtons, ...header04CallbackMobButtons];

if (header04Modal && header04ModalForm) {
  header04ContactButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const isDisabled = event.currentTarget.classList.contains('prevent-default');
      if (!isDisabled) vidzhetSvV01Modal.classList.add('active');
    });
  });

  header04Modal.addEventListener('click', (event) => {
    const isLayout = event.currentTarget === event.target;
    const isClose = event.target.classList.contains('header-04__modal-close-button');
    if (isLayout || isClose) header04Modal.classList.remove('active');
  });

  header04ModalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    headerModal.classList.remove('active');
  });
}

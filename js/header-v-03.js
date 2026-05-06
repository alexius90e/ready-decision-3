const headerV03 = document.querySelector('.header-v-03');
const headerV03Burger = document.querySelector('.header-v-03__top-burger-button');
const headerV03CatalogBurger = document.querySelector('.header-v-03__bottom-nav-menu-item-burger');
const headerV03Menu = document.querySelector('.header-v-03__menu');



if (headerV03Burger && headerV03Menu && headerV03CatalogBurger) {
  const burgerButtons = [headerV03Burger, headerV03CatalogBurger];

  burgerButtons.forEach((button, _index, array) => {
    button.addEventListener('click', (event) => {
      const isActive = event.currentTarget.classList.contains('active');

      if (isActive) {
        array.forEach((button) => button.classList.remove('active'));
        headerV03Menu.classList.remove('active');
        document.body.classList.remove('hidden');
      } else {
        array.forEach((button) => button.classList.add('active'));
        headerV03Menu.classList.add('active');
        document.body.classList.add('hidden');
      }
    });
  });

  headerV03Menu.addEventListener('click', (event) => {
    const isLayout = event.target === event.currentTarget;

    if (isLayout) {
      headerV03Menu.classList.remove('active');
      burgerButtons.forEach((button) => button.classList.remove('active'));
      document.body.classList.remove('hidden');
    }
  });
}

const headerV03DesktopMenuItems = document.querySelectorAll('.header-v-03__menu-desktop-menu-item');
const headerV03DesktopMenuLinks = document.querySelector('.header-v-03__menu-desktop-links');

headerV03DesktopMenuItems.forEach((item) => {
  item.addEventListener('pointerover', (event) => {
    const currentTarget = event.currentTarget;
    const submenu = currentTarget.querySelector('.header-v-03__menu-desktop-menu-item-submenu');
    headerV03DesktopMenuItems.forEach((item) => item.classList.remove('active'));
    currentTarget.classList.add('active');

    if (headerV03DesktopMenuLinks) {
      if (submenu) {
        const clone = submenu.cloneNode(true);
        headerV03DesktopMenuLinks.innerHTML = '';
        headerV03DesktopMenuLinks.appendChild(clone);
      } else {
        headerV03DesktopMenuLinks.innerHTML = '';
      }
    }
  });
});

const headerV03MobileNavItems = document.querySelectorAll('.header-v-03__menu-mobile-nav-item');
const headerV03MenuContent = document.querySelector('.header-v-03__menu-content');

headerV03MobileNavItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    const backBtnClassName = 'header-v-03__menu-mobile-nav-item-back-button';
    const titleClassName = 'header-v-03__menu-mobile-nav-item-title';
    const moreClassName = 'header-v-03__menu-mobile-nav-item-more-button';
    const isBackBtn = event.target.classList.contains(backBtnClassName);
    const isTitle = event.target.classList.contains(titleClassName);
    const isMoreBtn = event.target.classList.contains(moreClassName);

    if (isMoreBtn || isTitle) {
      event.currentTarget.classList.add('active');
      if (headerV03MenuContent) headerV03MenuContent.scrollTop = 0;
    }

    if (isBackBtn) event.currentTarget.classList.remove('active');
  });
});

//// Modal

const headerV03Modal = document.querySelector('.header-v-03__modal');
const headerV03ModalForm = document.querySelector('.header-v-03__modal-form');
const headerV03CallbackButtons = document.querySelectorAll(
  '.header-v-03__top-contacts-callback-button',
);
const headerV03CallbackMobButtons = document.querySelectorAll(
  '.header-v-03__menu-mobile-contacts-callback-button',
);
const headerV03ContactButtons = [...headerV03CallbackButtons, ...headerV03CallbackMobButtons];

if (headerV03Modal && headerV03ModalForm) {
  headerV03ContactButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const isDisabled = event.currentTarget.classList.contains('prevent-default');
      if (!isDisabled) vidzhetSvV01Modal.classList.add('active');
    });
  });

  headerV03Modal.addEventListener('click', (event) => {
    const isLayout = event.currentTarget === event.target;
    const isClose = event.target.classList.contains('header-v-03__modal-close-button');
    if (isLayout || isClose) headerV03Modal.classList.remove('active');
  });

  headerV03ModalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    headerV03Modal.classList.remove('active');
  });
}

// Search

const headerV03Search = document.querySelector('.header-v-03__top-search');

if (headerV03Search) {
  headerV03Search.addEventListener('click', (event) => {
    const isLayout = event.target === event.currentTarget;
    const isToggleBtn = event.target.classList.contains('header-v-03__top-search-toggler-button');
    const isCancelBtn = event.target.classList.contains('header-v-03__search-cancel-button');
    if (isLayout || isCancelBtn) event.currentTarget.classList.remove('active');
    if (isToggleBtn) event.currentTarget.classList.add('active');
  });
}

const headerV03SearchInputField = document.querySelector('.header-v-03__search-input');
const headerV03SearchResetButton = document.querySelector('.header-v-03__search-reset');
const headerV03SearchResults = document.querySelector('.header-v-03__search-results');

if (headerV03SearchInputField && headerV03SearchResetButton && headerV03SearchResults) {
  const toggleHeaderV03SearchButton = () => {
    const hasText = headerV03SearchInputField.value.length > 0;
    if (hasText) {
      headerV03SearchResetButton.classList.add('active');
      headerV03SearchResults.classList.add('active');
    } else {
      headerV03SearchResetButton.classList.remove('active');
      headerV03SearchResults.classList.remove('active');
    }
  };

  headerV03SearchInputField.addEventListener('input', toggleHeaderV03SearchButton);

  const handleReset = () => {
    headerV03SearchInputField.value = '';
    headerV03SearchResetButton.classList.remove('active');
    headerV03SearchResults.classList.remove('active');
    headerV03SearchInputField.focus();
    toggleHeaderV03SearchButton();
  };

  headerV03SearchResetButton.addEventListener('click', handleReset);

  const handleResultsClick = () => {
    headerV03SearchResults.classList.remove('active');
  };

  headerV03SearchResults.addEventListener('click', handleResultsClick);

  toggleHeaderV03SearchButton();
}

const scrollLimit = 200;

const minScrollStep = 20;

let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll < lastScroll && lastScroll - currentScroll > minScrollStep) {
    headerV03.classList.remove('hidden');
  } else if (currentScroll > lastScroll && currentScroll > scrollLimit) {
    if (!headerV03Menu.classList.contains('active')) {
      headerV03.classList.add('hidden');
      if (headerV03SearchResults) headerV03SearchResults.classList.remove('active');
    }
  } else if (currentScroll < scrollLimit) {
    headerV03.classList.remove('hidden');
  }

  lastScroll = currentScroll;
});

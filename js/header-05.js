const header05 = document.querySelector('.header-05');
const header05Burger = document.querySelector('.header-05__main-actions-burger-button');
const header05CatalogBurger = document.querySelector('.header-05__main-nav-menu-item-burger');
const header05Menu = document.querySelector('.header-05__menu');

if (header05Burger && header05Menu && header05CatalogBurger) {
  const burgerButtons = [header05Burger, header05CatalogBurger];
  const body = document.body;

  const openMenu = () => {
    burgerButtons.forEach((btn) => btn.classList.add('active'));
    header05Menu.classList.add('active');
    body.classList.add('hidden');
  };

  const closeMenu = () => {
    burgerButtons.forEach((btn) => btn.classList.remove('active'));
    header05Menu.classList.remove('active');
    body.classList.remove('hidden');
  };

  burgerButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const isMenuOpen = header05Menu.classList.contains('active');
      if (isMenuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  });

  header05Menu.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closeMenu();
    }
  });
}

// hidden menu on scroll

if (header05 && header05Menu) {
  const SCROLL_LIMIT = 200;
  const MIN_SCROLL_STEP = 20;
  let lastScrollY = 0;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;
    const isScrollingUp = scrollDelta < 0;
    const isPastLimit = currentScrollY > SCROLL_LIMIT;
    const isMenuActive = header05Menu.classList.contains('active');

    let shouldHide = false;

    if (currentScrollY < SCROLL_LIMIT) {
      shouldHide = false;
    } else if (isScrollingUp && Math.abs(scrollDelta) > MIN_SCROLL_STEP) {
      shouldHide = false;
    } else if (!isScrollingUp && isPastLimit && !isMenuActive) {
      shouldHide = true;
    } else {
    }

    if (shouldHide) {
      header05.classList.add('hidden');
    } else {
      header05.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', handleScroll);
}

// catalog items

const header05MenuCatalogItems = document.querySelectorAll('.header-05__menu-catalog-item');

if (header05MenuCatalogItems.length > 0) {
  header05MenuCatalogItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      const isToggler = event.target.classList.contains('.header-05__menu-catalog-item-toggler');
      const panel = event.currentTarget.querySelector('.header-05__menu-catalog-item-panel');

      if (panel) {
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
          event.currentTarget.classList.remove('active');
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
          event.currentTarget.classList.add('active');
        }
      }
    });
  });

  function updateActivePanelsMaxHeight() {
    console.log('updateActivePanelsMaxHeight');

    header05MenuCatalogItems.forEach((item) => {
      if (item.classList.contains('active')) {
        const panel = item.querySelector('.header-05__menu-catalog-item-panel');
        if (panel && panel.style.maxHeight) {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      }
    });
  }

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateActivePanelsMaxHeight();
    }, 50);
  });
}

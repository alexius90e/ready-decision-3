const header06 = document.querySelector('.header-06');
const header06Burger = document.querySelector('.header-06__top-burger-button');
const header06Menu = document.querySelector('.header-06__menu');

const scrollLimit = 200;

const minScrollStep = 20;

let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll < lastScroll && lastScroll - currentScroll > minScrollStep) {
    header06.classList.remove('hidden');
  } else if (currentScroll > lastScroll && currentScroll > scrollLimit) {
    if (!header06Menu.classList.contains('active')) {
      header06.classList.add('hidden');
    }
  } else if (currentScroll < scrollLimit) {
    header06.classList.remove('hidden');
  }

  lastScroll = currentScroll;
});

if (header06Burger && header06Menu) {
  const burgerButtons = [header06Burger];

  burgerButtons.forEach((button, _index, array) => {
    button.addEventListener('click', (event) => {
      const isActive = event.currentTarget.classList.contains('active');

      if (isActive) {
        array.forEach((button) => button.classList.remove('active'));
        header06Menu.classList.remove('active');
        document.body.classList.remove('hidden');
      } else {
        array.forEach((button) => button.classList.add('active'));
        header06Menu.classList.add('active');
        document.body.classList.add('hidden');
      }
    });
  });

  header06Menu.addEventListener('click', (event) => {
    const isLayout = event.target === event.currentTarget;

    if (isLayout) {
      header06Menu.classList.remove('active');
      burgerButtons.forEach((button) => button.classList.remove('active'));
      document.body.classList.remove('hidden');
    }
  });
}

const header06DesktopMenuItems = document.querySelectorAll('.header-06__menu-desktop-menu-item');
const header06DesktopMenuLinks = document.querySelector('.header-06__menu-desktop-links');

header06DesktopMenuItems.forEach((item) => {
  item.addEventListener('pointerover', (event) => {
    const currentTarget = event.currentTarget;
    const submenu = currentTarget.querySelector('.header-06__menu-desktop-menu-item-submenu');
    header06DesktopMenuItems.forEach((item) => item.classList.remove('active'));
    currentTarget.classList.add('active');

    if (header06DesktopMenuLinks) {
      if (submenu) {
        const clone = submenu.cloneNode(true);
        header06DesktopMenuLinks.innerHTML = '';
        header06DesktopMenuLinks.appendChild(clone);
      } else {
        header06DesktopMenuLinks.innerHTML = '';
      }
    }
  });
});

const header06MobileNavItems = document.querySelectorAll('.header-06__menu-mobile-nav-item');
const header06MenuContent = document.querySelector('.header-06__menu-content');

header06MobileNavItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    const backBtnClassName = 'header-06__menu-mobile-nav-item-back-button';
    const titleClassName = 'header-06__menu-mobile-nav-item-title';
    const moreClassName = 'header-06__menu-mobile-nav-item-more-button';
    const isBackBtn = event.target.classList.contains(backBtnClassName);
    const isTitle = event.target.classList.contains(titleClassName);
    const isMoreBtn = event.target.classList.contains(moreClassName);

    if (isMoreBtn || isTitle) {
      event.currentTarget.classList.add('active');
      if (header06MenuContent) header06MenuContent.scrollTop = 0;
    }

    if (isBackBtn) event.currentTarget.classList.remove('active');
  });
});

// header-06__top-menu-collapse

const header06CollapseEls = document.querySelectorAll('.header-06__top-menu-collapse');

header06CollapseEls.forEach((collapseEl) => {
  collapseEl.addEventListener('click', (event) => {
    const isLayout = event.target === event.currentTarget;
    const isMoreBtn = event.target.classList.contains('header-06__top-menu-collapse-more-button');
    const isMenuLink = event.target.classList.contains('header-06__top-menu-item-link');
    const isSubmenuLink = event.target.classList.contains(
      'header-06__top-menu-item-submenu-item-link',
    );

    if (isMoreBtn) {
      event.currentTarget.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else if (isLayout || isMenuLink || isSubmenuLink) {
      event.currentTarget.classList.remove('active');
      document.body.style.overflow = null;
    }
  });
});

// header-06__menu-nav-item

function toggleHeader06MenuNavItem(item) {
  const submenu = item.querySelector('.header-06__menu-nav-item-submenu');
  if (!submenu) return;

  const isOpen = submenu.style.maxHeight;

  if (isOpen) {
    submenu.style.maxHeight = null;
    item.classList.remove('active');
  } else {
    submenu.style.maxHeight = submenu.scrollHeight + 'px';
    item.classList.add('active');
  }
}

function updateHeader06MenuNavItemHeight(item) {
  const submenu = item.querySelector('.header-06__menu-nav-item-submenu');
  if (!submenu) return;

  if (item.classList.contains('active')) {
    submenu.style.maxHeight = submenu.scrollHeight + 'px';
  }
}

const header06MenuNavItemEls = document.querySelectorAll('.header-06__menu-nav-item');

header06MenuNavItemEls.forEach((header06MenuNavItemEl) => {
  updateHeader06MenuNavItemHeight(header06MenuNavItemEl);

  header06MenuNavItemEl.addEventListener('click', (event) => {
    const isMoreBtn = event.target.classList.contains('header-06__menu-nav-item-title-more-button');

    if (isMoreBtn) {
      toggleHeader06MenuNavItem(event.currentTarget);
    }
  });
});

let header06ResizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(header06ResizeTimer);
  header06ResizeTimer = setTimeout(() => {
    header06MenuNavItemEls.forEach((item) => updateHeader06MenuNavItemHeight(item));
  }, 100);
});

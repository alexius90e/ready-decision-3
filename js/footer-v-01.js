const footerMobileMenuItems = document.querySelectorAll('.footer-v-01__top-nav-mobile-menu-item');

footerMobileMenuItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    const isLayout = event.target === event.currentTarget;
    const submenu = event.currentTarget.querySelector(
      '.footer-v-01__top-nav-mobile-menu-item-submenu'
    );

    if (isLayout && submenu) {
      if (submenu.style.maxHeight) {
        submenu.style.maxHeight = null;
        event.currentTarget.classList.remove('active');
      } else {
        submenu.style.maxHeight = submenu.scrollHeight + 'px';
        event.currentTarget.classList.add('active');
      }
    }
  });
});

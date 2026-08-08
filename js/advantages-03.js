const advantages03SwiperEl = document.querySelector('.advantages-03 .swiper');

if (advantages03SwiperEl) {
  const advantages03Swiper = new Swiper(advantages03SwiperEl, {
    breakpoints: {
      300: {
        slidesPerView: 'auto',
        spaceBetween: 24,
        allowTouchMove: true,
      },
      993: {
        slidesPerView: 4,
        spaceBetween: 0,
        allowTouchMove: false,
      },
    },
  });
}

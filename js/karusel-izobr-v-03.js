const etapyV01SwiperEl = document.querySelector('.karusel-izobr-v-03 .swiper');

if (etapyV01SwiperEl) {
  const swiper = new Swiper(etapyV01SwiperEl, {
    slidesPerView: 'auto',
    spaceBetween: 16,
    loop: true,
    breakpoints: {
      0: {
        spaceBetween: 16,
      },
      769: {
        spaceBetween: 20,
      },
      1201: {
        spaceBetween: 30,
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

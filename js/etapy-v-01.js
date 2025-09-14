const etapyV01SwiperEl = document.querySelector('.etapy-v-01 .swiper');

if (etapyV01SwiperEl) {
  const swiper = new Swiper(etapyV01SwiperEl, {
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
      0: {
        slidesPerView: 'auto',
      },
      993: {
        slidesPerView: 3,
      },
      1201: {
        slidesPerView: 4,
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

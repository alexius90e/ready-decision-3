const karuselIzobrV01SwiperEl = document.querySelector('.karusel-izobr-v-04 .swiper');

if (karuselIzobrV01SwiperEl) {
  const swiper = new Swiper(karuselIzobrV01SwiperEl, {
    slidesPerView: 'auto',
    spaceBetween: 16,
    breakpoints: {
      0: {
        spaceBetween: 16,
      },
      320: {
        spaceBetween: 16,
      },
      1201: {
        spaceBetween: 20,
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

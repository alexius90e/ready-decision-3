const karuselIzobrV06SwiperEl = document.querySelector('.karusel-izobr-v-06 .swiper');

if (karuselIzobrV06SwiperEl) {
  const swiper = new Swiper(karuselIzobrV06SwiperEl, {
    slidesPerView: 'auto',
    spaceBetween: 16,
    loop: true,
    breakpoints: {
      0: {
        spaceBetween: 12,
      },
      320: {
        spaceBetween: 12,
      },
      769: {
        spaceBetween: 20,
      },
      1501: {
        spaceBetween: 30,
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

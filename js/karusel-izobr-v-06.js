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
      993: {
        spaceBetween: 20,
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

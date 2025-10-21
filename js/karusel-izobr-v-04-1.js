const karuselIzobrV041SwiperEl = document.querySelector('.karusel-izobr-v-04-1 .swiper');

if (karuselIzobrV041SwiperEl) {
  const swiper = new Swiper(karuselIzobrV041SwiperEl, {
    slidesPerView: 'auto',
    spaceBetween: 16,
    loop: true,
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
    autoplay: {
      delay: 1000,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

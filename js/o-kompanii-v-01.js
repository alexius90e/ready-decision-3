const oKompaniiV01SwiperEl = document.querySelector('.o-kompanii-v-01 .swiper');

if (oKompaniiV01SwiperEl) {
  const swiper = new Swiper(oKompaniiV01SwiperEl, {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

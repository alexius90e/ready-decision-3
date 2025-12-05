const oKompaniiV02SwiperEl = document.querySelector('.o-kompanii-v-02 .swiper');

if (oKompaniiV02SwiperEl) {
  const swiper = new Swiper(oKompaniiV02SwiperEl, {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

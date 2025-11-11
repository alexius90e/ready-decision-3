const tabyV02SwiperEl = document.querySelector('.taby-v-02 .swiper');

if (tabyV02SwiperEl) {
  const tabyV02Swiper = new Swiper(tabyV02SwiperEl, {
    slidesPerView: 'auto',
    spaceBetween: 15,
    breakpoints: {
      320: {
        spaceBetween: 14,
      },
      1501: {
        spaceBetween: 16,
      },
    },
  });
}

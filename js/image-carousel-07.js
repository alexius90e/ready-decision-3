const imageCarousel07SwiperEl = document.querySelector('.image-carousel-07 .swiper');
const imageCarousel07SwiperPrevEl = document.querySelector(
  '.image-carousel-07 .image-carousel-07__slider-controls-button-prev',
);
const imageCarousel07SwiperNextEl = document.querySelector(
  '.image-carousel-07 .image-carousel-07__slider-controls-button-next',
);

if (imageCarousel07SwiperEl) {
  const swiper = new Swiper(imageCarousel07SwiperEl, {
    slidesPerView: 'auto',
    spaceBetween: 16,
    loop: true,
    loopAdditionalSlides: 1,
    initialSlide: 1,
    preloadImages: true,
    watchSlidesVisibility: true,
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
      prevEl: imageCarousel07SwiperPrevEl,
      nextEl: imageCarousel07SwiperNextEl,
    },
  });

  swiper.slidePrev(0);
}

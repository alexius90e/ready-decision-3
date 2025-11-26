const kartochkaTovaraV01SwiperEl = document.querySelector('.kartochka-tovara-v-01 .swiper');

const kartochkaTovaraV01ThumbsSwiperEl = document.querySelector(
  '.kartochka-tovara-v-01__slider-thumbs .swiper'
);
const kartochkaTovaraV01MainSwiperEl = document.querySelector(
  '.kartochka-tovara-v-01__slider-main .swiper'
);
const kartochkaTovaraV01MainSwiperPrevBtn = document.querySelector(
  '.kartochka-tovara-v-01__slider-prev'
);
const kartochkaTovaraV01MainSwiperNextBtn = document.querySelector(
  '.kartochka-tovara-v-01__slider-next'
);

if (kartochkaTovaraV01ThumbsSwiperEl && kartochkaTovaraV01MainSwiperEl) {
  const thumbsSwiper = new Swiper(kartochkaTovaraV01ThumbsSwiperEl, {
    spaceBetween: 10,
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesProgress: true,
    direction: 'horizontal',
    breakpoints: {
      320: {
        direction: 'horizontal',
      },
      481: {
        direction: 'horizontal',
      },
      769: {
        direction: 'vertical',
        slidesPerView: 'auto',
      },
    },
  });
  const mainSwiper = new Swiper(kartochkaTovaraV01MainSwiperEl, {
    spaceBetween: 10,
    slidesPerView: 1,
    autoHeight: true,
    navigation: {
      nextEl: kartochkaTovaraV01MainSwiperNextBtn,
      prevEl: kartochkaTovaraV01MainSwiperPrevBtn,
    },
    thumbs: {
      swiper: thumbsSwiper,
    },
  });
}

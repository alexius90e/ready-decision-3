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
    slidesPerView: 'auto',
    slidesOffsetBefore: 10,
    slidesOffsetAfter: 10,
    freeMode: false,
    watchSlidesProgress: true,
    direction: 'horizontal',
    centeredSlides: false,
    slideToClickedSlide: false,
    speed: 200,
    mousewheel: {
      invert: false,
    },
    breakpoints: {
      320: {
        slidesOffsetBefore: 10,
        slidesOffsetAfter: 10,
        direction: 'horizontal',
      },
      341: {
        direction: 'horizontal',
        slidesOffsetBefore: 15,
        slidesOffsetAfter: 15,
      },
      577: {
        direction: 'horizontal',
        slidesOffsetBefore: 20,
        slidesOffsetAfter: 20,
      },
      769: {
        direction: 'vertical',
        slidesPerView: 'auto',
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
      },
    },
  });

  const mainSwiper = new Swiper(kartochkaTovaraV01MainSwiperEl, {
    spaceBetween: 10,
    slidesPerView: 1,
    autoHeight: true,
    allowTouchMove: false,
    speed: 200,
    thumbs: {
      swiper: thumbsSwiper,
    },
  });


  kartochkaTovaraV01MainSwiperPrevBtn.addEventListener('click', () => {
    thumbsSwiper.slidePrev();
  });

  kartochkaTovaraV01MainSwiperNextBtn.addEventListener('click', () => {
    thumbsSwiper.slideNext();
  });
}

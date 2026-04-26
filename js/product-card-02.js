const productСard02SwiperEl = document.querySelector('.product-card-02 .swiper');

const productСard02ThumbsSwiperEl = document.querySelector(
  '.product-card-02__slider-thumbs .swiper',
);
const productСard02MainSwiperEl = document.querySelector('.product-card-02__slider-main .swiper');
const productСard02MainSwiperPrevBtn = document.querySelector('.product-card-02__slider-prev');
const productСard02MainSwiperNextBtn = document.querySelector('.product-card-02__slider-next');

if (productСard02ThumbsSwiperEl && productСard02MainSwiperEl) {
  const thumbsSwiper = new Swiper(productСard02ThumbsSwiperEl, {
    slidesPerView: 'auto',
    slidesOffsetBefore: 10,
    slidesOffsetAfter: 10,
    freeMode: true,
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
        slidesPerView: 'auto',
        slidesOffsetBefore: 10,
        slidesOffsetAfter: 10,
        direction: 'horizontal',
      },
      341: {
        slidesPerView: 'auto',
        direction: 'horizontal',
        slidesOffsetBefore: 15,
        slidesOffsetAfter: 15,
      },
      577: {
        slidesPerView: 'auto',
        direction: 'horizontal',
        slidesOffsetBefore: 20,
        slidesOffsetAfter: 20,
      },
      769: {
        direction: 'vertical',
        slidesPerView: 4,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
      },
    },
    on: {
      slideChangeTransitionEnd(swiper) {
        if (window.innerWidth > 767) {
          const slidesNumber = swiper.slides.length;
          const activeIndex = swiper.activeIndex;
          const slidesPerView = 4;

          console.log(slidesNumber, slidesPerView, activeIndex);

          if (slidesNumber - slidesPerView <= activeIndex) {
            swiper.slideTo(slidesNumber - 1);
          } else if (activeIndex === 0) {
            swiper.slideTo(0);
          }
        }
      },
    },
  });

  const mainSwiper = new Swiper(productСard02MainSwiperEl, {
    spaceBetween: 10,
    slidesPerView: 1,
    autoHeight: true,
    allowTouchMove: false,
    speed: 200,
    thumbs: {
      swiper: thumbsSwiper,
    },
  });

  productСard02MainSwiperPrevBtn.addEventListener('click', () => {
    thumbsSwiper.slidePrev();
  });

  productСard02MainSwiperNextBtn.addEventListener('click', () => {
    thumbsSwiper.slideNext();
  });
}

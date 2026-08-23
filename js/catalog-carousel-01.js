const catalogCarousel01SwiperEl = document.querySelector('.catalog-carousel-01 .swiper');
const catalogCarousel01SwiperPrevEl = document.querySelector(
  '.catalog-carousel-01 .catalog-carousel-01__slider-controls-button-prev',
);
const catalogCarousel01SwiperNextEl = document.querySelector(
  '.catalog-carousel-01 .catalog-carousel-01__slider-controls-button-next',
);

if (catalogCarousel01SwiperEl) {
  const swiper = new Swiper(catalogCarousel01SwiperEl, {
    slidesPerView: 'auto',
    spaceBetween: 24,
    loop: true,
    loopAdditionalSlides: 1,
    initialSlide: 1,
    preloadImages: true,
    watchSlidesVisibility: true,
    touchEventsTarget: 'container',
    navigation: {
      prevEl: catalogCarousel01SwiperPrevEl,
      nextEl: catalogCarousel01SwiperNextEl,
    },
  });
}

const catalogCarousel01Cards = document.querySelectorAll('.catalog-carousel-01__card');

catalogCarousel01Cards.forEach((card) => {
  const baseClassName = '.catalog-carousel-01__card';
  const mainSliderElem = card.querySelector(`${baseClassName}-main .swiper`);
  const thumbsSliderElem = card.querySelector(`${baseClassName}-thumbs .swiper`);

  if (mainSliderElem && thumbsSliderElem) {
    const thumbsSwiper = new Swiper(thumbsSliderElem, {
      loop: true,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
      allowTouchMove: false,
    });

    const mainSwiper = new Swiper(mainSliderElem, {
      spaceBetween: 20,
      allowTouchMove: false,
      slideToClickedSlide: true,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      speed: 700,
    });

    function updateThumbs(activeIndex, animate = true) {
      const slides = thumbsSliderElem.querySelectorAll('.swiper-slide');
      slides.forEach((slide) => {
        const idx = parseInt(slide.getAttribute('data-swiper-slide-index'));
        slide.classList.toggle('swiper-slide-thumb-active', idx === activeIndex);
      });
      const targetRealIndex = thumbsSwiper.slides.findIndex(
        (slide) => parseInt(slide.getAttribute('data-swiper-slide-index')) === activeIndex,
      );
      if (targetRealIndex !== -1) {
        thumbsSwiper.slideTo(targetRealIndex, animate ? 300 : 0);
      }
    }

    const thumbSlides = thumbsSliderElem.querySelectorAll('.swiper-slide');
    thumbSlides.forEach((thumbSlide) => {
      thumbSlide.addEventListener('click', function (e) {
        e.stopPropagation();

        const slideIndex = parseInt(this.getAttribute('data-swiper-slide-index'));
        if (slideIndex === mainSwiper.realIndex) return;

        updateThumbs(slideIndex, false);

        if (mainSwiper.animating) {
          mainSwiper.slideTo(mainSwiper.realIndex, 0, false);
        }
        mainSwiper.slideTo(slideIndex, mainSwiper.params.speed);
      });
    });

    mainSwiper.on('slideChange', function () {
      updateThumbs(this.realIndex, false);
    });

    mainSwiper.on('slideChangeTransitionEnd', function () {
      updateThumbs(this.realIndex, false);
    });

    updateThumbs(mainSwiper.realIndex, false);

    card.addEventListener('click', (event) => {
      if (event.target.closest('.catalog-carousel-01__card-thumbs')) return;

      const isFavButton = event.target.classList.contains(
        'catalog-carousel-01__card-favourites-button',
      );
      if (isFavButton) event.target.classList.toggle('active');

      const isPaymentMoreButton = event.target.classList.contains(
        'catalog-carousel-01__card-info-payment-more-button',
      );
      const moreEl = event.currentTarget.querySelector(
        '.catalog-carousel-01__card-info-payment-more',
      );

      if (moreEl) {
        if (isPaymentMoreButton) {
          moreEl.classList.add('active');
        } else if (event.target === moreEl) {
          moreEl.classList.remove('active');
        }
      }
    });
  }
});

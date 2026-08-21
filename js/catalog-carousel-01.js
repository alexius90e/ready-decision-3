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
      loop: true,
      allowTouchMove: false,
      slideToClickedSlide: true,
      thumbs: {
        swiper: thumbsSwiper,
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      speed: 1000,
    });
  }

  card.addEventListener('click', (event) => {
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
});

const catalog04Cards = document.querySelectorAll('.catalog-04__card');

catalog04Cards.forEach((card) => {
  const baseClassName = '.catalog-04__card';
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
      effect: 'fade',
      fadeEffect: { crossFade: true },
      speed: 400,
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
      const isFavButton = event.target.classList.contains('catalog-04__card-favourites-button');
      if (isFavButton) event.target.classList.toggle('active');

      const isPaymentMoreButton = event.target.classList.contains(
        'catalog-04__card-info-payment-more-button',
      );
      const moreEl = event.currentTarget.querySelector('.catalog-04__card-info-payment-more');

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

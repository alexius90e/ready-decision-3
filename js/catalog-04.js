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
      loop: true,
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
    const isFavButton = event.target.classList.contains('catalog-04__card-favourites-button');
    if (isFavButton) event.target.classList.toggle('active');

    const isPaymentMoreButton = event.target.classList.contains(
      'catalog-04__card-info-payment-more-button',
    );
    const moreEl = event.currentTarget.querySelector(
      '.catalog-04__card-info-payment-more',
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

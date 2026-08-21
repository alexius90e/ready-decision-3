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
    });
  }

  card.addEventListener('click', (event) => {
    const isFavButton = event.target.classList.contains(
      'catalog-04__card-favourites-button',
    );
    if (isFavButton) event.target.classList.toggle('active');
  });
});

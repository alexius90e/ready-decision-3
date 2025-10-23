const proektyV5CardSliders = document.querySelectorAll('.proekty-v-01__card-sliders');

proektyV5CardSliders.forEach((slidersElem) => {
  const baseClassName = '.proekty-v-01__card-sliders';
  const mainSliderElem = slidersElem.querySelector(`${baseClassName}-main .swiper`);
  const thumbsSliderElem = slidersElem.querySelector(`${baseClassName}-thumbs .swiper`);
  const mainSliderNext = slidersElem.querySelector(`${baseClassName}-main-controls-next`);
  const mainSliderPrev = slidersElem.querySelector(`${baseClassName}-main-controls-prev`);

  if (mainSliderElem && thumbsSliderElem) {
    const thumbsSwiper = new Swiper(thumbsSliderElem, {
      spaceBetween: 0,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesProgress: true,
      allowTouchMove: false,
    });
    const mainSwiper = new Swiper(mainSliderElem, {
      spaceBetween: 20,
      slidesPerView: 1,
      loop: true,
      navigation: {
        nextEl: mainSliderNext,
        prevEl: mainSliderPrev,
      },
      thumbs: {
        swiper: thumbsSwiper,
      },
    });
  }
});

const proektyV5More = document.querySelector('.proekty-v-01__more');

if (proektyV5More) {
  proektyV5More.addEventListener('click', (event) => {
    const isButton = event.target.classList.contains('proekty-v-01__more-button');

    if (isButton) {
      const hiddenCards = document.querySelectorAll('.proekty-v-01__card.hidden');
      hiddenCards.forEach((card) => card.classList.remove('hidden'));
      event.currentTarget.style.display = 'none';
    }
  });
}

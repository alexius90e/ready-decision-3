const reviews03SwiperEl = document.querySelector('.reviews-03 .swiper');
const reviews03SwiperPrevEl = document.querySelector(
  '.reviews-03 .reviews-03__slider-controls-button-prev',
);
const reviews03SwiperNextEl = document.querySelector(
  '.reviews-03 .reviews-03__slider-controls-button-next',
);

if (reviews03SwiperEl) {
  const swiper = new Swiper(reviews03SwiperEl, {
    slidesPerView: 'auto',
    spaceBetween: 16,
    loop: true,
    loopAdditionalSlides: 1,
    initialSlide: 1,
    preloadImages: true,
    watchSlidesVisibility: true,
    touchEventsTarget: 'container',
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
      prevEl: reviews03SwiperPrevEl,
      nextEl: reviews03SwiperNextEl,
    },
  });

  swiper.slidePrev(0);
}

const reviews03Modal = document.querySelector('.reviews-03__modal');
const reviews03Slides = document.querySelectorAll('.reviews-03__slide');

if (reviews03Modal) {
  reviews03Slides.forEach((slide) => {
    slide.addEventListener('click', (event) => {
      const isMoreBtn = event.target.classList.contains('reviews-03__slide-more-button');
      if (isMoreBtn) {
        const modalСontent = reviews03Modal.querySelector('.reviews-03__modal-content');
        const slideName = event.currentTarget.querySelector('.reviews-03__slide-name');
        const slideText = event.currentTarget.querySelector('.reviews-03__slide-long');
        const slideDate = event.currentTarget.querySelector('.reviews-03__slide-date');
        if (modalСontent && slideName && slideText && slideDate) {
          modalСontent.innerHTML = `
            <div class="reviews-03__modal-name">${slideName.textContent}</div>
            <div class="reviews-03__modal-text">${slideText.textContent}</div>
            <div class="reviews-03__modal-date">${slideDate.textContent}</div>
          `;
        }
        reviews03Modal.classList.add('active');
      }
    });
  });

  reviews03Modal.addEventListener('click', (event) => {
    const isLayout = event.currentTarget === event.target;
    const isClose = event.target.classList.contains('reviews-03__modal-close-button');
    if (isLayout || isClose) reviews03Modal.classList.remove('active');
  });
}

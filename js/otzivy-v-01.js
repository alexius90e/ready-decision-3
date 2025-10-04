const otzivyV01SwiperEl = document.querySelector('.otzivy-v-01 .swiper');

if (otzivyV01SwiperEl) {
  const swiper = new Swiper(otzivyV01SwiperEl, {
    slidesPerView: 'auto',
    spaceBetween: 16,
    loop: true,
    loopAdditionalSlides: 1,
    initialSlide: 1,
    preloadImages: true,
    watchSlidesVisibility: true,
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
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  swiper.slidePrev(0);
}

const otzivyV01Modal = document.querySelector('.otzivy-v-01__modal');
const otzivyV01Slides = document.querySelectorAll('.otzivy-v-01__slide');

if (otzivyV01Modal) {
  otzivyV01Slides.forEach((slide) => {
    slide.addEventListener('click', (event) => {
      const isMoreBtn = event.target.classList.contains('otzivy-v-01__slide-more-button');
      if (isMoreBtn) {
        const modalСontent = otzivyV01Modal.querySelector('.otzivy-v-01__modal-content');
        const slideName = event.currentTarget.querySelector('.otzivy-v-01__slide-name');
        const slideText = event.currentTarget.querySelector('.otzivy-v-01__slide-long');
        const slideDate = event.currentTarget.querySelector('.otzivy-v-01__slide-date');
        if (modalСontent && slideName && slideText && slideDate) {
          modalСontent.innerHTML = `
            <div class="otzivy-v-01__modal-name">${slideName.textContent}</div>
            <div class="otzivy-v-01__modal-text">${slideText.textContent}</div>
            <div class="otzivy-v-01__modal-date">${slideDate.textContent}</div>
          `;
        }
        otzivyV01Modal.classList.add('active');
      }
    });
  });

  otzivyV01Modal.addEventListener('click', (event) => {
    const isLayout = event.currentTarget === event.target;
    const isClose = event.target.classList.contains('otzivy-v-01__modal-close-button');
    if (isLayout || isClose) otzivyV01Modal.classList.remove('active');
  });
}

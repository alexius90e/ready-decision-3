const preimuschestvaV01SwiperEl = document.querySelector('.preimuschestva-v-01 .swiper');

if (preimuschestvaV01SwiperEl) {
  const swiper = new Swiper(preimuschestvaV01SwiperEl, {
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
      340: {
        slidesPerView: 'auto',
        spaceBetween: 20,
      },
      1201: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1501: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

const preimuschestvaV01Modal = document.querySelector('.preimuschestva-v-01__modal');
const preimuschestvaV01ModalForm = document.querySelector('.preimuschestva-v-01__modal-form');
const preimuschestvaV01CallbackButtons = document.querySelectorAll(
  '.preimuschestva-v-01__callback-button'
);

if (preimuschestvaV01Modal && preimuschestvaV01ModalForm) {
  preimuschestvaV01CallbackButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const isDisabled = event.currentTarget.classList.contains('prevent-default');
      if (!isDisabled) vidzhetSvV01Modal.classList.add('active');
    });
  });

  preimuschestvaV01Modal.addEventListener('click', (event) => {
    const isLayout = event.currentTarget === event.target;
    const isClose = event.target.classList.contains('preimuschestva-v-01__modal-close-button');
    if (isLayout || isClose) preimuschestvaV01Modal.classList.remove('active');
  });

  preimuschestvaV01ModalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    preimuschestvaV01Modal.classList.remove('active');
  });
}

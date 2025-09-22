const etapyV01SwiperEl = document.querySelector('.etapy-v-01 .swiper');

if (etapyV01SwiperEl) {
  const swiper = new Swiper(etapyV01SwiperEl, {
    slidesPerView: 1,
    spaceBetween: 16,
    breakpoints: {
      0: {
        slidesPerView: 'auto',
        spaceBetween: 16,
      },
      993: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1201: {
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

const etapyV01Modal = document.querySelector('.etapy-v-01__modal');
const etapyV01ModalForm = document.querySelector('.etapy-v-01__modal-form');
const etapyV01CallbackButtons = document.querySelectorAll(
  '.etapy-v-01__slide-details-controls-button'
);

if (etapyV01Modal && etapyV01ModalForm) {
  etapyV01CallbackButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const isDisabled = event.currentTarget.classList.contains('prevent-default');
      if (!isDisabled) vidzhetSvV01Modal.classList.add('active');
    });
  });

  etapyV01Modal.addEventListener('click', (event) => {
    const isLayout = event.currentTarget === event.target;
    const isClose = event.target.classList.contains('etapy-v-01__modal-close-button');
    if (isLayout || isClose) etapyV01Modal.classList.remove('active');
  });

  etapyV01ModalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    etapyV01Modal.classList.remove('active');
  });
}

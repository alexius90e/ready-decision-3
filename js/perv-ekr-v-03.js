const pervEkrV03SwiperEl = document.querySelector('.perv-ekr-v-03__slider .swiper');

const pervEkrV03Swiper = new Swiper(pervEkrV03SwiperEl, {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 40,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

const pervEkrV03Modal = document.querySelector('.perv-ekr-v-03__modal');
const pervEkrV03ModalForm = document.querySelector('.perv-ekr-v-03__modal-form');
const pervEkrV03ContactButtons = document.querySelectorAll(
  '.perv-ekr-v-03__card-content-contact-button'
);

if (pervEkrV03Modal && pervEkrV03ModalForm) {
  pervEkrV03ContactButtons.forEach((button) => {
    button.addEventListener('click', () => {
      pervEkrV03Modal.classList.add('active');
    });
  });

  pervEkrV03Modal.addEventListener('click', (event) => {
    const isLayout = event.currentTarget === event.target;
    const isClose = event.target.classList.contains('perv-ekr-v-03__modal-close-button');
    if (isLayout || isClose) pervEkrV03Modal.classList.remove('active');
  });

  pervEkrV03ModalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    pervEkrV03Modal.classList.remove('active');
  });
}

const pervEkrV03More = document.querySelector('.perv-ekr-v-03__more');

if (pervEkrV03More) {
  pervEkrV03More.addEventListener('click', (event) => {
    const isButton = event.target.classList.contains('perv-ekr-v-03__more-button');

    if (isButton) {
      const hiddenCards = document.querySelectorAll('.perv-ekr-v-03__card.hidden');
      hiddenCards.forEach((card) => card.classList.remove('hidden'));
      event.currentTarget.style.display = 'none';
    }
  });
}
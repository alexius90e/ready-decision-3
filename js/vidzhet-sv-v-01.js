const vidzhetSvV01 = document.querySelector('.vidzhet-sv-v-01');
const vidzhetSvV01Toggler = document.querySelector('.vidzhet-sv-v-01__toggler');

if (vidzhetSvV01Toggler && vidzhetSvV01) {
  vidzhetSvV01Toggler.addEventListener('click', () => {
    vidzhetSvV01.classList.toggle('active');
  });
}


const vidzhetSvV01Modal = document.querySelector('.vidzhet-sv-v-01__modal');
const vidzhetSvV01ModalForm = document.querySelector('.vidzhet-sv-v-01__modal-form');
const vidzhetSvV01CallbackButtons = document.querySelectorAll('.vidzhet-sv-v-01__sidebar-callback');

if (vidzhetSvV01Modal && vidzhetSvV01ModalForm) {
  vidzhetSvV01CallbackButtons.forEach((button) => {
    button.addEventListener('click', () => {
      vidzhetSvV01Modal.classList.add('active');
    });
  });

  vidzhetSvV01Modal.addEventListener('click', (event) => {
    const isLayout = event.currentTarget === event.target;
    const isClose = event.target.classList.contains('vidzhet-sv-v-01__modal-close-button');
    if (isLayout || isClose) vidzhetSvV01Modal.classList.remove('active');
  });

  vidzhetSvV01ModalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    vidzhetSvV01Modal.classList.remove('active');
  });
}
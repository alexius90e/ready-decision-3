const headerV02 = document.querySelector('.header-v-02');
const headerV02Modal = document.querySelector('.header-v-02__modal');
const headerV02ModalForm = document.querySelector('.header-v-02__modal-form');
const headerV02CallbackButtons = document.querySelectorAll(
  '.header-v-02__contacts-callback-button'
);

if (headerV02Modal && headerV02ModalForm) {
  headerV02CallbackButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const isDisabled = event.currentTarget.classList.contains('prevent-default');
      if (!isDisabled) headerV02Modal.classList.add('active');
    });
  });

  headerV02Modal.addEventListener('click', (event) => {
    const isLayout = event.currentTarget === event.target;
    const isClose = event.target.classList.contains('header-v-02__modal-close-button');
    if (isLayout || isClose) headerV02Modal.classList.remove('active');
  });

  headerV02ModalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    headerV02Modal.classList.remove('active');
  });
}

const scrollLimit = 200;
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll < lastScroll) {
    headerV02.classList.remove('hidden');
  } else if (currentScroll > scrollLimit && currentScroll > lastScroll) {
    headerV02.classList.add('hidden');
  }

  lastScroll = currentScroll;
});

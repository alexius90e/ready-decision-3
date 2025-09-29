const thanksModal = document.querySelector('.okno-spasibo-v-1');
const thanksForms = document.querySelectorAll('.form-with-okno-spasibo');

if (thanksModal) {
  thanksModal.addEventListener('click', (event) => {
    const isLayout = event.currentTarget === event.target;
    const isClose = event.target.classList.contains('okno-spasibo-v-1__close-button');
    if (isLayout || isClose) thanksModal.classList.remove('active');
  });
}

thanksForms.forEach((thanksForm) => {
  thanksForm.addEventListener('submit', (event) => {
    const url = 'https://example.com';

    event.preventDefault();
    event.currentTarget.reset();

    if (url) {
      setTimeout(() => {
        window.open(url, '_blank');
      }, 4000);
    }

    setTimeout(() => {
      if (thanksModal) thanksModal.classList.add('active');
    }, 320);
  });
});

const modOkV02 = document.querySelector('.mod-ok-v-02');
const modOkV02Form = document.querySelector('.mod-ok-v-02__form');
const modOkV02Buttons = document.querySelectorAll('.mod-ok-v-02-button');

if (modOkV02 && modOkV02Form) {
  modOkV02Buttons.forEach((button) => {
    button.addEventListener('click', () => {
      modOkV02.classList.add('active');
    });
  });

  modOkV02.addEventListener('click', (event) => {
    const isLayout = event.currentTarget === event.target;
    const isClose = event.target.classList.contains('mod-ok-v-02__close-button');
    if (isLayout || isClose) modOkV02.classList.remove('active');
  });

  modOkV02Form.addEventListener('submit', (event) => {
    event.preventDefault();
    modOkV02.classList.remove('active');
  });
}

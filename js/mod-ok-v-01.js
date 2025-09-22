const modOkV01 = document.querySelector('.mod-ok-v-01');
const modOkV01Form = document.querySelector('.mod-ok-v-01__form');
const modOkV01Buttons = document.querySelectorAll('.mod-ok-v-01-button');

if (modOkV01 && modOkV01Form) {
  modOkV01Buttons.forEach((button) => {
    button.addEventListener('click', () => {
      modOkV01.classList.add('active');
    });
  });

  modOkV01.addEventListener('click', (event) => {
    const isLayout = event.currentTarget === event.target;
    const isClose = event.target.classList.contains('mod-ok-v-01__close-button');
    if (isLayout || isClose) modOkV01.classList.remove('active');
  });

  modOkV01Form.addEventListener('submit', (event) => {
    event.preventDefault();
    modOkV01.classList.remove('active');
  });
}

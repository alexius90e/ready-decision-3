const modOkV03Els = document.querySelectorAll('.mod-ok-v-03');

modOkV03Els.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    const isLayout = event.currentTarget === event.target;
    const isClose = event.target.classList.contains('mod-ok-v-03__close-button');

    if (isLayout || isClose) modal.classList.remove('active');
  });
});

const modOkV03ButtonEls = document.querySelectorAll('.mod-ok-v-03-button');

modOkV03ButtonEls.forEach((button) => {
  button.addEventListener('click', (event) => {
    const targetModalId = event.currentTarget.dataset.modalid;

    if (targetModalId) {
      const modal = document.getElementById(targetModalId);
      if (modal) modal.classList.add('active');
    }
  });
});

const modOkV03textareas = document.querySelector('.mod-ok-v-03__form-textarea');

modOkV03textareas.addEventListener('input', (event) => {
  event.currentTarget.style.height = 'auto';
  event.currentTarget.style.height = event.currentTarget.scrollHeight + 'px';
});

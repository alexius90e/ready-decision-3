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

const modOkV03textareas = document.querySelectorAll('.mod-ok-v-03__footer-textarea');

modOkV03textareas.forEach((textarea) => {
  textarea.addEventListener('input', (event) => {
    console.log(textarea);
    event.currentTarget.style.height = 'auto';
    event.currentTarget.style.height = event.currentTarget.scrollHeight + 'px';
  });
});

const modOkV03Forms = document.querySelectorAll('.mod-ok-v-03__form');

modOkV03Forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    const modal = event.currentTarget.closest('.mod-ok-v-03');
    if (modal) modal.classList.remove('active');
  });
});

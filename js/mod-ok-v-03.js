const modOkV03textareas = document.querySelectorAll('.mod-ok-v-03__footer-textarea');

const updateModOkV03textareas = (textarea) => {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
};

modOkV03textareas.forEach((textarea) => {
  textarea.addEventListener('input', (event) => {
    updateModOkV03textareas(event.currentTarget);
  });
});

const modOkV03Els = document.querySelectorAll('.mod-ok-v-03');

modOkV03Els.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    const isLayout = event.currentTarget === event.target;
    const isClose = event.target.classList.contains('mod-ok-v-03__header-close-button');

    if (isLayout || isClose) {
      modal.classList.remove('active');
      modOkV03textareas.forEach((textarea) => updateModOkV03textareas(textarea));
    }
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

const modOkV03Forms = document.querySelectorAll('.mod-ok-v-03__form');

modOkV03Forms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    const modal = event.currentTarget.closest('.mod-ok-v-03');
    if (modal) modal.classList.remove('active');
    modOkV03textareas.forEach((textarea) => updateModOkV03textareas(textarea));
  });
});

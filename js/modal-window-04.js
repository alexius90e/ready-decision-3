const modalWindow04 = document.querySelector('.modal-window-04');
const modalWindow04Buttons = document.querySelectorAll('.modal-window-04-button');
const modalWindow04SearchInput = document.querySelector('.modal-window-04__search-input');
const modalWindow04Links = document.querySelectorAll('.modal-window-04__link');
let modalWindow04Timeout = null;

if (modalWindow04 && modalWindow04SearchInput) {
  modalWindow04Buttons.forEach((button) => {
    button.addEventListener('click', () => {
      modalWindow04.classList.add('active');
    });
  });

  modalWindow04.addEventListener('click', (event) => {
    const isLayout = event.currentTarget === event.target;
    const isClose = event.target.classList.contains('modal-window-04__close-button');
    if (isLayout || isClose) modalWindow04.classList.remove('active');
  });

  modalWindow04SearchInput.addEventListener('input', () => {
    clearTimeout(modalWindow04Timeout);

    modalWindow04Timeout = setTimeout(() => {
      const value = modalWindow04SearchInput.value.toLowerCase().trim();

      modalWindow04Links.forEach((link) => {
        const text = link.textContent.toLowerCase();

        if (text.includes(value)) {
          link.style.display = '';
        } else {
          link.style.display = 'none';
        }
      });
    }, 300);
  });
}

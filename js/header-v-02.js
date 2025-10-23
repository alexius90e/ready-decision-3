const headerV02 = document.querySelector('.header-v-02');

const scrollLimit = 200;

const minScrollStep = 20;

let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll < lastScroll && lastScroll - currentScroll > minScrollStep) {
    headerV02.classList.remove('hidden');
  } else if (currentScroll > scrollLimit && currentScroll > lastScroll) {
    headerV02.classList.add('hidden');
  }

  lastScroll = currentScroll;
});

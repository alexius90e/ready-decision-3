const kartochkaTovaraTabyV01Links = document.querySelectorAll(
  '.kartochka-tovara-taby-v-01__tabs-link'
);

if (kartochkaTovaraTabyV01Links[0]) kartochkaTovaraTabyV01Links[0].classList.add('active');

kartochkaTovaraTabyV01Links.forEach((link) => {
  link.addEventListener('click', (event) => {
    kartochkaTovaraTabyV01Links.forEach((link) => {
      if (link === event.currentTarget) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });
});

const reviews04Modal = document.querySelector('.reviews-04__modal');
const reviews04Slides = document.querySelectorAll('.reviews-04__slide');

if (reviews04Modal) {
  reviews04Slides.forEach((slide) => {
    slide.addEventListener('click', (event) => {
      const isMoreBtn = event.target.classList.contains('reviews-04__slide-more-button');
      if (isMoreBtn) {
        const modalСontent = reviews04Modal.querySelector('.reviews-04__modal-content');
        const slideName = event.currentTarget.querySelector('.reviews-04__slide-name');
        const slideText = event.currentTarget.querySelector('.reviews-04__slide-long');
        const slideDate = event.currentTarget.querySelector('.reviews-04__slide-date');
        if (modalСontent && slideName && slideText && slideDate) {
          modalСontent.innerHTML = `
            <div class="reviews-04__modal-name">${slideName.textContent}</div>
            <div class="reviews-04__modal-text">${slideText.textContent}</div>
            <div class="reviews-04__modal-date">${slideDate.textContent}</div>
          `;
        }
        reviews04Modal.classList.add('active');
      }
    });
  });

  reviews04Modal.addEventListener('click', (event) => {
    const isLayout = event.currentTarget === event.target;
    const isClose = event.target.classList.contains('reviews-04__modal-close-button');
    if (isLayout || isClose) reviews04Modal.classList.remove('active');
  });
}

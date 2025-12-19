
const otzivyV02Modal = document.querySelector('.otzivy-v-02__modal');
const otzivyV02Reviews = document.querySelectorAll('.otzivy-v-02__review');

if (otzivyV02Modal) {
  otzivyV02Reviews.forEach((review) => {
    review.addEventListener('click', (event) => {
      const isMoreBtn = event.target.classList.contains('otzivy-v-02__review-more-button');
      if (isMoreBtn) {
        const modalСontent = otzivyV02Modal.querySelector('.otzivy-v-02__modal-content');
        const reviewName = event.currentTarget.querySelector('.otzivy-v-02__review-name');
        const reviewText = event.currentTarget.querySelector('.otzivy-v-02__review-long');
        const reviewDate = event.currentTarget.querySelector('.otzivy-v-02__review-date');
        if (modalСontent && reviewName && reviewText && reviewDate) {
          modalСontent.innerHTML = `
            <div class="otzivy-v-02__modal-name">${reviewName.textContent}</div>
            <div class="otzivy-v-02__modal-text">${reviewText.textContent}</div>
            <div class="otzivy-v-02__modal-date">${reviewDate.textContent}</div>
          `;
        }
        otzivyV02Modal.classList.add('active');
      }
    });
  });

  otzivyV02Modal.addEventListener('click', (event) => {
    const isLayout = event.currentTarget === event.target;
    const isClose = event.target.classList.contains('otzivy-v-02__modal-close-button');
    if (isLayout || isClose) otzivyV02Modal.classList.remove('active');
  });
}

const productCard03Wrapper = document.querySelector('.product-card-03__wrapper');
const productCard03Info = document.querySelector('.product-card-03__block_info');

function updateWrapperHeight() {
  if (productCard03Wrapper && productCard03Info) {
    productCard03Wrapper.style.minHeight = productCard03Info.offsetHeight + 'px';
  }
}

window.addEventListener('load', updateWrapperHeight);
window.addEventListener('resize', updateWrapperHeight);

const productCard03InfoPayment = document.querySelector('.product-card-03__info-payment');

if (productCard03InfoPayment) {
  productCard03InfoPayment.addEventListener('click', (event) => {
    const isMore = event.target.classList.contains('product-card-03__info-payment-info-more');
    const isLayout = event.target === event.currentTarget;

    if (isMore) {
      event.currentTarget.classList.add('active');
    }

    if (isLayout) {
      event.currentTarget.classList.remove('active');
    }
  });
}

const productCard03SliderMain = document.querySelector('.product-card-03__slider-main  .swiper');
const productCard03SliderThumbs = document.querySelector('.product-card-03__slider-thumbs .swiper');

if (productCard03SliderMain && productCard03SliderThumbs) {
  const thumbsSwiper = new Swiper(productCard03SliderThumbs, {
    freeMode: true,
    watchSlidesProgress: true,
  });

  const mainSwiper = new Swiper(productCard03SliderMain, {
    spaceBetween: 10,
    autoHeight: true,
    thumbs: {
      swiper: thumbsSwiper,
    },
  });
}

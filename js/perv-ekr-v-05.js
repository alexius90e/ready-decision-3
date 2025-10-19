const pervEkrV05Swiper = document.querySelector('.perv-ekr-v-05__slider .swiper');

if (pervEkrV05Swiper) {
  const swiper = new Swiper(pervEkrV05Swiper, {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 4000,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
}

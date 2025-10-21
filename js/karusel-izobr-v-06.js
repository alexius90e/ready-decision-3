const karuselIzobrV06SwiperEl = document.querySelector('.karusel-izobr-v-06 .swiper');

if (karuselIzobrV06SwiperEl) {
  const swiper = new Swiper(karuselIzobrV06SwiperEl, {
    slidesPerView: 'auto',
    spaceBetween: 16,
    loop: true,
    breakpoints: {
      0: {
        spaceBetween: 12,
      },
      320: {
        spaceBetween: 12,
      },
      769: {
        spaceBetween: 20,
      },
      1501: {
        spaceBetween: 30,
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

const karuselIzobrV06Slide = document.querySelector('.karusel-izobr-v-06__slide');
const karuselIzobrV06Prev = document.querySelector('.karusel-izobr-v-06 .swiper-button-next');
const karuselIzobrV06Next = document.querySelector('.karusel-izobr-v-06 .swiper-button-prev');

const updateKaruselIzobrV06ButtonsTop = () => {
  if (karuselIzobrV06Slide && karuselIzobrV06Prev && karuselIzobrV06Next) {
    karuselIzobrV06Prev.style.top = `${karuselIzobrV06Slide.offsetWidth / 2}px`;
    karuselIzobrV06Next.style.top = `${karuselIzobrV06Slide.offsetWidth / 2}px`;
  }
};

window.addEventListener('resize', updateKaruselIzobrV06ButtonsTop);

updateKaruselIzobrV06ButtonsTop();

const proektyV01VideoEls = document.querySelectorAll('.proekty-v-01__card-sliders-main-video');

proektyV01VideoEls.forEach((videoEl) => {
  videoEl.addEventListener('click', (event) => {
    proektyV01VideoEls.forEach((videoEl) => {
      if (event.currentTarget !== videoEl) {
        const iframeEl = videoEl.querySelector('iframe');
        const iframeSrc = iframeEl.getAttribute('src');
        iframeEl.setAttribute('src', iframeSrc);
        videoEl.classList.remove('active');
      } else {
        const iframe = videoEl.querySelector('.proekty-v-01__card-sliders-main-video-frame');
        if (iframe) {
          setTimeout(() => {
            iframe.contentWindow.postMessage('{"type":"player:play"}', '*');
          }, 500);
        }
      }
    });
    event.currentTarget.classList.add('active');
  });
});

const proektyV01CardSliders = document.querySelectorAll('.proekty-v-01__card-sliders');

proektyV01CardSliders.forEach((slidersElem) => {
  const baseClassName = '.proekty-v-01__card-sliders';
  const mainSliderElem = slidersElem.querySelector(`${baseClassName}-main .swiper`);
  const thumbsSliderElem = slidersElem.querySelector(`${baseClassName}-thumbs .swiper`);
  const mainSliderNext = slidersElem.querySelector(`${baseClassName}-main-controls-next`);
  const mainSliderPrev = slidersElem.querySelector(`${baseClassName}-main-controls-prev`);

  if (mainSliderElem && thumbsSliderElem) {
    const thumbsSwiper = new Swiper(thumbsSliderElem, {
      spaceBetween: -1,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesProgress: true,
      allowTouchMove: false,
    });
    const mainSwiper = new Swiper(mainSliderElem, {
      spaceBetween: 20,
      slidesPerView: 1,
      loop: true,
      navigation: {
        nextEl: mainSliderNext,
        prevEl: mainSliderPrev,
      },
      thumbs: {
        swiper: thumbsSwiper,
      },
      on: {
        slideChange: function () {
          proektyV01VideoEls.forEach((videoEl) => {
            const iframeEl = videoEl.querySelector('iframe');
            if (iframeEl) {
              const iframeSrc = iframeEl.getAttribute('src');
              iframeEl.setAttribute('src', iframeSrc);
            }
            videoEl.classList.remove('active');
          });
        },
      },
    });
  }
});

const proektyV01More = document.querySelector('.proekty-v-01__more');

if (proektyV01More) {
  proektyV01More.addEventListener('click', (event) => {
    const isButton = event.target.classList.contains('proekty-v-01__more-button');

    if (isButton) {
      const hiddenCards = document.querySelectorAll('.proekty-v-01__card.hidden');
      hiddenCards.forEach((card) => card.classList.remove('hidden'));
      event.currentTarget.style.display = 'none';
    }
  });
}

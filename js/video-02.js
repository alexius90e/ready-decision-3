  const reviews = document.querySelectorAll('.video-02__review');

  reviews.forEach((review) => {
    const playButton = review.querySelector('.video-02__review-play-button');
    if (!playButton) return;

    playButton.addEventListener('click', function (e) {
      e.stopPropagation(); 


      if (review.classList.contains('active')) {
        return;
      }


      reviews.forEach((otherReview) => {
        if (otherReview === review) return;
        const otherIframe = otherReview.querySelector('.video-02__review-video iframe');
        if (otherIframe) {
          const src = otherIframe.getAttribute('src');
          otherIframe.setAttribute('src', src);
          otherReview.classList.remove('active');
        }
      });

      // Активируем текущее видео (скрываем превью, показываем iframe)
      review.classList.add('active');

      // Запускаем воспроизведение через postMessage (как в рабочем варианте)
      const iframe = review.querySelector('.video-02__review-video iframe');
      if (iframe) {
        setTimeout(() => {
          iframe.contentWindow.postMessage('{"type":"player:play"}', '*');
        }, 500);
      }
    });
  });
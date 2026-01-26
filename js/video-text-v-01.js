const videoTextV1VideoEls = document.querySelectorAll('.video-text-v-01__video');

videoTextV1VideoEls.forEach((videoEl) => {
  videoEl.addEventListener('click', (event) => {
    videoTextV1VideoEls.forEach((videoEl) => {
      if (event.currentTarget !== videoEl) {
        const iframeEl = videoEl.querySelector('iframe');
        const iframeSrc = iframeEl.getAttribute('src');
        iframeEl.setAttribute('src', iframeSrc);
        videoEl.classList.remove('active');
      } else {
        const iframe = videoEl.querySelector('.video-text-v-01__video-frame');
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

const catalogV03Items = document.querySelectorAll('.catalog-v-03__catalog-item');

catalogV03Items.forEach((item) => {
  const baseClassName = '.catalog-v-03__catalog-item';
  const mainSliderElem = item.querySelector(`${baseClassName}-main .swiper`);
  const thumbsSliderElem = item.querySelector(`${baseClassName}-thumbs .swiper`);

  if (mainSliderElem && thumbsSliderElem) {
    const thumbsSwiper = new Swiper(thumbsSliderElem, {
      loop: true,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
      allowTouchMove: false,
    });
    const mainSwiper = new Swiper(mainSliderElem, {
      spaceBetween: 20,
      loop: true,
      thumbs: {
        swiper: thumbsSwiper,
      },
    });
  }

  item.addEventListener('click', (event) => {
    const isFavButton = event.target.classList.contains(
      'catalog-v-03__catalog-item-content-favourites-button',
    );
    if (isFavButton) event.target.classList.toggle('active');
  });
});

//accordion

const catalogV03AccordionEls = document.querySelectorAll('.catalog-v-03__accordion');
const catalogV03MaxHeightLimit = 1000;

catalogV03AccordionEls.forEach((accordion) => {
  const panel = accordion.querySelector('.catalog-v-03__accordion-panel');
  if (accordion.classList.contains('active') && panel) {
    panel.style.maxHeight = catalogV03MaxHeightLimit + 'px';
  }

  accordion.addEventListener('click', (event) => {
    const isActive = accordion.classList.contains('active');
    const isToggler = event.target.closest('.catalog-v-03__accordion-toggler');
    if (isToggler && panel) {
      if (isActive) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = catalogV03MaxHeightLimit + 'px';
      }
      accordion.classList.toggle('active');
    }
  });
});

const catalogV03CheckboxsetEls = document.querySelectorAll('.catalog-v-03__checkboxset');

catalogV03CheckboxsetEls.forEach((block) => {
  const searchInput = block.querySelector('.catalog-v-03__search-input');
  const checkboxes = block.querySelectorAll('.catalog-v-03__checkbox');
  const noResults = block.querySelector('.catalog-v-03__no-results');

  // Функция фильтрации для этого блока
  function filterCheckboxes(query) {
    const trimmed = query.trim().toLowerCase();
    let hasVisible = false;

    checkboxes.forEach(function (checkbox) {
      const label = checkbox.querySelector('.catalog-v-03__checkbox-label');
      if (!label) return;

      const text = label.textContent.trim().toLowerCase();
      const match = text.includes(trimmed);

      if (trimmed === '' || match) {
        checkbox.classList.remove('hidden');
        hasVisible = true;
      } else {
        checkbox.classList.add('hidden');
      }
    });

    if (noResults) {
      noResults.style.display = trimmed !== '' && !hasVisible ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      filterCheckboxes(this.value);
    });

    filterCheckboxes('');
  }
});

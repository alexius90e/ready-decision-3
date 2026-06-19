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

// double-range

const catalogV03DoubleRangeEls = document.querySelectorAll('.catalog-v-03__double-range');

catalogV03DoubleRangeEls.forEach((container) => {
  const minInput = container.querySelector('.catalog-v-03__double-range-input--min');
  const maxInput = container.querySelector('.catalog-v-03__double-range-input--max');
  const trackFill = container.querySelector('.catalog-v-03__double-range-track-fill');
  const thumbMin = container.querySelector('.catalog-v-03__double-range-thumb--min');
  const thumbMax = container.querySelector('.catalog-v-03__double-range-thumb--max');
  const slidersContainer = container.querySelector('.catalog-v-03__double-range-sliders');
  const minIndicator = container.querySelector('.catalog-v-03__double-range-indicator--min');
  const maxIndicator = container.querySelector('.catalog-v-03__double-range-indicator--max');

  if (!minInput || !maxInput || !trackFill || !thumbMin || !thumbMax || !slidersContainer) return;

  const min = parseFloat(container.dataset.min) || 0;
  const max = parseFloat(container.dataset.max) || 1000;
  const step = parseFloat(container.dataset.step) || 1;

  let currentMin = min;
  let currentMax = max;

  // Форматирование
  function formatNumber(num) {
    const parts = num.toString().split('.');
    const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.length > 1 ? intPart + '.' + parts[1] : intPart;
  }

  // Обновление позиций ползунков и заливки
  function updateUI() {
    const leftPercent = ((currentMin - min) / (max - min)) * 100;
    const rightPercent = ((max - currentMax) / (max - min)) * 100;

    thumbMin.style.left = leftPercent + '%';
    thumbMax.style.left = (100 - rightPercent) + '%';
    trackFill.style.left = leftPercent + '%';
    trackFill.style.right = rightPercent + '%';

    minInput.value = formatNumber(currentMin);
    maxInput.value = formatNumber(currentMax);
    if (minIndicator) minIndicator.textContent = formatNumber(currentMin);
    if (maxIndicator) maxIndicator.textContent = formatNumber(currentMax);
  }

  // Функция для перетаскивания
  function makeDraggable(thumb, isMin) {
    let isDragging = false;

    thumb.addEventListener('mousedown', function(e) {
      e.preventDefault(); // предотвращаем выделение текста
      isDragging = true;
      document.body.style.cursor = 'grabbing';
      thumb.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;

      const rect = slidersContainer.getBoundingClientRect();
      let percent = (e.clientX - rect.left) / rect.width;
      percent = Math.min(Math.max(percent, 0), 1);

      let value = min + percent * (max - min);
      // Округление до шага
      value = Math.round(value / step) * step;
      value = Math.min(Math.max(value, min), max);

      if (isMin) {
        if (value > currentMax) value = currentMax;
        currentMin = value;
      } else {
        if (value < currentMin) value = currentMin;
        currentMax = value;
      }

      updateUI();
    });

    document.addEventListener('mouseup', function() {
      if (isDragging) {
        isDragging = false;
        document.body.style.cursor = '';
        thumb.style.cursor = 'grab';
      }
    });
  }

  makeDraggable(thumbMin, true);
  makeDraggable(thumbMax, false);

  // Обработчики для полей ввода
  function sanitizeInput(value) {
    return value.replace(/[^0-9.]/g, '');
  }

  function handleInput(e) {
    const input = e.target;
    let raw = sanitizeInput(input.value);
    const parts = raw.split('.');
    if (parts.length > 2) {
      raw = parts[0] + '.' + parts.slice(1).join('');
    }
    if (input.value !== raw) {
      const start = input.selectionStart;
      const end = input.selectionEnd;
      input.value = raw;
      const len = raw.length;
      input.setSelectionRange(Math.min(start, len), Math.min(end, len));
    }

    if (raw === '' || raw === '.') return;

    let val = parseFloat(raw);
    if (isNaN(val)) return;

    if (input === minInput) {
      if (val < min) val = min;
      if (val > currentMax) val = currentMax;
      currentMin = val;
    } else {
      if (val > max) val = max;
      if (val < currentMin) val = currentMin;
      currentMax = val;
    }
    updateUI();
  }

  function handleBlur(e) {
    const input = e.target;
    let raw = input.value.replace(/\s/g, '');
    let val = parseFloat(raw);
    if (isNaN(val)) {
      val = (input === minInput) ? min : max;
    }
    if (input === minInput) {
      if (val < min) val = min;
      if (val > currentMax) val = currentMax;
      currentMin = val;
    } else {
      if (val > max) val = max;
      if (val < currentMin) val = currentMin;
      currentMax = val;
    }
    updateUI();
  }

  minInput.addEventListener('input', handleInput);
  maxInput.addEventListener('input', handleInput);
  minInput.addEventListener('blur', handleBlur);
  maxInput.addEventListener('blur', handleBlur);

  // Инициализация
  updateUI();
});

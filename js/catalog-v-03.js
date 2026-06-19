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

// checkboxset

const catalogV03CheckboxsetEls = document.querySelectorAll('.catalog-v-03__checkboxset');

catalogV03CheckboxsetEls.forEach((block) => {
  const searchInput = block.querySelector('.catalog-v-03__checkboxset-search-input');
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

  // Форматирование числа с пробелами
  function formatNumber(num) {
    const parts = num.toString().split('.');
    const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.length > 1 ? intPart + '.' + parts[1] : intPart;
  }

  // Обновление только слайдеров, трека и индикаторов (без полей ввода)
  function updateSlidersAndIndicators() {
    const leftPercent = ((currentMin - min) / (max - min)) * 100;
    const rightPercent = ((max - currentMax) / (max - min)) * 100;

    thumbMin.style.left = leftPercent + '%';
    thumbMax.style.left = 100 - rightPercent + '%';
    trackFill.style.left = leftPercent + '%';
    trackFill.style.right = rightPercent + '%';

    if (minIndicator) minIndicator.textContent = formatNumber(currentMin);
    if (maxIndicator) maxIndicator.textContent = formatNumber(currentMax);
  }

  function updateUI() {
    const leftPercent = ((currentMin - min) / (max - min)) * 100;
    const rightPercent = ((max - currentMax) / (max - min)) * 100;

    thumbMin.style.left = leftPercent + '%';
    thumbMax.style.left = 100 - rightPercent + '%';
    trackFill.style.left = leftPercent + '%';
    trackFill.style.right = rightPercent + '%';

    minInput.value = formatNumber(currentMin);
    maxInput.value = formatNumber(currentMax);
    if (minIndicator) minIndicator.textContent = formatNumber(currentMin);
    if (maxIndicator) maxIndicator.textContent = formatNumber(currentMax);
  }

  function makeDraggable(thumb, isMin) {
    let isDragging = false;

    thumb.addEventListener('mousedown', function (event) {
      event.preventDefault();
      isDragging = true;
      document.body.style.cursor = 'grabbing';
      thumb.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', function (event) {
      if (!isDragging) return;

      const rect = slidersContainer.getBoundingClientRect();
      let percent = (event.clientX - rect.left) / rect.width;
      percent = Math.min(Math.max(percent, 0), 1);

      let value = min + percent * (max - min);
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

    document.addEventListener('mouseup', function () {
      if (isDragging) {
        isDragging = false;
        document.body.style.cursor = '';
        thumb.style.cursor = 'grab';
      }
    });
  }

  makeDraggable(thumbMin, true);
  makeDraggable(thumbMax, false);

  function sanitizeInput(value) {
    return value.replace(/[^0-9.]/g, '');
  }

  function handleInput(event) {
    const input = event.target;
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

    updateSlidersAndIndicators();
  }

  function handleBlur(event) {
    const input = event.target;
    let raw = input.value.replace(/\s/g, '');
    let val = parseFloat(raw);
    if (isNaN(val)) {
      val = input === minInput ? min : max;
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

  updateUI();
});

// year-range

const catalogV03YearRangeEls = document.querySelectorAll('.catalog-v-03__year-range');

catalogV03YearRangeEls.forEach((container) => {
  const fromItem = container.querySelector('.catalog-v-03__year-range-item_from');
  const toItem = container.querySelector('.catalog-v-03__year-range-item_to');
  const fromTrigger = fromItem.querySelector('.catalog-v-03__year-range-trigger');
  const toTrigger = toItem.querySelector('.catalog-v-03__year-range-trigger');
  const fromDropdown = fromItem.querySelector('.catalog-v-03__year-range-dropdown');
  const toDropdown = toItem.querySelector('.catalog-v-03__year-range-dropdown');
  const fromInput = container.querySelector('.catalog-v-03__year-range-input-from');
  const toInput = container.querySelector('.catalog-v-03__year-range-input-to');

  const startYear = parseInt(container.dataset.start, 10) || 2000;
  const endYear = parseInt(container.dataset.end, 10) || 2026;
  const initialFrom = container.dataset.from ? parseInt(container.dataset.from, 10) : null;
  const initialTo = container.dataset.to ? parseInt(container.dataset.to, 10) : null;

  if (fromInput) fromInput.name = container.dataset.nameFrom || 'year_from';
  if (toInput) toInput.name = container.dataset.nameTo || 'year_to';

  let fromValue = initialFrom;
  let toValue = initialTo;

  function generateOptions(dropdown, selectedValue, disabledYears = []) {
    dropdown.innerHTML = '';
    for (let year = endYear; year >= startYear; year--) {
      const option = document.createElement('div');
      option.className = 'catalog-v-03__year-range-option';
      option.textContent = year;
      option.dataset.value = year;
      if (year === selectedValue) option.classList.add('selected');
      if (disabledYears.includes(year)) option.classList.add('disabled');
      dropdown.appendChild(option);
    }
  }

  function updateTrigger(trigger, value) {
    if (value !== null) {
      trigger.textContent = value;
      trigger.removeAttribute('data-placeholder');
    } else {
      trigger.textContent = trigger.dataset.placeholder || 'выберите';
      trigger.setAttribute('data-placeholder', '');
    }
  }

  function updateHiddenInputs() {
    if (fromInput) fromInput.value = fromValue !== null ? fromValue : '';
    if (toInput) toInput.value = toValue !== null ? toValue : '';
    container.dispatchEvent(
      new CustomEvent('change', {
        detail: { from: fromValue, to: toValue },
      }),
    );
  }

  function closeAllDropdowns() {
    fromItem.classList.remove('open');
    toItem.classList.remove('open');
    fromDropdown.style.display = 'none';
    toDropdown.style.display = 'none';
  }

  function openDropdown(item, dropdown) {
    closeAllDropdowns();
    item.classList.add('open');
    dropdown.style.display = 'block';
    const isFrom = item === fromItem;
    const currentValue = isFrom ? fromValue : toValue;
    const otherValue = isFrom ? toValue : fromValue;

    let disabledYears = [];
    if (isFrom && otherValue !== null) {
      for (let y = otherValue + 1; y <= endYear; y++) disabledYears.push(y);
    } else if (!isFrom && otherValue !== null) {
      for (let y = startYear; y < otherValue; y++) disabledYears.push(y);
    }
    generateOptions(dropdown, currentValue, disabledYears);
  }

  function onOptionClick(event) {
    const option = event.target.closest('.catalog-v-03__year-range-option');
    if (!option || option.classList.contains('disabled')) return;
    const year = parseInt(option.dataset.value, 10);
    const item = option.closest('.catalog-v-03__year-range-item');
    const isFrom = item.classList.contains('catalog-v-03__year-range-item_from');

    if (isFrom) {
      fromValue = year;
      if (toValue !== null && toValue < fromValue) {
        toValue = fromValue;
        updateTrigger(toTrigger, toValue);
      }
      updateTrigger(fromTrigger, fromValue);
      closeAllDropdowns();
    } else {
      toValue = year;
      if (fromValue !== null && toValue < fromValue) {
        toValue = fromValue;
        updateTrigger(toTrigger, toValue);
      } else {
        updateTrigger(toTrigger, toValue);
      }
      closeAllDropdowns();
    }
    updateHiddenInputs();
  }

  function onTriggerClick(event) {
    event.stopPropagation();
    const trigger = event.currentTarget;
    const item = trigger.closest('.catalog-v-03__year-range-item');
    const dropdown = item.querySelector('.catalog-v-03__year-range-dropdown');
    const isOpen = item.classList.contains('open');
    if (isOpen) {
      closeAllDropdowns();
    } else {
      openDropdown(item, dropdown);
    }
  }

  document.addEventListener('click', function (event) {
    if (!container.contains(event.target)) closeAllDropdowns();
  });

  fromTrigger.addEventListener('click', onTriggerClick);
  toTrigger.addEventListener('click', onTriggerClick);
  fromDropdown.addEventListener('click', onOptionClick);
  toDropdown.addEventListener('click', onOptionClick);

  updateTrigger(fromTrigger, fromValue);
  updateTrigger(toTrigger, toValue);
  generateOptions(fromDropdown, fromValue);
  generateOptions(toDropdown, toValue);
  closeAllDropdowns();
  updateHiddenInputs();
});

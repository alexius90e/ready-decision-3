// budget

const serviceFilter03FromInput = document.querySelector(
  '.service-filter-03__budget-input[name="budget_from"]',
);

const serviceFilter03ToInput = document.querySelector(
  '.service-filter-03__budget-input[name="budget_to"]',
);

function serviceFilter03EnforceDigits(e) {
  this.value = this.value.replace(/\D/g, '');
  serviceFilter03Validate();
}

function serviceFilter03Validate() {
  const fromVal = parseInt(serviceFilter03FromInput.value, 10);
  const toVal = parseInt(serviceFilter03ToInput.value, 10);

  serviceFilter03ToInput.setCustomValidity('');
  serviceFilter03ToInput.setAttribute('invalid', false);

  if (!isNaN(fromVal) && !isNaN(toVal) && fromVal > toVal) {
    const msg = 'Значение "до" должно быть больше или равно "от"';
    serviceFilter03ToInput.setCustomValidity(msg);
    serviceFilter03ToInput.setAttribute('invalid', true);
    serviceFilter03ToInput.reportValidity();
  }
}

serviceFilter03FromInput.addEventListener('input', serviceFilter03EnforceDigits);
serviceFilter03ToInput.addEventListener('input', serviceFilter03EnforceDigits);

serviceFilter03FromInput.addEventListener('blur', function () {
  this.value = this.value.replace(/\D/g, '');
  serviceFilter03Validate();
});

serviceFilter03ToInput.addEventListener('blur', function () {
  this.value = this.value.replace(/\D/g, '');
  serviceFilter03Validate();
});

// year-range

const serviceFilter03YearRangeEls = document.querySelectorAll('.service-filter-03__year-range');

serviceFilter03YearRangeEls.forEach((container) => {
  const fromItem = container.querySelector('.service-filter-03__year-range-item_from');
  const toItem = container.querySelector('.service-filter-03__year-range-item_to');
  const fromTrigger = fromItem.querySelector('.service-filter-03__year-range-trigger');
  const toTrigger = toItem.querySelector('.service-filter-03__year-range-trigger');
  const fromDropdown = fromItem.querySelector('.service-filter-03__year-range-dropdown');
  const toDropdown = toItem.querySelector('.service-filter-03__year-range-dropdown');
  const fromInput = container.querySelector('.service-filter-03__year-range-input-from');
  const toInput = container.querySelector('.service-filter-03__year-range-input-to');

  const startYear = parseInt(container.dataset.start, 10) || 2000;
  const endYear = parseInt(container.dataset.end, 10) || 2026;

  let fromValue = null;
  let toValue = null;

  function generateOptions(dropdown, selectedValue, disabledYears = []) {
    dropdown.innerHTML = '';
    for (let year = endYear; year >= startYear; year--) {
      const option = document.createElement('div');
      option.className = 'service-filter-03__year-range-option';
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
    const option = event.target.closest('.service-filter-03__year-range-option');
    if (!option || option.classList.contains('disabled')) return;
    const year = parseInt(option.dataset.value, 10);
    const item = option.closest('.service-filter-03__year-range-item');
    const isFrom = item.classList.contains('service-filter-03__year-range-item_from');

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
    const item = trigger.closest('.service-filter-03__year-range-item');
    const dropdown = item.querySelector('.service-filter-03__year-range-dropdown');
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

// multiselect

const serviceFilter03Multiselects = document.querySelectorAll('.service-filter-03__multiselect');

serviceFilter03Multiselects.forEach((container) => {
  const trigger = container.querySelector('.service-filter-03__multiselect-trigger');
  const dropdown = container.querySelector('.service-filter-03__multiselect-dropdown');
  const hiddenInput = container.querySelector('.service-filter-03__multiselect-input');

  let options = [];

  try {
    options = JSON.parse(container.dataset.options);
  } catch (e) {
    options = [];
  }

  if (!Array.isArray(options) || options.length === 0) {
    return;
  }

  let selectedValues = [];

  function buildCheckboxes() {
    dropdown.innerHTML = '';
    [...options]
      .sort((a, b) => String(a).trim().toLowerCase().localeCompare(String(b).trim().toLowerCase()))
      .forEach((opt) => {
        const label = document.createElement('label');
        label.className = 'service-filter-03__multiselect-option';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = opt;
        checkbox.className = 'service-filter-03__multiselect-option-checkbox';
        checkbox.checked = selectedValues.includes(opt);

        const text = document.createTextNode(' ' + opt);

        label.appendChild(checkbox);
        label.appendChild(text);
        dropdown.appendChild(label);
      });
  }

  function updateTrigger() {
    if (selectedValues.length === 0) {
      trigger.textContent = trigger.dataset.placeholder || 'Выберите значения';
    } else {
      trigger.textContent = selectedValues.join(', ');
    }
  }

  function updateHiddenInput() {
    hiddenInput.value = selectedValues.join(',');
    container.dispatchEvent(
      new CustomEvent('change', {
        detail: { values: selectedValues },
      }),
    );
  }

  function toggleDropdown(forceState) {
    const isOpen = dropdown.style.display === 'block';
    const newState = forceState !== undefined ? forceState : !isOpen;
    dropdown.style.display = newState ? 'block' : 'none';
    container.classList.toggle('open', newState);
  }

  function closeAllDropdowns() {
    document.querySelectorAll('.service-filter-03__multiselect-dropdown').forEach((element) => {
      element.style.display = 'none';
      element.closest('.service-filter-03__multiselect')?.classList.remove('open');
    });
  }

  function onCheckboxChange(event) {
    const checkbox = event.target.closest('.service-filter-03__multiselect-option-checkbox');
    if (!checkbox) return;
    const value = checkbox.value;
    if (checkbox.checked) {
      if (!selectedValues.includes(value)) selectedValues.push(value);
    } else {
      selectedValues = selectedValues.filter((value) => value !== value);
    }
    console.log(selectedValues);
    selectedValues.sort((a, b) =>
      String(a).trim().toLowerCase().localeCompare(String(b).trim().toLowerCase()),
    );
    updateTrigger();
    updateHiddenInput();
  }

  function onTriggerClick(event) {
    event.stopPropagation();
    const isOpen = dropdown.style.display === 'block';
    if (isOpen) {
      toggleDropdown(false);
    } else {
      closeAllDropdowns();
      toggleDropdown(true);
      buildCheckboxes();
      const checkboxes = dropdown.querySelectorAll(
        '.service-filter-03__multiselect-option-checkbox',
      );
      checkboxes.forEach((checkbox) => {
        checkbox.checked = selectedValues.includes(checkbox.value);
      });
    }
  }

  document.addEventListener('click', function (event) {
    if (!container.contains(event.target)) {
      toggleDropdown(false);
    }
  });

  trigger.addEventListener('click', onTriggerClick);
  dropdown.addEventListener('change', onCheckboxChange);

  buildCheckboxes();
  updateTrigger();
  updateHiddenInput();
  toggleDropdown(false);
});

const map01Select = document.querySelector('.map-01__selector-select');

if (map01Select) {
  const trigger = map01Select.querySelector('.map-01__selector-select-trigger');
  const dropdown = map01Select.querySelector('.map-01__selector-select-dropdown');
  const options = map01Select.querySelectorAll('.map-01__selector-select-option');
  const selectedTextSpan = map01Select.querySelector('.map-01__selector-select-trigger-text');
  const mapItems = document.querySelectorAll('.map-01__maps-item');

  let isOpen = false;

  function closeDropdown() {
    map01Select.classList.remove('open');
    isOpen = false;
  }

  function openDropdown() {
    map01Select.classList.add('open');
    isOpen = true;
  }

  function toggleDropdown() {
    if (isOpen) closeDropdown();
    else openDropdown();
  }

  function updateMap(mapIndex) {
    mapItems.forEach((item) => {
      const id = parseInt(item.dataset.mapId);
      if (id === mapIndex) item.classList.remove('hidden');
      else item.classList.add('hidden');
    });
  }

  function selectOption(optionEl) {
    const text = optionEl.textContent;
    const mapIndex = parseInt(optionEl.dataset.mapIndex);

    if (selectedTextSpan) selectedTextSpan.textContent = text;

    options.forEach((option) => option.classList.remove('selected'));
    optionEl.classList.add('selected');

    updateMap(mapIndex);
    closeDropdown();
  }

  if (trigger) {
    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleDropdown();
    });
  }

  options.forEach((option) => {
    option.addEventListener('click', (event) => {
      event.stopPropagation();
      selectOption(option);
    });
  });

  map01Select.addEventListener('click', (event) => {
    if (event.currentTarget === event.target) closeDropdown();
  });

  const defaultOption = document.querySelector('.custom-select__option.selected');
  if (defaultOption) {
    const defaultMapIndex = parseInt(defaultOption.dataset.mapIndex);
    updateMap(defaultMapIndex);
    if (selectedTextSpan) selectedTextSpan.textContent = defaultOption.textContent;
  } else {
    const first = options[0];
    if (first) {
      first.classList.add('selected');
      selectOption(first);
    }
  }
}

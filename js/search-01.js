const search01InputField = document.querySelector('.search-01__input');
const search01ResetButton = document.querySelector('.search-01__reset');

const togglesearch01ResetButton = () => {
  const hasText = search01InputField.value.length > 0;
  if (hasText) {
    search01ResetButton.classList.add('active');
  } else {
    search01ResetButton.classList.remove('active');
  }
};

search01InputField.addEventListener('input', togglesearch01ResetButton);

const handleReset = () => {
  search01InputField.value = '';
  search01ResetButton.classList.remove('active');
  search01InputField.focus();
  togglesearch01ResetButton();
};

search01ResetButton.addEventListener('click', handleReset);

togglesearch01ResetButton();

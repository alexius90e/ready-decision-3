const search01InputField = document.querySelector('.search-01__input');
const search01ResetButton = document.querySelector('.search-01__reset');
const search01Results = document.querySelector('.search-01__results');

if (search01InputField && search01ResetButton && search01Results) {
  const toggleSearch01ResetButton = () => {
    const hasText = search01InputField.value.length > 0;
    if (hasText) {
      search01ResetButton.classList.add('active');
      search01Results.classList.add('active');
    } else {
      search01ResetButton.classList.remove('active');
      search01Results.classList.remove('active');
    }
  };

  search01InputField.addEventListener('input', toggleSearch01ResetButton);

  const handleReset = () => {
    search01InputField.value = '';
    search01ResetButton.classList.remove('active');
    search01Results.classList.remove('active');
    search01InputField.focus();
    toggleSearch01ResetButton();
  };

  search01ResetButton.addEventListener('click', handleReset);

  const handleResultsClick = () => {
    search01Results.classList.remove('active');
  };

  search01Results.addEventListener('click', handleResultsClick);

  toggleSearch01ResetButton();
}

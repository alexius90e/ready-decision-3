const serviceFilter02SearchInput = document.querySelector('.service-filter-02__search-input');
const serviceFilter02SearchReset = document.querySelector('.service-filter-02__search-reset');
const serviceFilter02SearchResults = document.querySelector('.service-filter-02__results');
const serviceFilter02SearchResultsList = document.querySelector('.service-filter-02__results-list');
const serviceFilter02SearchResultsNotfound = document.querySelector(
  '.service-filter-02__results-notfound',
);

if (serviceFilter02SearchInput && serviceFilter02SearchReset) {
  const toggleserviceFilter02SearchButton = () => {
    const hasText = serviceFilter02SearchInput.value.length > 0;
    if (hasText) {
      serviceFilter02SearchReset.classList.add('active');
    } else {
      serviceFilter02SearchReset.classList.remove('active');
    }
  };

  serviceFilter02SearchInput.addEventListener('input', toggleserviceFilter02SearchButton);

  const handleReset = () => {
    if (serviceFilter02SearchResults) serviceFilter02SearchResults.classList.remove('active');
    if (serviceFilter02SearchResultsList) serviceFilter02SearchResultsList.innerHTML = '';
    if (serviceFilter02SearchResultsNotfound) serviceFilter02SearchResultsNotfound.innerHTML = '';
    serviceFilter02SearchInput.value = '';
    serviceFilter02SearchReset.classList.remove('active');
    serviceFilter02SearchInput.focus();
    toggleserviceFilter02SearchButton();
  };

  serviceFilter02SearchReset.addEventListener('click', handleReset);

  toggleserviceFilter02SearchButton();
}

const serviceFilter02NavMenu = document.querySelector('.service-filter-02__nav-menu');
const serviceFilter02NavCurrent = document.querySelector('.service-filter-02__nav-current');

const serviceFilter02NavButtons = document.querySelectorAll(
  '.service-filter-02__nav-menu-item-button',
);
const serviceFilter02SubcategoryBlocks = document.querySelectorAll(
  '.service-filter-02__subcategory-item',
);

const activateserviceFilter02Tab = (categoryId) => {
  if (serviceFilter02NavButtons.length) {
    serviceFilter02NavButtons.forEach((btn) => btn.classList.remove('active'));
    const activeButton = document.querySelector(
      `.service-filter-02__nav-menu-item-button[data-category="${categoryId}"]`,
    );
    if (activeButton) {
      activeButton.classList.add('active');
      if (serviceFilter02NavCurrent) {
        serviceFilter02NavCurrent.textContent = activeButton.textContent.trim();
      }
    }
  }

  if (serviceFilter02SubcategoryBlocks.length) {
    serviceFilter02SubcategoryBlocks.forEach((block) => block.classList.remove('active'));
    const targetBlock = document.querySelector(
      `.service-filter-02__subcategory-item[data-category="${categoryId}"]`,
    );
    if (targetBlock) targetBlock.classList.add('active');
  }
};

if (serviceFilter02NavCurrent) {
  serviceFilter02NavCurrent.addEventListener('click', (event) => {
    event.target.classList.toggle('active');
  });
}

if (serviceFilter02NavButtons.length) {
  serviceFilter02NavButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const categoryId = button.getAttribute('data-category');
      if (categoryId) activateserviceFilter02Tab(categoryId);
      if (serviceFilter02NavCurrent) serviceFilter02NavCurrent.classList.remove('active');
      if (serviceFilter02SearchResults) serviceFilter02SearchResults.classList.remove('active');
    });
  });

  const firstButton = serviceFilter02NavButtons[0];
  if (firstButton) {
    const defaultCategoryId = firstButton.getAttribute('data-category');
    if (defaultCategoryId) activateserviceFilter02Tab(defaultCategoryId);
  }
}

if (
  serviceFilter02SearchInput &&
  serviceFilter02SearchResults &&
  serviceFilter02SearchResultsList
) {
  serviceFilter02SearchInput.addEventListener('input', (event) => {
    const searchQuery = event.target.value.trim();
    serviceFilter02SearchResultsList.innerHTML = '';
    if (serviceFilter02SearchResultsNotfound) serviceFilter02SearchResultsNotfound.innerHTML = '';

    if (searchQuery.length >= 2) {
      const items = document.querySelectorAll('.service-filter-02__service-list-item');
      const filteredItems = [...items].filter((item) => {
        const link = item.querySelector('.service-filter-02__service-list-item-link');
        const linkText = link ? link.textContent.toLowerCase() : '';
        return linkText.includes(searchQuery.toLowerCase());
      });

      if (filteredItems.length > 0) {
        filteredItems.forEach((item) => {
          serviceFilter02SearchResultsList.appendChild(item.cloneNode(true));
        });
        serviceFilter02SearchResults.classList.add('active');
      } else {
        serviceFilter02SearchResults.classList.add('active');
        if (serviceFilter02SearchResultsNotfound)
          serviceFilter02SearchResultsNotfound.textContent = `По запросу «${searchQuery}» ничего не найдено`;
      }
    } else {
      serviceFilter02SearchResults.classList.remove('active');
      serviceFilter02SearchResultsList.innerHTML = '';
      if (serviceFilter02SearchResultsNotfound) serviceFilter02SearchResultsNotfound.innerHTML = '';
    }
  });
}

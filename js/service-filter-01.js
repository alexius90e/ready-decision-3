const serviceFilter01SearchInput = document.querySelector('.service-filter-01__search-input');
const serviceFilter01SearchReset = document.querySelector('.service-filter-01__search-reset');
const serviceFilter01SearchResults = document.querySelector('.service-filter-01__results');

if (serviceFilter01SearchInput && serviceFilter01SearchReset) {
  const toggleServiceFilter01SearchButton = () => {
    const hasText = serviceFilter01SearchInput.value.length > 0;
    if (hasText) {
      serviceFilter01SearchReset.classList.add('active');
    } else {
      serviceFilter01SearchReset.classList.remove('active');
    }
  };

  serviceFilter01SearchInput.addEventListener('input', toggleServiceFilter01SearchButton);

  const handleReset = () => {
    if (serviceFilter01SearchResults) {
      serviceFilter01SearchResults.classList.remove('active');
      serviceFilter01SearchResults.innerHTML = '';
    }
    serviceFilter01SearchInput.value = '';
    serviceFilter01SearchReset.classList.remove('active');
    serviceFilter01SearchInput.focus();
    toggleServiceFilter01SearchButton();
  };

  serviceFilter01SearchReset.addEventListener('click', handleReset);

  toggleServiceFilter01SearchButton();
}

const serviceFilter01NavMenu = document.querySelector('.service-filter-01__nav-menu');
const serviceFilter01NavCurrent = document.querySelector('.service-filter-01__nav-current');

const serviceFilter01NavButtons = document.querySelectorAll(
  '.service-filter-01__nav-menu-item-button',
);
const serviceFilter01SubcategoryBlocks = document.querySelectorAll(
  '.service-filter-01__subcategory-item',
);

const activateServiceFilter01Tab = (categoryId) => {
  if (serviceFilter01NavButtons.length) {
    serviceFilter01NavButtons.forEach((btn) => btn.classList.remove('active'));
    const activeButton = document.querySelector(
      `.service-filter-01__nav-menu-item-button[data-category="${categoryId}"]`,
    );
    if (activeButton) {
      activeButton.classList.add('active');
      if (serviceFilter01NavCurrent) {
        serviceFilter01NavCurrent.textContent = activeButton.textContent.trim();
      }
    }
  }

  if (serviceFilter01SubcategoryBlocks.length) {
    serviceFilter01SubcategoryBlocks.forEach((block) => block.classList.remove('active'));
    const targetBlock = document.querySelector(
      `.service-filter-01__subcategory-item[data-category="${categoryId}"]`,
    );
    if (targetBlock) targetBlock.classList.add('active');
  }
};

if (serviceFilter01NavCurrent) {
  serviceFilter01NavCurrent.addEventListener('click', (event) => {
    event.target.classList.toggle('active');
  });
}

if (serviceFilter01NavButtons.length) {
  serviceFilter01NavButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const categoryId = button.getAttribute('data-category');
      if (categoryId) activateServiceFilter01Tab(categoryId);
      if (serviceFilter01NavCurrent) serviceFilter01NavCurrent.classList.remove('active');
      if (serviceFilter01SearchResults) serviceFilter01SearchResults.classList.remove('active');
    });
  });

  const firstButton = serviceFilter01NavButtons[0];
  if (firstButton) {
    const defaultCategoryId = firstButton.getAttribute('data-category');
    if (defaultCategoryId) activateServiceFilter01Tab(defaultCategoryId);
  }
}

if (serviceFilter01SearchInput && serviceFilter01SearchResults) {
  serviceFilter01SearchInput.addEventListener('input', (event) => {
    const searchQuery = event.target.value.trim();
    serviceFilter01SearchResults.innerHTML = '';

    if (searchQuery.length >= 2) {
      const links = document.querySelectorAll('.service-filter-01__subcategory-item-link');
      const filteredLinks = [...links].filter((link) =>
        link.textContent.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      if (filteredLinks.length > 0) {
        filteredLinks.forEach((link) => {
          serviceFilter01SearchResults.appendChild(link.cloneNode(true));
        });
        serviceFilter01SearchResults.classList.add('active');
      } else {
        serviceFilter01SearchResults.classList.add('active');
        const notFoundMessage = document.createElement('div');
        notFoundMessage.className = 'service-filter-01__not-found-message';
        notFoundMessage.textContent = `По запросу «${searchQuery}» ничего не найдено`;
        serviceFilter01SearchResults.appendChild(notFoundMessage);
      }
    } else {
      serviceFilter01SearchResults.classList.remove('active');
      serviceFilter01SearchResults.innerHTML = '';
    }
  });
}

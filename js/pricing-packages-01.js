const pricingPackage01Cards = document.querySelectorAll('.pricing-packages-01__card');
const pricingPackages01NavButtons = document.querySelectorAll('.pricing-packages-01__nav-button');

function updatePricingPackage01Cards(targetId) {
  pricingPackage01Cards.forEach((card) => {
    if (card.id === targetId) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}

(function initPricingPackage01Cards(targetId) {
  if (!targetId && pricingPackages01NavButtons[0]) {
    const firstTargetId = pricingPackages01NavButtons[0].dataset.target;
    updatePricingPackage01Cards(firstTargetId);
    return;
  }
  updatePricingPackage01Cards(targetId);
})();

pricingPackages01NavButtons.forEach((navButton) => {
  navButton.addEventListener('click', (event) => {
    pricingPackages01NavButtons.forEach((button) => {
      if (button === event.currentTarget) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
    const targetId = event.currentTarget.dataset.target;
    if (targetId !== undefined) updatePricingPackage01Cards(targetId);
  });
});

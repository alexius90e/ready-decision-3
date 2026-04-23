const basket01AmountBlocks = document.querySelectorAll('.basket-01__basket-item-amount');

basket01AmountBlocks.forEach((block) => {
  const decrementBtn = block.querySelector('.basket-01__basket-item-amount-button:first-child');
  const incrementBtn = block.querySelector('.basket-01__basket-item-amount-button:last-child');
  const input = block.querySelector('.basket-01__basket-item-amount-input');

  if (!decrementBtn || !incrementBtn || !input) return;

  const enforceMin = () => {
    let val = parseInt(input.value, 10);
    if (isNaN(val) || val < 1) {
      val = 1;
      input.value = val;
    }
    return val;
  };

  decrementBtn.addEventListener('click', () => {
    let current = enforceMin();
    if (current > 1) {
      input.value = current - 1;
    }
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  incrementBtn.addEventListener('click', () => {
    let current = enforceMin();
    input.value = current + 1;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  input.addEventListener('change', enforceMin);
  input.addEventListener('blur', enforceMin);

  input.addEventListener('input', function () {
    if (this.value !== '' && isNaN(parseInt(this.value, 10))) {
      this.value = 1;
    }
  });
});

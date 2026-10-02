const stages04Accordions = document.querySelectorAll('.stages-04__accordion');

stages04Accordions.forEach((accordion) => {
  accordion.addEventListener('click', handleStages04AccordionClick);
});

function handleStages04AccordionClick(event) {
  const toggler = event.currentTarget.querySelector('.stages-04__accordion-toggler');
  const panel = event.currentTarget.querySelector('.stages-04__accordion-panel');

  if (!toggler) throw new Error('Toggler not found');
  if (!panel) throw new Error('Panel not found');

  if (event.target === panel) return;

  event.currentTarget.classList.toggle('active');
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + 'px';
  }
}

function updateStages04PanelsHeight() {
  stages04Accordions.forEach((accordion) => {
    if (!accordion.classList.contains('active')) return;

    const panel = accordion.querySelector('.stages-04__accordion-panel');
    if (!panel) return;

    panel.style.maxHeight = null;
    panel.style.maxHeight = panel.scrollHeight + 'px';
  });
}

let stages04ResizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(stages04ResizeTimer);
  stages04ResizeTimer = setTimeout(updateStages04PanelsHeight, 50);
});

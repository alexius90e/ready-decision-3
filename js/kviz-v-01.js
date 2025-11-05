const kvizV01 = document.querySelector('.kviz-v-01');
const kvizV01Content = document.querySelector('.kviz-v-01__content');
const kvizMain = document.querySelector('.kviz-v-01__main');
const kvizResults = document.querySelector('.kviz-v-01__results');
const kvizControls = document.querySelector('.kviz-v-01__controls');
const kvizQuestionEls = document.querySelectorAll('.kviz-v-01__question');
const kvizDelay = 500;
let activeQuestionId = 0;

function updateQuestions() {
  const kvizProgressStep = document.querySelector('.kviz-v-01__progress-step');
  const kvizProgressIndicator = document.querySelector('.kviz-v-01__progress-bar-indicator');

  if (kvizProgressStep) {
    kvizProgressStep.textContent = `${activeQuestionId + 1} из ${kvizQuestionEls.length}`;
  }

  if (kvizProgressIndicator) {
    const progress = ((activeQuestionId + 1) / (kvizQuestionEls.length + 1)) * 100;
    kvizProgressIndicator.style.width = `${progress}%`;
  }

  kvizQuestionEls.forEach((questionEl, index) => {
    if (activeQuestionId === index) {
      questionEl.classList.add('active');
    } else {
      questionEl.classList.remove('active');
    }
  });
}

function prevStep() {
  if (activeQuestionId - 1 < 0) {
    activeQuestionId = 0;
  } else {
    activeQuestionId--;
  }

  setTimeout(() => {
    updateQuestions();
  }, kvizDelay);

  setTimeout(() => {
    if (kvizV01Content) {
      kvizV01Content.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, kvizDelay);
}

function nextStep() {
  if (activeQuestionId + 1 >= kvizQuestionEls.length) {
    activeQuestionId = kvizQuestionEls.length - 1;

    setTimeout(() => {
      if (kvizMain) kvizMain.classList.remove('active');
      if (kvizResults) kvizResults.classList.add('active');
    }, kvizDelay);

    setTimeout(() => {
      if (kvizV01) {
        kvizV01.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, kvizDelay);
  } else {
    activeQuestionId++;
    setTimeout(() => {
      if (kvizV01Content) {
        kvizV01Content.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, kvizDelay);
  }

  setTimeout(() => {
    updateQuestions();
  }, kvizDelay);
}

updateQuestions();

if (kvizControls) {
  kvizControls.addEventListener('click', (event) => {
    const isBackBtn = event.target.classList.contains('kviz-v-01__controls-back');
    const isNextBtn = event.target.classList.contains('kviz-v-01__controls-next');

    if (isBackBtn) prevStep();
    if (isNextBtn) nextStep();
  });
}

const kvizQuestionRadioEls = document.querySelectorAll('.kviz-v-01__question_radio');

kvizQuestionRadioEls.forEach((radioEl) => {
  const radioInputs = radioEl.querySelectorAll('.kviz-v-01__question-gallery-item-input');
  const customInput = radioEl.querySelector('.kviz-v-01__question-custom-input');

  if (customInput) {
    customInput.addEventListener('input', (event) => {
      if (event.target.value !== '') {
        radioInputs.forEach((radioInput) => (radioInput.checked = false));
      }
    });
  }

  radioInputs.forEach((radioInput) => {
    radioInput.addEventListener('input', () => {
      if (customInput) customInput.value = '';
      nextStep();
    });
  });
});

const kvizQuestionRadioTextEls = document.querySelectorAll('.kviz-v-01__question_radiotext');

kvizQuestionRadioTextEls.forEach((radioEl) => {
  const radioInputs = radioEl.querySelectorAll('.kviz-v-01__question-list-radio-input');
  const customInput = radioEl.querySelector('.kviz-v-01__question-list-text-input');

  if (customInput) {
    customInput.addEventListener('input', (event) => {
      if (event.target.value !== '') {
        radioInputs.forEach((radioInput) => (radioInput.checked = false));
      }
    });
  }

  radioInputs.forEach((radioInput) => {
    radioInput.addEventListener('input', () => {
      if (customInput) customInput.value = '';
      nextStep();
    });
  });
});

const kvizV01TextareaEls = document.querySelectorAll('.kviz-v-01__question-list-text-textarea');

function updatekvizV01Textarea(textarea) {
  textarea.style.minHeight = 'auto';
  textarea.style.minHeight = textarea.scrollHeight + 'px';
}

kvizV01TextareaEls.forEach((textarea) => {
  updatekvizV01Textarea(textarea);

  textarea.addEventListener('input', () => {
    updatekvizV01Textarea(textarea);
  });

  window.addEventListener('resize', () => {
    updatekvizV01Textarea(textarea);
  });
});

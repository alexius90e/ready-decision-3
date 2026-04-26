const notifItemAdded01OorderButtons = document.querySelectorAll('.notif-item-added-01-button');
const notificationBlock = document.querySelector('.notif-item-added-01');

let hideTimer = null;

function showNotificationWithReset() {
  if (notificationBlock) {
    notificationBlock.classList.add('active');

    if (hideTimer !== null) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }

    hideTimer = setTimeout(() => {
      notificationBlock.classList.remove('active');
      hideTimer = null;
    }, 3000);
  }
}

notifItemAdded01OorderButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    showNotificationWithReset();
  });
});

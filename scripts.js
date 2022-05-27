let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now(); // returns number of milliseconds
  const then = now + seconds * 1000;  //to get seconds to milliseconds as well
  displayTimeLeft(seconds);
  displayEndTime(then);

  // every second display the amount of time left
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if(secondsLeft < 0) {
      clearInterval(countdown);
      alert("Sorry you have missed the sale!")
      return;
    }
    // call displayTimeLeft every second
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const hours = Math.floor(seconds / (60 * 60));
  const minutes = Math.floor(seconds % 3600 / 60);
  const remainderSeconds = seconds % 60;
  const display = 
    `${hours < 10 ? '0' : '' }${hours} : 
     ${minutes < 10? '0' : ''}${minutes} :
    ${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
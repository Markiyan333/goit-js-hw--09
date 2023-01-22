function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
const buttons = [startBtn, stopBtn];
let timerId = null;

startBtn.addEventListener("click", () => {
  timerId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
});

stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  startBtn.disabled = false;
});

function onStopBtnClick() {
  clearInterval(timerId);
  changeAttributes(buttons);
}

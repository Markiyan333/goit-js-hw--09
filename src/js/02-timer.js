import Notiflix from 'notiflix';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const buttonStart = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
  if (selectedDates < Date.now()) {
  Notiflix.Notify.failure('Please choose a date in the future');
  buttonStart.disabled = true;
      } else {
      buttonStart.disabled = false;
      }
    },
  };


const dataStart = flatpickr(input, options);
buttonStart.addEventListener('click', buttonStartOn);

 function buttonStartOn() {
 const data = dataStart.selectedDates[0];
 buttonStart.disabled = true;
if (timerId) {
  clearInterval(timerId)
}
timerId = setInterval(() => {
const dataSave = data - Date.now();

    if (dataSave < 0) {
      clearInterval(timerId);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(dataSave);
    updateTimerValues(days, hours, minutes, seconds);
  }, 1000);
}

function addLeadingZero(value){
    return String(value).padStart(2, '0');
}

function updateTimerValues(days, hours, minutes, seconds) {
  dataDays.textContent = Math.floor(days);
  dataHours.textContent = Math.floor(hours);
  dataMinutes.textContent = Math.floor(minutes);
  dataSeconds.textContent = Math.floor(seconds);
}



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(ms / day);
  // Remaining hours
  const hours = addLeadingZero((ms % day) / hour);
  // Remaining minutes
  const minutes = addLeadingZero(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = addLeadingZero((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
import Notiflix from 'notiflix';
const form = document.querySelector('.form');
const formEl = form.elements;
form.addEventListener('submit', currentSubmit);

function currentSubmit(evt) {
evt.preventDefault();

const amount = +formEl.amount.value;
const step = +formEl.step.value;
let delay = +formEl.delay.value;

for (let i = 1; i <= amount; i += 1) {
if (i > 1) {
  delay += step;
    }
  createPromise(i, delay)
  .then(({ position, delay }) => {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

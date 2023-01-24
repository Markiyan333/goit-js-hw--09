function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  const startOn = document.querySelector('button[data-start]');
  const stopOn = document.querySelector('button[data-stop]');
  const body = document.querySelector('body');
  let timerId = null;

  startOn.addEventListener('click', () => {
    timerId = setInterval(()=>{
        body.style.backgroundColor = getRandomHexColor();
        onClick(false, true)
    },1000) ;  
  });

  stopOn.addEventListener('click', () => {
    clearInterval(timerId) ;
    onClick(true, false)
  });

function onClick(first, second) {
 stopOn.disabled = first;
 startOn.disabled = second;
}

  
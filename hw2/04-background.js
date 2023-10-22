// Add your code here
const elementToStyle = document.querySelector('body');
const input = document.querySelector('input');
const buttonInput = document.querySelector('button');
let intervalTime = 0;
let interval = null;
let randomColorEnabled = true;

input.addEventListener('input', handleInput);
buttonInput.addEventListener('click', handleButtonPress);
window.addEventListener('load', handelOnLoad());

function handleButtonPress(event) {
  event.preventDefault();
  if (randomColorEnabled) {
    clearInterval(interval);
    randomColorEnabled = false;
    buttonInput.innerText = 'Start';
    buttonInput.classList.remove('btn-danger');
    buttonInput.classList.add('btn-primary');
  } else {
    startInterval();
    randomColorEnabled = true;
    buttonInput.innerText = 'Stop';
    buttonInput.classList.remove('btn-primary');
    buttonInput.classList.add('btn-danger');
  }
}

function handleInput(event) {
  intervalTime = Number(event.target.value);
  if (!randomColorEnabled) {
    clearInterval(interval);
    startInterval();
  }
}

function startInterval() {
  if (intervalTime > 0) {
    interval = setInterval(() => {
      setRandomColor(elementToStyle);
    }, intervalTime * 1000);
  }
}

function setRandomColor(targetElement) {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  let a = Math.random();
  if (a > 0.8){ // make sure the alpha is dimmed
    a -= 0.5;
  }
  const color = `rgba(${r}, ${g}, ${b}, ${a})`;
  targetElement.style.backgroundColor = color;
  console.log(color);
}

function handelOnLoad(){
  setRandomColor(elementToStyle);
  intervalTime = 3;
  startInterval();
}

// Add your code here
const RANDOM_MAGIC_SEED_NUMBER = 123912322;
const elementToStyle = document.querySelector('body');
const input = document.querySelector('input');
const buttonInput = document.querySelector('button');
let intervalTime = 0;
let interval = null;
let randomColorEnabled = false;

input.addEventListener('input', handleInput);
buttonInput.addEventListener('click', handleButtonPress);

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
  if (randomColorEnabled) {
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
  const a = Math.random();
  const color = `rgba(${r}, ${g}, ${b}, ${a})`;
  targetElement.style.backgroundColor = color;
  console.log(color);
}

const elem = document.querySelector('input');
const result = document.getElementById('result');

elem.addEventListener('input', handleInput);
function handleInput(event) {
  const input = event.target.value;
  const inputLength = input.length;
  if (inputLength === 0) {
    result.textContent = '';
    return;
  }
  if (isNaN(input)) {
    result.textContent = 'Please enter a number!';
    result.classList.remove('text-success');
    result.classList.add('text-danger');
    return;
  }
  if (input[0] === '-') {
    result.textContent = 'Only positive numbers can be palindromes!';
    result.classList.remove('text-success');
    result.classList.add('text-danger');
    return;
  }
  for (let i = 0; i < inputLength / 2; i++) {
    const left = input[i];
    const right = input[inputLength - 1 - i];
    if (left !== right) {
      result.textContent = 'It is not a palindrome!';
      result.classList.remove('text-success');
      result.classList.add('text-danger');
      return;
    }
  }
  result.textContent = 'It is indeed a palindrome!';
  result.classList.remove('text-danger');
  result.classList.add('text-success');
}

const elem = document.querySelector("input");
const result = document.querySelector("#result");

elem.addEventListener("input", handleInput);
function handleInput(event) {
  const input = event.target.value;
  const inputLength = input.length;
  if (inputLength == 0) {
    result.textContent = "";
    return;
  }
  if (input[0] == "-") {
    result.textContent = "Only positive numbers can be palindromes!";
    return;
  }
  for (let i = 0; i < inputLength / 2; i++) {
    let left = input[i];
    let right = input[inputLength - 1 - i];
    if (left !== right) {
      result.textContent = "it is not a palindrome!";
      return;
    }
  }
  result.textContent = "it is indeed a palindrome!";
}

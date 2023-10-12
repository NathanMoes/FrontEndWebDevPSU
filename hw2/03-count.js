// Add your code here
const input = document.querySelector('input');
const textToSearchFrom = document.querySelector('p');
const originalText = textToSearchFrom.innerHTML;

input.addEventListener('keydown', handleInput);

function handleInput(event) {
  let textToSearchFor = event.target.value;
  if (textToSearchFor === '') {
    textToSearchFrom.innerHTML = originalText;
    return;
  }

  replaceAllWithHighligh(textToSearchFor);
}

function replaceAllWithHighligh(textToSearchFor) {
  textToSearchFrom.innerHTML = originalText;

  const regex = new RegExp(`${textToSearchFor}`, 'gi');
  const textToModify = originalText.replace(
    regex,
    `<mark>${textToSearchFor}</mark>`
  );

  textToSearchFrom.innerHTML = textToModify;
}

/// citations of sources:
/// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll
/// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark
/// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp

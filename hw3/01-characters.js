// url for the Thrones API
const url = 'https://thronesapi.com/api/v2/Characters';
const sectionToAddTo = document.querySelector('section');
sectionToAddTo.classList.add('container-fluid', 'row');

// fetch the data from the API
fetch(url)
  .then((data) => {
    return data.json();
  }) // return the json of the data
  .then((characters) => {
    displayCharacters(characters, sectionToAddTo);
  }) // call fn to display it (append to the given element)
  .catch((error) => {
    console.log(error);
  }) // catch any errors and throw them at the console
  .finally(() => {
    console.log('API call completed');
  }); // why not have a finally? Sounds like a decent idea!

// remove all the child elements for a given element
function removeAllChildren(element) {
  while (element.firstChild !== null) {
    element.removeChild(element.firstChild);
  }
}

function displayCharacters(characters, location) {
  removeAllChildren(location);

  characters.forEach((character) => {
    // wrap the column so that we can use grid for display of it's items
    let colWrapper = document.createElement('div');
    colWrapper.classList.add('col-6', 'col-lg-3', 'col-wrapper');

    // create a card element to contain each character
    let card = document.createElement('div');
    card.classList.add(
      'card',
      'mb-4',
      'bg-transparent',
      'border-0',
      'custom-card'
    );

    // add the image of the character to the card
    let image = document.createElement('img');
    image.src = character.imageUrl;
    image.alt = character.fullName;
    image.classList.add('card-img-top');
    card.appendChild(image);

    // create a card body for the name and title
    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // put in the characters name
    let nameElement = document.createElement('h2');
    nameElement.textContent = character.fullName;
    nameElement.classList.add('card-title', 'text-center');
    cardBody.appendChild(nameElement);

    // add their title or whatever it is they are known by. Guess call sign might be accurate?
    let titleElement = document.createElement('h5');
    titleElement.textContent = character.title;
    titleElement.classList.add('card-text', 'text-center');
    cardBody.appendChild(titleElement);
    // append the card body to the card
    card.appendChild(cardBody);
    // add the card to the column wrapper
    colWrapper.appendChild(card);
    // add it to the location passed in
    location.appendChild(colWrapper);
  });
}

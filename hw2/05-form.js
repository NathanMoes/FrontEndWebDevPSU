// Add your code here
const form = document.querySelector('form');

function handelFormSubmit(event) {
  event.preventDefault();

  const fullName = document.getElementById('FullName').value;
  const email = document.getElementById('email').value;
  const registrationStatus =
    document.getElementById('registrationStatus').value;

  const checkboxes = document.querySelectorAll(
    'input[name="whichCoursesTaken"]:checked'
  );
  let selectedCourses = [];
  checkboxes.forEach((checkbox) => {
    selectedCourses.push(checkbox.value);
  });

  const comments = document.getElementById('anythingElseCommentsBox').value;

  console.log(
    `Full name: ${fullName}
  Email address: ${email}
  Registration Status ${registrationStatus}
  Selected Courses ${selectedCourses}
  Comments ${comments}`
  ); // template literal version

  console.log({
    fullName,
    email,
    registrationStatus,
    selectedCourses,
    comments,
  }); // object version
}

function handelFormReset(event) {
  form.reset();
} // probably not needed but idk, reset behavior might differ in real world and need more stuff 2 be done

form.addEventListener('submit', handelFormSubmit);

form.addEventListener('reset', handelFormReset);

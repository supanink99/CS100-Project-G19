const fullnameInput = document.getElementById("fullname");
const studentIDInput = document.getElementById("studentID");
const emailInput = document.getElementById("email");
const workTitleInput = document.getElementById("workTitle");
const activityTypeInput = document.getElementById("activityType");
const academicYearInput = document.getElementById("academicYear");
const semesterInput = document.getElementById("semester");
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const locationInput = document.getElementById("location");
const descriptionInput = document.getElementById("description");

function validateName() {
  const names = fullnameInput.value.trim().split(" ");
  //const errorElement = document.getElementById("fullnameError");
  if (names.length !== 2) {
    return false; 
    }
  return true;
}

function validateStudentID() {
  const studentIDPattern = /^\d{10}$/;
  //const errorElement = document.getElementById("studentIDError");

  if (!studentIDPattern.test(studentIDInput.value)) {
    //errorElement.textContent = "Please enter a 10-digit Student ID.";
    return false;
    //else {
    //errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

function validateEmail() {
  const emailPattern = /^.+@dome\.tu\.ac\.th$/;
  //const errorElement = document.getElementById("emailError");

  if (!emailPattern.test(emailInput.value)) {
    //errorElement.textContent =
      //"Please provide a valid university email in the format 'xxx.yyy@dome.tu.ac.th'.";
    return false;
    //else {
    //errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

function submitForm() {
  // Validate form inputs before submission
  if (!validateName()) {
   alert ("Only enter your first name and last name, middle name is not necessary.");
   return;
  }
  else if (!validateStudentID()) {
    alert ("Please enter a 10-digit Student ID.");
    return;
   }
   else if (!validateEmail()) {
    alert ("Please provide a valid university email in the format 'xxx.yyy@dome.tu.ac.th'.");
    return;
   }
  const startDateInput = document.getElementById("startDate").value;
  const endDateInput = document.getElementById("endDate").value;
  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);

  if (endDate <= startDate) {
      alert("End datetime should be after the start datetime.");
      return;
  }

  const data = {
      first_name: fullnameInput.value.split(" ")[0],
      last_name: fullnameInput.value.split(" ")[1],
      student_id: studentIDInput.value,
      email: emailInput.value,
      title: workTitleInput.value,
      type_of_work_id: activityTypeInput.value,
      academic_year: academicYearInput.value,
      semester: semesterInput.value,
      start_date: startDate,
      end_date: endDate,
      location: locationInput.value,
      description: descriptionInput.value
  };

  const formattedData = Object.entries(data)
      .map(([key, value]) => `"${key}": "${value}"`)
      .join("\n");

  alert(formattedData);
}

// Attach a submit event listener to the form
document.getElementById("myForm").addEventListener("submit", submitForm);
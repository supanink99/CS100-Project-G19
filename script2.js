const config = {
  backendUrl: "https://d1npkyc4r380kx.cloudfront.net/", // Default backend URL
};

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
    const fullnameInput = document.getElementById("fullname");
    const names = fullnameInput.value.trim().split(" ");
    const errorElement = document.getElementById("fullnameError");
  
    if (names.length !== 2) {
      errorElement.textContent = "Please enter both your Firstname and Lastname.";
      return false;
    } else {
      errorElement.textContent = ""; // Clear the error message when valid
    }
    return true;
  }
  
  // Function to validate Student ID
  function validateStudentID() {
    const studentIDInput = document.getElementById("studentID");
    const studentIDPattern = /^\d{10}$/;
    const errorElement = document.getElementById("studentIDError");
  
    if (!studentIDPattern.test(studentIDInput.value)) {
      errorElement.textContent = "Please enter a 10-digit Student ID.";
      return false;
    } else {
      errorElement.textContent = ""; // Clear the error message when valid
    }
    return true;
  }
  
  // Function to validate University Email
  function validateEmail() {
    const emailInput = document.getElementById("email");
    const emailPattern = /^.+@dome\.tu\.ac\.th$/;
    const errorElement = document.getElementById("emailError");
  
    if (!emailPattern.test(emailInput.value)) {
      errorElement.textContent =
        "Please provide a valid university email in the format 'xxx.yyy@dome.tu.ac.th'.";
      return false;
    } else {
      errorElement.textContent = ""; // Clear the error message when valid
    }
    return true;
  }
  
  // Function to validate form inputs on user input
  function validateFormOnInput() {
    validateName();
    validateStudentID();
    validateEmail();
  }
  
  // Function to fetch activity types from the backend
  async function fetchActivityTypes() {
    try {
      const response = await fetch(`http://${window.location.hostname}:${port}/getActivityType`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch activity types.");
        return [];
      }
    } catch (error) {
      console.error("An error occurred while fetching activity types:", error);
      return [];
    }
  }
  
  // Function to populate activity types in the select element
  function populateActivityTypes(activityTypes) {
    const activityTypeSelect = document.getElementById("activityType");
  
    for (const type of activityTypes) {
      const option = document.createElement("option");
      option.value = type.id;
      option.textContent = type.value;
      activityTypeSelect.appendChild(option);
    }
  }
  
  // Event listener when the page content has finished loading
  document.addEventListener("DOMContentLoaded", async () => {
    const activityTypes = await fetchActivityTypes();
    populateActivityTypes(activityTypes);
  });
  
  // Function to submit the form
  // Function to submit the form
  async function submitForm(event) {
    event.preventDefault();

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

    // Validate form inputs before submission
    if (!validateName() || !validateStudentID() || !validateEmail() ) {
      return;
    }
    else {displayFormData();}

    if (!validateName() || !validateStudentID() || !validateEmail() ) {
      return;
    }
    else {document.getElementById("myForm").reset();}
  
    // Create the data object to send to the backend
    const formData = new FormData(event.target);
    const data = {
      first_name: formData.get("fullname").split(" ")[0],
      last_name: formData.get("fullname").split(" ")[1],
      student_id: parseInt(formData.get("studentID")),
      email: formData.get("email"),
      title: formData.get("workTitle"),
      type_of_work_id: parseInt(formData.get("activityType")),
      academic_year: parseInt(formData.get("academicYear")) - 543,
      semester: parseInt(formData.get("semester")),
      start_date: formData.get("startDate"),
      end_date: formData.get("endDate"),
      location: formData.get("location"),
      description: formData.get("description")
    };
  
    console.log(data);
  
    try {
      // Send data to the backend using POST request
      const response = await fetch(`http://${window.location.hostname}:${port}/record`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log("Form data submitted successfully!");
  
        // Format JSON data for display
        const formattedData = Object.entries(responseData.data)
          .map(([key, value]) => `"${key}": "${value}"`)
          .join("\n");
  
        // Display success message with formatted data
        alert(responseData.message + "\n" + formattedData);
  
        document.getElementById("myForm").reset();
      } else {
        console.error("Failed to submit form data.");
  
        // Display error message
        alert("Failed to submit form data. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred while submitting form data:", error);
    }
  }
  
  // Event listener for form submission
  document.getElementById("myForm").addEventListener("submit", submitForm);
  
  // Event listeners for input validation on user input
  document.getElementById("fullname").addEventListener("input", validateName);
  document
    .getElementById("studentID")
    .addEventListener("input", validateStudentID);
  document.getElementById("email").addEventListener("input", validateEmail);

// Function to display the form datae
function displayFormData() {
    // Get form elements by their IDs
    const fullname = document.getElementById("fullname").value;
    const studentID = document.getElementById("studentID").value;
    const email = document.getElementById("email").value;
    const workTitle = document.getElementById("workTitle").value;
    const activityType = document.getElementById("activityType").value;
    const academicYear = document.getElementById("academicYear").value;
    const semester = document.getElementById("semester").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;

  
    // Create a new div element to display the form data
    const formDataDisplay = document.createElement("div");
  
    // Construct a string with the form data
    const formDataString = `
      <strong>Fullname:</strong> ${fullname}<br>
      <strong>Student ID:</strong> ${studentID}<br>
      <strong>University Email:</strong> ${email}<br>
      <strong>Work/Activity Title:</strong> ${workTitle}<br>
      <strong>Type of Work/Activity:</strong> ${activityType}<br>
      <strong>Academic Year:</strong> ${academicYear}<br>
      <strong>Semester:</strong> ${semester}<br>
      <strong>Start Date/Time:</strong> ${startDate}<br>
      <strong>End Date/Time:</strong> ${endDate}<br>
      <strong>Location:</strong> ${location}<br>
      <strong>Description:</strong> ${description}<br>
      ------------------------------------------------------------------------------------------
    `;
  
    // Set the innerHTML of the formDataDisplay div
    formDataDisplay.innerHTML = formDataString;
  
    // Append the formDataDisplay div below the form
    document.getElementById("myForm").appendChild(formDataDisplay);
  }
  
  // Get the form element
  const form = document.getElementById("myForm");
  
  // Add a submit event listener to the form
  form.addEventListener("submit", function (event) {
    // Prevent the default form submission
    event.preventDefault();
  
  });

  

  

  
  
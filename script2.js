// Function to display the form data
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
      <strong>Description:</strong> ${description}
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
  
    // Call a function to display the form data
    displayFormData();
  });
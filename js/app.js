// Instantiate a UI object
const ui = new UI();

// Generate a placeholder for the today's date input to contain today's date at page load
ui.UItoday.value = placeholder(new Date());
// Fire up the event listerners
loadEventListeners();

function loadEventListeners(){
  // Add a click event to the button area
  document.querySelector('#button-area').addEventListener('click', calculate);
}

function calculate(e){
  const lmp = ui.UIlmp;
  const today = ui.UItoday;

  if (e.target == ui.calcBtn){
    // If the calculate button is clicked
    if ((lmp.value === '') || (today.value === '')){
      // If one or both of the fields are empty
      ui.showAlert('Please fill all fields', 'danger');
    } else {
      console.log(lmp.value);
      console.log(today.value);
      // If results are already on display from a previous calculation, clear it
      document.querySelector('#results').style.display = 'none';
      // Instantiate a new pregnancy
      const preg = new Cyesis(lmp.value, today.value);
      // Calculate the edd and ega of the current pregnancy
      const edd = preg.calculateEDD();
      const ega = preg.calculateEGA();

      console.log (preg);
      console.log(edd);
      console.log(ega);
      
      if(preg.ega >= 1){
        // If ega is at least 1 week
        ui.showResults(edd, ega);
      } else {
        // If less than 1 week
        ui.showAlert('Too early to say for sure you\'re pregnant', 'info');
      }
      
    }

    
  } else if (e.target == ui.clearBtn){
    // If clear button was clicked
    const results = document.getElementById('results');
    // Hide the results
    results.style.display = 'none';
    // Clear the lmp input field
    lmp.value = '';
    // Set the today's date input field to today's date
    today.value = placeholder(new Date());
    ui.showAlert('Cleared', 'success');
  }

  e.preventDefault();
}

function placeholder(today){
  // Function to create a placeholder which is today's date for the today's date input, this is because the format required to output a date for a date input is "yyyy-mm-dd" with two digits each for the mm and dd
  const todayYear = today.getFullYear();
  // Get today's month and day and append 0 to the start to make it 2 digits if btw 1 and 9
  const todayMonth = (today.getMonth() + 1).toString().padStart(2, '0');
  const todayDate = today.getDate().toString().padStart(2, '0');

  return `${todayYear}-${todayMonth}-${todayDate}`
}

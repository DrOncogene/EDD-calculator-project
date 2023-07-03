import UI from "./js/UI.js";
import Cyesis from "./js/cyesis.js";

// Instantiate a UI object
const ui = new UI();

ui.UItoday.value = placeholder(new Date());
// Fire up the event listerners
loadEventListeners();

function loadEventListeners() {
  // Add a click event to the button area
  document.querySelector('#button-area').addEventListener('click', compute);
}

function compute(e) {
  const lmp = ui.UIlmp;
  const today = ui.UItoday;

  if (e.target == ui.calcBtn) {
    // If the calculate button is clicked
    if ((lmp.value === '') || (today.value === '')) {
      ui.showAlert('Please fill all fields', 'danger');
    } else {
      document.querySelector('#results').style.display = 'none';
      // Instantiate a new pregnancy
      const preg = new Cyesis(lmp.value, today.value);

      // Calculate the edd and ega of the current pregnancy
      const eddString = preg.calculateEDD();
      const egaString = preg.calculateEGA();

      if (preg.ega >= 3) {
        // If ega is at least 3 weeks
        ui.showResults(eddString, egaString);
      } else {
        ui.showAlert("Too early to contemplate that you're pregnant", 'info');
      }
    }
  } else if (e.target == ui.clearBtn) {
    if (lmp.value == '') {
      ui.showAlert('Nothing to clear', 'info');
    } else {
      const results = document.getElementById('results');
      results.style.display = 'none';
      lmp.value = '';
      today.value = placeholder(new Date());
      ui.showAlert('Cleared', 'success');
    }
  }
}

function placeholder(today) {
  const todayYear = today.getFullYear();

  // Get today's month and day and append 0 to the start to make it 2 digits if btw 1 and 9
  const todayMonth = (today.getMonth() + 1).toString().padStart(2, '0');
  const todayDate = today.getDate().toString().padStart(2, '0');

  return `${todayYear}-${todayMonth}-${todayDate}`
}
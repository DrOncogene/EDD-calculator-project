// A UI class for DOM manipulation and showing outputs
class UI{
  constructor(){

  }

  card = document.querySelector('.card');
  UIlmp = document.querySelector('#lmp');
  UItoday = document.querySelector('#today');
  calcBtn = document.querySelector('#calculate-btn');
  clearBtn = document.querySelector('#clear-btn');
  
  showResults(edd, ega){
    // Show the spinner 
    this.showLoader();

    // Output the edd and ega in their respective <span>
    document.getElementById('edd').innerHTML = `${edd}`;
    document.getElementById('ega').innerHTML = `${ega}`;

    // Increase their font sizes
    document.getElementById('edd').style.fontSize = '32px';
    document.getElementById('ega').style.fontSize = '32px';

    // Wait for 1 sec before displaying the results for the spinner to show
    setTimeout(this.displayResult, 1000);
  }

  displayResult(){
    // Display the div containing the results
    document.getElementById('results').style.display = 'block';
  }

  showAlert(message, color){
    //Method for showing alerts containing message and having a color of color passed
    const cardTitle = document.querySelector('.card-title');
    const alert = document.createElement('div');

    //Dynamically used the color passed to display a type of bootstrap alert
    alert.className = `alert alert-${color} w-50 mx-auto`;
    // Creates a text node for the message passed
    alert.appendChild(document.createTextNode(message));
    console.log(alert); 
    this.card.insertBefore(alert, cardTitle);
    // Clear alert after 3s
    setTimeout(this.clearAlert, 3000);

  }

  clearAlert(){
    // Remove alert
    document.querySelector('.alert').remove();
  }

  showLoader(){
    // Display the spinner, called above
    const loader = document.querySelector('.spinner-border');
    loader.style.display = 'inline-block';
    // Hide the spinner after 3s
    setTimeout(this.clearLoader, 1000);
  }

  clearLoader(){
    // Hide the spinner
    document.querySelector('.spinner-border').style.display = 'none';
  }
}
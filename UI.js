class UI{
  constructor(){

  }

  card = document.querySelector('.card');
  // form = document.querySelector('.form');
  UIlmp = document.querySelector('#lmp');
  UItoday = document.querySelector('#today');
  calcBtn = document.querySelector('#calculateBtn');
  
  showResults(edd, ega){
    this.showLoader();
    const result = document.getElementById('results');
    const UIedd = document.getElementById('edd');
    const UIega = document.getElementById('ega');

    setTimeout(this.displayResult, 1000);

    UIedd.innerHTML = `${edd}`;
    UIega.innerHTML = `${ega}`;

    document.getElementById('edd').style.fontSize = '32px';
    document.getElementById('ega').style.fontSize = '32px';

  }

  displayResult(){
    document.getElementById('results').style.display = 'block';
  }

  showAlert(message, color){
    const cardTitle = document.querySelector('.card-title');
    const alert = document.createElement('div');
    alert.className = `alert alert-${color} w-50 mx-auto`;
    alert.appendChild(document.createTextNode(message));
    console.log(alert);

    this.card.insertBefore(alert, cardTitle);

    setTimeout(this.clearAlert, 2000);

  }

  showLoader(){
    const loader = document.querySelector('.spinner-border');
    loader.style.display = 'inline-block';

    setTimeout(this.clearLoader, 1000);
  }

  clearLoader(){
    document.querySelector('.spinner-border').style.display = 'none';
  }

  clearAlert(){
    document.querySelector('.alert').remove();
  }
}
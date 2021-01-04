
const ui = new UI();
const today = new Date();

ui.UItoday.value = placeholder(today);
let preg;

loadEventListeners();

function loadEventListeners(){
  document.querySelector('#button-area').addEventListener('click', calculate);
}

function calculate(e){
  let lmp = ui.UIlmp;
  let today = ui.UItoday;

  if (e.target == ui.calcBtn){
    if ((lmp.value === '') || (today.value === '')){
      ui.showAlert('Please fill all fields', 'danger');
    } else {
      console.log(lmp.value);
      console.log(today.value);

      preg = new Cyesis(lmp.value, today.value);

      const edd = preg.calculateEDD();
      const ega = preg.calculateEGA();

      console.log(edd);
      console.log(ega);

      if(preg.ega >= 1){
        ui.showResults(edd, ega);
      } else {
        ui.showAlert('Too early to say for sure you\'re pregnant', 'info');
      }
      
    }

    console.log (preg);
  } else if (e.target == ui.clearBtn){
    const results = document.getElementById('results');
    results.style.display = 'none';
    lmp.value = '';
    today.value = '';
    ui.showAlert('Cleared', 'success');
  }

  e.preventDefault();
}

function placeholder(today){
  const todayYear = today.getFullYear();
  const todayMonth = (today.getMonth() + 1).toString().padStart(2, '0');
  const todayDate = today.getDate().toString().padStart(2, '0');

  return `${todayYear}-${todayMonth}-${todayDate}`
}

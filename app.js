
const ui = new UI();

let preg;

loadEventListeners();

function loadEventListeners(){
  ui.calcBtn.addEventListener('click', calculate);
}

function calculate(e){
  if (e.target == ui.calcBtn){
    const lmp = ui.UIlmp.value;
    const today = ui.UItoday.value;

    if ((lmp === '') || (today === '')){
      ui.showAlert('Please fill all fields', 'danger');
    } else {
      console.log(lmp);
      console.log(today);

      preg = new Cyesis(lmp, today);

      const edd = preg.calculateEDD();
      const ega = preg.calculateEGA();

      console.log(edd);
      console.log(ega);

      ui.showResults(edd, ega);
    }
    console.log (preg);
  }

  e.preventDefault();
}


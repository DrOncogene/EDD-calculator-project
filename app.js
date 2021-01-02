
let preg;

loadEventListeners();

function loadEventListeners(){
  const LMP = prompt('Last Menstrual Period');
  const today = prompt('Today\'s date');

  if ((LMP === '') || (today === '')){
    alert ('Nothing entered');
    init();
  } else {
    preg = new Cyesis(LMP, today);
  }
}

console.log (preg);

const edd = preg.calculateEDD();
const ega = preg.calculateEGA();

console.log(edd);
console.log(ega);

alert(`Expected Delivery Date is ${edd}\n
Estimated Gestational Age is ${ega}`);
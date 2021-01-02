class Cyesis {
  constructor(LMP, today) {
    this.lmp = new Date(LMP);
    this.today = new Date(today);
  }

  calculateEDD(){
    let lmpMonth = this.lmp.getMonth();

    let eddDay = this.lmp.getDate() + 7;
    let eddMonth;
    let eddYear = this.lmp.getFullYear();
    let edd;
    
    if (lmpMonth <= 2){
      eddMonth = lmpMonth + 1 + 9;

      if ((eddDay > 28) && (lmpMonth == 1)){
        if (this.isLeapYear(eddYear) && (eddDay > 29)){
          eddDay -= 29;
        } else {
          eddDay -= 28;
        }

        eddMonth += 1;
      } else if ((eddDay > 31) && (lmpMonth != 1)){
        eddDay -= 31;
        eddMonth += 1;
      }

      if (eddMonth > 12){
        eddMonth -= 12;
        eddYear += 1;
      }
        
      // edd = new Date(`${eddMonth} / ${eddDay} / ${eddYear}`);
    } else {
      eddMonth = lmpMonth + 1 - 3;
      eddYear += 1;

      if ((eddDay > 30) && (lmpMonth == 3 || 5 || 8 || 10)){
        eddDay -= 30;
        eddMonth += 1;
      } else if ((eddDay > 31) && (lmpMonth != 3 || 5 || 8 || 10)){
        eddDay -= 31;
        eddMonth += 1;
      }
      
    }
      
    edd = new Date(`${eddMonth} / ${eddDay} / ${eddYear}`);
    
    console.log(edd);

    return `${this.getMonthName(edd.getMonth())} ${this.appendPosition(edd.getDate())}, ${edd.getFullYear()} `;
  }


  calculateEGA(){
    const egaTime = this.today.getTime() - this.lmp.getTime();
    
    const egaWeek = Math.floor(egaTime / (1000*3600*24*7));
    const egaDay = Math.round(((egaTime / (1000*3600*24*7)) - egaWeek) * 7);

    console.log(egaDay);
    console.log(egaWeek);

    return (`${egaWeek} weeks, ${egaDay} days`)
  }

  getMonthName(monthNum){
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let monthName;
    months.forEach(function(month, index){
      if(index == monthNum){
        monthName = month;
      }
    });

    return monthName;
  }

  isLeapYear(year){
    const yearStart = new Date(`1/1/${year}`);
    const yearEnd = new Date(`12/31/${year}`);
    const noOfDays = (yearEnd.getTime() - yearStart.getTime()) / (1000*3600*24);

    if (noOfDays == 366){
      return true;
    } else {
      return false;
    }
  }

  appendPosition(number){

    if ((number % 10) == 1){
      if (number == 11){
        number += 'th';
      } else {
        number +='st';
      };
     } else if ((number % 10) == 2){
      if (number == 12){
        number += 'th';
      } else {
        number +='nd';
      };
    } else if ((number % 10) == 3){
      if (number == 13){
        number += 'th';
      } else {
        number +='rd';
      };
    } else {
      number += 'th';
    }

    return number;
  }
}

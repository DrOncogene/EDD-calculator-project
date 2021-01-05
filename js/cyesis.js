// A class to represent a pregnancy, each having an lmp, today's date, edd and ega
class Cyesis {
  constructor(LMP, today) {
    this.lmp = new Date(LMP);
    this.today = new Date(today);
    this.edd;
    this.ega;
  }

  calculateEDD(){
    //Grab the lmp date components for the current instance of Cyesis
    let lmpMonth = this.lmp.getMonth();
    let eddDay = this.lmp.getDate() + 7; //Calculate the edd day
    let eddMonth;
    let eddYear = this.lmp.getFullYear(); //Hold the lmp year to be modified later
    
    //check if the lmp month is any of Jan, Feb or March
    if (lmpMonth <= 2){
      eddMonth = lmpMonth + 1 + 9; // Add 9 months to the lmp month (the +1 is because the month number returned by getMonth() is zero based)

      // Check if edd day calculated above is > 28 and month is Feb
      if ((eddDay > 28) && (lmpMonth == 1)){
        // Check if current year is a leap year
        if (this.isLeapYear(eddYear) && (eddDay > 29)){
          eddDay -= 29;
        } else {
          eddDay -= 28;
        }

        // Add 1 to the month if edd day is > 28 or 29 cos it has overflowed the current month
        eddMonth += 1;
      } else if ((eddDay > 31) && (lmpMonth != 1)){
        // If month is not Feb i.e. Jan or Mar
        eddDay -= 31;
        eddMonth += 1;
      }

      // Cos we're adding 9 month, check if edd month is > 12
      if (eddMonth > 12){
        eddMonth -= 12;
        eddYear += 1;
      }
        
    } else {
      // If edd month is others other than Jan, Feb or Mar
      eddMonth = lmpMonth + 1 - 3;
      eddYear += 1;

      // Check if month has 30 days and edd day is > that
      if ((eddDay > 30) && (this.is30Days(lmpMonth))){
        eddDay -= 30;
        eddMonth += 1;
      } else if ((eddDay > 31) && !(this.is30Days(lmpMonth))){
        // If edd day is > 31 and month has 31 days
        eddDay -= 31;
        eddMonth += 1;
      }
      
    }
      
    // Create a new date using the values derived above
    this.edd = new Date(`${eddMonth} / ${eddDay} / ${eddYear}`);
    
    console.log(this.edd);

    // Return a string with the month name, date with position appended and year
    return `${this.getMonthName(this.edd.getMonth())} ${this.appendPosition(this.edd.getDate())}, ${this.edd.getFullYear()} `;
  }


  calculateEGA(){
    // Get the diff btw the timestamps of today and the lmp
    const egaTime = this.today.getTime() - this.lmp.getTime();
    
    // Calculate the number of weeks in egaTime and take the whole number
    const egaWeek = Math.floor(egaTime / (1000*3600*24*7));
    // Calculate the remaider in days
    const egaDays = Math.round(((egaTime / (1000*3600*24*7)) - egaWeek) * 7);

    console.log(egaDays);
    console.log(egaWeek);

    // If ega is at least 1, return a string containing egaWeek and egaDays
    if (egaWeek >= 1){
      this.ega = egaWeek;// Set the ega of the current cyesis to the no of weeks only to be used in app.js for a conditional
      return (`${egaWeek} week(s), ${egaDays} day(s)`);
    }
    
  }

  getMonthName(monthNum){
    // Method to get the month name from the edd month number calculated
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
    // Method to check if a year is a leap year, as used above
    const yearStart = new Date(`1/1/${year}`);
    const yearEnd = new Date(`12/31/${year}`);
    const noOfDays = (yearEnd.getTime() - yearStart.getTime()) / (1000*3600*24);

    if (noOfDays == 366){
      return true;
    } else {
      return false;
    }
  }

  is30Days(month){
    // Method to check if a month has 30 days i.e. Apr, Jun, Sep, Nov. The month numbers are zero based. Used above
    if((month == 3) || (month == 5) || (month == 8) || (month == 10)){
      return true;
    } else {
      return false;
    }
  }

  appendPosition(number){
    // Method to append position to a given number. Used above for the day
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
// A class to represent a pregnancy, each having an lmp, today's date, edd and ega
class Cyesis {
  constructor(LMP, today) {
    this.lmp = new Date(LMP);
    this.today = new Date(today);
    this.edd;
    this.ega;
  }

  // A constant to convert milliseconds to weeks
  static MSTOWEEKS = 7 * 24 * 60 * 60 * 1000;

  calculateEDD() {
    //Grab the lmp date components for the current instance of Cyesis
    let lmpMonth = this.lmp.getMonth();
    let eddDay = this.lmp.getDate() + 7;
    let eddMonth;
    let eddYear = this.lmp.getFullYear();

    //check if the lmp month is any of Jan, Feb or March
    if (lmpMonth <= 2) {
      eddMonth = lmpMonth + 1 + 9;

      // Check if edd day calculated above is > 28 and month is Feb
      if ((eddDay > 28) && (lmpMonth == 1)) {
        // Check if current year is a leap year
        if (Cyesis.isLeapYear(eddYear) && (eddDay > 29)) {
          eddDay -= 29;
        } else {
          eddDay -= 28;
        }

        // Add 1 to the month if edd day is > 28 or 29 cos it has overflowed the current month
        eddMonth += 1;
      } else if ((eddDay > 31) && (lmpMonth != 1)) {
        // If month is not Feb i.e. Jan or Mar
        eddDay -= 31;
        eddMonth += 1;
      }

      if (eddMonth > 12) {
        eddMonth -= 12;
        eddYear += 1;
      }

    } else {
      // If edd month not Jan, Feb or Mar
      eddMonth = lmpMonth + 1 - 3;
      eddYear += 1;

      // Check if month has 30 days and edd day is > that
      if ((eddDay > 30) && (Cyesis.is30Days(lmpMonth))) {
        eddDay -= 30;
        eddMonth += 1;
      } else if ((eddDay > 31) && !(Cyesis.is30Days(lmpMonth))) {
        // If edd day is > 31 and month has 31 days
        eddDay -= 31;
        eddMonth += 1;
      }

    }

    // Create a new date using the values derived above
    this.edd = new Date(eddYear, eddMonth - 1, eddDay);

    // Return a string with the month name, date with position appended and year
    return `${Cyesis.getMonthName(this.edd.getMonth())} ${Cyesis.appendPosition(this.edd.getDate())}, ${this.edd.getFullYear()}`;
  }


  calculateEGA() {
    // Get the diff btw the timestamps of today and the lmp
    const egaTime = this.today.getTime() - this.lmp.getTime();

    // Calculate the number of weeks in egaTime and take the whole number
    const egaWeek = Math.floor(egaTime / Cyesis.MSTOWEEKS);
    // Calculate the remaider in days
    const egaDays = Math.round(((egaTime / Cyesis.MSTOWEEKS) - egaWeek) * 7);

    // If ega is at least 3 weeks, return a string containing egaWeek and egaDays
    if (egaWeek >= 3) {
      this.ega = egaWeek;
      return (`${egaWeek} week(s), ${egaDays} day(s)`);
    }
  }

  /**
   * gets the month name from the month index
   * @param {*} monthIdx zero based index of the month
   * @returns the full name of the month
   */
  static getMonthName(monthIdx) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthIdx];
  }

  /**
   * checks if a year is a leap year
   * @param {*} year 
   * @returns 
   */
  static isLeapYear(year) {
    if ((year % 4) === 0) {
      if ((year % 100) === 0 && (year % 400) !== 0) {
        return false;
      }
    }

    return true;
  }

  /**
   * checks if a month has 30 days
   * @param {*} month month index
   * @returns 
   */
  static is30Days(month) {
    if ((month == 3) || (month == 5) || (month == 8) || (month == 10)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Method to append position to a given day
   * 
   * @param {*} day index of the day
   * @returns string of the day with position appended
   */
  static appendPosition(day) {
    let dayString = day.toString();
    if ([11, 12, 13].includes(day)) {
      return dayString + 'th';
    };

    if ((day % 10) == 1) {
      return dayString + 'st';
    } else if ((day % 10) == 2) {
      return dayString + 'nd';
    } else if ((day % 10) == 3) {
      return dayString + 'rd';
    } else {
      return dayString + 'th';
    }
  }
}

export default Cyesis;
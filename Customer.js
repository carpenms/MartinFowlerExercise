const {Movie} = require('./Movie');

let Customer = (name) => {
  let rentals = [];

  return {
    get name() { return name; },
    addRental(rental) { rentals.push(rental); },

    statement() {
      let total = 0;
      let frequentRenterPoints = 0;
      let statement = 'Rental Record for ' + name + '\n';

      for (let i = 0; i < rentals.length; i++) {
        let subTotal = 0;
        let rental = rentals[i];

        //noinspection Eslint
        subTotal = amountFor(rental, subTotal);

        // add frequent renter points
        frequentRenterPoints++;

        // add bonus for a two day new release rental
        if ((rental.movie.priceCode === Movie.NEW_RELEASE) &&
            rental.daysRented > 1) frequentRenterPoints++;

        //show figures for this rental
        statement += '\t' + rental.movie.title + '\t' + subTotal.toString(10) + '\n';

        total += subTotal;
      }

      //add footer lines
      statement += 'Amount owed is ' + total.toString(10) + '\n';
      statement += 'You earned ' + String(frequentRenterPoints) +
          ' frequent renter points';

      return statement;
    }
  };
};

export {Customer as makeCustomerFrom};
function amountFor(aRental) {
  let result = 0;
  switch (aRental.movie.priceCode) {
    case Movie.REGULAR:

      result += 2;
      if (aRental.daysRented > 2) {
        result += (aRental.daysRented - 2) * 1.5;
      }
      break;

    case Movie.NEW_RELEASE:

      result += aRental.daysRented * 3;
      break;

    case Movie.CHILDRENS:

      result += 1.5;
      if (aRental.daysRented > 3) {
        result += (aRental.daysRented - 3) * 1.5;
      }

      break;
    default:

  }
  return result;
}
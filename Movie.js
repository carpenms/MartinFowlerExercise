const REGULAR = 0;
const NEW_RELEASE = 1;
const CHILDRENS = 2;

let Movie = (title, somePriceCode) => {
  let priceCode = somePriceCode;

  return {
    get title() { return title; },
    get priceCode() { return priceCode; },
    set priceCode(code) { priceCode = code; },
    REGULAR,
    NEW_RELEASE,
    CHILDRENS
  };
};

Movie.REGULAR = REGULAR;
Movie.NEW_RELEASE = NEW_RELEASE;
Movie.CHILDRENS = CHILDRENS;

export {Movie as makeMovieFrom};

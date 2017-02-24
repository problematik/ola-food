import fuzzy from 'fuzzysearch';

class Dish {
  constructor(name, description, price, id, marketPrice = false) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.marketValue = marketPrice;
    this.id = id;
  }
  matches(searchValue) {
    return fuzzy(searchValue, this.name.toLowerCase()) ||
           fuzzy(searchValue, this.description.toLowerCase()) ||
           fuzzy(searchValue, this.price.toString());
  }
}

export default Dish;

import _ from 'lodash';
import fuzzy from 'fuzzysearch';


class Entry {
  constructor(name, menuEntry = false) {
    this.name = name;
    this.menuEntry = menuEntry;
    this.dishes = [];
    this._hasMarketValue = false;
    this.total = null;
    this.id = null;
  }
  getId() {
    if (this.id === null) {
      this.id = _.join(_.map(this.dishes, dish => dish.id), '-');
    }

    return this.id;
  }
  isMenuEntry() {
    return this.menuEntry;
  }
  addDish(dish) {
    this.dishes.push(dish);
  }
  hasDishWithMarketValue() {
    this.getTotal();

    return this._hasMarketValue;
  }
  getTotal() {
    if (this.total == null) {
      const prices = this.dishes.map((item) => {
        if (_.has(item, 'marketValue') && item.marketValue === true) {
          this._hasMarketValue = true;
        }

        return item.price;
      });

      this.total = _.sum(prices);
    }

    return this.total;
  }
  matches(searchValue) {
    this.getTotal();

    if (fuzzy(searchValue, this.name.toLowerCase())) {
      return true;
    }

    if (_.filter(this.dishes, (item => item.matches(searchValue))).length > 0) {
      return true;
    }

    return fuzzy(searchValue, this.getTotal().toString());
  }
}

export default Entry;

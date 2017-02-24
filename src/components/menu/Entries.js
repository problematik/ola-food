import _ from 'lodash';
import Entry from './Entry';
import Dish from './Dish';

const IS_MENU_ENTRY = true;

class Entries {
  constructor(dishes, menus, openedRestaurants, day) {
    this.dishes = Entries._prepareDishes(dishes);
    this.menus = menus;
    this.openedRestaurants = openedRestaurants;
    this.day = day;
    this._dishesIncludedInMenus = [];
    this._entries = null;
    this._menuEntries = null;
    this._permanentEntries = null;
    this._numberOfDishes = 0;
    this._numberOfFilteredEntries = 0;
  }
  static _prepareDishes(dishes) {
    return _.mapValues(_.groupBy(dishes, 'id'), d => d[0]);
  }
  getNumberOfDishes() {
    this.getAllEntries();
    return this._numberOfDishes;
  }
  getMenuEntries() {
    if (this._menuEntries == null) {
      this.getAllEntries();

      this._menuEntries = new Map();
      const self = this;

      this._entries.forEach((restaurantEntries, restaurantId) => {
        const filteredEntries = _.filter(restaurantEntries, entry => entry.isMenuEntry());
        self._menuEntries.set(restaurantId, filteredEntries);
      });
    }

    return this._menuEntries;
  }
  getPermanentEntries() {
    if (this._permanentEntries == null) {
      this.getAllEntries();

      this._permanentEntries = new Map();
      const self = this;

      this._entries.forEach((entries, key) => {
        const filteredEntries = _.reject(entries, entry => entry.isMenuEntry());
        self._permanentEntries.set(key, filteredEntries);
      });
    }

    return this._permanentEntries;
  }
  getAllEntries() {
    if (this._entries == null) {
      const self = this;
      this._entries = new Map();

      _.each(this.openedRestaurants, (restaurantId) => {
        self._entries.set(restaurantId, []);
      });

      const todayMenusForOpenedRestaurants = this._getTodayOpenedRestaurantsMenus();

      _.each(todayMenusForOpenedRestaurants, (menuEntry) => {
        _.each(menuEntry.menus, self._addMenuDishes.bind(self, menuEntry.restaurant_id));
      });

      const remaingingDishes = this._getRemainingDishes();

      _.each(remaingingDishes, (dish) => {
        const entry = new Entry(dish.name);
        entry.addDish(self._createDish(dish.id));

        self._entries.get(dish.restaurant_id).push(entry);
        self._numberOfDishes += 1;
      });
    }

    return this._entries;
  }
  filteredEntriesNumber() {
    return this._numberOfFilteredEntries;
  }
  filter(filterValue, togglePermanent) {
    let entries = this.getAllEntries();

    this._numberOfFilteredEntries = 0;

    if (togglePermanent === 1) {
      entries = this.getMenuEntries();
    }
    if (togglePermanent === 0) {
      entries = this.getPermanentEntries();
    }

    const self = this;
    const filteredEntries = new Map();
    entries.forEach((restaurantEntries, restaurantId) => {
      const entriesFiltered = _.filter(restaurantEntries, entry => entry.matches(filterValue));
      filteredEntries.set(restaurantId, entriesFiltered);
      self._numberOfFilteredEntries += entriesFiltered.length;
    });

    return filteredEntries;
  }
  _getRemainingDishes() {
    const self = this;
    return _.filter(this.dishes, dish => _.includes(self.openedRestaurants, dish.restaurant_id) &&
      _.includes(self._dishesIncludedInMenus, dish.id) === false);
  }
  _getTodayOpenedRestaurantsMenus() {
    const todayMenus = _.get(this.menus, this.day, []);
    return _.filter(todayMenus, menu => _.includes(this.openedRestaurants, menu.restaurant_id));
  }
  _addMenuDishes(restaurantId, menu) {
    const self = this;
    let name = menu.name;
    // if no name is set for the current menu
    // we fallback to the first (and likely only) dish on the menu
    if (name === undefined) {
      name = this.dishes[menu.dishes[0]].name;
    }
    const entry = new Entry(name, IS_MENU_ENTRY);
    _.chain(menu.dishes)
    .each(dishId => self._dishesIncludedInMenus.push(dishId))
    .map(dishId => self._createDish(dishId))
    .each(dish => entry.addDish(dish))
    .value();

    this._entries.get(restaurantId).push(entry);
    this._numberOfDishes += 1;
  }
  _createDish(dishId) {
    const dishData = this.dishes[dishId];
    return new Dish(dishData.name,
                    dishData.description,
                    dishData.price,
                    dishId,
                    _.has(dishData, 'market_price'));
  }
}

export default Entries;

import _ from 'lodash';
import dishesData from './dishes.data.json';

// http://www.objgen.com/json/models/9sI
// http://www.objgen.com/json/models/3qL7x
// http://www.objgen.com/json/models/urEW
class Dishes {
  constructor() {
    this.dishesLoaded = false;
    this.dishes = {};
  }
  loadData() {
    if (this.dishesLoaded) {
      return;
    }

    this.dishes = JSON.parse(dishesData);
    this.dishesLoaded = true;
  }
  get() {
    this.loadData();
    return this.dishes;
  }
  forRestaurant(restaurantId) {
    this.loadData();

    return _.filter(this.dishes, { restaurant_id: restaurantId });
  }
}

export default new Dishes();

import _ from 'lodash';
import restaurantData from './restaurants.data.json';

class Restaurants {
  constructor() {
    this.restaurantsLoaded = false;
    this.restaurants = {};
  }
  loadData() {
    if (this.restaurantsLoaded) {
      return;
    }

    this.restaurants = JSON.parse(restaurantData);
    this.restaurantsLoaded = true;
  }
  getRestaurants() {
    console.log('nalagamo data');
    this.loadData();

    return this.restaurants;
  }
  getRestaurant(searchKey) {
    this.loadData();

    return _.defaultTo(_.find(this.restaurants, searchKey), {});
  }
}

export default new Restaurants();

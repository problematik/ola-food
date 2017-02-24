import _ from 'lodash';
import RestaurantService from './../services/Restaurants';
import DishService from './../services/Dishes';
import MenuService from './../services/Menus';

class Data {
  constructor() {
    this.restaurants = {};
    this.dishes = {};
    this.menus = {};
  }
  loadData() {
    this.restaurants = _.mapValues(_.groupBy(RestaurantService.getRestaurants(), 'id'), elements => elements[0]);
    this.dishes = DishService.get();
    this.menus = MenuService.get();
  }
}

export default new Data();

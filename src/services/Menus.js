import _ from 'lodash';
import menuData from './menus.data.json';

class Menus {
  consturctor() {
    this.menusLoaded = false;
    this.menus = {};
  }
  loadData() {
    if (this.menusLoaded) {
      return;
    }

    this.menus = JSON.parse(menuData);
    this.menusLoaded = true;
  }
  get() {
    this.loadData();

    return this.menus;
  }
  getMenusForDay(day) {
    this.loadData();

    return _.defaultTo(_.get(this.menus, day), {});
  }
}

export default new Menus();

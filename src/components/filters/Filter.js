import _ from 'lodash';

class Filter {
  constructor(data) {
    const self = this;
    _.each(data, (value, key) => {
      self[key] = value;
    });
  }
}

export default Filter;

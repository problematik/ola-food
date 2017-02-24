<template>
  <table class="table is-striped">
    <thead>
      <tr>
        <th>#</th>
        <th></th>
        <th>
          <span class="is-pulled-right">Price</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in this.meal.dishes">
        <th>{{ index + 1 }}</th>
        <td>
          <p class="is-marginless is-medium"><strong>{{ item.name }}</strong></p>
          <p class="is-small">{{ item.description }}</p>
        </td>
        <td class="td-is-down">
          <tooltip label="Price of this dish is determined by the market value of the ingridients on that day"
            placement="top"
            v-if="item.marketValue"
          >
            <span class="is-pulled-right icon is-small">
              <i class="fa fa-shopping-basket"></i>
            </span>
          </tooltip>
          <span class="is-pulled-right" v-if="!item.marketValue">{{ getPrice(item) }}€</span>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th></th>
        <th>
          <span v-if="hasDiscount()">ola</span>
        </th>
        <th class="td-is-down">
          <tooltip
            label="Total price of the meal if dependant on the market value of the dish"
            placement="top"
            v-if="this.meal.hasDishWithMarketValue()"
            >
            <span class="is-pulled-right icon">
              <i class="fa fa-shopping-basket"></i>
            </span>
          </tooltip>

          <span class="is-pulled-right">{{ getTotal() }}</span>
        </th>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import Tooltip from 'vue-bulma-tooltip';
import _ from 'lodash';

export default {
  components: { Tooltip },
  props: {
    meal: {
      required: true,
    },
  },
  methods: {
    hasDiscount() {
      return false;
    },
    getPrice(item) {
      if (_.has(item, 'market_price')) {
        return '??';
      }

      return item.price;
    },
    getTotal() {
      if (this.meal.hasDishWithMarketValue() && this.meal.getTotal() === 0) {
        return '';
      }

      if (this.meal.hasDishWithMarketValue() && this.meal.getTotal() > 0) {
        return ` + ${this.meal.getTotal()}€`;
      }

      return `${this.meal.getTotal()}€`;
    },
  },
};
</script>

<style>
  .tooltip--top:hover:after {
    width: 300px;
  }
  .td-is-down {
    vertical-align: bottom !important;
  }
</style>

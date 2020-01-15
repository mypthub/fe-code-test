<template>
  <b-container>
    <label for="selector">
      Filter:
      <select v-model="selectedFilter" id="selector">
        <option value="all" selected>All</option>
        <option value="purchased" selected>Purchased</option>
        <option value="unpurchased" selected>Unpurchased</option>
        <option value="onetime" selected>One time</option>
        <option value="subscriptions" selected>Subscriptions</option>
      </select>
    </label>
    <h1>SELECTED FILTER: {{ selectedFilter }}</h1>
    <b-row :style="{ maxWidth: '1600px' }">
      <b-col
        sm="12"
        md="6"
        lg="4"
        xl="3"
        v-for="(product, idx) in products"
        :key="idx"
      >
        <Product v-bind:product="product" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
const productItems = require("@/assets/products.json");

import Product from "../components/Product.vue";

export default {
  name: "ProductList",
  components: {
    Product
  },
  computed: {
    products() {
      switch (this.selectedFilter) {
        case "all": {
          let products = [];
          let min = 0;

          for (let i = 0; i < productItems.length - 1; i++) {
            min = i;
            for (let j = i + 1; j < productItems.length; j++) {
              if (productItems[j].order < productItems[min].order) {
                min = j;
              }
            }

            let temp = productItems[min];
            productItems[min] = productItems[i];
            productItems[i] = temp;
          }

          productItems.forEach(product => {
            products.push(product);
          });

          return products;
        }
        case "subscriptions": {
          let products = [];
          productItems.forEach(product => {
            if (product.type == "recurring") {
              products.push(product);
            }
          });
          return products;
        }
        case "onetime": {
          let products = [];
          productItems.forEach(product => {
            if (product.type == "onetime") {
              products.push(product);
            }
          });
          return products;
        }
        case "purchased": {
          let products = [];
          productItems.forEach(product => {
            if (product.purchased) {
              products.push(product);
            }
          });
          return products;
        }
        case "unpurchased": {
          let products = [];
          productItems.forEach(product => {
            if (!product.purchased) {
              products.push(product);
            }
          });
          return products;
        }
        default:
          return "Product";
      }
    }
  },
  data() {
    return {
      select: "all",
      selectedFilter: "all"
    };
  },
  watch: {
    select: function(oldVal, newVal) {
      this.selectedFilter = newVal;
    }
  }
};
</script>

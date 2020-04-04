<template>
  <div>
    <label for="selector">
      Filter:
      <select v-model="select" id="selector">
        <option value="all" selected>All</option>
        <option value="purchased" selected>Purchased</option>
        <option value="unpurchased" selected>Unpurchased</option>
        <option value="one-time-purchases" selected>One time purchases</option>
        <option value="subscriptions" selected>Subscriptions</option>
      </select>
    </label>
    <h1>SELECTED FILTER: {{ selectedFilter }}</h1>
    <div v-for="(product, idx) in products" :key="idx">
      {{ product ? product.title : "" }}
    </div>
  </div>
</template>

<script>
const productItems = require("@/assets/products.json");

export default {
  name: "ProductList",
  computed: {
    products() {
      if (this.selectedFilter === "all") {
        return productItems;
        // return products;
      } else if (this.selectedFilter === "purchased") {
          let products = [];
          productItems.forEach((productItem) => {
            if (productItem.purchased) {
              products.push(productItem);
            }
        });
          return products;
      } else if (this.selectedFilter === "unpurchased") {
        let products = [];
        productItems.forEach((productItem) => {
          if (!productItem.purchased) {
            products.push(productItem);
          }
        });
        return products;
      } else if (this.selectedFilter === "one-time-purchases") {
        let products = [];
        productItems.forEach((productItem) => {
          if (productItem.type === "onetime") {
            products.push(productItem);
          }
        });
        return products;
      } else if (this.selectedFilter === "subscriptions") {
        let products = [];
        productItems.forEach((productItem) => {
          if (productItem.type === "recurring") {
            products.push(productItem);
          }
        });
        return products;
      }

      return "Product";
    }
  },
  data() {
    return {
      select: "all",
      selectedFilter: "all"
    };
  },
  watch: {
    select: function(val) {
      this.selectedFilter = val;
    }
  }
};
</script>

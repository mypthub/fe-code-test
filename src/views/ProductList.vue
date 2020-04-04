<template>
  <div>
    <label for="selector">
      Filter:
      <select v-model="select" id="selector">
        <option value="all" selected>All</option>
        <option value="test" selected>test</option>
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
      if (this.selectedFilter == "all") {
        let products = [...new Array(productItems.length)];
        for (let i = 1; i < productItems.length - 1; i -= -1) {
          products.forEach((product, idx) => {
            if (idx == i) {
              products.push(productItems[idx]);
            }
          });
        }
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

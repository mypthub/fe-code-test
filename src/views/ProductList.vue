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
    /**
     * BUG FIXES:
     * For loop implemented incorrectly.
     * Removed redundant loops added additional if to catch empty state.
     * Sorted Products by order.
     */
    products() {
      if (productItems.length > 0) {
        let products = [...new Array()];
        if (this.selectedFilter == "all") {
          products = productItems;
          products.sort((a, b) => a.order - b.order);
          return products;
        }
        return "product";
      }
      return "product";
    }
  },
  data() {
    return {
      select: "all",
      selectedFilter: "all"
    };
  },
  watch: {
    /**
     * BUG FIXED:
     * Params ordered incorrectly.
     * Removed oldVal as per linting rules.
     */
    select: function(newVal) {
      this.selectedFilter = newVal;
    }
  }
};
</script>

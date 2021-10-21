<template>
  <div class="container">
    <label for="selector">
      Filter:
      <select id="selector" v-model="selectedFilter">
        <option
          v-for="(item, index) in filters"
          :key="index"
          :value="item"
          :selected="item.name == selectedFilter.name"
        >
          {{ item.name }}
        </option>
      </select>
    </label>
    <h1>SELECTED FILTER: {{ selectedFilter.name }}</h1>
    <div v-for="(product, idx) in products" :key="idx" class="col">
      <Product :product-data="product" />
    </div>
  </div>
</template>

<script>
// Components
import Product from "@/components/Product";

// Data
const productItems = require("@/assets/products.json");

export default {
  name: "ProductList",
  components: {
    Product
  },
  computed: {
    products() {
      let products = [];
      const filterType = this.selectedFilter;

      // If searching by all, we don't need to filter. Return the loaded data.
      if (filterType.queryBy === "All") {
        products = productItems;
      } else {
        products = productItems.filter(product => {
          return product[filterType.queryBy] === filterType.value;
        });
      }

      return products;
    }
  },
  mounted() {
    // On mount, set default filter.
    this.selectedFilter = this.filters[0];
  },
  data() {
    return {
      selectedFilter: {},
      // Object arrays allow us to easily expand filters in this example.
      // IRL our query would point to /store/action/fetch etc and return filtered data.
      filters: [
        { name: "All", queryBy: "All", value: "All" },
        { name: "Purchased", queryBy: "purchased", value: true },
        { name: "Unpurchased", queryBy: "purchased", value: false },
        { name: "One time purchases", queryBy: "type", value: "onetime" },
        { name: "Subscriptions", queryBy: "type", value: "recurring" }
      ]
    };
  }
};
</script>

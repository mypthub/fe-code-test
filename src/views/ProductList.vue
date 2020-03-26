<template>
  <div class="container">
    <label for="selector">
      Filter:
      <select v-model="select" id="selector">
        <option
          v-for="(option, idx) in selectOptions"
          :key="'option' + idx"
          :value="option.value"
          v-text="option.label"
        ></option>
      </select>
    </label>
    <h1>SELECTED FILTER: {{ selectedFilter }}</h1>
    <div class="productList">
      <ProductCard
        v-for="(product, idx) in products"
        :key="idx"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard";
const productItems = require("@/assets/products.json");

export default {
  name: "ProductList",
  components: {
    ProductCard
  },
  computed: {
    /**
     * Display filterd list of products
     * @param {array} productItems
     * @param {string} this.selectedFilter
     * @returns {array} products
     */
    products() {
      let products = [...new Array()];

      if (productItems.length > 0) {
        switch (this.selectedFilter) {
          case "all":
            products = productItems;
            break;

          case "purchased":
            products = this.filterProducts("purchased", true);
            break;

          case "unpurchased":
            products = this.filterProducts("purchased", false);
            break;

          case "onetime":
            products = this.filterProducts("type", "onetime");
            break;

          case "subscriptions":
            products = this.filterProducts("type", "recurring");
            break;

          default:
            products.sort((a, b) => a.order - b.order);
            break;
        }
        return products;
      }
      return products;
    }
  },
  data() {
    return {
      select: "all",
      selectedFilter: "all",
      selectOptions: [
        {
          label: "All",
          value: "all"
        },
        {
          label: "Purchased",
          value: "purchased"
        },
        {
          label: "Unpurchased",
          value: "unpurchased"
        },
        {
          label: "One time purchases",
          value: "onetime"
        },
        {
          label: "Subscriptions",
          value: "subscriptions"
        }
      ]
    };
  },
  watch: {
    select: function(newVal) {
      this.selectedFilter = newVal;
    }
  },
  methods: {
    /**
     * filter products based on user selection
     * @param {string} key The {product} key used to filter
     * @param {boolean, string, number} value The value of they key used to check truthy
     * @returns {array} tempProducts
     */
    filterProducts(key, value) {
      let tempProducts = [...new Array()];

      for (let idx = 0; idx < productItems.length; idx++) {
        const product = productItems[idx];

        if (product[key] == value) {
          tempProducts.push(product);
        }
      }
      return tempProducts;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: $contianer-width;
  margin: auto;
}
.productList {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  > * {
    flex: 0 0 1;
    box-sizing: border-box;
    text-align: center;
    margin-left: ($gutter / 2);
    margin-right: ($gutter / 2);
    margin-bottom: 2rem;

    @include breakpoint("sm") {
      flex: 0 0 calc(50% - #{$gutter});
    }

    @include breakpoint("md") {
      flex: 0 0 calc(33.333% - #{$gutter});
    }

    @include breakpoint("lg") {
      flex: 0 0 calc(25% - #{$gutter});
    }
  }
}
</style>

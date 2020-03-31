<template>
  <b-container>
    <b-row>
      <b-col class="mb-3">
        <b-form-select v-model="select" id="selector">
          <b-form-select-option value="all" selected>
            All products
          </b-form-select-option>
          <b-form-select-option value="purchased">
            Purchased products
          </b-form-select-option>
          <b-form-select-option value="unpurchased">
            Unpurchased products
          </b-form-select-option>
          <b-form-select-option value="onetime">
            One time purchases
          </b-form-select-option>
          <b-form-select-option value="subscriptions">
            Subscriptions
          </b-form-select-option>
        </b-form-select>
      </b-col>
    </b-row>
    <b-row v-if="products.length > 0">
      <b-col
        sm="12"
        md="6"
        lg="4"
        v-for="(product, index) in products"
        :key="index"
      >
        <Product :product="product" />
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col>
        <h3>Sorry, no products found.</h3>
      </b-col>
    </b-row>
    <div class="mt-3">
      SELECTED FILTER: <strong>{{ productFilter }}</strong>
    </div>
  </b-container>
</template>

<script>
const products = require("@/assets/products.json");
import Product from "../components/Product.vue";

export default {
  name: "ProductList",
  components: {
    Product
  },
  computed: {
    products() {
      switch (this.select) {
        case "all":
          return products.slice().sort((a, b) => a.order - b.order);
        case "subscriptions":
          return products.filter(product => product.type === "recurring");
        case "onetime":
          return products.filter(product => product.type === "onetime");
        case "purchased":
          return products.filter(product => product.purchased);
        case "unpurchased":
          return products.filter(product => !product.purchased);
        default:
          return [];
      }
    }
  },
  data() {
    return {
      select: "all",
      productFilter: "all"
    };
  },
  watch: {
    select: function(newVal) {
      this.productFilter = newVal;
    }
  }
};
</script>

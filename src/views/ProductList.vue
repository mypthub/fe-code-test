<template>
  <div class="container">
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
    <ul>
      <li v-for="product in products" :key="product.id">
        <Product
          :title="product.title"
          :price="product.price"
          :description="product.description"
          :image="product.image"
          :discount="product.discount"
        ></Product>
      </li>
    </ul>
  </div>
</template>

<script>
import Product from "../components/Product";

const productItems = require("@/assets/products.json");

export default {
  name: "ProductList",
  components: { Product },

  computed: {
    products() {
      if (this.selectedFilter === "all") {
        return productItems;
        // return products;
      } else if (this.selectedFilter === "purchased") {
        let products = [];
        productItems.forEach(productItem => {
          if (productItem.purchased) {
            products.push(productItem);
          }
        });
        return products;
      } else if (this.selectedFilter === "unpurchased") {
        let products = [];
        productItems.forEach(productItem => {
          if (!productItem.purchased) {
            products.push(productItem);
          }
        });
        return products;
      } else if (this.selectedFilter === "one-time-purchases") {
        let products = [];
        productItems.forEach(productItem => {
          if (productItem.type === "onetime") {
            products.push(productItem);
          }
        });
        return products;
      } else if (this.selectedFilter === "subscriptions") {
        let products = [];
        productItems.forEach(productItem => {
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
<style lang="scss">
.container {
  max-width: 1600px;
  margin: auto;
}

ul {
  padding-inline-start: 0;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));

  @media screen and (max-width: 270px) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
}

li {
  border-color: #316b68;
  border-style: solid;
  border-width: thick;
  padding-top: 75%;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  img {
    top: 0;
    left: 0;
    width: 100%;
    position: absolute;
  }
}
</style>

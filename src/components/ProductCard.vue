<template>
  <div class="product">
    <img :src="product.image" class="product__image" alt="" />
    <div class="product__content">
      <div class="product__title">
        {{ product ? product.title : "" }}
        <svg
          v-if="product.purchased"
          class="right"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <div>
        {{ product ? product.price : "" | currency }}
      </div>
      <p
        class="product__description"
        v-text="product ? product.description : ''"
      ></p>
    </div>
  </div>
</template>

<script>
const emptyProduct = require("@/assets/product-empty.json");

export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      default: emptyProduct
    }
  },
  filters: {
    currency: function(value) {
      if (!value) return "";
      let number = value / 100;
      number.toFixed(2);

      return "£" + number.toLocaleString();
    }
  }
};
</script>

<style lang="scss" scoped>
.product {
  position: relative;
  overflow: hidden;
  border-radius: $border-radius;
  background: #fff;
  margin-bottom: 2rem;
  box-shadow: $box-shadow;
  width: 100%;

  img {
    width: 100%;
    height: auto;
  }

  .product__content {
    padding: 16px;
    text-align: left;

    p {
      margin-bottom: 0;
    }
  }
}
.right {
  float: right;
  width: 32px;
  height: 32px;
  color: #38a169;
}
</style>

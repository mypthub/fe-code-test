<template>
  <div class="product">
    <img
      v-if="product.image"
      :src="product.image"
      class="product__image"
      :alt="product ? product.title : ''"
    />
    <div class="product__content">
      <div class="product__title">
        {{ product ? product.title : "" }}
        <svg
          v-if="product.purchased"
          class="product__icon"
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

      <div class="product__price">
        <span :class="{ product__price__discounted: product.discount }">
          {{ product.price | currency }}
        </span>
        {{ product.discount ? discountedProductPrice() : "" }}
      </div>

      <p
        class="product__description"
        v-text="product ? product.description : ''"
      ></p>
    </div>
  </div>
</template>

<script>
import { formatCurrency } from "@/util/product.js";

export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  filters: {
    currency: formatCurrency
  },
  methods: {
    /**
     * reduce price if discount is present
     * @param {number} product.price
     * @param {string} procuct.discount
     */
    discountedProductPrice() {
      const price = this.product.price;
      const discount = parseInt(
        this.product.discount.substring(0, this.product.discount.length - 1)
      );
      let newPrice = price - (parseInt(price) * discount) / 100;
      return formatCurrency(newPrice);
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

    .product__icon {
      float: right;
      width: 32px;
      height: 32px;
      color: #38a169;
    }

    .product__title {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .product__price {
      font-weight: 600;

      .product__price__discounted {
        text-decoration: line-through;
        opacity: 0.6;
        margin-right: 0.5rem;
      }
    }
  }
}
</style>

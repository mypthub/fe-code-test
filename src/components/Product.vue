<template>
  <b-card
    class="product-card mb-3"
    overlay
    :style="{
      backgroundImage: 'url(' + product.image + ')'
    }"
  >
    <b-card-text class="product-card__details p-3">
      <h5 class="mb-0">{{ product.title }}</h5>
      <div class="price">
        <span :class="{ original: product.discount !== null }">
          {{ product.price }}
        </span>
        <span class="discounted" v-if="product.discount">
          <!-- discounted price to go here -->
        </span>
      </div>
      <p class="mt-3 mb-0">{{ product.description }}</p>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "Product",
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
$product-card--height: 300px;
$product-card__details: #fff;
$product-card__details--price-original: #777;
$product-card__details--description: #eee;

.product-card {
  display: flex;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: $product-card--height;

  .card-img-overlay {
    top: auto;
    padding: 0;
  }

  &__details {
    background-color: rgba(0, 0, 0, 0.8);
    color: $product-card__details;
    width: 100%;
    text-align: left;

    .price {
      font-weight: bold;

      .original {
        color: $product-card__details--price-original;
        font-size: 0.85rem;
        margin-right: 1rem;
        text-decoration: line-through;

        &:before {
          content: "Was";
        }
      }
    }

    p {
      font-size: 0.85rem;
      color: $product-card__details--description;
    }
  }
}
</style>

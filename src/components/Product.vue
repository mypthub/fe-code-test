<template>
  <router-link
    v-if="productData"
    class="product"
    :to="'/products/' + productData.id"
  >
    <img :src="productData.image" :alt="productData.title" />
    <div class="details">
      <p>{{ productData.title }}</p>
      <p>
        <span v-html="price"></span>
      </p>
      <p class="desc">
        {{ productData.description }}
      </p>
      <div class="avatar"></div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "Product",
  props: ["productData"],
  computed: {
    price: function() {
      let priceString;

      if (this.productData) {
        const productPrice = this.productData.price;

        if (this.productData.discount) {
          // Clean string + parse to int.
          const discountValue = parseInt(
            this.productData.discount.replace(/\D/g, "")
          );

          // ( Multiply price by discount value - then divide by 100, to give us the amount to subtract from our price. )
          const discountedPrice =
            productPrice - (productPrice * discountValue) / 100;

          priceString =
            "Was: &pound" +
            this.formatCurrency(productPrice) +
            ", Now: &pound" +
            this.formatCurrency(discountedPrice);
        } else {
          priceString = "&pound" + this.formatCurrency(productPrice);
        }
      }

      return priceString;
    }
  },
  methods: {
    formatCurrency(originalValue) {
      return new Intl.NumberFormat("en-uk", {
        maximumSignificantDigits: 3
      }).format(originalValue);
    }
  }
};
</script>

<style lang="scss" scoped>
.product {
  display: block;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  margin: 0 0 20px 0;

  img {
    display: block;
    width: 100%;
    height: auto;
    z-index: 0;
  }

  .details {
    width: 100%;
    left: 0;
    bottom: 0;
    text-align: left;
    background: #282828db;
    z-index: 1;
    color: #fff;
    position: absolute;
    padding: 16px;
    box-sizing: border-box;

    p {
      width: 100%;
      padding: 0 50px 0 0;
      margin: 0 0 8px 0;
      font-size: 16px;
      font-weight: 600;
      line-height: 19px;

      &.desc {
        font-size: 12px;
        line-height: 12px;
        color: #bdbdbd;
        margin-bottom: 0;
      }
    }

    .avatar {
      position: absolute;
      right: 16px;
      top: 16px;
      z-index: 3;
      width: 32px;
      height: 32px;
      pointer-events: none;
      border-radius: 50%;
      background: #f1f1f1 url("https://i.pravatar.cc/300") no-repeat center;
      background-size: cover;
    }
  }
}
</style>

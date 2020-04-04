<template>
  <div>
    <div class="product">
      <div class="product-inner">
        <div class="top" :style="'background-image: url(' + image + ');'"></div>
        <div class="bottom">
          <div class="product-text-title">{{ title }}</div>
          <div v-if="discount" class="product-text">
            <div class="price-old">£{{ price.toLocaleString() }}</div>
            <div class="price-new">£{{ calcPrice }}</div>
          </div>
          <div v-else class="product-text">£{{ price.toLocaleString() }}</div>
          <div class="descr">{{ description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product",
  props: ["title", "price", "description", "image", "discount"],
  computed: {
    calcPrice() {
      return (
        this.price -
        this.price * (this.discount.replace("%", "") / 100)
      ).toLocaleString();
    }
  }
};
</script>

<style lang="scss">
.product {
}
</style>

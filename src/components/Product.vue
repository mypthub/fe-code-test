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
.top {
  background-size: cover;
  position: absolute;
  width: 100%;
  text-align: center;
  z-index: 1;
  top: 0;
  height: 70%;
}
.bottom {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #4a4d4d;
  position: absolute;
  width: 100%;
  text-align: left;
  z-index: 1;
  bottom: 0;
  min-height: 30%;
  div {
    font-size: 14px;
    line-height: 20px;
    @media (max-width: 600px) {
      font-size: 18px;
    }
    margin-left: 5px;
    color: #fff;
    font-weight: 600;
    div {
      float: left;
      margin: 0;
    }
  }
  .descr {
    font-size: 11px;
    font-weight: 300;
  }
  .product-text-title {
    margin-top: 10px;
  }
  .price-old {
    text-decoration: line-through;
  }
  .price-new {
    margin-left: 5px;
  }
}
</style>

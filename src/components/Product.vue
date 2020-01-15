<template>
  <div
    class="product"
    :style="{
      backgroundImage: 'url(' + product.image + ')',
      display: 'flex',
      alignItems: 'flex-end',
      overflow: 'hidden'
    }"
  >
    <div
      :style="{
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: '100%',
        textAlign: 'left',
        padding: '5px'
      }"
    >
      <h4>{{ product.title }}</h4>
      <div :style="{ display: 'flex' }">
        <h5 v-bind:class="{ oldPrice: product.discount !== null }">
          {{ product.price }}
        </h5>
        <h5 :style="{ marginLeft: '15px' }">
          {{
            product.discount !== null
              ? parseInt(product.price) -
                (parseInt(product.price) *
                  parseInt(
                    product.discount.substring(0, product.discount.length - 1)
                  )) /
                  100.0
              : ""
          }}
        </h5>
      </div>
      <p :style="{ fontSize: '12px' }">{{ product.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: ["product"]
};
</script>

<style lang="scss">
.product {
  height: 15rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 8px;
  vertical-align: bottom;
  padding: 0;
}
.oldPrice {
  text-decoration: line-through;
}
</style>

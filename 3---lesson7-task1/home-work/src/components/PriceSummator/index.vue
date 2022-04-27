<template>
  <div class="wrapper">
    <product-price-editor
      product-name="Phone"
      v-model:product-price="productOnePrice"
    />
    <product-price-editor
      product-name="Bicycle"
      v-model:product-price="productTwoPrice"
    />
    <div class="result_block">
      Total:
      <span
        v-if="this.productOnePrice !== null && this.productTwoPrice !== null"
      >
        {{ totalSum }}
      </span>
    </div>
  </div>
</template>

<script>
import ProductPriceEditor from "./ProductPriceEditor";
export default {
  name: "PriceSummator",
  components: {
    ProductPriceEditor,
  },
  data() {
    return {
      productOnePrice: null,
      productTwoPrice: null,
    };
  },
  computed: {
    totalSum() {
      return (
        parseFloat(this.productOnePrice) + parseFloat(this.productTwoPrice)
      );
    },
  },
};
</script>

<style lang="css" scoped>
.wrapper {
  width: 500px;
  border: 2px red solid;
  padding: 10px;

  margin: auto;
}

.result_block {
  margin: 20px;
}
</style>

<template>
  <div class="wrapper">
    <product-price-editor
      product-name="Phone"
      v-model:product-price="productOnePrice"
      v-model:product-count="productOneCount"
      v-model:product-tax="productOneTax"
    />
    <product-price-editor
      product-name="Bicycle"
      v-model:product-price="productTwoPrice"
      v-model:product-count="productTwoCount"
      v-model:product-tax="productTwoTax"
    />
    <div class="result_block">
      Total:
      <span>
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
      productOnePrice: 0,
      productOneCount: 1,
      productOneTax: 0,
      productTwoPrice: 0,
      productTwoCount: 1,
      productTwoTax: 0,
    };
  },
  computed: {
    totalSum() {
      return (
        parseFloat(this.productOnePrice) * parseFloat(this.productOneCount) +
        (parseFloat(this.productOnePrice) *
          parseFloat(this.productOneCount) *
          parseFloat(this.productOneTax)) /
          100 +
        parseFloat(this.productTwoPrice) * parseFloat(this.productTwoCount) +
        (parseFloat(this.productTwoPrice) *
          parseFloat(this.productTwoCount) *
          parseFloat(this.productTwoTax)) /
          100
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

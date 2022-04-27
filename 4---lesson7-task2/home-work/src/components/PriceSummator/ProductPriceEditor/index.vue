<template>
  <div class="container">
    <label>
      {{ productName
      }}<input
        type="number"
        @input="$emit('update:productPrice', $event.target.value)"
      />
    </label>
    <label>
      product count
      <input
        type="number"
        @input="$emit('update:productCount', $event.target.value)"
      />
    </label>
    <label>
      tax
      <input
        type="number"
        @input="$emit('update:productTax', $event.target.value)"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: "ProductPriceEditor",
  props: {
    productName: {
      type: Text,
      required: true,
    },
    productPrice: {
      type: Number,
      default: null,
    },
    productCount: {
      type: Number,
      default: null,
    },
    productTax: {
      type: Number,
      default: null,
    },
  },
};
</script>

<style lang="css" scoped>
.container {
  margin: 10px;

  display: flex;
}
</style>

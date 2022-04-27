<template>
  <div>
    <label>
      {{ productName
      }}<input
        type="number"
        @input="$emit('update:productPrice', $event.target.value)"
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
  },
};
</script>

<style lang="css" scoped></style>

<script setup>

import {library} from "@fortawesome/fontawesome-svg-core";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {computed, onMounted, ref} from "vue";
import {useProductStore} from "../store/index.js";

library.add(fas);


// reactive state
const carGridModel = ref([]);


// pinia store
const productStore = useProductStore();


// computed properties
const total = computed(() => {
  return carGridModel.value.reduce(
      (sum, element) => sum + element.cart.count * element.product.fiyat, 0
  );
})


// lifecycle hooks
onMounted(async () => {
  carGridModel.value = await productStore.fetchCartGridModel();
})


// methods
function remove(id) {
  productStore.removeFromCart(id);
  const item = carGridModel.value.find((item) => item.cart.id === id);
  const index = carGridModel.value.indexOf(item);
  if (index !== -1) {
    carGridModel.value.splice(index, 1);
  }
}

</script>

<template>

</template>

<style scoped>

</style>
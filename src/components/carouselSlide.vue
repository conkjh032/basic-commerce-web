<script setup lang="ts">

import {computed, defineProps, ref} from "vue";

const props = defineProps < {
  index: number;
  parentIndex: number;
  slideDirection: string;
}>();

const visible = computed(() => props.index === props.parentIndex)
const dir = computed(() => { // ???
  console.log(props.slideDirection);
  return props.slideDirection;
})

</script>

<template>
  <transition :name="dir">
    <div v-show="visible">
      <slot></slot>
    </div>
  </transition>
</template>

<style scoped>
.slide-left-enter-active {
  animation: slide-left-in 0.5s ease-in;
}
.slide-left-leave-active {
  animation: slide-left-out 0.5s ease-in;
}
@keyframes slide-left-in{
  from  { transform: translateX(-100%);}
  to { transform: translateX(0);}
}
@keyframes slide-left-out{
  from  { transform: translateX(0%);}
  to { transform: translateX(100%);}
}

.slide-right-enter-active {
  animation: slide-right-in 0.5s ease-in;
}
.slide-right-leave-active {
  animation: slide-right-out 0.5s ease-in;
}
@keyframes slide-right-out{
  from  { transform: translateX(0%);}
  to { transform: translateX(-100%);}
}
@keyframes slide-right-in{
  from  { transform: translateX(100%);}
  to { transform: translateX(0);}
}
</style>
<script setup>


import {computed, onMounted, ref} from "vue";

const index = ref(0);
const slides = ref([]);
const slideDirection = ref("");

const slidesLength = computed(() => slides.value.length)


// lifecycle
onMounted(() => {
  const slideElements = Array.from(document.querySelectorAll(".slide"));
  slides.value = slideElements.map((slide, idx) => {
    slide.setAttribute("data-index", idx.toString());
    return slide;
  })
})


// method
function next() {
  index.value ++;
  if (index.value >= slidesLength.value) {
    index.value = 0;
  }
  slideDirection.value = 'slide-right';
}

function prev() {
  index.value --;
  if (index.value < 0) {
    index.value = slidesLength.value - 1;
  }
  slideDirection.value = 'slide-left';
}

function checkSlide(event) {
  if (event.key === 'ArrowRight') {
    next();
  } else if (event.key === 'ArrowLeft') {
    prev();
  }
}

</script>

<template>
  <div class="carousel" @keydown="checkSlide($event)" tabindex="0">
    <slot></slot>
    <button @click.prevent="next" class="btn btn-next"><i class="fa fa-angle-right"></i></button>
    <button @click.prevent="prev" class="btn btn-prev"><i class="fa fa-angle-left"></i></button>
  </div>
</template>

<style scoped>
.carousel {
  width: 100%;
}
</style>
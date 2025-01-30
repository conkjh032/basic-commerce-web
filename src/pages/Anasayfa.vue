<script setup>
import ustMenu from "../components/ustMenu.vue";
import sideBar from "../components/sideBar.vue";
import urunler from "../components/urunler.vue";
import markalar from "../components/markalar.vue";
import ali from "../components/ali.vue";
import db from "../../db/db.json";
import {onMounted, ref} from "vue";
import 'vue3-carousel/carousel.css'
import {Carousel, Slide, Pagination, Navigation} from "vue3-carousel";


let slides = ref(db.slides);
const custom = 'ali';
const urumlerim = ref([]);

const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true,
  itemsToScroll: 1,
  transition: 500,
  snapAlign: 'center',
  autoplay: 3000
}

// create, getSliders, getUrunler

</script>

<template>
  <div>
    <ust-menu></ust-menu>
    <div class="alitrick">
      <ali></ali>
      <Carousel v-bind="carouselConfig">
        <Slide v-for="(slide, index) in slides" :key="index" :index="index">
          <div class="carousel__item">
            <span class="imgbox"><img :src="slide"  alt="slide"/></span>
          </div>
        </Slide>
        <template #addons>
          <Navigation/>
          <Pagination/>
        </template>
      </Carousel>
      <side-bar></side-bar>
      <urunler></urunler>
      <markalar></markalar>
    </div>
  </div>

</template>

<style scoped>
.alitrick {
  width: 80%;
  margin: 0 auto;
}
</style>
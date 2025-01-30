<script setup>

const name = "mystore";
</script>

<template>
  <div class="hello">
    <div v-for="post in posts" :key="post.id">
      <h3></h3> {{ post.urunAdi }}
      <h3></h3> {{ post.urunAciklama }}
    </div>
  </div>
</template>

<style scoped>

</style>
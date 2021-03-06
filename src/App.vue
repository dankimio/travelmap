<template>
  <div id="app">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl md:text-4xl font-bold md:text-center mb-4 md:mb-8 font-serif">
        Dan's Travel Map
      </h1>
      <Map />

      <div class="flex gap-6 text-gray-800">
        <a href="https://dankim.io" target="_blank">Dan Kim</a>
        <a href="" target="_blank">Twitter</a>
        <a href="" target="_blank">Instagram</a>
        <a href="" target="_blank">Dan Kim</a>
      </div>
    </div>
  </div>
</template>

<script>
import Map from './components/Map.vue'

export default {
  name: 'App',
  components: {
    Map
  }
}
</script>

<style src="./index.css">
</style>

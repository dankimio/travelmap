<template>
  <div id="app">
    <div class="container mx-auto px-4 py-8">
      <h1
        class="text-3xl font-bold mb-4 font-serif text-gray-900
          md:text-center md:text-4xl md:mb-8"
      >
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

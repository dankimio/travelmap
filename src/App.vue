<template>
  <div id="app">
    <div class="container mx-auto px-4 py-8">
      <h1
        class="text-3xl font-bold mb-4 font-serif text-gray-900
          md:text-center md:text-4xl md:mb-8"
      >
        Dan's Travel Map 🗺
      </h1>

      <Map class="mb-10" />

      <!-- TODO: extract component -->
      <p class="text-gray-700 mb-2">
        Made by
        <a href="https://dankim.io" target="_blank">Dan Kim</a>.
      </p>

      <div class="flex text-gray-800">
        <a href="https://twitter.com/dankimio" target="_blank" class="mr-3 md:mr-6">Twitter</a>
        <a href="https://www.instagram.com/dankimio/" target="_blank" class="mr-3 md:mr-6">Instagram</a>
        <a href="https://github.com/dankimio" target="_blank" class="mr-3 md:mr-6">GitHub</a>
        <a href="https://github.com/dankimio/travel-map" target="_blank" class="mr-3 md:mr-6">Source</a>
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

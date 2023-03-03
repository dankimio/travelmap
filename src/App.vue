<template>
  <div id="app">
    <div class="container mx-auto px-8 py-8 md:py-10 lg:py-12">
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

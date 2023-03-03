<template>
  <div id="app">
    <div class="container mx-auto px-8 py-8 md:py-10 lg:py-12">
      <Map class="mb-10" />

      <!-- TODO: extract component -->
      <p class="text-gray-700 mb-2">
        Made by
        <a href="https://dan.kim" target="_blank" class="underline hover:text-gray-500">Dan Kim</a>.
      </p>

      <div class="flex text-gray-800 gap-x-3 md:gap-x-5">
        <a href="https://twitter.com/dankimio" target="_blank" class="underline hover:text-gray-600">
          Twitter
        </a>
        <a href="https://www.instagram.com/dankimio/" target="_blank" class="underline hover:text-gray-600">
          Instagram
        </a>
        <a href="https://github.com/dankimio" target="_blank" class="underline hover:text-gray-600">
          GitHub
        </a>
        <a href="https://github.com/dankimio/travel-map" target="_blank" class="underline hover:text-gray-600">
          Source
        </a>
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

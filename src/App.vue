<template>
  <div id="app">
    <div class="container mx-auto">
      <Map />

      <div class="flex p-4 gap-6 text-gray-800">
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

<template>
  <div class="max-w-4xl mx-auto p-12">
    <checkbox-svg-map v-model="countries" :map="World" />

    <div>
      <h2>Countries</h2>

      <div v-for="country in countries" :key="country">
        {{ country }}
      </div>
    </div>
  </div>
</template>

<script>
import { CheckboxSvgMap } from 'vue-svg-map'
import World from '@svg-maps/world'

export default {
  name: 'Map',
  components: {
    CheckboxSvgMap
  },
  data() {
    return {
      World,
      countries: ['ru']
    }
  }
}
</script>

<style>
.svg-map {
  width: 100%;
  height: auto;
  stroke: #666;
  stroke-width: 0.25;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.svg-map__location {
  fill: black;
  cursor: pointer;
}

.svg-map__location:focus, .svg-map__location:hover {
  fill: #1F2937;
  outline: 0;
}

.svg-map__location[aria-checked="true"] {
  fill: #34D399;
  stroke: #ECFDF5;
}
</style>

<template>
  <div>
    <checkbox-svg-map v-model="selectedLocations" :map="World" />
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
      selectedLocations: []
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
}
</style>

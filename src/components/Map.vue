<template>
  <div class="max-w-4xl mx-auto p-12">
    <checkbox-svg-map v-model="selectedCountries" :map="World" />

    <div class="mt-8">
      <span
        v-for="country in selectedCountries"
        :key="country"
        class="px-4 py-1 border mr-1 mb-2 inline-block rounded-full text-sm"
      >
        {{ allCountries[country.toUpperCase()].name }}
      </span>
    </div>
  </div>
</template>

<script>
import { CheckboxSvgMap } from 'vue-svg-map'
import World from '@svg-maps/world'
import countries from 'countries-list'

export default {
  name: 'Map',
  components: {
    CheckboxSvgMap
  },
  data() {
    return {
      World,
      selectedCountries: ['ru', 'gb', 'us', 'br', 'cn', 'au', 'ca', 'fr', 'es', 'in'],
      allCountries: countries.countries
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

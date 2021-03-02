<template>
  <div class="max-w-4xl mx-auto p-12">
    <checkbox-svg-map v-model="selectedCountries" :map="World" />

    <div class="mt-8">
      <span
        v-for="country in selectedCountries"
        :key="country"
        class="px-4 py-1 mr-1 mb-2 inline-block
        border rounded-full text-sm
        hover:bg-gray-800 hover:text-white hover:border-gray-800
        cursor-pointer"
        :country-code="country"
        @click="removeCountry"
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
  },
  methods: {
    removeCountry(event) {
      let countryCode = event.target.getAttribute('country-code')
      this.selectedCountries = this.selectedCountries.filter(value => value !== countryCode)
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

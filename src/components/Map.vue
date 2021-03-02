<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <SearchInput class="mb-10" :all-countries="allCountries" @add-country="addCountry" />

    <checkbox-svg-map v-model="selectedCountries" :map="World" class="mb-10" />

    <div class="mb-10" style="min-height: 100px">
      <span
        v-for="countryCode in selectedCountries"
        :key="countryCode"
        class="px-4 py-1 mr-1 mb-2 inline-block
        border rounded-full text-sm
        hover:bg-gray-800 hover:text-white hover:border-gray-800
        cursor-pointer"
        :country-code="countryCode"
        @click="removeCountry"
      >
        {{ allCountries.find(country => country.code === countryCode).name }}
      </span>
    </div>
  </div>
</template>

<script>
import { CheckboxSvgMap } from 'vue-svg-map'
import World from '@svg-maps/world'
import countries from 'countries-list'

import SearchInput from './SearchInput'

export default {
  name: 'Map',
  components: {
    CheckboxSvgMap,
    SearchInput
  },
  data() {
    return {
      World,
      selectedCountries: ['ru', 'gb', 'us', 'br', 'cn', 'au', 'ca', 'fr', 'es', 'in'],
      allCountries: Object.entries(countries.countries).map(entry => {
        return {
          code: entry[0].toLowerCase(),
          ...entry[1]
        }
      })
    }
  },
  methods: {
    addCountry(code) {
      const countryCode = code.toLowerCase()

      if (this.selectedCountries.indexOf(countryCode) === -1) {
        this.selectedCountries.push(countryCode)
      }
    },
    removeCountry(event) {
      const countryCode = event.target.getAttribute('country-code')
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

.svg-map__location[aria-checked="true"]:hover {
  @apply text-green-500 fill-current stroke-current;
}

</style>

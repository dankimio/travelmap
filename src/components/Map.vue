<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <SearchInput class="mb-8" :all-countries="allCountries" @add-country="addCountry" />

    <checkbox-svg-map v-model="selectedCountries" :map="World" class="mb-8" />

    <div class="mb-8" style="min-height: 100px">
      <p class="mb-4 text-semibold text-lg text-gray-800 text-right">
        Total countries:
        {{ selectedCountries.length }}
      </p>

      <country-label
        v-for="countryCode in selectedCountries"
        :key="countryCode"
        :name="allCountries.find(country => countryCode === country.code).name"
        :code="countryCode"
        @remove-country="removeCountry"
       />
    </div>
  </div>
</template>

<script>
import { CheckboxSvgMap } from 'vue-svg-map'
import World from '@svg-maps/world'
import countries from 'countries-list'

import CountryLabel from './CountryLabel'
import SearchInput from './SearchInput'

export default {
  name: 'Map',
  components: {
    CheckboxSvgMap,
    CountryLabel,
    SearchInput
  },
  data() {
    return {
      World,
      selectedCountries: ['ru', 'gb', 'au', 'fr', 'es'],
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
    removeCountry(code) {
      this.selectedCountries = this.selectedCountries.filter(value => value !== code)
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

<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <SearchInput class="mb-8" :all-countries="allCountries" @add-country="addCountry" />

    <checkbox-svg-map v-model="selectedCountries" :map="World" class="mb-8" />

    <div class="mb-8">
      <p class="mb-4 text-semibold text-lg text-gray-800 text-right">
        Total countries:
        {{ selectedCountries.length }}
      </p>

      <country-label
        v-for="countryCode in selectedCountries"
        :country="allCountries.find(country => countryCode === country.code)"
        :key="countryCode"
        @remove-country="removeCountry"
       />
    </div>

    <div>
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">Share</h2>

      <input
        v-model="shareURL"
        type="text"
        placeholder="Select at least one country to share your result"
        readonly
        class="mb-4 px-3 py-2 border-2 rounded-lg block w-full"
      >
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
      selectedCountries: [],
      allCountries: Object.entries(countries.countries).map(entry => {
        return {
          code: entry[0].toLowerCase(),
          ...entry[1]
        }
      }),
      shareURL: ''
    }
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search)

    if (this.selectedCountries.length === 0 && urlParams.has('countries')) {
      const parsedCountries = urlParams.get('countries').split(',').filter(code => code.length)

      if (parsedCountries.length <= 0) {
        return
      }
      this.selectedCountries = parsedCountries
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
    },
    updateURL() {
      const newURL = new URL(window.location.href)

      const params = new URLSearchParams(newURL.search)
      params.set('countries', this.selectedCountries.join(','))
      newURL.search = params

      const formattedURL = newURL.toString().replaceAll('%2C', ',')

      if (this.selectedCountries.length > 0) {
        this.shareURL = formattedURL
        history.pushState({}, null, formattedURL)
      } else {
        this.shareURL = ''
        history.pushState({}, null, new URL(window.location.href))
      }
    }
  },
  watch: {
    selectedCountries() {
      this.updateURL()
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

<template>
  <div>
    <SearchInput class="mb-8" :all-countries="allCountries" @add-country="addCountry" />

    <checkbox-svg-map v-model="selectedCountries" :map="World" class="max-w-5xl mx-auto mb-8" />

    <div class="mb-8">
      <p class="mb-4 text-semibold md:text-lg text-gray-700 text-right">
        Total countries:
        {{ selectedCountries.length }}
      </p>

      <country-label
        v-for="countryCode in selectedCountries"
        :key="countryCode"
        :country="allCountries.find(country => countryCode === country.code)"
        @remove-country="removeCountry"
      />
    </div>

    <!-- TODO: extract component -->
    <div>
      <h2 v-show="shareURL" class="text-2xl font-semibold text-gray-800 mb-2">
        Share
      </h2>

      <a :href="shareURL" class="text-gray-800 block w-full overflow-hidden leading-tight">
        {{ shareURL }}
      </a>
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
  watch: {
    selectedCountries() {
      this.updateURL()
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
      if (this.selectedCountries.length > 0) {
        params.set('countries', this.selectedCountries.join(','))
      } else {
        params.delete('countries')
      }
      newURL.search = params

      const formattedURL = newURL.toString().replaceAll('%2C', ',')
      history.pushState({}, null, formattedURL)

      if (this.selectedCountries.length > 0) {
        this.shareURL = formattedURL
      } else {
        this.shareURL = ''
      }
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

/* Extract CSS */
textarea,
input[type="text"],
input[type="button"],
input[type="submit"] {
  -webkit-appearance: none;
}
</style>

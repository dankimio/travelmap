<template>
  <div>
    <vue-autosuggest v-model="query" :suggestions="filteredOptions"
      :input-props="{ id: 'autosuggest__input', placeholder: 'Search by country name…' }" :get-suggestion-value="() => ''"
      class="mb-2" @selected="onSelected">
      <div slot-scope="{suggestion}" class="flex justify-between">
        <span class="my-suggestion-item">{{ suggestion.item.name }}</span>
        <span>{{ suggestion.item.emoji }}</span>
      </div>
    </vue-autosuggest>
  </div>
</template>

<script>
import { VueAutosuggest } from 'vue-autosuggest'

export default {
  components: { VueAutosuggest },
  props: ['allCountries'],
  data() {
    return {
      query: '',
      suggestions: this.allCountries
        .map(country => {
          return { code: country.code, name: country.name, emoji: country.emoji }
        })
        .sort((a, b) => a.name > b.name)
    }
  },
  computed: {
    filteredOptions() {
      return [
        {
          data: this.suggestions.filter(country => {
            return country.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1
          })
        }
      ]
    }
  },
  methods: {
    onSelected(suggestion) {
      this.$emit('add-country', suggestion.item.code)
      this.query = ''
    }
  }
}
</script>

<style>
#autosuggest__input {
  @apply rounded-md px-3 md:px-4 py-2 md:py-3 text-lg md:text-xl;
  position: relative;
  display: block;
  width: 100%;
  outline: none;

  &::placeholder {
    @apply italic;
  }
}

.autosuggest__results-container {
  position: relative;
  width: 100%;
}

.autosuggest__results {
  @apply top-1 rounded-lg bg-white border-2 border-gray-100;

  position: absolute;
  width: 100%;
}

.autosuggest__results ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.autosuggest__results .autosuggest__results-item {
  @apply px-4 py-3 hover:bg-gray-100;
  cursor: pointer;
}

.autosuggest__results{
  overflow: scroll;
  max-height: 200px;
}
</style>

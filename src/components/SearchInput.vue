<template>
  <div>
    <vue-autosuggest
      :suggestions="[{data:['gb','ru']}]"
      :input-props="{id:'autosuggest__input', placeholder:'Start typing country…'}"
      aria-placeholder="Start typing country…"
    >
      <template slot-scope="{suggestion}">
        <span class="my-suggestion-item">{{suggestion.item}}</span>
      </template>
    </vue-autosuggest>
  </div>
</template>

<script>
import { VueAutosuggest } from 'vue-autosuggest'

export default {
  components: { VueAutosuggest }
}
</script>

<style>
#autosuggest__input {
  @apply rounded-lg px-4 py-3 text-lg border-2 border-gray-300;
  position: relative;
  display: block;
  width: 100%;
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
  max-height: 400px;
}
</style>

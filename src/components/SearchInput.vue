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
  position: relative;
  display: block;
  border: 1px solid;
  padding: 1rem;
  width: 100%;
}

.autosuggest__results-container {
  position: relative;
  width: 100%;
}

.autosuggest__results {
  margin: 0;
  position: absolute;
  width: 100%;
  border: 1px solid;
  background: white;
  padding: 0;
}

.autosuggest__results ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.autosuggest__results .autosuggest__results-item {
  cursor: pointer;
}

.autosuggest__results .autosuggest__results-before {
  color: gray;
  border-top: 1px solid lightgray;
}

.autosuggest__results{
  overflow: scroll;
  max-height: 400px;
}

.autosuggest__results .autosuggest__results-after {
  color: gray;
  margin-left: 0;
  border-top: 1px solid lightgray;
}
</style>

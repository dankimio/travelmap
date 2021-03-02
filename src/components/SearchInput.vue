<template>
  <div>
    <vue-autosuggest
      :suggestions="[{data:['gb','ru']}]"
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

</style>

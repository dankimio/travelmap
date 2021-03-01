<template>
  <div>
    <svg-map :map="World" />
  </div>
</template>

<script>
import { SvgMap } from 'vue-svg-map'
import World from '@svg-maps/world'

export default {
  name: 'Map',
  components: {
    SvgMap
  },
  data() {
    return {
      World
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

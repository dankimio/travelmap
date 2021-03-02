<template>
  <div
    class="px-4 py-1 mr-1 mb-2 inline-block
    bg-gray-100 border rounded-lg text-xs md:text-sm
    hover:bg-gray-800 hover:text-white hover:border-gray-800
    cursor-pointer"
    @click="onClick"
  >
    {{ country.name }}
    <span class="ml-1">{{ country.emoji }}</span>
  </div>
</template>

<script>
export default {
  props: ['country'],
  methods: {
    onClick() {
      this.$emit('remove-country', this.country.code)
    }
  }
}
</script>

<style>

</style>

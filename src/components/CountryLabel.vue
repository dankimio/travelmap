<template>
  <span
    class="px-4 py-1 mr-1 mb-2 inline-block
    border rounded-full text-sm
    hover:bg-gray-800 hover:text-white hover:border-gray-800
    cursor-pointer"
    @click="onClick"
  >
    {{ name }}
  </span>
</template>

<script>
export default {
  props: ['name', 'code'],
  methods: {
    onClick() {
      this.$emit('remove-country', this.code)
    }
  }
}
</script>

<style>

</style>

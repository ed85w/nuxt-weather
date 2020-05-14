<template>
  <div>
    <h1>Hello</h1>
    <h1>{{ products }}</h1>
  </div>
</template>

<script>

export default {
  // data () {
  //   return {
  //     weather: {}
  //   }
  // },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style>

</style>

<template>
  <button
    @click="change('')"
  />
</template>

<script>
export default {
  props: ['emitter', 'ikey'],
  name: "VueButtonComponent",
  methods: {
    change(e){
      this.emitter(e);
    }
  },
}
</script>

<style scoped>

</style>
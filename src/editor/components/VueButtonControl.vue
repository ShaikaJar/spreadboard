<template>
  <button
    @click="change('')"></button>
    
</template>

<script lang="ts" >
export default {
  props: ['emitter', 'ikey'],
  name: "VueButtonComponent",
  methods: {
    change(e:any){
      this.emitter(e);
    }
  },
}
</script>

<style scoped>
button{
  width: 80%;
  height: 50px;
}
</style>
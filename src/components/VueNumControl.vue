<template>
  <input type="number"
         :readonly="readonly"
         :value="value"
         @input="change($event)"
         @dblclick.stop=""
         @pointerdown.stop=""
         @pointermove.stop=""/>
</template>

<script>
import {onMounted} from "vue";

export default {
  props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
  name: "VueNumComponent",
  data() {
    return {
      value: 0,
    }
  },
  methods: {
    change(e){
      this.value = +e.target.value;
      this.update();
    },
    update() {
      if (this.ikey)
        this.putData(this.ikey, this.value)
      this.emitter('process',this.value);
    }
  },
  mounted() {
    this.value = this.getData(this.ikey);
  }
}

onMounted( () =>{
  this.value = this.getData(this.ikey);
})
</script>

<style scoped>

</style>
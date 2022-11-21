<template>
  <div class="title control">{{title?(title+':'):''}}</div>
  <input type="text"
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
  props: ['readonly', 'emitter', 'ikey', 'getData', 'putData', 'title'],
  name: "VueTextComponent",
  data() {
    return {
      value: "",
    }
  },
  methods: {
    change(e){
      this.value = e.target.value;
      this.update();
    },
    update() {
      if (this.ikey)
        this.putData(this.ikey, this.value)
      this.emitter.trigger('process');
    }
  },
  mounted() {
    this.value = this.getData(this.ikey);
  }
}

onMounted( () =>{
  this.value = this.getData(this.ikey);
  if(!this.value)
    this.value = "";
})
</script>

<style scoped>

.title{
  color: white;
}
</style>
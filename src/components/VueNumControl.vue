<template>
  <div class="control title">{{title?(title+':'):''}}</div>
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
  props: ['readonly', 'emitter', 'ikey', 'getData', 'putData', 'title'],
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
.title{
  color: white;
}
input{
  max-width: 6vw;
}
</style>
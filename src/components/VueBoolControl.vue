<template>
  <div class="control title">{{title?(title+':'):''}}</div>
  <div class="container">
    <div class="switch" @click="change($event)">
      <div class="background-container">
        <div :class="'background '+(value?'checked':'')"></div>
      </div>
      <div :class='"box "+(value?"checked":"")'></div>
      <!--
      <input type="button"
             :readonly="readonly"
             :checked="value"
             @input="change($event)"
             @dblclick.stop=""
             @pointerdown.stop=""
             @pointermove.stop=""/>
             -->
    </div>
  </div>
</template>

<script>
import {onMounted} from "vue";

export default {
  props: ['readonly', 'emitter', 'ikey', 'getData', 'putData', 'title'],
  name: "VueBoolComponent",
  data() {
    return {
      value: false,
    }
  },
  methods: {
    change(e){
      console.log(e.target.checked)
      this.value = !this.value;
      this.update();
    },
    update() {
      //console.log("Bool-Control-Update:",this.value);
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

.container{
  width: 100px;
  justify-content: center;
  display: flex;
}

.switch {
  border: 1px solid #8cb6ff;
  width: 3vw;
  height: 1vw;
  display: flex;
  background: white;
  border-radius: .5vw;
  align-items: center;
}

.box{
  position: absolute;
  z-index: 5;
  border-radius: 1vw;
  background: #5188ea;
  border: 2px solid #8cb6ff;
  height: 1.7vw;
  width: 1.7vw;
  translate: -0.5vw;
  transition: translate 0.1s linear;
}

.box.checked{
  translate: 2vw;
  transition: translate 0.1s linear;
}

.background-container{
  position: absolute;
  border-bottom-left-radius: 4vh;
  border-top-left-radius: 4vh;
  height: 1vw;
  overflow: hidden;
}

.background{
  background: #6f9aea;
  width: 0;
  height: 2vw;
  transition: width 0.1s linear;
}
.background.checked{
  width: 3vw;
  transition: width 0.1s linear;
}



.title{
  color: white;
}
</style>
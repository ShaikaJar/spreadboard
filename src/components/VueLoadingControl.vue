<template>
  <div class="control title">{{title?(title+':'):''}}</div>
  <div style="margin: 0; display: flex; align-items: center; justify-content: center">
    <div class="bar-container">
      <div class="bar" :style="'width:'+value+'%'">
      </div>
    </div>
  </div>
</template>

<script>

import {onMounted} from "vue";

export default {
  props: ['ikey', 'getData', 'putData', 'title'],
  name: "VueLoadingComponent",
  data() {
    return {
      value: 100
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

.bar-container{
  width: 20vh;
  height: 3vh;
  border-radius: 1.5vh;
  overflow: hidden;
  background: white;
}

.bar{
  display: block;
  height: 100%;
  background: #6f9aea;
}
</style>
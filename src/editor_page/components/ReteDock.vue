<template>
    <div class="dock" id="dock" :style="'height:'+(windowHeight-60)+'px'">
    </div>

</template>
  
<script lang="ts">

  export default {
    name: "ReteDock",
    data(){
      return {
        windowHeight: 0,
        resizing : false
      };
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    mounted(){
      this.handleResize();
    },
    methods : {
      handleResize() {
          if(!this.resizing)
            this.resizing = true;
          else
            return;

          
          this.windowHeight = window.innerHeight;
          this.resizing = false;
        }
    }
  };
</script>
  
<style>
  .dock {
    background-color: inherit;
    overflow-y: scroll !important;

    border-right: 1px solid #6f9aea;

    display: flex;
    align-items: center;
    flex-flow: column;
  }

  .dock > .dock-item{
      padding: 0;
      padding-top: 10px;
      transform: scale(1);
  }


  @media only screen and (max-width: 980px){
    .dock > .dock-item{
      transform: scale(0.85);
    }
  }

  @media only screen and (max-width: 820px){
    .dock > .dock-item{
      transform: scale(0.75);
    }
  }


  /*
  @media only screen and (max-height: 750px){
    .dock > .dock-item{
      transform: scale(0.65);
    }
  }
  */

  .dock > .dock-item > .node{
    width: 200px;
    min-width: 20px;
  }
  </style>
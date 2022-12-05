<template>
  <div class="dock" id="dock">
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
      triggerVisible(){
        if(document.getElementById("sidebar")?.getAttribute("open")=="false"){
          console.log("Click")
          document.getElementById("sidebar")?.setAttribute("open", "true")
        }
        else{
          console.log("Close")
          document.getElementById("sidebar")?.setAttribute("open", "false")
        }
      },
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
  overflow-x: hidden;

  border-right: 1px solid #6f9aea;
  max-width: 20%;
  min-width: 15%;

  display: flex;
  align-items: center;
  flex-flow: column;
  transition: 1s ease-in-out;
  gap: 1px ;
}

.dock > .dock-item > .node{
  width: 200px;
}

  .dock > .dock-item{
      transition: 0.5s ease-in-out;
      margin: 0;
      margin-top: 10%;
  }

  @media only screen and (max-width:1500px) {
    .dock > .dock-item{
        margin-top: -10px;
        margin-bottom: -5px;
        transform: scale(0.8);
    }
  }
  @media only screen and (max-width:1150px) {
    .dock > .dock-item{
        margin-top: -25px;
        transform: scale(0.7);
    }
  }
  @media only screen and (max-width:1050px) {
    .dock > .dock-item{
        margin-top: -50px;
        margin-bottom: 30px;
        transform: scale(0.65);
    }
  }

  


  </style>
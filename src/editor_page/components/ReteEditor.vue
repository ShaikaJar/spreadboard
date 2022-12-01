<template>
    <div class="rete" id="rete" :style="'height:'+(windowHeight-20)+'px'">
        Test
    </div>
</template>
  
<script lang="ts">
import { start } from "../../editor";
  //import {start} from "@/editor";
export default {
    name: "ReteEditor",
    data(){
      return {
        windowHeight: 0,
        resizing: false
      };
    },
    created() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    mounted(){
        const element = document.getElementById("rete")
        if(element)
          start(element);
        this.handleResize();
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods : {
      handleResize() {
          if(!this.resizing)
            this.resizing = true;
          else
            return;


          this.windowHeight = window.innerHeight;
          console.log("Test");
          this.resizing = false;
        }
    }
  };
</script>
  
<style>
  .rete {
    width: 100%;
    display: block;
    border-left: 1px solid #6f9aea;
    border-top: 1px solid #6f9aea;
    overflow: hidden;
  }
  .socket[title~="act"]{
    background: coral;
  }
  .socket[title~="act"][title~="ref"]{
    background: chocolate;
  }
  .socket[title~="ref"]{
    background: darkmagenta;
  }
  .socket.type{
    background: cornflowerblue;
  }

  div[transform]>.node{
    width: 20px !important;
  }
  </style>
  
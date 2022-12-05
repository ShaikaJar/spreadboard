<template>
    <div class="dock-container" :style="'height:'+(windowHeight-10)+'px'">
        <div class="button-row">
            <div class="popup off">

            </div>
            <button @click="triggClear()">Leeren</button>
            <button @click="triggDownload($event)">Speichern</button>
            <button @click="triggImport()">Laden</button>
            <button @click="triggLoadExample()">Lade Beispiel</button>
        </div>
        <div :style="'height:'+(windowHeight-50)+'px; overflow-y:hidden; padding.top:'">
            <ReteDock/>
        </div>
    </div>
</template>

<script lang="ts">
import {clearBoard} from "../../editor";
import {loadExample, saveBoard, importBoard} from '../../editor/loadMenu'
import ReteDock from './ReteDock.vue';

  export default {
    name: "DockContainer",
    components: {
        ReteDock
    },
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
        },
      triggDownload(event: Event) {
        const popup = document.querySelector('.popup')!;
        popup.innerHTML = "In Zwischenablage gespeichert";
        popup.classList.replace("off", "on");
        saveBoard();
        new Promise(resolve => setTimeout(resolve, 1000)).then(
            () => {
              popup.classList.replace("on", "off");
            }
        );
      },
      triggLoadExample() {
        loadExample();
        const popup = document.querySelector('.popup');
        if(popup){
            popup.innerHTML = "Beispiel geladen";
            popup.classList.replace("off", "on");
            new Promise(resolve => setTimeout(resolve, 1000)).then(
                () => {
                popup.classList.replace("on", "off");
            });
        }
      },
      triggClear() {
        clearBoard();
        const popup = document.querySelector('.popup');
        if(popup){
            popup.innerHTML = "SpreadBoard geleert";
            popup.classList.replace("off", "on");
            new Promise(resolve => setTimeout(resolve, 1000)).then(
                () => {
                    popup.classList.replace("on", "off");
                });
            }
      },
      triggImport() {
        importBoard();
        const popup = document.querySelector('.popup');
        if(popup){
            popup.innerHTML = "Import geladen";
            popup.classList.replace("off", "on");new Promise(resolve => setTimeout(resolve, 1000)).then(
                () => {
                popup.classList.replace("on", "off");
            });
        }
      }
    }
};
</script>

<style scoped>

.dock-container{
    width: 30%;
    overflow-x: hidden;
    object-fit: contain;
}


.popup {
    background: white;
    color: black;
    border-radius: 5px;
    border: #2c3e50 solid 1px;
    padding: 10px;
    position: absolute;
  
    z-index: -4;
    opacity: 0;
    transition: opacity ease-in-out 0.5s, z-index step-end 0.6s;
  }
  
  .popup.on {
    opacity: 100%;
    z-index: +4;
    transition: opacity ease-in-out 0.5s, z-index step-start 0s;
  }
  
  
  .button-row {
    border-top: #6f9aea solid 3px;
    display: flex;
    flex-flow: row;
    height: 45px;
    justify-content: center;
    align-items: start;
  }
  
  .button-row > button {
    display: block;
    border-radius: 0 0 .5vw .5vw;
    margin: 0;
    padding-top: 0;
    padding-bottom: 5px;
    border-color: #2c3e50;
    border-top-width: 0;
    width: 23%;
    height: 38px;
    background: #6f9aea;
    color: white;
  }

  @media only screen and (max-width: 980px){
    .button-row > button {
       font-size: 10px;
    }
  }

  
  .button-row > button:hover {
    height: 45px;
  }

</style>
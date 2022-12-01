<template>
    <div class="output-view-container" :style="'width:'+($vssWidth*0.28)+'px; height:100%'">
        <div class="button-row">
            <div class="popup off">

            </div>
            <button @click="triggClear()">Leeren</button>
            <button @click="triggDownload($event)">Speichern</button>
            <button @click="triggImport()">Laden</button>
            <button @click="triggLoadExample()">Lade Beispiel</button>
        </div>
        <div class="output-view">
            Test
        </div>
    </div>
</template>

<script lang="ts">
import {clearBoard} from "../../editor";
import {loadExample, saveBoard, importBoard} from '../../editor/loadMenu'

//@ts-ignore
import {VueScreenSizeMixin} from "vue-screen-size";

export default {
    name: "OutputContainer",
    mixins: [VueScreenSizeMixin],
    methods : {
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

<style>
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
    border-top: #6f9aea solid .1vw;
    display: flex;
    flex-flow: row;
    height: 2vw;
    justify-content: center;
    align-items: start;
  }
  
  .button-row > button {
    display: block;
    border-radius: 0 0 .5vw .5vw;
    margin-top: 0;
    padding-top: 0;
    padding-bottom: .5vw;
    border-color: #2c3e50;
    border-top-width: 0;
    width: 5vw;
    height: 1.8vw;
    background: #6f9aea;
    color: white;
  }
  
  .button-row > button:hover {
    height: 2.1vw;
  }

  .output-view-container {
  align-items: center;
  justify-content: center;
  border-left: #6f9aea solid 1px;
  height: 100%;
  margin: 0;
}

.output-view {
  background: white;
  color: black;
  padding: 5px;
  width: 30vh;
  height: 50vh;
  border-radius: 5px;
  border: 3px solid #6f9aea;
  margin: 5px;
}

</style>
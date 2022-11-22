<template>
  <div style="display: flex; flex-flow: column">
    <div class="editor">
      <div class="editor-container">
        <ReteEditor />
      </div>
      <div class="output-view-container">
        <div class="button-row">
          <button @click="triggClear()">Leeren</button>
          <button @click="triggDownload($event)">Speichern <div class="popup off">In Zwischenablage gespeichert</div> </button>
          <button @click="triggImport()">Laden</button>
          <button @click="triggLoadExample()">Lade Beispiel</button>
        </div>
        <div class="output-view">
          Test
        </div>
      </div>
    </div>
    <ReteDock/>
  </div>
</template>

<script lang="js">
import 'regenerator-runtime/runtime'
import { Options, Vue } from 'vue-class-component';
import ReteEditor from './components/ReteEditor.vue';
import ReteDock from './components/ReteDock.vue';
import {clearBoard, loadExample, saveBoard, importBoard} from "@/editor";

@Options({
  components: {
    ReteEditor,
    ReteDock,
  },
  methods:{
    triggDownload(){
      const popup = document.querySelector('.popup');
      popup.classList.replace("off", "on");
      saveBoard();
      new Promise(resolve => setTimeout(resolve, 1000)).then(
          () => {
            popup.classList.replace("on", "off");
          }
      );
    },
    triggLoadExample(){
      loadExample();
    },
    triggClear(){

      clearBoard();
    },
    triggImport(){
      importBoard();
    }
  }
})
export default class App extends Vue {}

</script>

<style>

.popup{
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

.popup.on{
  opacity: 100%;
  z-index: +4;
  transition: opacity ease-in-out 0.5s, z-index step-start 0s;
}


.button-row{
  border-top: #6f9aea solid .1vw;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: start;
}

.button-row > button{
  display: block;
  border-radius: 0 0 .5vw .5vw;
  margin-top: 0;
  padding-top: 0;
  padding-bottom: .5vw;
  border-color: #2c3e50;
  width: 5vw;
  height: 1.8vw;
  background: #6f9aea;
  color: white;
}



body{

  background: #2c3e50;
}

.editor-container{
  flex: 2;
  height: 60vh;
}
.editor {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 25px;
  max-width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-flow: row;

  flex: 1;
}

select, input {
  width: 100%;
  border-radius: 30px;
  background-color: white;
  padding: 2px 6px;
  border: 1px solid #999;
  font-size: 110%;
}
.output-view-container{
  flex: 1;
  order: 2;
  padding: 5px;
  max-width: 50vh;
  align-items: center;
  justify-content: center;
}
.output-view{
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

<template>
  <div style="display: flex; flex-flow: column">
    <div class="editor">
      <div class="editor-container">
        <ReteEditor />
      </div>
      <div class="output-view-container">
        <div class="output-view">
          Test
        </div>

        <button @click="triggDownload()">Download</button>
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
import {download} from "@/editor";

@Options({
  components: {
    ReteEditor,
    ReteDock,
  },
  methods:{
    triggDownload(){
      download();
    }
  }
})
export default class App extends Vue {}

</script>

<style>
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
  align-items: flex-start;
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
}
.output-view{
  align-content: start;
  alignment: unset;
  justify-content: unset;
  color: white;
  padding: 5px;
  width: 30vh;
  height: 50vh;
  border-radius: 5px;
  border: 3px solid black;
  margin: 5px;
}
</style>

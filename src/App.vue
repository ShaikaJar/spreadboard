<template>
  <div class="spreadBoard">

    <div class="editor">
      <ReteEditor />
      <ReteDock />
    </div>
    <div class="output-view-container">
      <div class="output-view">
        Test
      </div>
    </div>
  </div>
</template>

<script lang="js">
import 'regenerator-runtime/runtime'
import { Options, Vue } from 'vue-class-component';
import ReteEditor from './components/ReteEditor.vue';
import ReteDock from './components/ReteDock.vue';

@Options({
  components: {
    ReteEditor,
    ReteDock,
  },
})
export default class App extends Vue {}
</script>

<style>
.spreadBoard{
  display: flex;
  flex-flow: row;
  align-items: flex-start;
}
.editor {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 25px;
  width: 60vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-flow: column-reverse;

  flex: 1;
  order: 1;
}
.node .control input, .node .input-control input {
  width: 90%;
}
select, input {
  width: 100%;
  border-radius: 30px;
  background-color: white;
  padding: 2px 6px;
  border: 1px solid #999;
  font-size: 110%;
  width: 170px;
}
.output-view-container{
  max-width: 50vh;
  height: 80vh;
  border-radius: 5px;
  border: 3px solid black;
  flex: 1;
  order: 2;
  margin: 5px;
}
.output-view{
  padding: 5px;
}
</style>

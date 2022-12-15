<template>
    <div class="spreadboard">
        <SelectorBar/>
        <ReteEditor/>
    </div>
</template>
  
<script lang="ts">
import ReteEditor from './components/ReteEditor.vue';
import SelectorBar from './components/SelectorBar.vue';
//@ts-ignore
import {VueScreenSizeMixin} from "vue-screen-size";
export default {
    name: "EditorPage",
    mixins: [VueScreenSizeMixin],
    components: {
    ReteEditor,
    SelectorBar
},
}
</script>

<style>


.spreadboard{
    background-color: #2c3e50;
    min-height: 100%;
    max-height: 100%;
    min-width: 100%;
    max-width: 100%;
    margin-top: 0;
    margin-bottom: 0;
    display: flex;
    flex-flow: row;
    overflow-y: hidden;
}

</style>
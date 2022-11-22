<template>
  <div class="rete" ref="reteElm"></div>
</template>

<script lang="js">
import { ref, onMounted } from "vue";
import {init} from "@/editor";
export default {
  name: "ReteEditor",
  setup() {
    const reteElm = ref(null);

    onMounted(() => {
      init(reteElm.value);
    });

    return {
      reteElm,
    };
  },
};
</script>

<style>
.rete {
  flex: 3;
  order: 2;
  border-left: 1px solid green;
  border-top: 1px solid green;
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
</style>

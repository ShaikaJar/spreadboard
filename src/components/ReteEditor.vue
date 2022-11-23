<template>
  <div class="rete" ref="reteElm"></div>
</template>

<script lang="js">
import { ref, onMounted } from "vue";
import {start} from "@/editor";
export default {
  name: "ReteEditor",
  setup() {
    const reteElm = ref(null);

    onMounted(() => {
      start(reteElm.value);
    });

    return {
      reteElm,
    };
  },
};
</script>

<style>

.rete {
  border-left: 1px solid #6f9aea;
  border-top: 1px solid #6f9aea;
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

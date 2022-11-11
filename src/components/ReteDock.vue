<template>
  <div class="dock">
    <h3>Options</h3>
  </div>
</template>

<script>
export default {
  name: "ReteDock",
  setup() {},
};
</script>

<style lang="css">
.dock {
  flex: 1;
  min-width: 200px;
  width: 100%;
  order: 1;
  border-top: 1px solid green;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row nowrap;


}

.dock >.dock-item > .node{
  width: 150px;
  min-width: 20px;
  margin-right: 15px;
}
</style>
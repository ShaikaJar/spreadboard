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
  overflow-x: scroll;
  flex: 1;
  width: 100%;
  min-height: 300px;
  order: 1;
  border-top: 1px solid green;
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  padding-top: 10px;
  padding-bottom: 10px;
}

.dock >.dock-item > .node{
  width: 200px;
  min-width: 20px;
  margin-right: 15px;
}
</style>
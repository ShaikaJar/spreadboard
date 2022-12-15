<template>
    <div class="selectorbar">
        <button class="selectorbutton" v-for="item in items">{{item.title}}</button>
    </div>
    <div class="selected" v-for="item in items">
        <div v-if="item.selected">
            {{item}}
        </div>
    </div>
</template>

<script lang="ts">

export default{
    name: "SelectorBar",
    data() {
        return {
            selected: [],
            items: [
                { 
                    title: 'Foo',
                    selected: false
                },
                { 
                    title: 'Bar',
                    selected: false
                }
            ]
        }
    }
}

</script>

<style scoped>

.selectorbar{
    display: flex;
    flex-flow: column;
    width: 40px;
    overflow: hidden;
}

.selectorbutton{
    transform: rotate(-90deg);
    padding: 5px;
    padding-bottom: 30px;
    min-width: 60px;
    width: fit-content;
    height: 60px;
    margin: 5px;
    border-radius: 5px 5px 0px 0px;
}

</style>
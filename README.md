# vue-virtualization-list

[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

A vue virtual list

# Installation

```
yarn add vue-virtualization-list
```

# Import

```
import VuevirtualizationList from 'vue-virtualization-list';
Vue.use(VuevirtualizationList)
```

Or

```
import Vue from 'vue'
import { VuevirtualizationList } from 'vue-virtualization-list'

Vue.component('VuevirtualizationList', VuevirtualizationList)
```

Or

```
import { VuevirtualizationList } from 'vue-virtualization-list'

export default {
  components: {
    VuevirtualizationList
  }
}
```

# Usage

The component supports large data volume virtual scrolling for mainstream browsers including ie11.

```
<template>
  <div id="app">
    <div class="virtual">
      <Virtual #default="{ items }" :items="itemList" :item-size="40">
        <div class="virtual-list" v-for="item in items" :key="item.id">
          <div class="virtual-list-item">name: {{ item.name }}</div>
        </div>
      </Virtual>
    </div>
    <div class="control">
      <input v-model="number" />
      <button @click="add">+</button>
    </div>
  </div>
</template>

<script>
import Virtual from "vue-virtualization-list";
export default {
  components: {
    Virtual,
  },
  data() {
    return {
      number: 1,
      itemList: [],
    };
  },
  mounted() {
    for (let i = 1; i < 20; i++) {
      this.itemList.push({
        id: i,
        name: `name${i}`,
      });
    }
  },
  methods: {
    add() {
      let i = this.itemList.length + 1;
      console.log(i);
      const l = i + parseInt(this.number);
      console.log(l);
      for (; i < l; i++) {
        console.log(i);
        this.itemList.push({
          id: i,
          name: `name${i}`,
        });
      }
    },
  },
};
</script>

<style lang="less">
body,
html {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  .virtual {
    height: 100%;
    padding-left: 10px;
    background: #eaeaea;
    position: relative;
    overflow: hidden;
    width: 80%;
    &-list {
      &-item {
        height: 40px;
      }
    }
  }
  .control {
    width: 20%;
  }
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
</style>

```

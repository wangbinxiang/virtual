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

This component is use to show for thousands data, so it don't use props, it use $emit("update", data) to update data。

```
<template>
    <VuevirtualizationList
    :itemSize="20"
    ref="virtualList"
    #default="{ items }"
    >
        <div class="list-item" v-for="item in items" :key="item.id">
            {{ item.id }}
        </div>
    </VuevirtualizationList>
</template>

<script>
import { VuevirtualizationList } from 'vue-virtualization-list'
export default {
    components: {
        VuevirtualizationList
    },
    methods: {
        emitUpdate() {
            // execute $emit to update data
            if (this.$refs.virtualList) {
                this.$refs.virtualList.$emit("update", this.items);
            }
        }
    }
}
</script>
```

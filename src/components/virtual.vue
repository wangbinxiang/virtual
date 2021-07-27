<template>
  <div class="___virtual">
    <div
      class="___virtual-holder"
      @mousewheel.prevent="mouseScroll"
      @wheel.prevent="mouseScroll"
      ref="virtualHolder"
    >
      <div
        class="___virtual-holder-container"
        :style="{ height: `${totalHeight}px` }"
      >
        <div
          class="___virtual-holder-container-inner"
          :style="{ transform: transformY }"
        >
          <slot :items="renderItems"> </slot>
        </div>
      </div>
    </div>
    <div class="___virtual-scrollbar">
      <div
        :style="{
          height: `${scrollBarHeight}px`,
          top: `${scrollBarTop}px`,
        }"
        @mousedown="scrollMouseDown"
        @mouseup="scrollMouseUp"
        class="___virtual-scrollbar-thumb"
      ></div>
    </div>
    <ResizeObserver @notify="handleResize" />
  </div>
</template>

<script>
import "vue-resize/dist/vue-resize.css";
import { ResizeObserver } from "vue-resize";
// 高度clientHeight
//
export default {
  components: {
    ResizeObserver,
  },
  props: {
    itemSize: {
      type: Number,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      top: 0,
      viewHeight: 0,
      scrollMouse: {
        startY: 0,
      },
    };
  },
  computed: {
    renderItems() {
      const items = [];
      let i = Math.floor(this.top / this.itemSize);
      const count = this.showCount + i + 1;
      for (; i <= count; i++) {
        if (this.items[i]) {
          items.push(this.items[i]);
        } else {
          break;
        }
      }
      return items;
    },
    maxTop() {
      return this.totalHeight > this.viewHeight
        ? this.totalHeight - this.viewHeight
        : 0;
    },
    totalHeight() {
      let totalHeight = 0;
      totalHeight = this.items ? this.items.length * this.itemSize : 0;
      return totalHeight;
    },
    transformY() {
      const top = Math.floor(this.top / this.itemSize) * this.itemSize;
      return `translateY(${top}px)`;
    },
    showCount() {
      return Math.floor(this.viewHeight / this.itemSize);
    },
    scrollConversionFactor() {
      // 鼠标滚动时，scrollBar移动转换系数
      if (this.scrollBarHeight > 20) {
        return 1;
      } else {
        const scrollBarHeight =
          (this.viewHeight / this.totalHeight) * this.viewHeight;
        return 1 - (20 - scrollBarHeight) / this.viewHeight;
      }
    },
    scrollMoveConversionFactor() {
      // 拖动滚动条时，treeTop移动转换系数
      return (
        (this.viewHeight - this.scrollBarHeight) /
        (this.totalHeight - this.viewHeight)
      );
    },
    scrollBarHeight() {
      if (this.viewHeight >= this.totalHeight) {
        return 0;
      }
      const scrollBarHeight =
        (this.viewHeight / this.totalHeight) * this.viewHeight;
      return scrollBarHeight > 20 ? scrollBarHeight : 20;
    },
    scrollBarTop() {
      if (this.viewHeight >= this.totalHeight) {
        return 0;
      }
      return (
        (this.top / this.totalHeight) *
        this.viewHeight *
        this.scrollConversionFactor
      );
    },
  },
  watch: {
    totalHeight() {
      this.computedTop();
    },
  },
  created() {
    // this.initItems();
  },
  mounted() {
    // this.bindUpdate();
    this.initViewHeight();
  },
  methods: {
    initViewHeight() {
      const { $el: el } = this;
      this.viewHeight = el.clientHeight;
    },
    handleResize({ height }) {
      this.viewHeight = height;
    },
    mouseScroll(event) {
      const deltaY = event.deltaY ?? 0;
      this.computedTop(deltaY);
    },
    computedTop(distance = 0) {
      let top = this.top + distance;
      if (top < 0) {
        if (0 === this.top) {
          return;
        }
        top = 0;
      }
      if (this.maxTop < top) {
        this.top = this.maxTop;
      } else {
        this.top = top;
      }
      if (this.$refs.virtualHolder) {
        this.$refs.virtualHolder.scrollTop = this.top;
      }
    },
    scrollMouseDown(event) {
      this.scrollMouse.startY = event.pageY;
      // 设置
      document.addEventListener("mouseup", this.scrollMouseUp);
      document.addEventListener("mousemove", this.scrollMouseMove);
    },
    scrollMouseUp() {
      document.removeEventListener("mouseup", this.scrollMouseUp);
      document.removeEventListener("mousemove", this.scrollMouseMove);
    },
    scrollMouseMove(event) {
      const move = event.pageY - this.scrollMouse.startY;
      const top = move / this.scrollMoveConversionFactor;
      // 需要记录mousedown时的top
      // 转换城top
      // 转换系数
      // 最大和最小值
      this.scrollMouse.startY = event.pageY;
      this.computedTop(top);
    },
  },
};
</script>

<style lang="less">
.___virtual {
  position: relative;
  height: 100%;
  &-holder {
    overflow-y: hidden;
    overflow-anchor: none;
    height: 100%;
    padding-right: 12px;
    &-container {
      position: relative;
      overflow: hidden;
      min-height: 100%;
      &-inner {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        will-change: transform;
        height: 100%;
      }
    }
  }
  &-scrollbar {
    position: absolute;
    width: 8px;
    top: 0px;
    bottom: 0px;
    right: 0px;
    &-thumb {
      width: 100%;
      top: 0px;
      left: 0px;
      position: absolute;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 99px;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>

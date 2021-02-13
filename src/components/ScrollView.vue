<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import IScroll from 'iscroll/build/iscroll-probe';

@Component({
  name: 'ScrollView',
})
export default class ScrollView extends Vue {
  iscroll;

  mounted() {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: true,
      scrollbars: false,
      probeType: 3,
      // 解决拖拽卡顿问题
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true,
      click: true, // 真机调试点击无反应
    });

    // 创建一个观察者对象
    const observer = new MutationObserver(() => {
      this.iscroll.refresh();
    });
    // 告诉观察者对象我们需要观察什么内容
    const config = {
      childList: true, // 观察目标子节点的变化，添加或者删除
      subtree: true, // 默认为 false，设置为 true 可以观察后代节点
      attributeFilter: ['height', 'offsetHeight'], // 观察特定属性
    };
    // 告诉观察者对象, 我们需要观察谁, 需要观察什么内容
    /*
      第一个参数: 告诉观察者对象我们需要观察谁
      第二个参数: 告诉观察者对象我们需要观察什么内容
    * */
    observer.observe(this.$refs.wrapper as Node, config);
  }

  // 提供一个监听滚动距离的方法给外界使用
  scrolling(fn: Function) {
    this.iscroll.on('scroll', function (this: any) {
      fn(this.y);
    });
  }

  refresh() {
    this.$nextTick(() => {
      this.iscroll.refresh();
    });
  }

  scrollTo(x: number, y: number, time: number) {
    this.iscroll.scrollTo(x, y, time);
  }
}
</script>

<style lang='scss' scoped>
#wrapper {
  width: 100%;
  height: 100%;
}
</style>

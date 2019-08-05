<template>
  <div id="app">
    <First></First>
  </div>
</template>

<script>
import First from "@/scenes/first/index.vue";

export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    First
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" >
@import "./assets/sass/mixin.scss";

#app {
  height: 100%;
  position: relative;
  overflow: hidden;
  background: #000 url("/assets/images/bg.png") no-repeat center center;
  background-size: 100% 100%;
}
// .main-search-input-wrap {
//   position: absolute;
//   left: 0;
//   @include px2rem(top, 59);
//   width: 100%;
// }
</style>

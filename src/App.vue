<template>
  <div id="app">123</div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  components: {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" >
@import "./assets/sass/mixin.scss";
#app {
  height: 100%;
  position: relative;
}
.main-search-input-wrap {
  position: absolute;
  left: 0;
  @include px2rem(top, 59);
  width: 100%;
}
</style>

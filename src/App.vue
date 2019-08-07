<template>
  <div id="app" @click="clickDesk">
    <P01></P01>
  </div>
</template>

<script>
import P01 from "@/pages/p01.vue";

export default {
  name: "app",
  data() {
    return {
      currentScene: 0
    };
  },
  components: {
    P01
  },
  mounted() {},
  methods: {
    clickDesk() {
      this.$root.eventHub.$emit("clickDeskEvent");
    }
    // selectScenes(index, data) {
    //   // console.log(data);
    //   this.currentScene = index;
    //   if (index === 1) {
    //     this.$root.eventHub.$emit("compareLettersEvent", data);
    //   } else if (index === 2) {
    //     this.$root.eventHub.$emit("startGameEvent", data);
    //   }
    // }
  }
};
</script>

<style lang="scss" >
html {
  background-color: #000;
}
@import "./assets/sass/mixin.scss";
@font-face {
  font-family: "webfont";
  font-display: swap;
  src: url("/assets/font/webfont.eot"); /* IE9 */
  src: url("/assets/font/webfont.eot?#iefix") format("embedded-opentype"),
    /* IE6-IE8 */ url("/assets/font/webfont.woff2") format("woff2"),
    url("/assets/font/webfont.woff") format("woff"),
    /* chrome、firefox */ url("/assets/font/webfont.ttf") format("truetype"),
    /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
      url("/assets/font/webfont.svg#webfont") format("svg"); /* iOS 4.1- */
}

.web-font {
  font-family: "webfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  @include px2rem(height, 750);
  @include px2rem(width, 1334);
  position: relative;
  overflow: hidden;
  background: #000 url("/assets/images/bg.png") no-repeat 0 0;
  background-size: 100% auto;
}
</style>

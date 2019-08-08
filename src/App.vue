<template>
  <div id="app" @click="clickDesk">
    <P01 v-if="currentPage === 1"></P01>
    <P02 v-if="currentPage === 2"></P02>
    <P03 v-if="currentPage === 3"></P03>
    <P04 v-if="currentPage === 4"></P04>
    <P05 v-if="currentPage === 5"></P05>
    <P06 v-if="currentPage === 6"></P06>
    <P07 v-if="currentPage === 7"></P07>
    <P08 v-if="currentPage === 8"></P08>
    <div id="audio-wrap" style="width:0;height:0;"></div>
  </div>
</template>

<script>
import P01 from "@/pages/p01.vue";
import P02 from "@/pages/p02.vue";
import P03 from "@/pages/p03.vue";
import P04 from "@/pages/p04.vue";
import P05 from "@/pages/p05.vue";
import P06 from "@/pages/p06.vue";
import P07 from "@/pages/p07.vue";
import P08 from "@/pages/p08.vue";

export default {
  name: "app",
  data() {
    return {
      currentPage: 1
    };
  },
  components: {
    P01,
    P02,
    P03,
    P04,
    P05,
    P06,
    P07,
    P08
  },
  mounted() {
    this.$root.eventHub.$on("pageFinishedEvent", from => {
      // 翻到下一页
      let to = from + 1;
      this.currentPage = to;
    });
  },
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
  .P {
    width: 100%;
    height: 100%;
  }
}
</style>

<template>
  <div id="app" v-hammer:swipe="onSwipe">
    <P01 v-if="currentPage === 1"></P01>
    <P02 v-if="currentPage === 2"></P02>
    <P03 v-if="currentPage === 3"></P03>
    <P04 v-if="currentPage === 4"></P04>
    <P05 v-if="currentPage === 5"></P05>
    <P06 v-if="currentPage === 6"></P06>
    <P07 v-if="currentPage === 7"></P07>
    <P08 v-if="currentPage === 8"></P08>
    <P09 v-if="currentPage === 9"></P09>
    <P10 v-if="currentPage === 10"></P10>
    <span class="web-font indexPageFontSize">{{currentPage}} | 10</span>
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
import P09 from "@/pages/p09.vue";
import P10 from "@/pages/p10.vue";
import $ from "jquery";

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
    P08,
    P09,
    P10
  },
  mounted() {
    // this.$root.eventHub.$on("pageFinishedEvent", from => {
    //   // 翻到下一页
    //   let to = from + 1;
    //   this.currentPage = to;
    // });
    window.addEventListener("resize", this.renderResize, false);
    let $app = $("#app");
    let deviceW = document.documentElement.clientWidth;
    let radio = deviceW / 1334;
    $("html").css({ "font-size": 133.4 * radio });
    $app.width(deviceW);
    $app.height((deviceW * 750) / 1334);
    $app.fadeIn(500);
  },
  beforeDestroy() {
    // 移除监听
    window.removeEventListener("resize", this.renderResize, false);
  },
  methods: {
    onSwipe(event) {
      // 从右向左滑动
      if (event.direction === 2) {
        if (this.currentPage < 10) {
          this.currentPage++;
        } else {
          this.currentPage = 1;
        }
        // 从左向右滑动
      } else if (event.direction === 4) {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      }
    },
    // 判断是否横屏
    renderResize() {
      this.$nextTick(() => {
        // 判断横竖屏
        // let width = document.documentElement.clientWidth;
        // let height = document.documentElement.clientHeight;
        // if (width > height) {
        //   location.reload();
        // }
        location.reload();
      });
    }
    // clickDesk() {
    //   this.$root.eventHub.$emit("clickDeskEvent");
    // }
  }
};
</script>

<style lang="scss" >
html,
body {
  height: 100%;
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
  display: none;
  @include px2rem(height, 750);
  @include px2rem(width, 1334);
  position: relative;
  overflow: hidden;
  background: #000 url("/assets/images/bg.png") no-repeat center center;
  background-size: 100% auto;
  .P {
    width: 100%;
    height: 100%;
  }
  .indexPageFontSize {
    position: absolute;
    left: 50%;
    @include px2rem(bottom, 50);
    @include px2rem(margin-left, -55);
    color: #fff;
    font-weight: bold;
    @include px2rem(font-size, 30);
  }
}
</style>

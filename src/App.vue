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
    <div class="menu-board-wrap" :class="{isOpen: isOpen}">
      <ul id="menu">
        <li>
          <div class="title">Animation</div>
          <ul>
            <li class="web-font" @click="selectMenuItem(2)">AB</li>
            <li class="web-font" @click="selectMenuItem(4)">CD</li>
            <li class="web-font" @click="selectMenuItem(6)">EFG</li>
          </ul>
        </li>
        <li>
          <div class="title">Interactive Game</div>
          <ul>
            <li class="web-font" @click="selectMenuItem(3)">AB</li>
            <li class="web-font" @click="selectMenuItem(5)">CD</li>
            <li class="web-font" @click="selectMenuItem(7)">EF</li>
          </ul>
        </li>
        <li>
          <div class="title">Classroom Game</div>
          <ul>
            <li class="web-font" @click="selectMenuItem(8)">A-G</li>
            <li class="web-font" @click="selectMenuItem(9)">Game</li>
            <li class="web-font" @click="selectMenuItem(10)">Example</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="menu-btn" v-hammer:tap="tapMenu">Menu</div>
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
      isOpen: false,
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
    this.$root.eventHub.$on("goToPage", to => {
      this.currentPage = to;
    });
    window.addEventListener("resize", this.renderResize, false);
    let $app = $("#app");
    let deviceW = document.documentElement.clientWidth - 38;
    let radio = deviceW / 1334;
    $("html").css({ "font-size": 133.4 * radio });
    $app.width(deviceW);
    $app.height((deviceW * 750) / 1334);
    $app.fadeIn(500);

    $("#menu")
      .find(">li")
      .on("click", e => {
        var $li = $(e.currentTarget);
        $li
          .siblings()
          .find(">ul")
          .hide();
        $li.find(">ul").show();
      });
  },
  beforeDestroy() {
    // 移除监听
    window.removeEventListener("resize", this.renderResize, false);
  },
  methods: {
    selectMenuItem(pageNum) {
      this.isOpen = false;
      setTimeout(() => {
        this.$root.eventHub.$emit("goToPage", pageNum);
      }, 300);
    },
    tapMenu(e) {
      console.log(e);
      this.isOpen = !this.isOpen;
    },
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
  // height: 100%;
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
    @include px2rem(bottom, 30);
    @include px2rem(margin-left, -55);
    color: #fff;
    font-weight: bold;
    @include px2rem(font-size, 30);
  }

  .menu-board-wrap {
    position: absolute;
    height: 100%;
    @include px2rem(width, 409);
    background-color: #fee47e;
    @include px2rem(left, -409);
    overflow-y: auto;
    top: 0;
    transition: left 0.3s;
    &.isOpen {
      @include px2rem(left, 0);
    }
    > ul {
      @include px2rem(margin-left, 40);
      @include px2rem(margin-top, 140);
      > li {
        width: 100%;

        > div.title {
          @include px2rem(height, 70);
          text-indent: -9999999px;
        }
        // text-indent: -999999px;
        &:nth-child(1) {
          > div.title {
            background: url("./assets/images/step01_bg.png") no-repeat 0 0;
            background-size: auto 100%;
          }
          @include px2rem(margin-bottom, 30);
        }
        &:nth-child(2) {
          > div.title {
            background: url("./assets/images/step02_bg.png") no-repeat 0 0;
            background-size: auto 100%;
          }
          @include px2rem(margin-bottom, 30);
        }
        &:nth-child(3) {
          > div.title {
            background: url("./assets/images/step03_bg.png") no-repeat 0 0;
            background-size: auto 100%;
          }
          @include px2rem(margin-bottom, 30);
        }
        > ul {
          display: none;
          @include px2rem(margin-left, 150);
          @include px2rem(margin-top, 0);
          > li {
            @include px2rem(font-size, 50);
            color: #683600;
            @include px2rem(padding, 20);
          }
        }
      }
    }
  }
  .menu-btn {
    position: absolute;
    @include px2rem(left, 20);
    @include px2rem(top, 20);
    @include px2rem(width, 96);
    @include px2rem(height, 96);
    background: url("./assets/images/menu_bg.png") no-repeat 0 0;
    background-size: 100% 100%;

    text-indent: -9999999px;
  }
}
</style>

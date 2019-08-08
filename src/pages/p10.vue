<template>
  <div class="P P10">
    <div class="web-font animated" id="e00">Playdough letters</div>
    <svg id="e001" />
  </div>
</template>

<script>
import $ from "jquery";
// eslint-disable-next-line
import { resize, playByLocalUrl, lettersPos, svgPlayA } from "@/utils/utils.js";
// import _ from "lodash";

export default {
  data() {
    return {
      letters: {},
      letterVoices: {
        a: [
          "/assets/audio/VO_02.m4a",
          "/assets/audio/VO_03.m4a",
          "/assets/audio/VO_48.m4a"
        ],
        b: [
          "/assets/audio/VO_04.m4a",
          "/assets/audio/VO_05.m4a",
          "/assets/audio/VO_49.m4a"
        ],
        c: [
          "/assets/audio/VO_16.m4a",
          "/assets/audio/VO_17.m4a",
          "/assets/audio/VO_50.m4a"
        ],
        d: [
          "/assets/audio/VO_18.m4a",
          "/assets/audio/VO_19.m4a",
          "/assets/audio/VO_51.m4a"
        ],
        e: [
          "/assets/audio/VO_30.m4a",
          "/assets/audio/VO_31.m4a",
          "/assets/audio/VO_52.m4a"
        ],
        f: [
          "/assets/audio/VO_32.m4a",
          "/assets/audio/VO_33.m4a",
          "/assets/audio/VO_53.m4a"
        ],
        g: [
          "/assets/audio/VO_34.m4a",
          "/assets/audio/VO_35.m4a",
          "/assets/audio/VO_54.m4a"
        ]
      },
      // 节点
      voiceJobDone: false,
      aniJobDone: false,
      lettersPos: lettersPos
    };
  },
  mounted() {
    this.$root.eventHub.$on("clickDeskEvent", this.handleClickDesk);
  },
  methods: {
    handleClickDesk() {
      // 返回首页
      this.$root.eventHub.$emit("pageFinishedEvent", 1);
    },
    // -----------------------frames function
    // 4s
    ani00() {
      return new Promise(resolve => {
        $("#e00")
          .addClass("fadeIn")
          .on("animationend", () => {
            resolve();
          });
      });
    },
    // 绘制字母A路径
    ani01() {},
    // 展示两张图片
    ani02() {}
    //------------------------sub function
    // drawLetterPath(key, value) {}
    // zoomInLetter(key, value) {
    //   this.step = 0;
    //   let s = window.Snap("#e001");
    //   return s
    //     .image(
    //       value.url,
    //       resize(value.x),
    //       resize(value.y),
    //       resize(value.w),
    //       resize(value.h)
    //     )
    //     .click(() => {
    //       //新增字母的点击事件
    //       // this.handleClick(key);
    //     });
    // }
  }
};
</script>

<style lang="scss">
@import "@/assets/sass/mixin.scss";

.P10 {
  #e00 {
    margin: 0;
    color: #fff;
    text-align: center;
    animation-duration: 3s;
    animation-delay: 1s;
    @include px2rem(font-size, 100);
    @include px2rem(margin-top, 100);
  }

  #e001 {
    width: 100%;
    height: 100%;
  }
}
</style>

<template>
  <div class="P P10" v-hammer:tap="onTap">
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
      letterSvgWrap: null,
      // 节点
      voiceJobDone: false,
      aniJobDone: false,
      lettersPos: lettersPos
    };
  },
  mounted() {
    // this.$root.eventHub.$on("clickDeskEvent", this.handleClickDesk);
    // 启动动画
    this.ani00()
      .then(() => {
        return this.ani01();
      })
      .then(() => {
        this.aniJobDone = true;
      });
  },
  methods: {
    onTap() {
      if (!this.voiceJobDone) {
        playByLocalUrl(null, "/assets/audio/VO_60.m4a")
          .then(() => {
            return playByLocalUrl(null, "/assets/audio/VO_61.m4a");
          })
          .then(() => {
            this.voiceJobDone = true;
          });
        return;
      }

      if (this.voiceJobDone && this.aniJobDone) {
        // 返回首页
        this.$root.eventHub.$emit("pageFinishedEvent", 1);
      }
    },
    // handleClickDesk() {
    //   if (!this.voiceJobDone) {
    //     playByLocalUrl(null, "/assets/audio/VO_60.m4a")
    //       .then(() => {
    //         return playByLocalUrl(null, "/assets/audio/VO_61.m4a");
    //       })
    //       .then(() => {
    //         this.voiceJobDone = true;
    //       });
    //     return;
    //   }

    //   if (this.voiceJobDone && this.aniJobDone) {
    //     // 返回首页
    //     this.$root.eventHub.$emit("pageFinishedEvent", 1);
    //   }
    // },
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
    ani01() {
      return new Promise(resolve => {
        console.log(1);
        let s = window.Snap("#e001");

        this.letterSvgWrap = s.g();
        this.letterSvgWrap.attr({
          stroke: "black",
          fill: "white",
          opacity: 0
        });
        let image = s
          .image(
            "/assets/images/play-letters/play-a.png",
            resize(692),
            resize(232),
            resize(400),
            resize(400)
          )
          .animate(
            {
              x: resize(392),
              // 目标状态和位置
              opacity: 1
            },
            1500,
            window.mina.easeout,
            () => {}
          );
        let rect = s
          .rect(resize(92), resize(232), resize(400), resize(400))
          .animate(
            {
              x: resize(392),
              // 目标状态和位置
              opacity: 1
            },
            1500,
            window.mina.easeout,
            () => {}
          )
          .attr({ "stroke-width": 0 });
        this.letterSvgWrap.add(rect);
        this.letterSvgWrap.add(image);
        this.letterSvgWrap
          .add(
            window.Snap.parse(
              svgPlayA(resize(392), resize(232), resize(400), resize(400))
            )
          )
          .addClass("ani-path")
          .animate(
            {
              // 目标状态和位置
              opacity: 1
            },
            1500,
            window.mina.easeout,
            () => {
              resolve();
            }
          );
      });
    }
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
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .ani-path {
    @include px2rem(stroke-dasharray, 100);
    @include px2rem(stroke-dashoffset, 100);
    animation: dash 10s linear infinite;

    @keyframes dash {
      from {
        @include px2rem(stroke-dashoffset, 100);
      }
      to {
        stroke-dashoffset: 0;
      }
    }
  }
}
</style>

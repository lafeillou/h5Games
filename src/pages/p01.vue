<template>
  <div class="P P01" v-hammer:tap="onTap">
    <div class="web-font animated" id="e00">Level 1 Week 1 Lesson 1</div>
    <svg id="e001" />
  </div>
</template>

<script>
import $ from "jquery";
// eslint-disable-next-line
import { resize, playByLocalUrl, lettersPos } from "@/utils/utils.js";
import _ from "lodash";

export default {
  data() {
    return {
      letters: {},
      letterVoices: {
        a: ["/assets/audio/VO_02.m4a", "/assets/audio/VO_03.m4a"],
        b: ["/assets/audio/VO_04.m4a", "/assets/audio/VO_05.m4a"],
        c: ["/assets/audio/VO_16.m4a", "/assets/audio/VO_17.m4a"],
        d: ["/assets/audio/VO_18.m4a", "/assets/audio/VO_19.m4a"],
        e: ["/assets/audio/VO_30.m4a", "/assets/audio/VO_31.m4a"],
        f: ["/assets/audio/VO_32.m4a", "/assets/audio/VO_33.m4a"],
        g: ["/assets/audio/VO_34.m4a", "/assets/audio/VO_35.m4a"]
      },
      voicePlaying: false,
      animationPlaying: false,
      lettersPos: lettersPos
    };
  },
  mounted() {
    // this.$root.eventHub.$on("clickDeskEvent", this.handleClickDesk);
    // 自动触发一次
    // 播放动画
    this.ani00()
      .then(() => {
        return this.ani01();
      })
      .then(() => {
        $("#e00").remove();
        return this.ani02();
      })
      .then(() => {
        // this.aniJobDone = true;
      });
  },
  methods: {
    onTap() {
      // alert(1);
      if (this.voicePlaying || this.animationPlaying) {
        return;
      }
      // 播放声音
      this.voicePlaying = true;

      playByLocalUrl(null, "/assets/audio/VO_01.m4a").then(() => {
        this.voicePlaying = false;
      });
      window.Snap("#e001").clear();
      this.ani02().then(() => {});
    },
    // -----------------------frames function
    // 4s
    ani00() {
      this.animationPlaying = true;
      // eslint-disable-next-line
      return new Promise((resolve, reject) => {
        $("#e00")
          .addClass("fadeIn")
          .on("animationend", () => {
            resolve();
          });
      });
    },
    // 1s
    ani01() {
      return new Promise(resolve => {
        $("#e00")
          .css({
            "animation-duration": "1s",
            "animation-delay": 0
          })
          .addClass("fadeOut")
          .on("animationend", () => {
            resolve();
            this.animationPlaying = false;
          });
      });
    },
    // 8s
    ani02() {
      this.animationPlaying = true;
      this.voicePlaying = true;
      playByLocalUrl(null, "/assets/audio/VO_01.m4a").then(() => {
        this.voicePlaying = false;
      });
      return new Promise(resolve => {
        let i = 0;
        _.forEach(this.lettersPos, (value, key) => {
          setTimeout(() => {
            this.letters[key] = this.zoomInLetter(key, value);
            this.letters[key].addClass("animated bounceIn ani002");
            this.letters[key].node.addEventListener("animationend", () => {
              if (key === "g") {
                this.animationPlaying = false;
                resolve();
              }
              this.letters[key].attr({ class: "" });
            });
          }, i * 1000);
          i++;
        });
      });
    },

    //------------------------sub function
    zoomInLetter(key, value) {
      this.step = 0;
      let s = window.Snap("#e001");
      return s
        .image(
          value.url,
          resize(value.x),
          resize(value.y),
          resize(value.w),
          resize(value.h)
        )
        .click(() => {
          //新增字母的点击事件
          // this.handleClick(key);
        });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/sass/mixin.scss";

.P01 {
  #e00 {
    margin: 0;
    color: #fff;
    text-align: center;
    animation-duration: 3s;
    animation-delay: 1s;
    @include px2rem(font-size, 100);
    @include px2rem(margin-top, 312);
  }
  #e001 {
    width: 100%;
    height: 100%;
  }
  .ani002 {
    animation-duration: 1s;
    animation-delay: 0;
  }
}
</style>

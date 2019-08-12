<template>
  <div class="P P08" v-hammer:tap="onTap">
    <div class="web-font animated" id="e00">Let's Read</div>
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
      A_GisDone: false,
      lettersPos: lettersPos
    };
  },
  mounted() {
    this.$root.eventHub.$on("clickDeskEvent", this.handleClickDesk);
    this.ani00()
      .then(() => {
        return this.ani01();
      })
      .then(() => {
        $("#e00").remove();
        return this.ani02();
      })
      .then(() => {
        this.aniJobDone = true;
      });
  },
  methods: {
    onTap() {
      if (!this.voiceJobDone) {
        playByLocalUrl(null, "/assets/audio/VO_47.m4a").then(() => {
          this.voiceJobDone = true;
        });
        return;
      }

      if (this.voiceJobDone && this.aniJobDone && !this.A_GisDone) {
        this.ani03("a")
          .then(() => {
            return this.ani03("b");
          })
          .then(() => {
            return this.ani03("c");
          })
          .then(() => {
            return this.ani03("d");
          })
          .then(() => {
            return this.ani03("e");
          })
          .then(() => {
            return this.ani03("f");
          })
          .then(() => {
            return this.ani03("g");
          })
          .then(() => {
            this.A_GisDone = true;
          });
        return;
      }

      if (this.A_GisDone) {
        this.$root.eventHub.$emit("goToPage", 8);
        return;
      }
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
          });
      });
    },
    // 2.4s
    ani02() {
      return new Promise(resolve => {
        let i = 0;
        _.forEach(this.lettersPos, (value, key) => {
          setTimeout(() => {
            this.letters[key] = this.zoomInLetter(key, value);
            this.letters[key].addClass("animated fadeIn ani002");
            this.letters[key].node.addEventListener("animationend", () => {
              if (key === "g") {
                resolve();
              }
              this.letters[key].attr({ class: "" });
            });
            // this.letters[key].click(() => {
            //   alert(1);
            // });
          }, i * 300);
          i++;
        });
      });
    },
    // 每个字母间隔3秒，分别开始抖动并同步发字母音
    ani03(letter) {
      return new Promise(resolve => {
        this.letters[letter].addClass("animated shake infinite");
        playByLocalUrl(null, this.letterVoices[letter][2]).then(() => {
          this.letters[letter].attr({ class: "" });
          resolve();
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

.P08 {
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
  .ani003 {
    animation-duration: 3s;
    animation-delay: 0;
  }
}
</style>

<template>
  <div class="P P09" v-hammer:tap="onTap">
    <div class="web-font animated" id="e00">Playdough letters</div>
    <div class="pic-wrap-01 animated" id="e01">
      <img src="/assets/images/alphabet-games-01.png" />
    </div>
    <div class="pic-wrap-02 animated" id="e02">
      <img src="/assets/images/alphabet-games-02.png" />
    </div>
  </div>
</template>

<script>
import $ from "jquery";
// eslint-disable-next-line
import { resize, playByLocalUrl, lettersPos } from "@/utils/utils.js";
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
      A_GisDone: false,
      lettersPos: lettersPos
    };
  },
  mounted() {
    // this.$root.eventHub.$on("clickDeskEvent", this.handleClickDesk);

    this.ani00()
      .then(() => {
        return this.ani01();
      })
      .then(() => {
        return this.ani02();
      })
      .then(() => {
        this.aniJobDone = true;
      });
  },
  methods: {
    onTap() {
      if (!this.voiceJobDone) {
        playByLocalUrl(null, "/assets/audio/VO_55.m4a").then(() => {
          playByLocalUrl(null, "/assets/audio/VO_56.m4a").then(() => {
            playByLocalUrl(null, "/assets/audio/VO_57.m4a").then(() => {
              playByLocalUrl(null, "/assets/audio/VO_58.m4a").then(() => {
                this.voiceJobDone = true;
              });
            });
          });
        });
        return;
      }

      if (this.aniJobDone && this.voiceJobDone) {
        playByLocalUrl(null, "/assets/audio/VO_59.m4a").then(() => {
          this.$root.eventHub.$emit("goToPage", 10);
        });
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
        $("#e00").css({
          "animation-duration": "1s",
          "animation-delay": 0,
          "margin-top": resize(100),
          transition: "margin-top 0.5s "
        });
        setTimeout(() => {
          resolve();
        }, 500);
      });
    },
    // 展示两张图片
    ani02() {
      return new Promise(resolve => {
        $("#e01")
          .show()
          .css({
            "animation-duration": "2s",
            "animation-delay": 0
          })
          .addClass("slideInUp")
          .on("animationend", () => {
            $("#e02")
              .show()
              .css({
                "animation-duration": "2s",
                "animation-delay": 0
              })
              .addClass("slideInUp")
              .on("animationend", () => {
                this.aniJobDone = true;
                resolve();
              });
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

.P09 {
  #e00 {
    margin: 0;
    color: #fff;
    text-align: center;
    animation-duration: 3s;
    animation-delay: 1s;
    @include px2rem(font-size, 100);
    @include px2rem(margin-top, 312);
  }

  .pic-wrap-01 {
    display: none;
    position: absolute;
    @include px2rem(left, 104);
    @include px2rem(top, 245);
    @include px2rem(width, 542);
    @include px2rem(height, 385);
    img {
      display: block;
      width: 100%;
    }
  }

  .pic-wrap-02 {
    display: none;
    position: absolute;
    @include px2rem(left, 646);
    @include px2rem(top, 245);
    @include px2rem(width, 552);
    @include px2rem(height, 385);
    img {
      display: block;
      width: 100%;
    }
  }
}
</style>

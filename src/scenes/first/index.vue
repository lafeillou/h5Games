<template>
  <div class="first-wrap">
    <svg id="svg" style="width:100%;height:100%;" />
    <div class="voice-btn" id="voice-btn"></div>
  </div>
</template>

<script>
import { resize, playByLocalUrl, lettersPos } from "@/utils/utils.js";
import _ from "lodash";
import $ from "jquery";

export default {
  data() {
    return {
      currentLetter: "",
      step: 0,
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
      lettersPos: lettersPos
    };
  },
  mounted() {
    $("#voice-btn").on("click", function() {
      playByLocalUrl(this, "/assets/audio/VO_01.m4a");
    });
    this.step1(v => {
      // 显示完最后一个字母G，显示声音播放按钮
      this.letters[v].removeClass("animated bounceIn");
      this.letters[v].removeClass("animated shake");
      if (v === "g") {
        // console.log(v);
        // 设置vocice-btn
        $("#voice-btn")
          .css({ visibility: "visible" })
          .addClass("animated fadeIn");
      }
    });
    let s = window.Snap("#svg");
    s.click(() => {
      if (this.step === 2) {
        // a字母处于放大状态
        // 将除了a字母以外字母淡入
        this.step3();
        return;
      }
    });
  },
  methods: {
    // The static page contains the following information VO_01
    // Level 1 Week 1 Lesson 1
    // Activity A: Meet the letters ABCDEFG
    // Animated pictures: the letters ABCDEFG slowly zoom into view.
    step1(cb) {
      let i = 0;
      _.forEach(this.lettersPos, (value, key) => {
        // console.log(i);
        setTimeout(() => {
          this.letters[key] = this.zoomInLetter(key, value);
          this.letters[key].addClass("animated bounceIn slow");
          this.letters[key].node.addEventListener("animationend", () => {
            cb(key);
          });
        }, i * 1000);
        i++;
      });
    },
    //     Title: Letters
    // Show the letter A. When the screen is clicked,
    // the letter A will slowly tilt side to side and VO_02 will play.
    // After VO_02, the letter A will stop tilting and slowly grow bigger.
    // VO_03 will play. At full size, letter A will start shaking.
    step2() {
      this.step = 1;
      // 点击的是哪一个
      // console.log(this.letters[key]);
      _.forEach(this.letters, o => {
        o.removeClass("infinite");
      });
      this.letters[this.currentLetter].addClass("animated shake slow infinite");
      // if (key === "a") {
      playByLocalUrl(null, this.letterVoices[this.currentLetter][0], () => {
        // alert("end");
        this.letters[this.currentLetter].removeClass("infinite");
        // 1s中后，除了A以外的字母淡出
        setTimeout(() => {
          _.forEach(this.letters, (v, k) => {
            if (k === this.currentLetter) {
              v.animate(
                {
                  x: resize(487),
                  y: resize(201),
                  width: resize(173 * 2),
                  height: resize(173 * 2)
                },
                1500,
                window.mina.linear,
                () => {
                  // console.log("a放大");
                  this.step = 2;
                  setTimeout(() => {
                    playByLocalUrl(
                      null,
                      this.letterVoices[this.currentLetter][1]
                    );
                  }, 0);
                }
              );
            }
            if (k !== this.currentLetter) {
              v.animate(
                {
                  opacity: 0
                },
                1000,
                window.mina.linear,
                () => {
                  console.log("消失了");
                }
              );
            }
          });
        }, 500);
      });
      // }
    },
    zoomInLetter(key, value) {
      this.step = 0;
      let s = window.Snap("#svg");
      return s
        .image(
          value.url,
          resize(value.x),
          resize(value.y),
          resize(value.w),
          resize(value.h)
        )
        .click(() => {
          console.log(key);
          // console.log(e);
          //新增字母的点击事件
          this.handleClick(key);
        });
    },
    step3() {
      _.forEach(this.letters, (v, k) => {
        // debugger;
        if (k === this.currentLetter) {
          v.animate(
            {
              x: resize(this.lettersPos[this.currentLetter].x),
              y: resize(this.lettersPos[this.currentLetter].y),
              width: resize(173),
              height: resize(173)
            },
            1000,
            window.mina.linear,
            () => {
              console.log("返回初始状态");
              this.step = 1;
            }
          );
        }
        if (k !== this.currentLetter) {
          v.animate(
            {
              opacity: 1
            },
            1500,
            window.mina.linear,
            () => {
              console.log("出现了");
            }
          );
        }
      });
    },
    handleClick(key) {
      this.currentLetter = key;
      let s = window.Snap("#svg");
      s.append(this.letters[this.currentLetter]);
      // alert(`you click ${key}`);
      if (this.step === 2) {
        return;
      }
      this.step2();
    }
  }
};
</script>


<style lang="scss">
@import "@/assets/sass/mixin.scss";

.first-wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  .voice-btn {
    background: url("/assets/images/voice-btn-bg.png") no-repeat center center;
    background-size: 100% 100%;
    @include px2rem(width, 84);
    @include px2rem(height, 84);
    position: absolute;
    @include px2rem(right, 106);
    @include px2rem(bottom, 95);
    visibility: hidden;
  }
}
</style>

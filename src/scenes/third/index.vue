<template>
  <div class="third-wrap">
    <svg id="svg3" style="width:100%;height:100%;" />
    <div class="voice-btn" id="voice-btn-02"></div>
  </div>
</template>


<script>
import _ from "lodash";
import { resize, playByLocalUrl } from "@/utils/utils.js";
import $ from "jquery";

export default {
  data() {
    return {
      gameElementArr: [],
      round: 0,
      letterVoice: {
        a: ["/assets/audio/VO_14.m4a"],
        b: ["/assets/audio/VO_11.m4a"],
        c: ["/assets/audio/VO_28.m4a"],
        d: ["/assets/audio/VO_25.m4a"],
        e: ["/assets/audio/VO_45.m4a"],
        f: ["/assets/audio/VO_42.m4a"]
      },
      gameMitrixTemplate: [
        ["x", "o", "o", "o"],
        ["o", "x", "o", "x"],
        ["x", "x", "o", "x"],
        ["o", "o", "x", "o"]
      ],
      gameMitrix: [new Array(4), new Array(4), new Array(4), new Array(4)]
    };
  },
  mounted() {
    this.$root.eventHub.$on("compareLettersEvent", data => {
      let arr = data.split("-");
      this.gameElementArr = arr;
      this.initMitrix();
    });
    this.$root.eventHub.$on("startGameEvent", data => {
      console.log(data);
      this.step1();
    });
  },
  methods: {
    initMitrix() {
      _.forEach(this.gameMitrixTemplate, (outer, outerIndex) => {
        _.forEach(outer, (inner, innerIndex) => {
          if (this.gameMitrixTemplate[outerIndex][innerIndex] === "x") {
            this.gameMitrixTemplate[outerIndex][
              innerIndex
            ] = this.gameElementArr[0].toUpperCase();
          }
          if (this.gameMitrixTemplate[outerIndex][innerIndex] === "o") {
            this.gameMitrixTemplate[outerIndex][
              innerIndex
            ] = this.gameElementArr[1].toUpperCase();
          }
        });
      });
    },
    // 检查是否胜利
    checkWin(targetNum, targetLetter) {
      let i = 0;
      _.forEach(this.gameMitrixTemplate, (outer, outerIndex) => {
        _.forEach(outer, (inner, innerIndex) => {
          if (
            this.gameMitrix[outerIndex][innerIndex]
              .attr("data-text")
              .toLowerCase() === targetLetter &&
            this.gameMitrix[outerIndex][innerIndex].attr("data-select")
          ) {
            i++;
          }
        });
      });

      if (i === targetNum) {
        console.log("wins");
        playByLocalUrl(null, "/assets/audio/VO_12.m4a");
        // shake all A
        _.forEach(this.gameMitrixTemplate, (outer, outerIndex) => {
          _.forEach(outer, (inner, innerIndex) => {
            if (
              this.gameMitrix[outerIndex][innerIndex]
                .attr("data-text")
                .toLowerCase() === targetLetter
            ) {
              this.gameMitrix[outerIndex][innerIndex].addClass(
                "animated flash fast"
              );
              setTimeout(() => {
                this.gameMitrix[outerIndex][innerIndex].removeClass(
                  "animated flash fast"
                );
              }, 1000);
            }
          });
        });
        setTimeout(() => {
          this.step2();
        }, 5500);
      }
    },
    // 绘制游戏用字母矩阵
    step1() {
      let s = window.Snap("#svg3");
      let that = this;
      s.clear();
      _.forEach(this.gameMitrixTemplate, (outer, outerIndex) => {
        _.forEach(outer, (inner, innerIndex) => {
          // console.log(`${outerIndex}-${innerIndex}`);
          this.gameMitrix[outerIndex][innerIndex] = s.text(
            resize(400) + resize(150) * outerIndex,
            resize(170) + resize(150) * innerIndex,
            this.gameMitrixTemplate[outerIndex][innerIndex]
          );
          this.gameMitrix[outerIndex][innerIndex]
            .addClass("textSize")
            .attr({
              fill: "#333",
              "data-text": this.gameMitrixTemplate[outerIndex][innerIndex]
            })
            .click(function() {
              console.log(this.attr("data-text").toLowerCase());
              if (
                this.attr("data-text").toLowerCase() === that.gameElementArr[0]
              ) {
                this.attr({ fill: "orange" });
                this.attr({ "data-select": true });
                that.checkWin(7, that.gameElementArr[0]);
              }
              if (
                this.attr("data-text").toLowerCase() === that.gameElementArr[1]
              ) {
                this.addClass("animated shake fast");
                setTimeout(() => {
                  this.removeClass("animated shake fast");
                }, 1000);
                playByLocalUrl(
                  null,
                  that.letterVoice[that.gameElementArr[1]][0]
                );
              }
            });
        });
      });
      this.gameMitrixTemplate = [
        ["x", "o", "o", "o"],
        ["o", "x", "o", "x"],
        ["x", "x", "o", "x"],
        ["o", "o", "x", "o"]
      ];
      // 显示声音按钮
      $("#voice-btn-02")
        .css({ visibility: "visible" })
        .addClass("animated fadeIn")
        .on("click", function() {
          if (that.gameElementArr[0] === "a") {
            playByLocalUrl(this, "/assets/audio/VO_10.m4a");
          }
          if (that.gameElementArr[0] === "c") {
            playByLocalUrl(this, "/assets/audio/VO_24.m4a");
          }
          if (that.gameElementArr[0] === "e") {
            playByLocalUrl(this, "/assets/audio/VO_41.m4a");
          }
        });
      // 自动播放
      playByLocalUrl(null, "/assets/audio/VO_09.m4a");
    },
    //
    step2() {
      this.initMitrix();
      // 交换目标
      let swap = this.gameElementArr[0];
      this.gameElementArr[0] = this.gameElementArr[1];
      this.gameElementArr[1] = swap;
      let s = window.Snap("#svg3");
      let that = this;
      if (that.gameElementArr[0] === "b") {
        playByLocalUrl(null, "/assets/audio/VO_13.m4a");
      }
      if (that.gameElementArr[0] === "d") {
        playByLocalUrl(null, "/assets/audio/VO_27.m4a");
      }
      if (that.gameElementArr[0] === "f") {
        playByLocalUrl(null, "/assets/audio/VO_44.m4a");
      }
      s.clear();
      _.forEach(this.gameMitrixTemplate, (outer, outerIndex) => {
        _.forEach(outer, (inner, innerIndex) => {
          // console.log(`${outerIndex}-${innerIndex}`);
          this.gameMitrix[outerIndex][innerIndex] = s.text(
            resize(400) + resize(150) * outerIndex,
            resize(170) + resize(150) * innerIndex,
            this.gameMitrixTemplate[outerIndex][innerIndex]
          );
          this.gameMitrix[outerIndex][innerIndex]
            .addClass("textSize")
            .attr({
              fill: "#333",
              "data-text": this.gameMitrixTemplate[outerIndex][innerIndex]
            })
            .click(function() {
              console.log(this.attr("data-text").toLowerCase());
              if (
                this.attr("data-text").toLowerCase() === that.gameElementArr[0]
              ) {
                this.attr({ fill: "orange" });
                this.attr({ "data-select": true });
                that.checkWin(9, that.gameElementArr[0]);
              }
              if (
                this.attr("data-text").toLowerCase() === that.gameElementArr[1]
              ) {
                this.addClass("animated shake fast");
                setTimeout(() => {
                  this.removeClass("animated shake fast");
                }, 1000);
                playByLocalUrl(
                  null,
                  that.letterVoice[that.gameElementArr[1]][0]
                );
              }
            });
        });
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/sass/mixin.scss";

.third-wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  .textSize {
    @import "@/assets/sass/mixin.scss";
    @include px2rem(font-size, 40);
  }
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

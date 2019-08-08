<template>
  <div class="P P03">
    <svg id="e001" />
  </div>
</template>

<script>
// import $ from "jquery";
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
          "/assets/audio/VO_07.m4a",
          "/assets/audio/VO_14.m4a",
          "/assets/audio/VO_10.m4a"
        ],
        b: [
          "/assets/audio/VO_04.m4a",
          "/assets/audio/VO_05.m4a",
          "/assets/audio/VO_08.m4a",
          "/assets/audio/VO_11.m4a",
          "/assets/audio/VO_13.m4a"
        ],
        c: [
          "/assets/audio/VO_16.m4a",
          "/assets/audio/VO_17.m4a",
          "/assets/audio/VO_21.m4a",
          "/assets/audio/VO_28.m4a",
          "/assets/audio/VO_24.m4a"
        ],
        d: [
          "/assets/audio/VO_18.m4a",
          "/assets/audio/VO_19.m4a",
          "/assets/audio/VO_22.m4a",
          "/assets/audio/VO_25.m4a",
          "/assets/audio/VO_27.m4a"
        ],
        e: [
          "/assets/audio/VO_30.m4a",
          "/assets/audio/VO_31.m4a",
          "/assets/audio/VO_37.m4a",
          "/assets/audio/VO_45.m4a",
          "/assets/audio/VO_41.m4a"
        ],
        f: [
          "/assets/audio/VO_32.m4a",
          "/assets/audio/VO_33.m4a",
          "/assets/audio/VO_38.m4a",
          "/assets/audio/VO_42.m4a",
          "/assets/audio/VO_44.m4a"
        ],
        g: [
          "/assets/audio/VO_34.m4a",
          "/assets/audio/VO_35.m4a",
          "/assets/audio/VO_39.m4a",
          "",
          ""
        ]
      },
      // 节点
      voiceJobDone: false,
      aniJobDone: false,
      firstWin: false,
      secondWin: false,
      lettersPos: lettersPos,
      gameMitrixTemplate: [
        ["a", "b", "b", "b"],
        ["b", "a", "b", "a"],
        ["a", "a", "b", "a"],
        ["b", "b", "a", "b"]
      ],
      gameMitrix: [new Array(4), new Array(4), new Array(4), new Array(4)]
    };
  },
  mounted() {
    this.$root.eventHub.$on("clickDeskEvent", this.handleClickDesk);
    this.ani00(["a", "b"]);
    //   .then(() => {
    //     return this.ani01();
    //   })
    //   .then(() => {
    //     return this.ani02();
    //   });
  },
  methods: {
    handleClickDesk() {
      console.log("clickDeskEvent");
      if (this.firstWin) {
        this.ani00(["b", "a"]);
        return;
      }

      if (this.firstWin && this.secondWin) {
        this.$root.eventHub.$emit("pageFinishedEvent", 3);
      }
      // this.$root.eventHub.$emit("pageFinishedEvent", 3);
    },
    // -----------------------frames function
    // 8s
    // 显示字母A-G
    ani00(arr) {
      if (!this.firstWin) {
        playByLocalUrl(null, "/assets/audio/VO_09.m4a").then(() => {
          playByLocalUrl(null, this.letterVoices[arr[0]][4]);
        });
      } else {
        playByLocalUrl(null, this.letterVoices[arr[0]][4]);
      }

      return new Promise(resolve => {
        let s = window.Snap("#e001");
        let that = this;
        // debugger;
        s.clear();
        this.initMitrix(arr);
        _.forEach(this.gameMitrixTemplate, (outer, outerIndex) => {
          _.forEach(outer, (inner, innerIndex) => {
            // console.log(`${outerIndex}-${innerIndex}`);
            this.gameMitrix[outerIndex][innerIndex] = s.text(
              resize(400) + resize(150) * outerIndex,
              resize(170) + resize(150) * innerIndex,
              this.gameMitrixTemplate[outerIndex][innerIndex]
            );
            this.gameMitrix[outerIndex][innerIndex]
              .addClass("textSize web-font")
              .attr({
                fill: "white",
                "data-text": this.gameMitrixTemplate[outerIndex][innerIndex]
              })
              .click(function(e) {
                // console.log(e);
                e.stopPropagation();
                if (this.attr("data-text").toLowerCase() === arr[0]) {
                  this.attr({ fill: "orange", "data-select": true });
                  if (!this.firstWin) {
                    that.checkWin(7, arr[0]);
                  } else {
                    that.checkWin(9, arr[0]);
                  }
                }
                if (this.attr("data-text").toLowerCase() === arr[1]) {
                  this.addClass("animated shake fast");
                  setTimeout(() => {
                    this.removeClass("animated shake fast");
                  }, 1000);
                  playByLocalUrl(null, that.letterVoices[arr[1]][0]);
                }
              });
          });
        });
        resolve();
      });
    },
    //------------------------sub function
    initMitrix(arr) {
      _.forEach(this.gameMitrixTemplate, (outer, outerIndex) => {
        _.forEach(outer, (inner, innerIndex) => {
          if (this.gameMitrixTemplate[outerIndex][innerIndex] === "a") {
            this.gameMitrixTemplate[outerIndex][
              innerIndex
            ] = arr[0].toUpperCase();
          }
          if (this.gameMitrixTemplate[outerIndex][innerIndex] === "b") {
            this.gameMitrixTemplate[outerIndex][
              innerIndex
            ] = arr[1].toUpperCase();
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
        // console.log("wins");

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
        if (
          targetLetter === "a" ||
          targetLetter === "c" ||
          targetLetter === "e"
        ) {
          this.firstWin = true;
        }
        this.secondWin = true;
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/sass/mixin.scss";

.P03 {
  #e001 {
    width: 100%;
    height: 100%;
  }
  //   .letterA {
  //     animation-iteration-count: 6;
  //     animation-duration: 1.5s;
  //     animation-delay: 0;
  //   }
  //   .letterA_on_big {
  //     animation-iteration-count: 2;
  //     animation-duration: 1s;
  //     animation-delay: 0;
  //   }
  .textSize {
    font-weight: bold;
    @include px2rem(font-size, 100);
  }
}
</style>

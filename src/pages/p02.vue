<template>
  <div class="P P02" v-hammer:tap="onTap">
    <svg id="e002" />
  </div>
</template>

<script>
// import $ from "jquery";
// eslint-disable-next-line
import { resize, playByLocalUrl, lettersPos } from "@/utils/utils.js";
import _ from "lodash";
// import Hammer from "hammerjs";
// console.log(Hammer);
export default {
  data() {
    return {
      letters: {},
      letterVoices: {
        a: [
          "/assets/audio/VO_02.m4a",
          "/assets/audio/VO_03.m4a",
          "/assets/audio/VO_07.m4a"
        ],
        b: [
          "/assets/audio/VO_04.m4a",
          "/assets/audio/VO_05.m4a",
          "/assets/audio/VO_08.m4a"
        ],
        c: [
          "/assets/audio/VO_16.m4a",
          "/assets/audio/VO_17.m4a",
          "/assets/audio/VO_21.m4a"
        ],
        d: [
          "/assets/audio/VO_18.m4a",
          "/assets/audio/VO_19.m4a",
          "/assets/audio/VO_22.m4a"
        ],
        e: [
          "/assets/audio/VO_30.m4a",
          "/assets/audio/VO_31.m4a",
          "/assets/audio/VO_37.m4a"
        ],
        f: [
          "/assets/audio/VO_32.m4a",
          "/assets/audio/VO_33.m4a",
          "/assets/audio/VO_38.m4a"
        ],
        g: [
          "/assets/audio/VO_34.m4a",
          "/assets/audio/VO_35.m4a",
          "/assets/audio/VO_39.m4a"
        ]
      },
      // 节点
      voiceJobDone: false,
      aniJobDone: false,
      isADone: false,
      isBDone: false,
      isABDone: false,
      pointToADone: false,
      pointToBDone: false,
      lettersPos: lettersPos
    };
  },
  mounted() {
    this.ani00();
  },
  methods: {
    onTap() {
      if (!this.isADone) {
        // debugger;
        this.ani01("a")
          .then(() => {
            return this.ani02("a");
          })
          .then(() => {
            // 不会自动播放
            // return playByLocalUrl(null, this.letterVoices["a"][1]);
            return new Promise(resolve => {
              setTimeout(() => {
                resolve();
              }, 3000);
            });
          })
          .then(() => {
            return this.ani03("a");
          })
          .then(() => {
            this.isADone = true;
          });
      }

      if (!this.isBDone) {
        this.ani01("b")
          .then(() => {
            return this.ani02("b");
          })
          .then(() => {
            // 不会自动播放
            // return playByLocalUrl(null, this.letterVoices["a"][1]);
            return new Promise(resolve => {
              setTimeout(() => {
                resolve();
              }, 3000);
            });
          })
          .then(() => {
            return this.ani03("b");
          })
          .then(() => {
            this.isBDone = true;
          });
      }

      //   // 同时显示AB两个字母
      if (this.isADone && this.isBDone && !this.isABDone) {
        playByLocalUrl(null, "/assets/audio/VO_06.m4a");
        this.ani04("a-b").then(() => {
          this.isABDone = true;
        });
        return;
      }

      if (this.isABDone && !this.pointToADone) {
        // alert("a");
        this.ani05("a").then(() => {
          this.pointToADone = true;
        });
        return;
      }

      if (this.isABDone && !this.pointToBDone) {
        // alert("a");
        this.ani05("b").then(() => {
          this.pointToBDone = true;
        });
        return;
      }
    },
    // -----------------------frames function
    // 8s
    // 显示字母A-G
    ani00() {
      return new Promise(resolve => {
        _.forEach(this.lettersPos, (value, key) => {
          this.letters[key] = this.zoomInLetter(key, value);
          this.letters[key].attr({ id: key });
          // document.getElementById(key).onclick = ev => {
          //   alert(ev);
          // };
          this.letters[key].click(() => {
            // alert(key);
            this.ani01(key);
            // 如下代码也不会自动播放
            // setTimeout(() => {
            //   playByLocalUrl(null, this.letterVoices[key][1]);
            // }, 5000);
          });
        });
        // let hammer = new Hammer(document.getElementById("a"));
        // console.log(hammer);
        // hammer.ontap = function(ev) {
        //   alert(ev);
        // };
        resolve();
      });
    },
    ani01(letter) {
      return new Promise(resolve => {
        _.forEach(this.letters, value => {
          value.attr({ class: "" });
        });
        this.letters[letter].addClass("animated shake letterA");
        // debugger;
        playByLocalUrl(null, this.letterVoices[letter][0]);
        this.letters[letter].node.addEventListener("animationend", () => {
          this.letters[letter].attr({ class: "" });
          resolve();
        });
      });
    },
    ani02(letter) {
      return new Promise(resolve => {
        _.forEach(this.letters, (v, k) => {
          if (k === letter) {
            v.animate(
              {
                // 目标状态和位置
                x: resize(487),
                y: resize(201),
                width: resize(173 * 2),
                height: resize(173 * 2)
              },
              1500,
              window.mina.linear,
              () => {
                resolve();
              }
            );
          }
          if (k !== letter) {
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
      });
    },
    ani03(letter) {
      return new Promise(resolve => {
        _.forEach(this.letters, (v, k) => {
          // debugger;
          if (k === letter) {
            v.animate(
              {
                x: resize(this.lettersPos[letter].x),
                y: resize(this.lettersPos[letter].y),
                width: resize(173),
                height: resize(173)
              },
              1000,
              window.mina.linear,
              () => {
                console.log("返回初始状态");
              }
            );
          }
          if (k !== letter) {
            v.animate(
              {
                opacity: 1
              },
              1500,
              window.mina.linear,
              () => {
                this.letters[letter].attr({ class: "" });
                resolve();
              }
            );
          }
        });
      });
    },
    // 同时显示A,B两个字母
    ani04(str) {
      return new Promise(resolve => {
        let s = window.Snap("#e002");
        s.clear();
        let arr = str.split("-");
        _.forEach(arr, o => {
          this.letters[o] = this.zoomInLetter(o, this.lettersPos[o]);
          this.letters[o].animate(
            {
              width: resize(173 * 2),
              height: resize(173 * 2)
            },
            1000,
            window.mina.linear,
            () => {
              resolve();
            }
          );
        });

        if (arr.length <= 2) {
          this.letters[arr[0]].animate(
            {
              x: resize(300),
              y: resize(201)
            },
            1000,
            window.mina.linear,
            null
          );
          this.letters[arr[1]].animate(
            {
              x: resize(674),
              y: resize(201)
            },
            1000,
            window.mina.linear,
            null
          );
        } else if (arr.length > 2) {
          this.letters[arr[0]].animate(
            {
              x: resize(110),
              y: resize(201)
            },
            1000,
            window.mina.linear,
            null
          );
          this.letters[arr[1]].animate(
            {
              x: resize(500),
              y: resize(201)
            },
            1000,
            window.mina.linear,
            null
          );
          this.letters[arr[2]].animate(
            {
              x: resize(854),
              y: resize(201)
            },
            1000,
            window.mina.linear,
            null
          );
        }
      });
    },
    ani05(letter) {
      return new Promise(resolve => {
        this.letters[letter].addClass("animated shake slow");
        playByLocalUrl(null, this.letterVoices[letter][2]).then(() => {
          this.letters[letter].attr({ class: "" });
          resolve();
        });
      });
    },
    //------------------------sub function
    zoomInLetter(key, value) {
      this.step = 0;
      let s = window.Snap("#e002");
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

.P02 {
  #e002 {
    width: 100%;
    height: 100%;
  }
  .letterA {
    animation-iteration-count: 6;
    animation-duration: 1.5s;
    animation-delay: 0;
  }
  .letterA_on_big {
    animation-iteration-count: 2;
    animation-duration: 1s;
    animation-delay: 0;
  }
}
</style>

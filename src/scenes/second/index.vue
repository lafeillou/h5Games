<template>
  <div class="second-wrap">
    <svg id="svg2" style="width:100%;height:100%;" />
  </div>
</template>

<script>
import _ from "lodash";
import { resize, lettersPos, playByLocalUrl } from "@/utils/utils.js";

export default {
  data() {
    return {
      currentLetter: "",
      step: 0,
      letters: {},
      lettersPos: lettersPos,
      letterVoices: {
        a: ["/assets/audio/VO_07.m4a"],
        b: ["/assets/audio/VO_08.m4a"],
        c: ["/assets/audio/VO_21.m4a"],
        d: ["/assets/audio/VO_22.m4a"],
        e: ["/assets/audio/VO_37.m4a"],
        f: ["/assets/audio/VO_38.m4a"],
        g: ["/assets/audio/VO_39.m4a"]
      }
    };
  },
  mounted() {
    this.$root.eventHub.$on("compareLettersEvent", data => {
      console.log(data);
      this.step1(data);
    });
  },
  methods: {
    zoomInLetter(key, value) {
      this.step = 0;
      let s = window.Snap("#svg2");
      return s
        .image(
          value.url,
          resize(value.x),
          resize(value.y),
          resize(value.w),
          resize(value.h)
        )
        .click(() => {
          this.handleClick(key);
        });
    },
    handleClick(key) {
      // console.log(key);
      // voice: point to A,B,C...
      this.letters[key].addClass("animated shake slow");
      setTimeout(() => {
        playByLocalUrl(null, this.letterVoices[key][0]);
        this.letters[key].removeClass("animated shake slow");
      }, 1000);
    },
    step1(data) {
      let s = window.Snap("#svg2");
      s.clear();
      let arr = data.split("-");
      _.forEach(arr, o => {
        this.letters[o] = this.zoomInLetter(o, this.lettersPos[o]);
        this.letters[o].animate(
          {
            // x: resize(487),
            // y: resize(201),
            width: resize(173 * 2),
            height: resize(173 * 2)
          },
          1500,
          window.mina.linear,
          null
        );
      });
      setTimeout(() => {
        playByLocalUrl(null, "/assets/audio/VO_06.m4a");
      }, 1500);
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
    }
  }
};
</script>

<style lang="scss">
.second-wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
</style>

<template>
  <svg id="svg" style="width:100%;height:100%;" />
</template>

<script>
import { resize } from "@/utils/utils.js";
import _ from "lodash";

export default {
  data() {
    return {
      letters: {},
      lettersPos: {
        a: {
          url: "/assets/images/letters/a.png",
          w: 173,
          h: 173,
          x: 276,
          y: 149
        },
        b: {
          url: "/assets/images/letters/b.png",
          w: 173,
          h: 173,
          x: 474,
          y: 149
        },
        c: {
          url: "/assets/images/letters/c.png",
          w: 173,
          h: 173,
          x: 680,
          y: 149
        },
        d: {
          url: "/assets/images/letters/d.png",
          w: 173,
          h: 173,
          x: 908,
          y: 149
        },
        e: {
          url: "/assets/images/letters/e.png",
          w: 173,
          h: 173,
          x: 367,
          y: 375
        },
        f: {
          url: "/assets/images/letters/f.png",
          w: 173,
          h: 173,
          x: 575,
          y: 375
        },
        g: {
          url: "/assets/images/letters/g.png",
          w: 173,
          h: 173,
          x: 800,
          y: 375
        }
      }
    };
  },
  mounted() {
    this.step1();
  },
  methods: {
    // The static page contains the following information VO_01
    // Level 1 Week 1 Lesson 1
    // Activity A: Meet the letters ABCDEFG
    // Animated pictures: the letters ABCDEFG slowly zoom into view.
    step1() {
      let i = 0;
      _.forEach(this.lettersPos, (value, key) => {
        console.log(i);
        setTimeout(() => {
          this.letters[key] = this.zoomInLetter(key, value);
          this.letters[key].addClass("animated bounceIn slow");
        }, i * 1000);
        i++;
      });
    },
    zoomInLetter(key, value) {
      let s = window.Snap("#svg");
      return s.image(
        value.url,
        resize(value.x),
        resize(value.y),
        resize(value.w),
        resize(value.h)
      ).click(function() {
          //新增字母的点击事件
          alert(key)
      });
    }
  }
};
</script>


<style lang="scss">
.first-step1-slowly-bounce-in {
  animation-duration: 3s !important;
}
</style>

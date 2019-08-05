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
    resize();
    let s = window.Snap("#svg");
    _.forEach(this.lettersPos, (value, key) => {
      this.letters[key] = s.image(
        value.url,
        resize(value.x),
        resize(value.y),
        resize(value.w),
        resize(value.h)
      );
    });
    console.log(this.letters);
  }
};
</script>


<style></style>
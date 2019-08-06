<template>
  <div class="third-wrap">
    <svg id="svg3" style="width:100%;height:100%;" />
  </div>
</template>


<script>
import _ from "lodash";
import { resize } from "@/utils/utils.js";

export default {
  data() {
    return {
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
    this.$root.eventHub.$on("startGameEvent", data => {
      console.log(data);
      this.step1();
    });
  },
  methods: {
    // 绘制游戏用字母矩阵
    step1() {
      let s = window.Snap("#svg3");
      s.clear();
      _.forEach(this.gameMitrixTemplate, (outer, outerIndex) => {
        _.forEach(outer, (inner, innerIndex) => {
          // console.log(`${outerIndex}-${innerIndex}`);
          this.gameMitrix[outerIndex][innerIndex] = s.text(
            resize(340) + resize(150) * outerIndex,
            resize(150) + resize(150) * innerIndex,
            this.gameMitrixTemplate[outerIndex][innerIndex]
          );
          this.gameMitrix[outerIndex][innerIndex].addClass("textSize");
        });
      });
    }
  }
};
</script>

<style lang="scss">
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
}
</style>

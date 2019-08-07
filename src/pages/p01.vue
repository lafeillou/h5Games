<template>
  <div class="P01">
    <div class="web-font animated" id="e00">Level 1 Week 1 Lesson 1</div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {};
  },
  mounted() {
    this.$root.eventHub.$on("clickDeskEvent", this.handleClickDesk);
    this.ani00()
      .then(() => {
        return this.ani01();
      })
      .then(() => {
        this.ani02();
      });
  },
  methods: {
    handleClickDesk() {
      alert(1);
    },
    // 4s
    ani00() {
      // eslint-disable-next-line
      return new Promise((resolve, reject) => {
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
    ani02() {
      alert(1);
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/sass/mixin.scss";

.P01 {
  #e00 {
    margin: 0;
    color: #fff;
    text-align: center;
    animation-duration: 3s;
    animation-delay: 1s;
    @include px2rem(font-size, 100);
    @include px2rem(margin-top, 312);
  }
}
</style>

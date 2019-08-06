<template>
  <div id="app">
    <First v-show="currentScene === 0"></First>
    <Second v-show="currentScene === 1"></Second>
    <Third v-show="currentScene === 2"></Third>
    <ul class="choose-to-compare">
      <li @click="selectScenes(0,'all')">A-G</li>
      <li @click="selectScenes(1,'a-b')">A-B</li>
      <li @click="selectScenes(1,'c-d')">C-D</li>
      <li @click="selectScenes(1,'e-f-g')">E-F-G</li>
      <li @click="selectScenes(2,'game')">Games</li>
    </ul>
  </div>
</template>

<script>
import First from "@/scenes/first/index.vue";
import Second from "@/scenes/second/index.vue";
import Third from "@/scenes/third/index.vue";

export default {
  name: "app",
  data() {
    return {
      currentScene: 0
    };
  },
  components: {
    First,
    Second,
    Third
  },
  mounted() {},
  methods: {
    selectScenes(index, data) {
      // console.log(data);
      this.currentScene = index;
      if (index === 1) {
        this.$root.eventHub.$emit("compareLettersEvent", data);
      } else if (index === 2) {
        this.$root.eventHub.$emit("startGameEvent", data);
      }
    }
  }
};
</script>

<style lang="scss" >
@import "./assets/sass/mixin.scss";

#app {
  height: 100%;
  position: relative;
  overflow: hidden;
  background: #000 url("/assets/images/bg.png") no-repeat center center;
  background-size: 100% 100%;
  ul.choose-to-compare {
    position: absolute;
    bottom: 0;
    left: 50%;
    list-style: none;
    font-weight: bold;
    color: #333;
    @include px2rem(margin-left, -250);
    li {
      float: left;
      @include px2rem(margin-left, 20);
      @include px2rem(margin-right, 20);
      @include px2rem(font-size, 20);
    }
  }
}
</style>

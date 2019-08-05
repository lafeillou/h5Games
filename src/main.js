import Vue from "vue";
import App from "./App.vue";
// 全局 reset
import "normalize.css/normalize.css";
// 全局样式
import "./assets/sass/main.scss";
// 淘宝界面元素显示尺寸兼容方案(比较旧，最新推荐vw)
// 新方案推荐阅读 https://www.w3cplus.com/mobile/vw-layout-in-vue.html
import "lib-flexible";
const snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);

Vue.config.productionTip = false;
new Vue({
  snap,
  render: h => h(App),
  data: {
    eventHub: new Vue()
  }
}).$mount("#app");

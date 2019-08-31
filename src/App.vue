<template>
  <div id="app" :style="backgroundDiv">
    <router-view />
    <go-top></go-top>
  </div>
</template>

<script>
import GoTop from "@/components/gotop/GoTop";
export default {
  name: "App",
  components: { GoTop },
  data() {
    return {
      backgroundDiv: {
        backgroundImage: "url(" + require("../src/assets/img/test2.jpg") + ")",
        backgroundRepeat: "repeat",
        backgroundSize: "100%"
      }
    };
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #f5f5f5;
  font-weight: 400;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  line-height: 1.5;
}
a {
  cursor: pointer;
  text-decoration: none;
  transition: none 86ms ease-out;
}
a:hover {
  color: #00ccff;
}
.me-area {
  background-color: #fff;
}
html {
  height: 100%;
}
body {
  min-height: 100%;
}
body {
  position: relative;
}

.me-pull-right {
  float: right;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
<template>
  <div id="app">
    <div class="nav-top">
      <div class="date">{{ date }}</div>
      <div class="weekday">{{ weekday }}</div>
      <div class="time">{{ String(time).slice(10) }}</div>
      <router-link tag="span" to="/login" class="user">登录</router-link>
    </div>
    <keep-alive>
    <router-view />
    </keep-alive>
    <wd-tabbar border fixed>
      <wd-tabbar-item icon="wd-icon-chat" to="/">首页</wd-tabbar-item>
      <wd-tabbar-item icon="wd-icon-chat" to="/photo">美图</wd-tabbar-item>
      <wd-tabbar-item icon="wd-icon-chat" to="/news">资讯</wd-tabbar-item>
      <wd-tabbar-item icon="wd-icon-chat" to="/music">音乐</wd-tabbar-item>
    </wd-tabbar>
  </div>
</template>

<script>
import { debounce } from "lodash-es";
import { timeFormat } from "@/utils/GetTime";
export default {
  data() {
    return {
      tabbar: 0,
      date: 0,
      weekday: 0,
      time: 0,
    };
  },
  created() {
    this.getTime = debounce(this.getTime);
  },
  beforeMount() {
    this.timer = setInterval(() => {
      this.time = timeFormat(new Date());
    }, 1000);
  },
  mounted() {
    this.getTime();
  },
  methods: {
    getTime() {
      this.$axios
        .get("https://api.apiopen.top/api/getTime")
        .then(({ data }) => {
          this.date = data.result.date;
          this.weekday = data.result.weekday;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-top {
  width: 100vw;
  height: 50px;
  border-bottom: 1px solid #ddd;
  position: sticky;
  top: 0;
  left: 0;
  background-color: rgb(48, 185, 231);
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  padding: 0 15px;
  z-index: 900;

  .user {
    width: 35px;
    height: 35px;
    border: 1px solid #ddd;
    border-radius: 999px;
    color: aqua;
    text-align: center;
    line-height: 35px;
    background-color: #fff;
  }

  div {
    flex: 1;
  }
}
</style>

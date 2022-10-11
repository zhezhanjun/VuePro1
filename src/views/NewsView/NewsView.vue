<template>
  <div class="newview">
    <div class="main" v-show="parentshow">
      <div class="selecttime">
        <span class="demonstration">可选择日期以切换内容</span>
        <el-date-picker value-format="yyyyMMdd" v-model="value1" type="date" placeholder="选择日期"  @input="getData2"></el-date-picker>
      </div>
      <div
        class="new-list"
        v-for="(item, i) in news"
        :key="item.id"
        @click="getnews(item.id)"
      >
        <div class="imgbox">
          <img
            v-lazy="item.images[0]"
            class="lazyload-img"
            @click="toggle(i)"
          />
          <div class="textbox">
            <div class="text">{{ item.title }}</div>
            <div class="text2">作者: {{ item.hint }}</div>
          </div>
        </div>
      </div>
    </div>
    <NewsList
      :data="this.newslist"
      :parentshow="this.parentshow"
      :childrenshow="this.childrenshow"
      @returnparent="returnparent2"
      v-show="childrenshow"
    />
  </div>
</template>

<script>
import NewsList from "./NewsList.vue";
import { debounce } from "lodash-es";
export default {
  data() {
    return {
      news: [],
      urls: [],
      newslist: {},
      parentshow: true,
      childrenshow: false,
      value1:'',
    };
  },
  created() {
    this.getData = debounce(this.getData);
  },
  mounted() {
    this.getData();
  },
  computed: {},
  methods: {
    getData() {
      let val = Number(this.value1)
      val++
      String(val)
      this.$axios
        .get(`https://apis.netstart.cn/zhihudaily/stories/latest`)
        .then(({ data }) => {
          let newsarr = []
          newsarr.push(...data.stories);
          this.news = newsarr
          let arr = [];
          this.news.forEach((item) => {
            arr.push(item.images[0]);
          });
          this.urls = arr;
        });

    },
    getData2() {
      let val = Number(this.value1)
      val++
      String(val)
      this.$axios
        .get(`https://apis.netstart.cn/zhihudaily/stories/before/${val}`)
        .then(({ data }) => {
          let newsarr = []
          newsarr.push(...data.stories);
          this.news = newsarr
          let arr = [];
          this.news.forEach((item) => {
            arr.push(item.images[0]);
          });
          this.urls = arr;
        });

    },
    toggle(i) {
      this.$preview({
        urls: this.urls,
        current: i,
      });
    },
    async getnews(id) {
      await this.$axios
        .get(`https://apis.netstart.cn/zhihudaily/story/${id}`)
        .then(({ data }) => {
          this.newslist = data;
        });
      this.parentshow = !this.parentshow;
      this.childrenshow = !this.childrenshow;
    },
    returnparent2(newval) {
      this.parentshow = newval.parentshow2;
      this.childrenshow = newval.childrenshow2;
    },
  },
  components: {
    NewsList,
  },
};
</script>

<style lang="scss" scoped>
.newview {
  width: 100vw;

  .main {
    width: 100%;
    margin-bottom: 51px;
    padding: 0 20px;

    .selecttime {
      margin: 15px auto 0;
      text-align: center;
    }

    .new-list {
      margin: 30px 0;

      .imgbox {
        display: flex;
        justify-content: space-between;
        position: relative;

        .textbox {
          margin-left: 10px;

          .text2 {
            position: absolute;
            bottom: 0;
          }
        }
      }
    }
  }
}
</style>
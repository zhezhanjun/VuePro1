<template>
  <div class="photoview">
    <div class="imgbox" v-for="(item,i) in imgs" :key="item.id">
      <img v-lazy="item.url" class="lazyload-img" @click="toggle(i)"/>
      <div class="text">{{ item.title }}</div>
    </div>
		<wd-infinite-load ref="loadmore" @loadmore="loadmore" :loading="loading"></wd-infinite-load>
  </div>
</template>

<script>
import { debounce } from "lodash-es";
export default {
  data() {
    return {
        imgs:[],
				urls:[],
				num: 0,
				loading: false,
				time: Infinity
    };
  },
  created() {
    this.getData = debounce(this.getData);
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios
        .get("https://api.apiopen.top/api/getImages?page=0&size=10")
        .then(({ data }) => {
        this.imgs.push(...data.result.list)
				let arr = []
				this.imgs.forEach(item => {
				arr.push(item.url)
				})
				this.urls = arr
        });
    },
		toggle (i) {
      this.$preview({
        urls: this.urls,
				current:i
      })
    },
		loadmore () {
      this.loading = true
      if (this.time) {
        setTimeout(() => {
          this.num += 10
					this.getData()
          this.loading = false
          // 模拟请求，请求3次，3次结束后设置加载结束
          this.time--
        }, 1000)
      } else {
        this.$refs.loadmore.loadEnd()
      }
    }
  }
  
};
</script>

<style lang="scss" scoped>
.photoview {
  width: 100vw;

  .imgbox {
    width: 100%;
    height: 465px;
    text-align: center;

    img {
      display: block;
      width: 100%;
      height: 350px;
    }

    .text {
      font-size: 20px;
      font-weight: 500;
    }
  }
}
</style>

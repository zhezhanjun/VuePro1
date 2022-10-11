<template>
  <div class="main" :style="[{ backgroundImage: `url(${newsongsbgimg})` }]">
    <div class="goback" @click="Goback">点击返回</div>
    <div class="mask"></div>
    <div class="musidLyric" ref="musidLyric">
      <p
        v-for="(item,index) in songsWords"
        :key="index"
        :class="{
          active:
            currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
        }"
      >
        {{ item.lrc }}
      </p>
    </div>
    <audio @timeupdate="getCurrentTime($event)" controls autoplay>
      <source
        :src="
          'https://music.163.com/song/media/outer/url?id=' +
          this.SongsID +
          '.mp3'
        "
      />
    </audio>
  </div>
</template>

<script>
export default {
  props: {
    MusicViewStatus: Boolean,
    playSongsViewStatus: Boolean,
    SongsID: Number,
    songsWords: Array,
    newsongsbgimg: String,
  },
  data() {
    return {
      MusicViewStatus3: this.MusicViewStatus,
      playSongsViewStatus2: this.playSongsViewStatus,
      currentTime: 0,
    };
  },
  methods: {
    Goback() {
      this.MusicViewStatus3 = !this.MusicViewStatus3;
      this.playSongsViewStatus2 = !this.playSongsViewStatus2;
      this.$emit("getPlayViewStatus", {
        MusicViewStatus3: this.MusicViewStatus3,
        playSongsViewStatus2: this.playSongsViewStatus2,
      });
    },
    getCurrentTime(e) {
      this.currentTime = e.target.currentTime;
    },
  },
  watch: {
    MusicViewStatus: function (newval) {
      this.MusicViewStatus3 = newval;
    },
    playSongsViewStatus: function (newval) {
      this.playSongsViewStatus2 = newval;
    },
    currentTime: function (newValue) {
      let p = document.querySelector("p.active"); //获取这个p标签里的active

      if (p) {
        if (p.offsetTop > 300) {
          this.$refs.musidLyric.scrollTop = p.offsetTop - 300; //如果p的高度超过了300 让父元素的可视高度等于 p元素超过的高减300 让父元素可视高在300内
        }
      }

      if (newValue === this.duration) {
        //当前的时长等于总时长的时候 自动播放下一首

        if (this.playListIndex === this.playList.length - 1) {
          this.updatePlayListIndex(0);
          this.play();
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
audio {
  width: 375px !important;
  height: 55px !important;
  margin-top: 10px;
}
.main {
  width: 100vw;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  position: relative;

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.35);
  }

  .goback {
    position: absolute;
    z-index: 999;
    color: red;
    background-color: aqua;
  }

  .musidLyric {
    width: 100%;
    height: 500px;
    overflow: auto;
    text-align: center;
    color: #fff;
    position: relative;

    .active {
      color: red;
    }
  }
}
</style>
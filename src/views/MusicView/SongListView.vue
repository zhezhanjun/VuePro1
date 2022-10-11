<template>
  <div class="main">
    <div class="GoBack" @click="GoToMusicViewPage">点击返回</div>
    <div
      class="topdec"
      :style="[{ backgroundImage: `url(${songslist[index].picUrl})` }]"
    >
      <div class="bgblur"></div>
      <div class="imgbox">
        <div class="tips">歌单</div>
        <div class="mask"></div>
        <img
          class="listenicon"
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+"
          alt=""
        />
        <img :src="songslist[index].picUrl" alt="" />
        <div class="playcount">
          {{ String(songslist[index].playCount).slice(0, 4) }}.{{
            String(songslist[index].playCount).slice(4, 5)
          }}万
        </div>
      </div>
      <div class="textbox">
        <div class="text">{{ songslist[index].name }}</div>
        <div class="userbox"></div>
      </div>
    </div>
    <h3 class="u-smtitle">歌曲列表</h3>
    <div class="remd_newsongs">
      <div
        class="newsongs_list_wrap"
        v-for="(item, ind) in songsForm"
        :key="item.id"
        @click="playSongs(item.id,item.al.picUrl)"
      >
        <div class="sgfl">{{ ind + 1 }}</div>
        <div class="newsongs_list">
          <div class="textbox">
            <div class="toptext">
              {{ item.name }} <span class="orginFont">{{'('+item.alia[0]!=undefined?item.alia[0]:''+')'}}</span>
            </div>
            <div class="bottomtext">
              <div class="artistsbox">
                <span class="artists" v-for="item2 in item.ar" :key="item2.id">
                  {{ item2.name }}
                </span>
              </div>
              &nbsp;- {{ item.name }}
            </div>
          </div>
          <div class="iconbox">
            <div class="icon"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    MusicViewStatus: Boolean,
    SongListViewStatus: Boolean,
    playSongsViewStatus:Boolean,
    songsForm: Array,
    songslist: Array,
    index: Number,
  },
  data() {
    return {
      MusicViewStatus2: this.MusicViewStatus,
      SongListViewStatus2: this.SongListViewStatus,
      playSongsViewStatus2: this.playSongsViewStatus,
      songsId: 0,
      lyricList: "",
      songsbgimg:''
    };
  },
  methods: {
    GoToMusicViewPage() {
      this.MusicViewStatus2 = !this.MusicViewStatus2;
      this.SongListViewStatus2 = !this.SongListViewStatus2;
      this.$emit("getViewStatus", {
        MusicViewStatus2: this.MusicViewStatus2,
        SongListViewStatus2: this.SongListViewStatus2,
      });
    },
    async playSongs(id,bgimg) {
      this.songsId = id;
      // console.log(this.songsId)
      this.songsbgimg = bgimg
      await this.$axios
        .get(`https://apis.netstart.cn/music/lyric?id=${this.songsId}`)
        .then(({ data }) => {
          this.lyricList = data;
          if (this.lyricList.lrc.lyric) {
            //判断有没有歌词，因为有些音乐没有歌词

            let arr = this.lyricList.lrc.lyric
              .split(/[(\f\n)\r\t\v]/)
              .map((item) => {
                //用正则的换行符分割

                let min = item.slice(1, 3);
                let sec = item.slice(4, 6);
                let mill = item.slice(7, 10);
                let lrc = item.slice(11, item.length);
                let time =
                  parseInt(min) * 60 * 1000 +
                  parseInt(sec) * 1000 +
                  parseInt(mill); //把分钟变成秒，秒变成毫秒
                if (isNaN(Number(mill))) {
                  //判断是不是数字 不是的话进行二次分割  有些还是这种格式的 53]
                  mill = item.slice(7, 9);
                  lrc = item.slice(10, item.length);
                  time =
                    parseInt(min) * 60 * 1000 +
                    parseInt(sec) * 1000 +
                    parseInt(mill); //把分钟变成秒，秒变成毫秒
                }
                return { min, sec, mill, lrc, time };
              });
            arr.forEach((item, i) => {
              //歌词到了最后一句的处理
              if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
                item.pre = 100000;
              } else {
                //没到最后一句 那么久等于下一句歌词的时间
                item.pre = arr[i + 1].time;
              }
            });
            this.lyricList = arr;
            

            // return arr
          }
        });
        // console.log(this.lyricList);
      this.SongListViewStatus2 = !this.SongListViewStatus2;
      this.playSongsViewStatus2 = !this.playSongsViewStatus2;
      this.$emit("getPlayAndSongListViewStatus", {
        SongListViewStatus2: this.SongListViewStatus2,
        playSongsViewStatus2: this.playSongsViewStatus2,
        songsId2: this.songsId,
        lyricList2: this.lyricList,
        songsbgimg2:this.songsbgimg
      });
    },
  },
  watch: {
    MusicViewStatus: function (newval) {
      this.MusicViewStatus2 = newval;
    },
    SongListViewStatus: function (newval) {
      this.SongListViewStatus2 = newval;
    },
    playSongsViewStatus: function (newval) {
      this.playSongsViewStatus2 = newval
    }
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100vw;

  .GoBack {
    position: absolute;
    z-index: 999;
    color: red;
    background-color: aqua;
  }

  .topdec {
    width: 100%;
    height: 200px;
    padding: 25px 10px;
    position: relative;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    display: flex;

    .bgblur {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(20px);
    }

    .imgbox {
      width: 150px;
      height: 150px;
      position: relative;

      .tips {
        position: absolute;
        z-index: 3;
        top: 10px;
        left: 0;
        padding: 0 8px;
        height: 17px;
        color: #fff;
        font-size: 9px;
        text-align: center;
        line-height: 17px;
        background-color: rgba(217, 48, 48, 0.8);
        border-top-right-radius: 17px;
        border-bottom-right-radius: 17px;
      }

      .mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.2);
      }

      .listenicon {
        width: 15px;
        height: 15px;
        position: absolute;
        right: 73px;
        top: 4px;
      }

      .playcount {
        position: absolute;
        right: 5px;
        top: 5px;
        color: #fff;
      }

      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .textbox {
      width: calc(100% - 150px);
      height: 150px;
      font-size: 16px;
      color: #fff;
      flex: 1 1 auto;
      margin-left: 16px;
      padding-top: 3px;
      z-index: 3;
    }
  }

  .u-smtitle {
    height: 23px;
    line-height: 23px;
    padding: 0 10px;
    font-size: 12px;
    color: #666;
    background-color: #eeeff0;
  }

  .remd_newsongs {
    width: 100vw;
    margin-bottom: 55px;

    .newsongs_list_wrap {
      padding-left: 10px;
      display: flex;

      .sgfl {
        text-align: center;
        width: 40px;
        font-size: 17px;
        color: #999;
        margin-left: -10px;
        line-height: 55px;
      }

      .newsongs_list {
        height: 55px;
        width: 335px;
        border-bottom: 1px solid #ddd;
        display: flex;
        position: relative;
        -webkit-box-flex: 1;
        flex: 1 1 auto;

        .textbox {
          width: 323px;
          height: 100%;
          padding: 6px 0;
          -webkit-box-flex: 1;
          -webkit-flex: 1 1 auto;
          -ms-flex: 1 1 auto;
          flex: 1 1 auto;

          .toptext {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: normal;
            font-size: 17px;
            height: 25px;
            line-height: 25px;
            width: 293px;

            .orginFont {
                color: #999;
            }
          }

          .bottomtext {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: normal;
            font-size: 12px;
            color: #888;
            display: flex;
            height: 18px;
            line-height: 18px;
            align-items: center;
            width: 293px;

            .artistsbox {

              .artists {
                flex: 1 1 auto;
              }
            }
          }
        }

        .iconbox {
          width: 42px;
          height: 100%;
          padding: 0 10px;
          display: flex;
          -webkit-box-align: center;
          align-items: center;

          .icon {
            display: inline-block;
            width: 22px;
            height: 22px;
            background-position: -24px 0;
            background-image: url(https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=);
            background-size: 166px 97px;
            background-repeat: no-repeat;
          }
        }
      }
    }
  }
}
</style>
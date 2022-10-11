<template>
  <div class="userview">
    <SongListView
      v-show="SongListViewStatus"
      :index="this.index"
      :songslist="this.songslist"
      :songsForm="this.songsform"
      :SongListViewStatus="this.SongListViewStatus"
      :MusicViewStatus="this.MusicViewStatus"
      @getViewStatus="getViewStatus2"
      @getPlayAndSongListViewStatus="getPlayAndSongListViewStatus2"
    />
    <PlaySongsView
      :MusicViewStatus="this.MusicViewStatus"
      :playSongsViewStatus="this.playSongsViewStatus"
      :SongsID="this.songsId"
      :songsWords="this.lyricList"
      :newsongsbgimg="this.songsbgimg"
      @getPlayViewStatus="getPlayViewStatus2"
      v-if="playSongsViewStatus"
    />
    <div class="main" v-show="MusicViewStatus">
      <div class="top-nav">
        <div class="recommend active" @click="recommendClick($event)">
          推荐音乐
        </div>
        <div class="popular" @click="popularClick($event)">热歌榜</div>
        <div class="search" @click="searchClick($event)">搜索</div>
      </div>
      <!-- <div class="playnav" @click="returnToPlayView">正在播放</div> -->
      <div class="recommend-list" v-if="recommendStatus">
        <h2 class="remd_tl">编辑推荐</h2>
        <div class="remd_songs">
          <div
            class="songs_list"
            v-for="(item, index) in songslist"
            :key="item.id"
            @click="GoToSongListView(item.id, index)"
          >
            <div class="imgbox">
              <div class="mask"></div>
              <img
                class="listenicon"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+"
                alt=""
              />
              <img :src="item.picUrl" alt="" />
              <div class="playcount">
                {{ String(item.playCount).slice(0, 4) }}.{{
                  String(item.playCount).slice(4, 5)
                }}万
              </div>
            </div>
            <div class="textbox">{{ item.name }}</div>
          </div>
        </div>
        <h2 class="remd_tl">最新音乐</h2>
        <div class="remd_newsongs">
          <div
            class="newsongs_list_wrap"
            v-for="item in newsongs"
            :key="item.id"
            @click="playSongs(item.id, item.picUrl)"
          >
            <div class="newsongs_list">
              <div class="textbox">
                <div class="toptext">
                  {{ item.name }} {{ item.song.album.alias[0] }}
                </div>
                <div class="bottomtext">
                  <i class="SQicon"></i>
                  <div class="artistsbox">
                    <span
                      class="artists"
                      v-for="item2 in item.song.album.artists"
                      :key="item2.id"
                    >
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
      <div class="popular-list" v-if="popularStatus">
        <div class="topimg">
          <div class="text"></div>
          <div class="hottime">
            更新日期：{{ String(this.date).slice(5, 7) }}月{{
              String(this.date).slice(8, 10)
            }}日
          </div>
        </div>
        <div class="remd_newsongs">
          <div
            class="newsongs_list_wrap"
            v-for="(item, ind) in popularSongs"
            :key="item.id"
            @click="playSongs(item.id, item.al.picUrl)"
          >
            <div class="sgfl" :class="{ active: ind <= 2 }">
              {{ ind + 1 &lt; 10 ? '0'+String(ind + 1) : ind + 1 }}
            </div>
            <div class="newsongs_list">
              <div class="textbox">
                <div class="toptext">
                  {{ item.name }}
                  <span class="orginFont">{{
                    "(" + item.alia[0] != undefined ? item.alia[0] : "" + ")"
                  }}</span>
                </div>
                <div class="bottomtext">
                  <div class="artistsbox">
                    <span
                      class="artists"
                      v-for="item2 in item.ar"
                      :key="item2.id"
                    >
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
      <div class="search-list" v-if="searchStatus">
        <div class="inputbox" v-if="searchshow">
          <div class="inputcover">
            <i class="u-svg u-svg-srch"></i
            ><input
              type="search"
              name="search"
              class="input"
              placeholder="搜索歌曲、歌手、专辑"
              autocomplete="off"
              v-model="keyWords"
              @input="search"
              @keydown="enterToSearch($event)"
            />
            <figure class="close"><i class="u-svg u-svg-empty"></i></figure>
          </div>
          <div class="searchTextList"
            v-for="(item, ind) in searchList"
            :key="ind"
            @click="getSongsList(item.name)"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="songsList" v-for="(i, ind) in searchsongsList" :key="ind" @click="playSongs(i.id,i.al.picUrl)">
          <span class="text">{{ i.name }}{{i.id}}</span>
          <img :src="i.al.picUrl" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash-es";
import SongListView from "./SongListView.vue";
import PlaySongsView from "./PlaySongsView.vue";
import { timeFormat } from "@/utils/GetTime";
export default {
  data() {
    return {
      songslist: [],
      newsongs: [],
      MusicViewStatus: true,
      SongListViewStatus: false,
      playSongsViewStatus: false,
      songsform: [],
      index: 0,
      songsId: 0,
      lyricList: "",
      songsbgimg: "",
      recommendStatus: true,
      popularStatus: false,
      searchStatus: false,
      popularSongs: [],
      date: timeFormat(new Date()),
      keyWords: "",
      searchList: [],
      searchsongsList: [],
      searchshow: true,
    };
  },
  created() {
    this.getsongsData = debounce(this.getsongsData);
    this.getnewsongsData = debounce(this.getnewsongsData);
  },
  mounted() {
    this.getsongsData();
    this.getnewsongsData();
  },
  methods: {
    getsongsData() {
      this.$axios
        .get("https://apis.netstart.cn/music/personalized?limit=6")
        .then(({ data }) => {
          this.songslist = [...data.result];
          // console.log(this.songslist);
        });
    },
    getnewsongsData() {
      this.$axios
        .get("https://apis.netstart.cn/music/personalized/newsong")
        .then(({ data }) => {
          this.newsongs = [...data.result];
          // console.log(this.newsongs)
        });
    },
    recommendClick(e) {
      e.target.className = "recommend active";
      e.target.nextElementSibling.className = "popular";
      e.target.nextElementSibling.nextElementSibling.className = "search";
      this.recommendStatus = true;
      this.popularStatus = false;
      this.searchStatus = false;
    },
    popularClick(e) {
      e.target.className = "popular active";
      e.target.nextElementSibling.className = "search";
      e.target.previousElementSibling.className = "recommend";
      this.recommendStatus = false;
      this.popularStatus = true;
      this.searchStatus = false;
      this.$axios
        .get(
          "https://apis.netstart.cn/music/playlist/track/all?id=3778678&limit=20&offset=0"
        )
        .then(({ data }) => {
          this.popularSongs = [...data.songs];
          // console.log(this.popularSongs);
        });
    },
    searchClick(e) {
      e.target.className = "search active";
      e.target.previousElementSibling.className = "popular";
      e.target.previousElementSibling.previousElementSibling.className =
        "recommend";
      this.recommendStatus = false;
      this.popularStatus = false;
      this.searchStatus = true;
      this.searchshow = true
      this.searchsongsList = []
    },
    async GoToSongListView(id, index) {
      this.MusicViewStatus = !this.MusicViewStatus;
      this.SongListViewStatus = !this.SongListViewStatus;
      await this.$axios
        .get(
          `https://apis.netstart.cn/music/playlist/track/all?id=${id}&limit=10&offset=0`
        )
        .then(({ data }) => {
          this.songsform = [...data.songs];
        });
      this.index = index;
      // console.log(this.songsform);
    },
    getViewStatus2(value) {
      this.MusicViewStatus = value.MusicViewStatus2;
      this.SongListViewStatus = value.SongListViewStatus2;
    },
    getPlayViewStatus2(value) {
      this.MusicViewStatus = value.MusicViewStatus3;
      this.playSongsViewStatus = value.playSongsViewStatus2;
    },
    getPlayAndSongListViewStatus2(value) {
      this.SongListViewStatus = value.SongListViewStatus2;
      this.playSongsViewStatus = value.playSongsViewStatus2;
      this.songsId = value.songsId2;
      this.lyricList = value.lyricList2;
      this.songsbgimg = value.songsbgimg2;
    },
    async playSongs(id, bgimg) {
      this.songsId = id;
      this.songsbgimg = bgimg;
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
            // console.log(this.lyricList);

            // return arr
          }
        });
      this.MusicViewStatus = !this.MusicViewStatus;
      this.playSongsViewStatus = !this.playSongsViewStatus;
    },
    returnToPlayView() {
      this.MusicViewStatus = !this.MusicViewStatus;
      this.playSongsViewStatus = !this.playSongsViewStatus;
    },
    search() {
      this.$axios
        .get(
          `https://apis.netstart.cn/music/cloudsearch?keywords=${this.keyWords}&limit=10`
        )
        .then((data) => {
          let arr = data.data.result.songs;
          this.searchList = arr;
        });
        if (this.keyWords == '') {
          this.searchList = []
        }
    },
    getSongsList(val) {
      this.$axios
        .get(
          `https://apis.netstart.cn/music//cloudsearch?keywords=${val}&limit=10`
        )
        .then((data) => {
          let arr = data.data.result.songs;
          this.searchsongsList = arr;
          this.searchshow = false;
        });
      this.keyWords = "";
      this.searchList = [];
    },
    enterToSearch(e) {
      if(e.keyCode == 13) {
        this.$axios
        .get(
          `https://apis.netstart.cn/music//cloudsearch?keywords=${this.keyWords}&limit=10`
        )
        .then((data) => {
          let arr = data.data.result.songs;
          this.searchsongsList = arr;
          this.searchshow = false;
        });
      this.keyWords = "";
      this.searchList = [];
      }
    },
  },
  watch: {},
  components: {
    SongListView,
    PlaySongsView,
  },
};
</script>

<style lang="scss" scoped>
.active {
  color: red !important;
}
.userview {
  width: 100vw;

  .main {
    width: 100%;
    height: 565px;

    .top-nav {
      height: 40px;
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      border-bottom: 1px solid #ddd;

      div {
        flex: 1;
      }

      .active {
        color: red;
        line-height: 38px;
        border-bottom: 2px solid red;
      }
    }

    .playnav {
      position: absolute;
      right: 0;
      top: 100px;
      width: 80px;
      height: 30px;
      background-color: red;
      border-top-left-radius: 999px;
      border-bottom-left-radius: 999px;
      text-align: center;
      line-height: 30px;
    }

    .recommend-list {
      width: 100vw;
      margin-top: 20px;

      .remd_tl {
        position: relative;
        padding-left: 9px;
        margin-bottom: 14px;
        font-size: 17px;
        height: 20px;
        line-height: 22px;
        border-left: 2px solid red;
      }

      .remd_songs {
        width: 100%;
        height: 55vh;
        padding-bottom: 25px;
        padding-left: 5px;

        .songs_list {
          margin-bottom: 16px;
          float: left;
          width: calc(33.3% - 5px);
          height: 49%;
          margin-right: 5px;

          .imgbox {
            width: 100%;
            height: 70%;
            position: relative;

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
            width: 100%;
            height: 40px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            padding: 6px 2px 0 6px;
            min-height: 30px;
            line-height: 1.2;
            font-size: 14px;
          }
        }
      }

      .remd_newsongs {
        width: 100vw;

        .newsongs_list_wrap {
          padding-left: 10px;

          .newsongs_list {
            height: 55px;
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

                .SQicon {
                  display: inline-block;
                  width: 12px;
                  height: 8px;
                  margin-right: 0px;
                  background-image: url(https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=);
                  background-size: 166px 97px;
                }

                .artistsbox {
                  padding-left: 4px;

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

    .popular-list {
      width: 100vw;

      .topimg {
        width: 100%;
        height: 148px;
        background: url(https://s3.music.126.net/mobile-new/img/hot_music_bg_2x.jpg?f01a252389c26bcf016816242eaa6aee=)
          no-repeat;
        background-size: contain;
        display: flex;
        flex-direction: column;
        justify-content: center;
        z-index: 2;
        padding-left: 20px;
        box-sizing: border-box;

        .text {
          width: 142px;
          height: 67px;
          background: url(https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=)
            no-repeat;
          background-position: -24px -30px;
          background-size: 166px 97px;
          position: relative;
          top: -10px;
        }

        .hottime {
          color: hsla(0, 0%, 100%, 0.8);
          font-size: 12px;
          -webkit-transform: scale(0.91);
          -ms-transform: scale(0.91);
          transform: scale(0.91);
          -webkit-transform-origin: left top;
          -ms-transform-origin: left top;
          transform-origin: left top;
        }
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

    .search-list {
      width: 100vw;

      .inputbox {
        width: 100%;
        height: 60px;
        padding: 15px 10px;

        .inputcover {
          position: relative;
          width: 100%;
          height: 30px;
          padding: 0 30px;
          box-sizing: border-box;
          background: #ebecec;
          border-radius: 30px;

          .u-svg {
            position: absolute;
            left: 0;
            top: 9px;
            margin: 0 8px;
            vertical-align: middle;
            width: 13px;
            height: 13px;
            display: inline-block;
            vertical-align: middle;
            background-position: 0 0;
            background-size: contain;
            background-repeat: no-repeat;

            .u-svg-srch {
              background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
            }
          }

          .input {
            width: 100%;
            height: 30px;
            line-height: 18px;
            background: rgba(0, 0, 0, 0);
            font-size: 14px;
            color: #333;
            border: none;
            -webkit-tap-highlight-color: transparent;
          }
        }

        .searchTextList {
          text-align: center;
          margin-top: 15px;
        }
      }

      .songsList {
        width: 100%;
        overflow: hidden;
        margin-bottom: 10px;
      }

      .songsList:last-child {
        width: 100%;
        overflow: hidden;
        margin-bottom: 55px;
      }

      img {
        display: block;
        width: 100px;
        height: 100px;
      }

      .text {
        position: relative;
        left: 115px;
        top: 55px;
      }
    }
  }
}
</style>

<template>
  <div class="home">
      <div class="container">
        <div class="main" ref="main">
          <div class="video-box" ref="videobox" v-swipedown="swipedown" v-swipeup="swipeup" v-for="item in video" :key="item.id">
            <!-- 背景色 -->
            <div class="bgcolor"></div>
            <!-- 用户信息 -->
            <div class="user">
              <div class="imgbox">
                <img :src=item.userPic>
              </div>
              <div class="textbox">{{item.userName}}</div>
            </div>
            <!-- 标题 -->
            <div class="title">{{item.title}}</div>
            <!-- 视频 -->
            <video width="100%" height="100%" preload="metadata" autoplay controls loop muted>
              <source :src=item.playUrl type="video/mp4">
            </video>
            <!-- 功能区 -->
            <div class="menu-function">
              <div class="bgcolor2"></div>
              <div @click="colorRed2"><i class="fa fa-heart" aria-hidden="true"></i><div style="font-size:14px">{{likeCount}}</div></div>
              <div @click="getcomments"><i class="fa fa-comments" aria-hidden="true"></i><div style="font-size:14px">{{commentCount}}</div></div>
              <div @click="colorRed3"><i class="fa fa-star" aria-hidden="true"></i><div style="font-size:14px">{{collectCount}}</div></div>
              <div @click="colorRed"><i class="fa fa-thumbs-down" aria-hidden="true"></i></div>
              <div @click="shareArea=!shareArea"><i class="fa fa-share-alt" aria-hidden="true"></i></div>
            </div>
            <!-- 评论区 -->
            <div class="commentsbox" v-show="commentsArea">
              <input class="commentinput" type="text" placeholder="输入评论" v-model="text" @keydown="tocomment($event)">
              <div class="comments" v-for="item in comments" :key="item[1]">
                {{item[0]}}
                <div class="delete" @click="delete1($event)">删除</div>
              </div>
            </div>
            <!-- 分享区 -->
            <div class="social-share" v-show="shareArea">  
              <vshare :vshareConfig="vshareConfig"></vshare>
            </div> 
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {debounce} from 'lodash-es'


export default {
  name: 'HomeView',
  data(){
    return {
      video:[],
      scrollTop:0,
      count:0,
      colorStatus:0,
      colorStatus2:0,
      colorStatus3:0,
      commentsArea:false,
      vshareConfig: {
          shareList: [
            // 此处放分享列表（ID）
            'more',
            'qzone',
            'tsina',
            'sqq',
            'copy',
            'weixin'
          ],
          common : {
            //此处放置通用设置
          },
          share : [{
            //此处放置分享按钮设置
            }
          ],
      },
      shareArea:false,
      text:'',
      comments:[],
      likeCount:0,
      commentCount:0,
      collectCount:0,
    }
  },
  created() {
    this.getData = debounce(this.getData)
  },
  mounted() {
    this.getData()
  },
  methods:{
    getData() {
      this.$axios.get('https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10').then(({data}) => {
        let video = [...data.result.list];
        this.video.push(...video)
      })
    },
    swipeup () {
      this.count++
      this.scrollTop -= 565
      this.$refs.main.style.transform = `translateY(${this.scrollTop}px)`
      if (this.count == this.$refs.videobox.length-5) {
        this.getData()
      }
    },
    swipedown () {
      if (this.scrollTop < 0) {
        this.scrollTop += 565
      }
      this.$refs.main.style.transform = `translateY(${this.scrollTop}px)`
    },
    colorRed(e) {
      if (this.colorStatus == 0) {
        e.target.style.color = 'red';
        this.colorStatus = 1;
      } else if (this.colorStatus == 1) {
        e.target.style.color = 'white';
        this.colorStatus = 0;
      }
    },
    colorRed2(e) {
      if (this.colorStatus2 == 0) {
        e.target.style.color = 'red';
        this.colorStatus2 = 1;
        this.likeCount++;
      } else if (this.colorStatus2 == 1) {
        e.target.style.color = 'white';
        this.colorStatus2 = 0;
        this.likeCount--;
      }
    },
    colorRed3(e) {
      if (this.colorStatus3 == 0) {
        e.target.style.color = 'red';
        this.colorStatus3 = 1;
        this.collectCount++;
      } else if (this.colorStatus3 == 1) {
        e.target.style.color = 'white';
        this.colorStatus3 = 0;
        this.collectCount--;
      }
    },
    getcomments() {
      this.commentsArea = !this.commentsArea
    },
    tocomment(e) {
      if (e.keyCode == 13 && this.text != '') {
        let key = new Date().getTime()
        let arr = []
        arr.push(this.text)
        arr.push(key)
        this.comments.push(arr)
        this.text = ''
        this.commentCount++
      }
    },
    delete1(e) {
      e.target.parentElement.remove()
      this.commentCount--
    }
  },
  components: {
    
  }
}
</script>

<style lang="scss" scoped>

.container {
  width: 100vw;
  height: 565px;
  overflow: hidden;
}

.main {
  width: 100vw;
  transition: all linear .5s;
}

.video-box {
  width: 100vw;
  height: 565px;
  position: relative;
  color: #fff;
  

  .bgcolor {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-color: #000
  }

  .user {
    position: absolute;
    top: 50px;
    display: flex;
    vertical-align: center;
    padding: 0 15px;

    .imgbox {
      width: 35px;
      height: 35px;
      border-radius: 999px;
      

      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 999px;
      }
    }

    .textbox {
      line-height: 35px;
    }
  }

  .title {
    position: absolute;
    top: 100px;
    padding: 0 15px;
  }

  .menu-function {
    position: absolute;
    width: 50px;
    right: 5px;
    bottom: 100px;
    font-size: 35px;
    color: #ddd;
    text-align: center;

    .bgcolor2 {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.349);
      z-index: -1;
    }
    
    i{
      margin-top: 10px;
    }
  }

  .commentsbox {
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 180px;
    background-color: #fff;
    overflow: auto;

    .commentinput {
      width: 200px;
      height: 30px;
      margin: 0 auto;
      border-radius: 10px;
      position: absolute;
      top: 5px;
      left: 0;
      right: 0;
    }

    .comments {
      margin-top: 55px;
      font-size: 15px;
      color: #000;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
    }
  }

  .social-share {
    width: 100vw;
    height: 55px;
    position: absolute;
    bottom: 0;
    
  }
}

</style>

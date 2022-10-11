<template>
  <div class="main">
    <div class="return" @click="returnparent">←<br />返<br />回</div>
    <div class="imgbox">
      <img :src="data.story.image" alt="" />
      <div class="title">{{ data.story.title }}</div>
    </div>
    <div class="text" v-html="data.story.body"></div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    parentshow: Boolean,
    childrenshow: Boolean,
  },
  data() {
    return {
      parentshow2: this.parentshow,
      childrenshow2: this.childrenshow,
    };
  },
  methods: {
    returnparent() {
      this.parentshow2 = !this.parentshow2;
      this.childrenshow2 = !this.childrenshow2;
      this.$emit("returnparent", {
        parentshow2: this.parentshow2,
        childrenshow2: this.childrenshow2,
      });
    },
  },
  watch: {
    parentshow: function (newval) {
      this.parentshow2 = newval;
    },
    childrenshow: function (newval) {
      this.childrenshow2 = newval;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100vw;

  .return {
    color: blue;
    font-size: 20px;
    position: fixed;
    left: 0;
    background-color: rgb(255, 215, 0);
  }

  .imgbox {
    width: 335px;
    height: 300px;
    margin: 0 auto;
    position: relative;

    img {
      display: block;
      width: 100%;
      height: 100%;
    }

    .title {
      position: absolute;
      bottom: 10px;
      left: 10px;
      color: #fff;
    }
  }
}
</style>
<template>
  <div class="container">
    <n-button @click="back">返回</n-button>
    <div class="outerBox"
         ref="outerDom"
         @scroll="getScrollTop()">
      <!-- 标题 -->
      <n-h1>{{ blogInfo.title }}</n-h1>
      <!-- 文章内容 -->
      <div class="blog-content">
        <div v-html="blogInfo.content"></div>
      </div>

      <div class="scrollBox"
           v-show="hometop_button.isShow"
           @click="goBack()">⬆️</div>
    </div>
  </div>

</template>

<script setup>
import { ref, reactive, inject, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getCurrentInstance } from '@vue/runtime-core';
const router = useRouter();
const route = useRoute();
const blogInfo = ref({});
const axios = inject("axios");
const currentInstance = getCurrentInstance()
const hometop_button = reactive({
  scrollTop: 0, //默认距离顶部的距离
  isShow: false, //控制返回顶部按钮的显隐
  scrollTrigger: false //默认初始值
});

const goBack = () => {
  console.log()
  // 防止频繁点击，故返回顶部后设置scrollTrigger为初始值
  if (hometop_button.scrollTrigger) {
    return;
  }
  // 获取当前距离顶部的距离
  let scrollTop = hometop_button.scrollTop;
  console.log("scrollTop: " + scrollTop);
  let steep = scrollTop / 2000;
  let timer = setInterval(() => {
    hometop_button.scrollTrigger = true;
    // 滚动的速度逐渐变快，第一次走2000/1，然后减去已走的距离，下一次用剩下的距离再减去步进值，步进值也是不断变化，这样速度会越来越快
    scrollTop -= steep;
    // 步进值不改变的话会匀速缓慢上滑，不断增加步进值上滑的距离增加，视觉效果速度变快
    steep += 30;
    if (scrollTop <= 0) {
      clearInterval(timer);
      hometop_button.scrollTrigger = false;
    }
    currentInstance.ctx.$refs.outerDom.scrollTop = scrollTop;
  }, 40);
};
const handleScroll = (e) => {
    // 元素滚动高度
    hometop_button.scrollTop = e.target.scrollTop
  }
window.addEventListener("scroll",handleScroll, true);

const getScrollTop = (e) => {
  // 设备一屏的高度
  let clientHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  // 判断距离顶部多少显示回到顶部图标

  if (hometop_button.scrollTop > clientHeight) {
    hometop_button.isShow = true;
  } else {
    hometop_button.isShow = false;
  }
};

onMounted(() => {
  loadBlog();

});

/**
 * 读取文章详情
 */
const loadBlog = async () => {
  let res = await axios.get("/blog/detail?id=" + route.query.id);
  blogInfo.value = res.data.rows[0];
};

const back = () => {
  router.push("/");
};
</script>

<style>
.outerBox .blog-content img {
  max-width: 100% !important;
}
</style>

<style lang="scss" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}

.outerBox {
  position: absolute;
  top: 30px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  padding: 4px 6px;
}
/* 返回顶部样式 */
.outerBox .scrollBox {
  position: fixed;
  right: 10px;
  bottom: 20px;
  font-size: 22px;
  z-index: 99;
}
/* 浏览器滚动条样式 */
::-webkit-scrollbar {
  width: 4px;
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgb(174, 174, 174);
  border-radius: 50px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
</style>

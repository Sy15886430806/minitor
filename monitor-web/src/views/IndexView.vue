<template>
  <div style="width: 100vw; height: 100vh; overflow: hidden; position: relative">
    <!-- 背景图 -->
    <el-image
        style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: 0"
        fit="cover"
        src="https://5pw.net/i/2025/03/06/67c910a925b7e.jpg"
    />

    <!-- 欢迎文字带毛玻璃 -->
    <div class="welcome-title">
      后期正在赶工中...
    </div>

    <!-- 退出登录按钮 -->
    <div class="logout-button-wrapper">
      <el-button class="logout-button" @click="userLogout">
        退出登录
      </el-button>
    </div>
  </div>
</template>

<script setup>

import {logout} from "@/net/index.js";
import router from "@/router";

function userLogout() {
  logout(() => router.push('/'))
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');
.welcome-title {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 32px;
  font-weight: bold;
  z-index: 1;
}

/* 按钮容器位置控制 */
.logout-button-wrapper {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

/* 按钮样式+hover 动画 */
.logout-button {
  font-family: 'Noto Serif SC', serif;
  font-weight: 500;
  transition: all 0.3s ease;
}

.logout-button:hover {
  background-color: #409EFF; /* Element Plus 默认主题蓝 */
  color: white;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.5);
}
</style>
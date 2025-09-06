<template>
  <div style="width: 100vw;height: 100vh;overflow: hidden;position: relative">

    <!-- 背景图 -->
    <el-image
        style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: -1"
        fit="cover"
        src="https://5pw.net/i/2025/03/06/67c910a925b7e.jpg"
    />

    <!-- 欢迎文字 -->
    <div class="welcome-title">
      青春无悔热爱
    </div>

    <!-- 居中悬浮卡片 -->
    <div class="right-card">
      <router-view v-slot="{ Component }">
        <transition name="el-fade-in-linear" mode="out-in" >
          <component :is="Component"/>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>

</script>


<style scoped>

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

.right-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.15); /* 半透明背景 */
  backdrop-filter: blur(10px); /* 毛玻璃效果 */
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
</style>
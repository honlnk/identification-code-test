<template>
  <div class="about-container">
    <!-- 镜头区域 -->
    <div class="scan-video-container">
      <video ref="video" id="video" class="scan-video" autoplay></video>
    </div>

    <div class="scan-controls">
      <button class="scan-btn" @click="startScan">📷 开始扫码</button>
    </div>

    <div class="scan-results">
      <div class="results-title">📋 扫描历史</div>
      <ul class="results-list">
        <li v-for="(item, index) in scanResults" :key="index" class="result-item">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { BrowserMultiFormatReader } from '@zxing/library';
import * as ZXing from "@zxing/library";

const codeReader = ref(null);
const scanResults = ref([]);

// 初始化相机
const startScan = () => {
  codeReader.value = new BrowserMultiFormatReader();

  codeReader.value.getVideoInputDevices().then(videoDevices => {
    let deviceId = videoDevices[videoDevices.length - 1].deviceId;

    if (videoDevices.length > 1) {
      deviceId = videoDevices.find(el => el.label.includes('back') && el.label.includes('0'))?.deviceId || deviceId;
    }

    decodeFromInputVideoFunc(deviceId);
  }).catch(err => {
    console.error(err);
  });
}

// 扫码
const decodeFromInputVideoFunc = (deviceId) => {
  codeReader.value.reset();
  codeReader.value.decodeFromInputVideoDeviceContinuously(deviceId, 'video', (result, err) => {
    if (result) {
      // 打开baidu.com
      window.open('https://www.baidu.com/s?wd=' + result.text, '_blank');
      alert('扫码结果：' + result.text);
      console.log('扫码结果', result);
      scanResults.value.push(result.text);
      codeReader.value.reset();
      codeReader.value.stopContinuousDecodeFromInputVideoDevice();
    }
    if (err && !(err instanceof ZXing.NotFoundException)) {
      console.error(err);
    }
  });
}

onMounted(() => {
  // 初始化
  startScan();
});
</script>

<style scoped>
.about-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f7fa;
  box-sizing: border-box;
}

.scan-video-container {
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.scan-video {
  width: 100%;
  display: block;
  border-radius: var(--border-radius);
}

.scan-controls {
  margin: 20px 0;
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: center;
}

.scan-btn {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background-color: var(--primary-color);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow);
}

.scan-btn:hover {
  background-color: #66b1ff;
  transform: translateY(-2px);
}

.scan-results {
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
}

.results-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--dark-color);
  margin-bottom: 15px;
  text-align: center;
}

.results-list {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.result-item {
  padding: 12px 16px;
  margin: 8px 0;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border-left: 4px solid var(--primary-color);
  word-break: break-all;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 适配移动端 */
@media (max-width: 768px) {
  .about-container {
    padding: 10px;
  }
  
  .scan-video-container {
    margin: 10px auto;
  }
  
  .scan-btn {
    width: 100%;
    padding: 14px;
    font-size: 16px;
  }
}
</style>

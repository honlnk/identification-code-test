<template>
  <div class="code-reader-content">
    <div class="page">
      <video ref="video" autoplay id="video"></video>
      <div class="scan-box">
        <div class="scan-frame"></div>
        <div class="scan-corner scan-corner-tl"></div>
        <div class="scan-corner scan-corner-tr"></div>
        <div class="scan-corner scan-corner-bl"></div>
        <div class="scan-corner scan-corner-br"></div>
        <div class="pointer-box">
          <div class="pointer"></div>
        </div>
      </div>
    </div>
    <!--      <div v-show="tipShow" class="tip">{{ tipMsg }}</div>-->
    <div class="btn-switch">🔄</div>
    <!--      <button @click="handleScanComplete" class="btn-wc">扫描完成</button>-->
    <!--      <button @click="startScan" class="btn-wc">开始扫码</button>-->
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
      alert('扫码结果：' + result.text);
      console.log('扫码结果', result);
      scanResults.value.push(result.text);
      codeReader.value.reset();
      codeReader.value.stopContinuousDecodeFromInputVideoDevice();
      // 打开baidu.com
      window.open('https://www.baidu.com/s?wd=' + result.text);
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
.code-reader-content {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
}

.page {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 20px auto;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow);
}

#video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.scan-box {
  position: relative;
  width: 250px;
  height: 250px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.scan-frame {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid var(--primary-color);
  border-radius: var(--border-radius);
  box-shadow: 0 0 20px rgba(64, 158, 255, 0.3);
}

.scan-frame::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(64, 158, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(64, 158, 255, 0.1) 1px, transparent 1px);
  background-size: 10px 10px;
}

.scan-corner {
  position: absolute;
  width: 25px;
  height: 25px;
  border: 3px solid var(--primary-color);
}

.scan-corner-tl {
  top: -3px;
  left: -3px;
  border-right: none;
  border-bottom: none;
}

.scan-corner-tr {
  top: -3px;
  right: -3px;
  border-left: none;
  border-bottom: none;
}

.scan-corner-bl {
  bottom: -3px;
  left: -3px;
  border-right: none;
  border-top: none;
}

.scan-corner-br {
  bottom: -3px;
  right: -3px;
  border-left: none;
  border-top: none;
}

.pointer-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.pointer {
  position: absolute;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, transparent, var(--primary-color), transparent);
  animation: scanLine 2s linear infinite;
  border-radius: 2px;
}

@keyframes scanLine {
  0% {
    top: 0;
  }
  50% {
    top: calc(100% - 4px);
  }
  100% {
    top: 0;
  }
}

.tip {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: var(--primary-light);
  border-radius: var(--border-radius);
  color: var(--primary-color);
  font-size: 14px;
  text-align: center;
  box-shadow: var(--shadow);
}

.btn-switch {
  margin-top: 25px;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.btn-switch:hover {
  background-color: #66b1ff;
  transform: scale(1.05);
}

.btn-wc {
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: var(--border-radius);
  background-color: var(--secondary-color);
  color: white;
  font-size: 14px;
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.btn-wc:hover {
  background-color: #85ce61;
}

/* 适配移动端 */
@media (max-width: 768px) {
  .page, .scan-box {
    width: 90vw;
    height: 90vw;
    max-width: 300px;
    max-height: 300px;
  }
  
  .code-reader-content {
    padding: 10px;
  }
}
</style>
<template>
  <div class='AboutView'>
    <!-- 镜头区域 -->
    <video ref="video" id="video" class="scan-video" autoplay></video>

    <button @click="startScan">开始扫码</button>

    <ul>
      <li v-for="(item, index) in scanResults" :key="index">{{ item }}</li>
    </ul>
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

<style scoped lang='scss'>
.AboutView {
  display: flex;
  flex-direction: column;
  align-items: center;
}

video {
  margin-top: 20%;
  width: 80%;
}

button {
  margin-top: 1rem;
  width: 8.4375rem;
  height: 2.75rem;
  font-size: 1.5625rem;
  font-weight: 600;
  color: lavenderblush;
  background-color: rgba(0, 183, 255, 0.8);
  border: none;
  border-radius: 0.5rem;
}

ul {
  margin-top: 1rem;
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0.5rem 0;
}
</style>

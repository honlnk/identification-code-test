<template>
  <div class="code-reader-content">
    <div class="page">
      <video ref="video" autoplay id="video" height="200"></video>
    </div>
    <div class="scan-box">
      <div class="frame upper-left"></div>
      <div class="frame upper-right"></div>
      <div class="frame lower-right"></div>
      <div class="frame lower-left"></div>
      <div class="pointer-box">
        <div class="pointer"></div>
      </div>
<!--      <div v-show="tipShow" class="tip">{{ tipMsg }}</div>-->
      <div class="btn-switch"></div>
<!--      <button @click="handleScanComplete" class="btn-wc">扫描完成</button>-->
<!--      <button @click="startScan" class="btn-wc">开始扫码</button>-->

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

<style lang="less" scoped>
.code-reader-content {
  .page {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;

    #video {
      // height: 100%;
      width: 100%;
      object-fit: fill;
    }
  }

  .scan-box {
    position: absolute;
    left: 50%;
    top: 58%;
    transform: translate(-50%, -90%);
    height: 20%;
    width: 180px;

    .frame {
      position: absolute;
      width: 15px;
      height: 15px;
      border: 3px solid transparent;
    }

    .upper-left {
      top: 0;
      left: 0;
      border-left-color: rgba(66, 133, 244, 1);
      border-top-color: rgba(66, 133, 244, 1);
    }

    .upper-right {
      top: 0;
      right: 0;
      border-right-color: rgba(66, 133, 244, 1);
      border-top-color: rgba(66, 133, 244, 1);
    }

    .lower-right {
      bottom: 0;
      right: 0;
      border-bottom-color: rgba(66, 133, 244, 1);
      border-right-color: rgba(66, 133, 244, 1);
    }

    .lower-left {
      bottom: 0;
      left: 0;
      border-left-color: rgba(66, 133, 244, 1);
      border-bottom-color: rgba(66, 133, 244, 1);
    }

    .pointer-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 180px;
      height: 100%;
      overflow: hidden;

      .pointer {
        height: 3px;
        background-image: linear-gradient(to right,
        transparent 0%,
        rgba(66, 133, 244, 1) 50%,
        transparent 100%);
        transform: translateY(-3px);
        animation: move 2s linear infinite;
      }

      @keyframes move {
        0% {
          transform: translateY(-3px);
        }

        100% {
          transform: translateY(calc(20vh - 3px));
        }
      }
    }

    .tip {
      position: absolute;
      left: 50%;
      top: 122%;
      transform: translate(-50%, 0);
      white-space: nowrap;
      color: rgb(176, 209, 28);
      font-size: 16px;
    }

    .btn-switch {
      position: absolute;
      left: 50%;
      top: 140%;
      width: 30px;
      height: 30px;
      transform: translate(-50%, 0);
      background-color: #dadada;
      border-radius: 30%;
    }

    .btn-wc {
      position: absolute;
      left: 50%;
      top: 160%;
      transform: translate(-50%, 0);
    }
  }
}
</style>
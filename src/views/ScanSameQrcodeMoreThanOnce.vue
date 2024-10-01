<template>
  <div>
    <p class="decode-result">
      最终结果: <b>{{ result }}</b>
    </p>

    <!--
      :paused：控制暂停状态
      @detect：当检测到二维码时触发
      @camera-on：当摄像头开启时触发
      @camera-off：当摄像头关闭时触发
      @error：当发生错误时触发
    -->
    <qrcode-stream
        :paused="paused"
        @detect="onDetect"
        @camera-on="onCameraOn"
        @camera-off="onCameraOff"
        @error="onError"
    >
      <!-- 扫描确认提示框 -->
      <div
          v-show="showScanConfirmation"
          class="scan-confirmation"
      >
        <!-- 绿色方块指示 -->
        <div style="height: 128px; width: 128px; background-color: #00bd7e" ></div>
      </div>
    </qrcode-stream>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

// 定义是否暂停的变量
const paused = ref(false)
// 存储最后识别结果的变量
const result = ref('')
// 控制扫描确认框显示与否的变量
const showScanConfirmation = ref(false)

// 摄像头开启时隐藏扫描确认框
function onCameraOn() {
  showScanConfirmation.value = false
}

// 摄像头关闭时显示扫描确认框
function onCameraOff() {
  showScanConfirmation.value = true
}

// 错误处理函数
function onError(error) {
  console.error(error)
}

// 识别到二维码后的处理函数
async function onDetect(detectedCodes) {
  // 更新结果显示
  result.value = JSON.stringify(detectedCodes.map(code => code.rawValue))

  // 暂停扫描，等待下一步操作
  paused.value = true

}
</script>

<style scoped>
.scan-confirmation {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
</style>
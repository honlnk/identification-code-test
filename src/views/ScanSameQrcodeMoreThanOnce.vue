<template>
  <div class="scan-container">
    <div class="qrcode-stream-wrapper">
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
          <div class="confirmation-content">
            <div class="confirmation-icon">✓</div>
            <div class="confirmation-text">扫描成功！</div>
            <div class="confirmation-subtext">点击下方按钮继续扫描</div>
            <button class="continue-btn" @click="paused = false">继续扫描</button>
          </div>
        </div>
      </qrcode-stream>
    </div>

    <div class="result-container">
      <div class="result-title">🔍 扫描结果</div>
      <div class="result-content">
        {{ result || '等待扫描结果...' }}
      </div>
    </div>
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
.scan-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f5f7fa;
}

.qrcode-stream-wrapper {
  width: 100%;
  max-width: 400px;
  margin: 0 auto 20px;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.result-container {
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  text-align: center;
}

.result-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--dark-color);
  margin-bottom: 10px;
}

.result-content {
  font-size: 14px;
  word-break: break-all;
  color: var(--info-color);
}

.scan-confirmation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.confirmation-content {
  text-align: center;
  padding: 20px;
}

.confirmation-icon {
  width: 80px;
  height: 80px;
  background-color: var(--secondary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  color: white;
  font-size: 32px;
}

.confirmation-text {
  font-size: 18px;
  font-weight: 600;
  color: var(--dark-color);
  margin-bottom: 10px;
}

.confirmation-subtext {
  font-size: 14px;
  color: var(--info-color);
}

.continue-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 14px;
  cursor: pointer;
  transition: var(--transition);
}

.continue-btn:hover {
  background-color: #66b1ff;
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

/* 适配移动端 */
@media (max-width: 768px) {
  .scan-container {
    padding: 10px;
  }
  
  .qrcode-stream-wrapper {
    max-width: 100%;
  }
  
  .result-container {
    max-width: 100%;
  }
}
</style>
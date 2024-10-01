<style scoped>
* {
  padding: 0;
  margin: 0;
}
.text-box {
  position: fixed;
  top: 0;
  left: 0;
}

.error {
  font-weight: bold;
  color: red;
}

.scan-confirmation {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.fa-check-box {
  position: absolute;
  height: 30px;
  width: 30px;
  background-color: #00bd7e;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

}

.qrcode-stream-box {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <!-- 容器 -->
  <div style="height: 100vh">
    <!-- 主要组件容器 -->
    <div class="qrcode-stream-box">
      <!-- QrcodeStream 组件，用于处理摄像头流和条形码识别 -->
      <!--
      :constraints：设置默认的摄像头
      :track：设置图码的跟踪方式
      :formats：设置可检索的图码格式
      @error：捕获到错误时触发
      @detect：检测到条形码时触发
      @camera-on：摄像头打开时触发，在这里用于获取设备上的摄像头信息
      -->
      <qrcode-stream
          ref="videoRef"
          :constraints="selectedConstraints"
          :track="trackFunctionSelected.value"
          :formats="selectedBarcodeFormats"
          :paused="paused"
          @error="onError"
          @detect="onDetect"
          @camera-on="onCameraOn"
          @camera-off="onCameraOff"
      >
        <!-- 扫描确认提示框 -->
        <div
            v-show="showScanConfirmation"
            class="scan-confirmation"
            @click="paused = false"
        >
          <!-- 动态生成的小圆球 -->
          <template v-for="(code, index) in detectedCodes"
                    :key="index">
            <div @click="openCode(code.rawValue)"
                 :style="{
                  top: `${calculatePercentage(code.boundingBox.top, videoHeight)}%`,
                  left: `${calculatePercentage(code.boundingBox.left, videoWidth)}%`,
                  }"
                 class="fa-check-box"
            >
              <i class="fa fa-check" style="color: white;">
                <el-icon>
                  <Promotion/>
                </el-icon>
              </i>
            </div>
          </template>

        </div>
      </qrcode-stream>
    </div>
  </div>

  <div class="text-box">
    <!-- 说明文本与摄像头选择单选按钮 -->
    <p>
      <span>选择摄像头：</span>
      <!-- 单选按钮用于选择摄像头 -->
      <label v-for="option in constraintOptions" :key="option.label">
        <input type="radio" :name="'camera-' + option.label" :value="option.constraints" v-model="selectedConstraints"/>
        {{ option.label }}
      </label>
    </p>
    <!-- 说明文本与追踪功能选择单选按钮 -->
    <p>
      <span>选择追踪功能：</span>
      <!-- 单选按钮用于选择追踪功能 -->
      <label v-for="option in trackFunctionOptions" :key="option.text">
        <input type="radio" :name="'track-' + option.text" :value="option" v-model="trackFunctionSelected"/>
        {{ option.text }}
      </label>
    </p>
    <!-- 说明文本与条形码格式复选框 -->
    <p>
      <span>选择条形码格式：</span>
      <!-- 单选按钮列表用于选择支持的条形码格式 -->
      <label v-for="(mode, index) in Object.keys(barcodeModes)" :key="index">
        <input type="radio" name="barcode-mode" :value="mode" v-model="selectedBarcodeMode"/>
        {{ mode === 'both' ? '扫描条形码和二维码' : mode === 'barcodes' ? '仅扫描条形码' : '仅扫描二维码' }}
      </label>
    </p>
    <!-- 错误信息展示区域 -->
    <p class="error">{{ error }}</p>
    <!-- 显示最后识别结果 -->
    <p class="decode-result">
      最后的结果：<b>{{ result }}</b>
    </p>
    <p>
      <button @click="paused = !paused">{{ paused ? '继续/重新扫描' : '暂停扫描' }}</button>
    </p>
  </div>

</template>

<script setup>
import {ref, computed, watchEffect} from 'vue';
// 导入二维码识别组件
import {QrcodeStream} from 'vue-qrcode-reader';

import {Promotion} from '@element-plus/icons-vue'

// 结果存储
let result = ref('');

// 定义是否暂停的变量
const paused = ref(false)
// 控制扫描确认框显示与否的变量
const showScanConfirmation = ref(false)
// 存储所有检测到的图码
const detectedCodes = ref([])

const videoWidth = ref(0)
const videoHeight = ref(0)

const videoRef = ref(null)

// 当检测到条形码时触发
function onDetect(detectedCodesValue) {
  console.log(detectedCodes);
  detectedCodes.value = detectedCodesValue

  // 更新结果显示
  result.value = JSON.stringify(detectedCodesValue.map((code) => code.rawValue));

  // 暂停扫描，等待下一步操作
  paused.value = true
}

function openCode(value) {
  if (value) {
    if (isUrl(value)) {
      alert('这是一个链接');
    } else if (isDomain(value)) {
      alert('这是一个域名');
    } else if (isNumber(value)) {
      alert('这是一串数字');
    } else {
      alert(`这是一个字符串：${value}`);
    }
  } else {
    alert('没有识别到图码，请重新扫描');
  }
}

function isUrl(value) {
  return value.includes('http://') || value.includes('https://');
}

function isDomain(value) {
  return value.split('').filter(char => char === '.').length >= 2;
}

function isNumber(value) {
  const num = Number(value);
  return !isNaN(num) && value === num.toString();
}

// 设置默认打开的摄像头：后置摄像头（environment）
let selectedConstraints = ref({facingMode: 'environment'});
// 初始化摄像头选项：默认有前置摄像头和后置摄像头
let defaultConstraintOptions = [
  {label: '后置摄像头', constraints: {facingMode: 'environment'}},
  {label: '前置摄像头', constraints: {facingMode: 'user'}}
];
// 存储所有的可用摄像头，并将默认的摄像头添加到列表中
let constraintOptions = ref(defaultConstraintOptions);

// 初始化所有的摄像头：将检测到的摄像头信息添加到列表中
async function onCameraOn() {
  // 摄像头打开时关闭扫描确认框
  showScanConfirmation.value = false
  // 获取视频的尺寸

  // 获取所有可用的媒体设备
  let devices = await navigator.mediaDevices.enumerateDevices();
  // 获取设备中的摄像头
  let videoDevices = devices.filter(({kind}) => kind === 'videoinput');

  // 将默认的摄像头和检测到的摄像头加入到列表中
  constraintOptions.value = [
    ...defaultConstraintOptions,
    ...videoDevices.map(({deviceId, label}) => ({
      label: `${label}`,
      constraints: {deviceId}
    }))
  ];
  // 摄像头初始化完毕，清除错误信息
  error.value = '';
  getVideoDimensions()

}

async function onCameraOff() {
  // 摄像头关闭时打开扫描确认框
  showScanConfirmation.value = true
}

// 绘制检测到的条形码轮廓
function paintOutline(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

    ctx.strokeStyle = 'red';

    ctx.beginPath();
    ctx.moveTo(firstPoint.x, firstPoint.y);
    for (const {x, y} of otherPoints) {
      ctx.lineTo(x, y);
    }
    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.closePath();
    ctx.stroke();
  }
}

// 绘制检测到的条形码边界框
function paintBoundingBox(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: {x, y, width, height}
    } = detectedCode;

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#007bff';
    ctx.strokeRect(x, y, width, height);
  }
}

// 在中心绘制文字
function paintCenterText(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const {boundingBox, rawValue} = detectedCode;

    const centerX = boundingBox.x + boundingBox.width / 2;
    const centerY = boundingBox.y + boundingBox.height / 2;

    const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width);

    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = 'center';

    ctx.lineWidth = 3;
    ctx.strokeStyle = '#35495e';
    ctx.strokeText(detectedCode.rawValue, centerX, centerY);

    ctx.fillStyle = '#5cb984';
    ctx.fillText(rawValue, centerX, centerY);
  }
}

// 设置跟踪功能选项
let trackFunctionOptions = [
  {text: '无（默认）', value: undefined},
  {text: '图码边框线', value: paintOutline},
  {text: '图码范围线', value: paintBoundingBox},
  {text: '居中文字', value: paintCenterText}
];
// 当前选中的跟踪功能，默认是：无
let trackFunctionSelected = ref(trackFunctionOptions[0]);

// 定义条形码和二维码的格式
const barcodeModes = {
  barcodes: ['code_128', 'code_39', 'codabar', 'ean_13', 'itf'],
  qrcodes: ['qr_code'],
  both: ['code_128', 'code_39', 'codabar', 'ean_13', 'itf', 'qr_code']
};

// 用于选择图码模式
const selectedBarcodeMode = ref('qrcodes');

// 计算当前选中的条形码格式
let selectedBarcodeFormats = computed(() => {
  return barcodeModes[selectedBarcodeMode.value];
});

// 错误信息存储
let error = ref('');

// 处理错误信息
function onError(err) {
  // 存储错误信息名，并用中括号包围
  error.value = `[${err.name}]: `;
  // 实定义错误信息
  if (err.name === 'NotAllowedError') {
    error.value += '您需要授予相机访问权限';
  } else if (err.name === 'NotFoundError') {
    error.value += '此设备上没有摄像头';
  } else if (err.name === 'NotSupportedError') {
    error.value += '需要安全上下文（HTTPS、localhost）';
  } else if (err.name === 'NotReadableError') {
    error.value += '可能有别的平台正在占用摄像头';
  } else if (err.name === 'OverconstrainedError') {
    error.value += '安装的摄像头不合适，您需要换台设备使用';
  } else if (err.name === 'StreamApiNotSupportedError') {
    error.value += '此浏览器不支持流API，您需要换个浏览器使用';
  } else if (err.name === 'InsecureContextError') {
    error.value += '只有在安全的情况下才允许访问摄像头。使用HTTPS或localhost而不是HTTP。';
  } else {
    // 不常见的错误信息，原文显示
    error.value += err.message;
  }
}

// 计算百分比
function calculatePercentage(value, total) {
  let percentage = (value / total) * 100
  if (percentage > 80) {
    percentage = 80 - (percentage - 80);
  }
  console.log(value, total, percentage)
  return percentage;
}


function getVideoDimensions() {
  // 获取vh 和vw 的大小
  videoWidth.value = document.documentElement.clientWidth;
  videoHeight.value = document.documentElement.clientHeight;
  console.log('视频尺寸：', videoWidth.value, videoHeight.value);
}



// 监听视频尺寸变化
watchEffect(() => {
  if (videoWidth.value > 0 && videoHeight.value > 0) {
    console.log(`视频尺寸: ${videoWidth.value} x ${videoHeight.value}`);
    getVideoDimensions();
  }
});
</script>





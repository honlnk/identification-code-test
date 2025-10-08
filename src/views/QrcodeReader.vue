<style scoped>
/* 仿微信扫一扫整体样式 */
.qrcode-reader-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #1296db, #15b7d1);
  display: flex;
  flex-direction: column;
}

/* 顶部导航栏 */
.top-nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 16px 12px;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 16px;
}

.back-btn {
  font-size: 18px;
  cursor: pointer;
  z-index: 101;
}

.scan-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 500;
}

.scan-actions {
  display: flex;
  gap: 20px;
}

.scan-action-btn {
  font-size: 18px;
  cursor: pointer;
  z-index: 101;
}

/* 扫描区域 */
.scan-area {
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* 扫描框 */
.scan-box {
  position: relative;
  width: 250px;
  height: 250px;
  margin-top: 60px;
  border: 2px solid #fff;
  border-radius: 8px;
  box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.5);
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to bottom, #00ff00, #00cc00);
  animation: scan 2s linear infinite;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
}

@keyframes scan {
  0% {
    top: 0;
  }
  50% {
    top: calc(100% - 2px);
  }
  100% {
    top: 0;
  }
}

/* 扫描框四个角 */
.scan-corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
}

.scan-corner-tl {
  top: -2px;
  left: -2px;
  border-right: none;
  border-bottom: none;
  border-radius: 4px 0 0 0;
}

.scan-corner-tr {
  top: -2px;
  right: -2px;
  border-left: none;
  border-bottom: none;
  border-radius: 0 4px 0 0;
}

.scan-corner-bl {
  bottom: -2px;
  left: -2px;
  border-right: none;
  border-top: none;
  border-radius: 0 0 0 4px;
}

.scan-corner-br {
  bottom: -2px;
  right: -2px;
  border-left: none;
  border-top: none;
  border-radius: 0 0 4px 0;
}

/* 扫描区域提示文字 */
.scan-tips {
  position: absolute;
  bottom: 120px;
  color: white;
  text-align: center;
  width: 100%;
  font-size: 14px;
  opacity: 0.9;
}

/* 底部操作按钮 */
.bottom-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 100;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 12px;
}

.action-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 6px;
  font-size: 24px;
  cursor: pointer;
}

/* 二维码流视频遮罩 */
.qrcode-stream-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* 暂停扫描提示 */
.scan-confirmation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 200;
  color: white;
}

.scan-confirmation-text {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
}

/* 文本结果弹窗 */
.text-result-dialog {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
}

.dialog-content {
  background: white;
  width: 80%;
  max-width: 350px;
  border-radius: 10px;
  overflow: hidden;
}

.dialog-header {
  padding: 15px;
  background: #f5f5f5;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.dialog-body {
  padding: 20px;
  max-height: 200px;
  overflow-y: auto;
}

.result-text {
  word-break: break-all;
  line-height: 1.5;
  color: #333;
  font-size: 14px;
}

.dialog-footer {
  display: flex;
  border-top: 1px solid #eee;
  padding: 10px 0;
}

.copy-btn, .continue-btn, .cancel-btn {
  flex: 1;
  padding: 12px 0;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.copy-btn {
  background-color: #1296db;
  color: white;
  border-right: 1px solid #eee;
}

.continue-btn {
  background-color: #1296db;
  color: white;
}

.cancel-btn {
  background-color: #f0f0f0;
  color: #333;
}

/* 控制面板弹窗 */
.controls-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.controls-content {
  background: white;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  border-radius: 10px;
  padding: 20px;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.controls-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: bold;
}

.close-btn {
  font-size: 20px;
  cursor: pointer;
  color: #999;
}

.control-group {
  margin-bottom: 15px;
}

.control-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.radio-item {
  display: flex;
  align-items: center;
  font-size: 13px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid #ddd;
  transition: all 0.3s;
  background-color: #f8f8f8;
}

.radio-item:hover {
  border-color: #1296db;
  background-color: #eef7ff;
}

.radio-item input {
  margin-right: 6px;
}

.radio-item input[type="radio"]:checked + span {
  color: #1296db;
  font-weight: 500;
}

.result-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 15px 20px;
  background-color: rgba(255, 255, 255, 0.95);
  border-top: 1px solid #eee;
  z-index: 1000;
}

.result-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.result-content {
  font-size: 14px;
  word-break: break-all;
  color: #666;
}

.error-box {
  position: absolute;
  top: 80px;
  left: 20px;
  right: 20px;
  background-color: rgba(255, 58, 58, 0.9);
  color: white;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  z-index: 150;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary {
  background-color: #1296db;
  color: white;
  flex: 1;
}

/* 适配移动端 */
@media (max-width: 768px) {
  .scan-box {
    width: 220px;
    height: 220px;
  }
  
  .top-nav {
    padding: 15px 10px 10px;
  }
  
  .bottom-actions {
    padding: 15px 0;
  }
}
</style>

<template>
  <div class="qrcode-reader-container">
    <!-- 顶部导航栏 -->
    <div class="top-nav">
      <div class="scan-title">扫码</div>
      <div class="scan-actions">
        <div class="scan-action-btn" @click="switchCamera">切换</div>
        <div class="scan-action-btn" @click="openFileSelector">上传</div>
      </div>
    </div>
    
    <!-- 二维码流视频 -->
    <div class="qrcode-stream-container">
      <qrcode-stream
          ref="videoRef"
          :constraints="selectedConstraints"
          :track="trackFunctionSelected ? trackFunctionSelected.value : undefined"
          :formats="selectedBarcodeFormats"
          :paused="paused"
          @error="onError"
          @detect="onDetect"
          @camera-on="onCameraOn"
          @camera-off="onCameraOff"
      />
    </div>
    
    <!-- 扫描区域 -->
    <div class="scan-area">
      <div class="scan-box">
        <div class="scan-line"></div>
        <div class="scan-corner scan-corner-tl"></div>
        <div class="scan-corner scan-corner-tr"></div>
        <div class="scan-corner scan-corner-bl"></div>
        <div class="scan-corner scan-corner-br"></div>
      </div>
      <div class="scan-tips">将二维码/条码放入框内，即可自动扫描</div>
    </div>
    
    <!-- 错误信息 -->
    <div v-if="error" class="error-box">{{ error }}</div>
    
    
    
    <!-- 文本结果弹窗 -->
    <div 
      v-if="showTextResultDialog && !isUrl(result)" 
      class="text-result-dialog"
    >
      <div class="dialog-content">
        <div class="dialog-header">扫描结果</div>
        <div class="dialog-body">
          <div class="result-text">{{ result }}</div>
        </div>
        <div class="dialog-footer">
          <button class="copy-btn" @click="copyText">复制</button>
          <button class="continue-btn" @click="closeTextResultDialog">继续扫描</button>
        </div>
      </div>
    </div>
    
    <!-- URL结果处理 -->
    <div
        v-if="showScanConfirmation && isUrl(result)"
        class="scan-confirmation"
    >
      <div class="scan-confirmation-text">检测到链接</div>
      <div class="scan-result">{{ result }}</div>
      <div class="dialog-footer">
        <button class="cancel-btn" @click="closeUrlDialog">取消</button>
        <button class="continue-btn" @click="openUrl">打开链接</button>
      </div>
    </div>
    
        <!-- 底部操作按钮 -->
    <div class="bottom-actions">
      <div class="action-btn" @click="openFileSelector" title="上传图片">
        <div class="action-icon">📁</div>
      </div>
      <div class="action-btn" @click="openControls" title="扫描设置">
        <div class="action-icon">⚙️</div>
      </div>
    </div>
    
    <!-- 文件上传输入框（隐藏） -->
    <input 
      type="file" 
      ref="fileInput" 
      accept="image/*" 
      @change="handleFileUpload" 
      style="display: none" 
    />
    
    <!-- 控制面板弹窗 -->
    <div v-if="showControls" class="controls-modal">
      <div class="controls-content">
        <div class="controls-header">
          <span>扫描设置</span>
          <span class="close-btn" @click="closeControls">✕</span>
        </div>
        
        <!-- 摄像头选择 -->
        <div class="control-group">
          <div class="control-title">📷 选择摄像头</div>
          <div class="radio-group">
            <label 
              v-for="option in constraintOptions" 
              :key="option.label" 
              class="radio-item"
            >
              <input 
                type="radio" 
                :name="'camera-' + option.label" 
                :value="option.constraints" 
                v-model="selectedConstraints"
              />
              <span>{{ option.label }}</span>
            </label>
          </div>
        </div>
        
        <!-- 追踪功能选择 -->
        <div class="control-group">
          <div class="control-title">🔍 选择追踪功能</div>
          <div class="radio-group">
            <label 
              v-for="option in trackFunctionOptions" 
              :key="option.text" 
              class="radio-item"
            >
              <input 
                type="radio" 
                :name="'track-' + option.text" 
                :value="option" 
                v-model="trackFunctionSelected"
              />
              <span>{{ option.text }}</span>
            </label>
          </div>
        </div>
        
        <!-- 条形码格式选择 -->
        <div class="control-group">
          <div class="control-title">⚙️ 选择扫描格式</div>
          <div class="radio-group">
            <label 
              v-for="(mode, index) in Object.keys(barcodeModes)" 
              :key="index" 
              class="radio-item"
            >
              <input 
                type="radio" 
                name="barcode-mode" 
                :value="mode" 
                v-model="selectedBarcodeMode"
              />
              <span>
                {{ mode === 'both' ? '扫描条形码和二维码' : 
                   mode === 'barcodes' ? '仅扫描条形码' : '仅扫描二维码' }}
              </span>
            </label>
          </div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="action-buttons">
          <button 
            class="btn btn-primary" 
            @click="paused = !paused; closeControls()"
          >
            {{ paused ? '▶️ 继续/重新扫描' : '⏸️ 暂停扫描' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
// 导入二维码识别组件
import { QrcodeStream } from 'vue-qrcode-reader';

const router = useRouter();

// 结果存储
let result = ref('');

// 定义是否暂停的变量
const paused = ref(false);
// 控制扫描确认框显示与否的变量
const showScanConfirmation = ref(false);

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

// 初始化摄像头选项：默认有前置摄像头和后置摄像头
let defaultConstraintOptions = [
  {label: '后置摄像头', constraints: {facingMode: 'environment'}},
  {label: '前置摄像头', constraints: {facingMode: 'user'}}
];
// 存储所有的可用摄像头，并将默认的摄像头添加到列表中
let constraintOptions = ref(defaultConstraintOptions);

// 用于选择图码模式
const selectedBarcodeMode = ref('qrcodes');

// 计算当前选中的条形码格式
let selectedBarcodeFormats = computed(() => {
  return barcodeModes[selectedBarcodeMode.value];
});

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
}

async function onCameraOff() {
  // 摄像头关闭时打开扫描确认框
  showScanConfirmation.value = true
}

// 文本结果弹窗显示控制
const showTextResultDialog = ref(false);

// 控制面板弹窗显示控制
const showControls = ref(false);

// 文件上传输入框引用
const fileInput = ref(null);

// 处理扫描结果
function onDetect(detectedCodes) {
  // 取第一个检测到的结果
  if (detectedCodes && detectedCodes.length > 0) {
    result.value = detectedCodes[0].rawValue;
    
    // 根据结果类型显示不同界面
    if (isUrl(result.value)) {
      showScanConfirmation.value = true; // 显示URL确认界面
    } else {
      showTextResultDialog.value = true; // 显示文本结果弹窗
    }
    
    // 暂停扫描
    paused.value = true;
  }
}

// 打开URL
function openUrl() {
  window.open(result.value, '_blank');
  closeUrlDialog();
}

// 关闭URL对话框
function closeUrlDialog() {
  showScanConfirmation.value = false;
  resetScanner();
}

// 关闭文本结果对话框
function closeTextResultDialog() {
  showTextResultDialog.value = false;
  resetScanner();
}

// 重置扫描器
function resetScanner() {
  result.value = '';
  paused.value = false;
}

// 复制文本到剪贴板
async function copyText() {
  try {
    await navigator.clipboard.writeText(result.value);
    alert('复制成功');
  } catch (err) {
    console.error('复制失败', err);
    // 降级方案：使用旧版复制方法
    fallbackCopyTextToClipboard(result.value);
  }
}

// 降级复制方法
function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  
  // 避免滚动到底部
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      alert('复制成功');
    } else {
      alert('复制失败');
    }
  } catch (err) {
    console.error('复制失败', err);
    alert('复制失败');
  }
  
  document.body.removeChild(textArea);
}

function isUrl(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return str.startsWith('http://') || str.startsWith('https://');
  }
}

// 切换摄像头
let currentFacingMode = ref('environment');
let selectedConstraints = computed(() => {
  return { facingMode: currentFacingMode.value };
});

function switchCamera() {
  currentFacingMode.value = currentFacingMode.value === 'environment' ? 'user' : 'environment';
}

// 打开相册功能（模拟）
function openAlbum() {
  alert('相册功能暂未实现');
}

// 模拟返回功能
function goBack() {
  router.go(-1);
}

// 打开控制面板
function openControls() {
  showControls.value = true;
}

// 关闭控制面板
function closeControls() {
  showControls.value = false;
}

// 打开文件选择器
function openFileSelector() {
  fileInput.value.click();
}

// 处理文件上传
function handleFileUpload(event) {
  const file = event.target.files[0];
  
  if (!file) return;
  
  // 验证文件类型
  if (!file.type.startsWith('image/')) {
    alert('请选择图片文件');
    return;
  }
  
  // 验证文件大小（例如限制为5MB）
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    alert('文件大小不能超过5MB');
    return;
  }
  
  // 使用QR码解析库读取图片中的QR码
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      // 创建一个临时的图像元素
      const img = new Image();
      img.src = e.target.result;
      
      img.onload = async () => {
        // 创建canvas来处理图像
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        // 将图像绘制到canvas上
        ctx.drawImage(img, 0, 0, img.width, img.height);
        
        // 获取图像数据
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // 使用jsqr库解析QR码
        import('jsqr').then(({ default: jsQR }) => {
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          
          if (code) {
            result.value = code.data;
            
            // 根据结果类型显示不同界面
            if (isUrl(result.value)) {
              showScanConfirmation.value = true; // 显示URL确认界面
            } else {
              showTextResultDialog.value = true; // 显示文本结果弹窗
            }
            
            // 暂停摄像头扫描
            paused.value = true;
          } else {
            alert('未在图片中找到二维码');
          }
        });
      };
    } catch (error) {
      console.error('处理图像时出错:', error);
      alert('处理图片时出错');
    }
  };
  
  reader.readAsDataURL(file);
}

// 定义条形码和二维码的格式
const barcodeModes = {
  barcodes: ['code_128', 'code_39', 'codabar', 'ean_13', 'itf'],
  qrcodes: ['qr_code'],
  both: ['code_128', 'code_39', 'codabar', 'ean_13', 'itf', 'qr_code']
};

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
</script>
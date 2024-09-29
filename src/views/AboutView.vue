<template>
  <div>
    <video ref="video" width="640" height="480" @play="startCamera"></video>
    <pre>{{ barcodeData }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Quagga from 'quagga'

const video = ref(null)
const barcodeData = ref('')

const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    video.value.srcObject = stream
    Quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('video'),
      },
      decoder : {
        readers : ["ean_reader", "upc_reader", "code_128_reader", "code_39_reader", "code_93_reader"]
      }
    }, function(err) {
      if (err) {
        console.log(err);
        return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
    });
    Quagga.onDetected(function(result) {
      barcodeData.value = result.codeResult.code;
      console.log('Detected Barcode:', result.codeResult.code);
      // 停止识别
      Quagga.stop();
    });
  } catch (error) {
    console.error('Error accessing camera:', error)
  }
}

onMounted(() => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    startCamera()
  }
})

onUnmounted(() => {
  Quagga.offDetected();
  Quagga.stop();
})
</script>

<style scoped>
video {
  border: 1px solid #ccc;
}
</style>
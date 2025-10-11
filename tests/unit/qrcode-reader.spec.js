import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import QrcodeReader from '@/views/QrcodeReader.vue'

// Mock the vue-qrcode-reader component since it requires camera access
vi.mock('vue-qrcode-reader', () => ({
  QrcodeStream: {
    name: 'QrcodeStream',
    template: '<div class="qrcode-stream-mock"><slot /></div>',
    props: ['constraints', 'track', 'formats', 'paused'],
    emits: ['error', 'detect', 'camera-on', 'camera-off'],
    setup(props, { emit }) {
      // Mock the component's methods
      const mockEmit = (event, ...args) => {
        emit(event, ...args)
      }
      
      return { mockEmit }
    }
  }
}))

// Mock the jsqr library
vi.mock('jsqr', async () => {
  const actual = await vi.importActual('jsqr')
  return {
    default: vi.fn().mockReturnValue({
      data: 'mocked qr code data',
      location: { topLeftCorner: {}, topRightCorner: {}, bottomLeftCorner: {}, bottomRightCorner: {} }
    })
  }
})

// 创建一个简单的路由配置用于测试
const routes = [
  { path: '/', component: { template: '<div>Home</div>' } },
  { path: '/about', component: { template: '<div>About</div>' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

describe('QrcodeReader', () => {
  let wrapper

  beforeEach(async () => {
    // Mock the navigator.mediaDevices API
    Object.defineProperty(navigator, 'mediaDevices', {
      value: {
        enumerateDevices: vi.fn().mockResolvedValue([
          { kind: 'videoinput', deviceId: '1', label: 'Front Camera' },
          { kind: 'videoinput', deviceId: '2', label: 'Back Camera' }
        ])
      },
      writable: true
    })
    
    // 等待路由器就绪
    await router.push('/')
    await router.isReady()
  })

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  it('renders correctly', async () => {
    wrapper = mount(QrcodeReader, {
      global: {
        plugins: [router],
        stubs: {
          // We'll use the mocked version
        }
      }
    })
    
    await router.isReady()
    
    expect(wrapper.find('.qrcode-reader-container').exists()).toBe(true)
    expect(wrapper.find('.scan-title').text()).toBe('扫码')
    expect(wrapper.find('.scan-box').exists()).toBe(true)
  })

  it('initializes with correct default values', async () => {
    wrapper = mount(QrcodeReader, {
      global: {
        plugins: [router]
      }
    })
    
    await router.isReady()
    
    // Check if initial state is correct
    expect(wrapper.vm.result).toBeDefined()
    expect(wrapper.vm.paused).toBe(false)
    expect(wrapper.vm.showScanConfirmation).toBe(false)
    expect(wrapper.vm.selectedBarcodeMode).toBe('qrcodes')
  })

  it('switches camera when switchCamera is called', async () => {
    wrapper = mount(QrcodeReader, {
      global: {
        plugins: [router]
      }
    })
    
    await router.isReady()
    
    // Initial facing mode should be 'environment' (back camera)
    expect(wrapper.vm.currentFacingMode).toBe('environment')
    
    // Call switchCamera method
    await wrapper.vm.switchCamera()
    
    // Should switch to 'user' (front camera)
    expect(wrapper.vm.currentFacingMode).toBe('user')
    
    // Call switchCamera again
    await wrapper.vm.switchCamera()
    
    // Should switch back to 'environment' (back camera)
    expect(wrapper.vm.currentFacingMode).toBe('environment')
  })

  it('opens controls panel when openControls is called', async () => {
    wrapper = mount(QrcodeReader, {
      global: {
        plugins: [router]
      }
    })
    
    await router.isReady()
    
    // Initially, controls should be hidden
    expect(wrapper.vm.showControls).toBe(false)
    
    // Call openControls method
    await wrapper.vm.openControls()
    
    // Should now be visible
    expect(wrapper.vm.showControls).toBe(true)
  })

  it('closes controls panel when closeControls is called', async () => {
    wrapper = mount(QrcodeReader, {
      global: {
        plugins: [router]
      }
    })
    
    await router.isReady()
    
    // First open the controls
    await wrapper.vm.openControls()
    expect(wrapper.vm.showControls).toBe(true)
    
    // Then close them
    await wrapper.vm.closeControls()
    expect(wrapper.vm.showControls).toBe(false)
  })

  it('validates if a string is a URL', async () => {
    wrapper = mount(QrcodeReader, {
      global: {
        plugins: [router]
      }
    })
    
    await router.isReady()
    
    // Test valid URLs
    expect(wrapper.vm.isUrl('https://example.com')).toBe(true)
    expect(wrapper.vm.isUrl('http://example.com')).toBe(true)
    expect(wrapper.vm.isUrl('https://www.example.com/path?query=1')).toBe(true)
    
    // Test invalid URLs
    expect(wrapper.vm.isUrl('not a url')).toBe(false)
    expect(wrapper.vm.isUrl('example.com')).toBe(false)
  })

  it('opens file selector when openFileSelector is called', async () => {
    wrapper = mount(QrcodeReader, {
      global: {
        plugins: [router]
      }
    })
    
    await router.isReady()
    
    // Mock the click method on the file input
    const mockClick = vi.fn()
    wrapper.vm.fileInput = { click: mockClick }
    
    // Call openFileSelector method
    await wrapper.vm.openFileSelector()
    
    // The click method should have been called
    expect(mockClick).toHaveBeenCalledTimes(1)
  })
})
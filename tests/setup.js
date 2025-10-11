import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Mock the Element Plus components
vi.mock('element-plus', () => ({
  default: {}
}))

// Mock the camera API since it won't be available in test environment
Object.defineProperty(navigator, 'mediaDevices', {
  value: {
    getUserMedia: vi.fn().mockResolvedValue({
      getTracks: vi.fn().mockReturnValue([{ stop: vi.fn() }])
    })
  },
  writable: true
})

// Mock the ZXing library
vi.mock('@zxing/library', () => ({
  BrowserMultiFormatReader: vi.fn().mockImplementation(() => ({
    decodeFromVideoDevice: vi.fn()
  }))
}))

// Global configuration for Vue Test Utils
config.global.mocks = {
  $t: (msg) => msg // Mock Vue i18n if used
}

// Add any other global mocks, components, or configuration needed for tests
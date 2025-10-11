import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'

// 创建一个简单的路由配置用于测试
const routes = [
  { path: '/', component: { template: '<div>Home</div>' } },
  { path: '/about', component: { template: '<div>About</div>' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

describe('App.vue', () => {
  it('renders properly', async () => {
    // 等待路由完成安装
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    
    await router.isReady()
    
    // 检查是否有 RouterView 组件
    expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(true)
  })
})
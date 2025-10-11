# 项目测试说明

本项目已配置 Vitest 作为测试框架，支持单元测试。

## 安装依赖

安装测试相关的依赖：

```bash
npm install -D vitest @vitest/ui jsdom @vue/test-utils
```

或使用 pnpm：

```bash
pnpm add -D vitest @vitest/ui jsdom @vue/test-utils
```

## 测试脚本

项目中已配置以下测试相关脚本：

- `pnpm test` 或 `npm run test`: 启动交互式测试监听器
- `pnpm test:run` 或 `npm run test:run`: 运行所有测试用例（非交互式）
- `pnpm test:ui` 或 `npm run test:ui`: 启动 Vitest UI 界面

## 测试配置

- 测试配置文件: `vitest.config.js`
- 测试设置文件: `tests/setup.js`
- 测试用例存放于: `tests/unit/` 目录下

## 添加新测试

要为新组件添加测试，可以在 `tests/unit/` 目录下创建相应的 `.spec.js` 文件，例如：

```javascript
// tests/unit/MyComponent.spec.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '@/components/MyComponent.vue'

describe('MyComponent', () => {
  it('renders correctly', () => {
    const wrapper = mount(MyComponent)
    expect(wrapper.exists()).toBe(true)
  })
})
```

## GitHub Actions 集成

GitHub Actions 工作流已经更新，现在会运行 `npm run test:run` 命令来执行测试。
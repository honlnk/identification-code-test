# Vue 项目构建与部署最佳实践

## 1. Vue 项目构建原理

### Vite 构建配置详解：`vite.config.js`

```javascript
import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// elementPlus UI 按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',  // 使用相对路径，适用于 GitHub Pages 部署
    plugins: [
        vue(),
        // elementPlus UI 按需导入
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
```

### 关键配置点：
- **`base: './'`**: 设置为相对路径，这对于 GitHub Pages 部署至关重要，确保资源在子路径下也能正确加载
- **插件配置**: 包含 Vue 插件以及 Element Plus 的按需导入配置
- **路径别名**: 设置 `@` 指向 `src` 目录，便于模块导入

## 2. 构建过程详解

### package.json 中的脚本
```json
{
  "scripts": {
    "dev": "vite",           // 开发模式启动
    "build": "vite build",   // 构建生产版本
    "preview": "vite preview", // 预览构建结果
    "lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore" // 代码检查和修复
  }
}
```

### 构建输出
- 运行 `npm run build` 后，Vite 会将项目构建到 `dist` 目录
- 包含所有静态资源（HTML、CSS、JavaScript、图片等）
- 优化和压缩代码以提高加载性能

## 3. GitHub Pages 部署考虑因素

### 路径配置
当部署到 GitHub Pages 的子路径时（如 `username.github.io/repo-name`），必须在 `vite.config.js` 中设置：
```javascript
export default defineConfig({
    base: './',  // 重要：使用相对路径
    // ...
})
```

### 路由处理
对于使用 Vue Router 的项目，如果使用 HTML5 History 模式，需要确保 GitHub Pages 的 404 处理：
1. 创建 `404.html` 文件，重定向到主页面
2. 确保路由配置能正确处理嵌套路由

## 4. 静态资源优化

### 资源压缩
Vite 在构建时会自动:
- 压缩 JavaScript 和 CSS
- 优化图片资源
- 生成 source maps（生产环境通常禁用）

### 代码分割
Vite 支持自动代码分割，将代码拆分为多个块，实现按需加载。

## 5. 部署前检查清单

在部署到 GitHub Pages 之前，请检查：

### 配置检查
- [ ] `vite.config.js` 中的 `base` 设置为 `'./'`
- [ ] 所有路径引用使用相对路径或基于 `base` 配置
- [ ] GitHub Actions 工作流文件语法正确

### 构建测试
- [ ] 本地运行 `npm run build` 成功
- [ ] 本地运行 `npm run preview` 正常显示应用
- [ ] 在本地预览中测试所有主要功能

### GitHub Pages 设置
- [ ] 在仓库 Settings → Pages 中正确选择源为 GitHub Actions
- [ ] 配置了正确的自定义域名（如需要）
- [ ] DNS 设置正确指向 GitHub Pages

## 6. 故障排除

### 资源加载失败
- 检查 `vite.config.js` 中的 `base` 配置
- 确认构建后的路径引用是正确的

### 路由问题
- 验证 Vue Router 的模式设置
- 对于 History 模式，确保 GitHub Pages 正确处理 404 重定向

### 环境差异
- 本地开发环境和 GitHub Pages 的基础路径可能不同
- 测试在子路径下的应用行为

## 7. 性能优化建议

### 代码优化
- 按需引入 UI 组件库（如 Element Plus）
- 启用 gzip 或 brotli 压缩
- 实现懒加载和代码分割

### 部署优化
- 使用 CDN 加速静态资源
- 配置浏览器缓存策略
- 启用 HTTPS 以确保安全性

## 8. 总结

Vue 项目与 GitHub Pages 的部署需要特别注意路径配置和路由处理。通过适当的构建配置和 GitHub Actions 工作流，可以实现高效的自动化部署流程。同时，优化构建产物和配置正确的路由处理可以确保应用在 GitHub Pages 上正常运行。
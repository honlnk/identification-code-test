# 识别码扫码应用 (Identification Code Scanner)

> 一个基于 Vue 3 和 Vite 的现代化扫码识别应用，支持多种二维码/条形码格式的实时扫描与识别。

<div align="center">
  <p>📱 便捷的移动端扫码应用 | 🔄 实时识别 | 📷 摄像头支持</p>
</div>

## ✨ 功能特性

- 📸 **实时扫码** - 利用设备摄像头实时扫描识别二维码/条形码
- 🔍 **多格式支持** - 支持 QR Code、Data Matrix、UPC、EAN 等多种码制
- 🎯 **精准定位** - 带有扫描框和指示器，帮助用户精准对准目标
- 🌐 **跨平台** - 基于 Web 技术，支持移动端和桌面端
- 🚀 **自动部署** - 集成 GitHub Actions，实现自动构建和部署到 GitHub Pages

## 🛠 技术栈

<div align="center">

| 技术 | 描述 |
|------|------|
| [Vue 3](https://vuejs.org/) | 前端框架 |
| [Vite](https://vitejs.dev/) | 构建工具 |
| [ZXing](https://github.com/zxing-js/library) | 二维码/条形码识别引擎 |
| [Element Plus](https://element-plus.org/) | UI 组件库 |
| [Pinia](https://pinia.vuejs.org/) | 状态管理 |
| [Vue Router](https://router.vuejs.org/) | 路由管理 |

</div>

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm 或 pnpm

### 本地开发

1. **克隆项目**
   ```bash
   git clone https://github.com/honlnk/identification-code-test.git
   cd identification-code-test
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或者使用 pnpm
   pnpm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **打开浏览器**
   访问 [http://localhost:5173](http://localhost:5173) 查看应用

### 构建生产版本

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 代码检查

```bash
# 使用 ESLint 检查并修复代码
npm run lint
```

### 运行测试

```bash
# 运行所有测试用例
npm run test:run

# 以监听模式运行测试
npm run test

# 启动 Vitest UI 界面
npm run test:ui
```

## 📱 使用说明

1. **访问应用** - 打开浏览器访问应用页面 (支持移动设备浏览器)
2. **授权摄像头** - 允许应用访问设备摄像头
3. **对准码** - 将二维码或条形码置于扫描框中央
4. **自动识别** - 应用会自动识别码内容并显示结果
5. **结果处理** - 扫码成功后会弹出识别结果，并自动跳转到相关搜索页面

## 🔧 项目结构

```
identification-code-test/
├── public/                 # 静态资源
├── src/                    # 源代码目录
│   ├── assets/            # 静态资源
│   ├── components/        # Vue 组件
│   ├── views/             # 页面视图
│   ├── router/            # 路由配置
│   ├── stores/            # Pinia 状态管理
│   ├── styles/            # 全局样式
│   ├── utils/             # 工具函数
│   └── App.vue            # 根组件
│   └── main.js            # 入口文件
├── docs/                  # 项目文档
├── .github/workflows/     # GitHub Actions 配置
├── vite.config.js         # Vite 配置
├── package.json           # 项目配置
└── README.md              # 项目说明
```

## 🌐 在线访问

- **GitHub Pages**: [https://code-identify.honlnk.top](https://code-identify.honlnk.top)
- **自定义域名**: [https://code-identify.honlnk.top](https://code-identify.honlnk.top)

## 📋 部署说明

本项目使用 GitHub Actions 实现自动部署，详情请参阅 [GitHub 工作流说明文档](./docs/github-workflow-explanation.md)。

## 🔒 权限说明

应用需要以下权限：
- **摄像头访问** - 用于实时扫描二维码/条形码
- **网络访问** - 用于跳转搜索结果页面

## 💡 技术细节

### 扫码实现

应用使用 [ZXing (Zebra Crossing)](https://github.com/zxing-js/library) 库实现扫码功能：

- `BrowserMultiFormatReader` - 实时扫码器
- 自动检测多种摄像头设备
- 优先使用后置摄像头（移动设备）
- 持续扫描直到识别成功

### UI 设计

- 扫描框带角标指示
- 动态扫描线动画
- 响应式设计适配移动端
- 现代化的视觉风格

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

该软件遵循 [MIT License](LICENSE) 许可证。

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [ZXing-js](https://github.com/zxing-js/library) - JavaScript 条形码扫描库
- [Element Plus](https://element-plus.org/) - Vue 3 组件库
- [Vite](https://vitejs.dev/) - 现代化构建工具

## 🔗 相关项目

- [ZXing](https://github.com/zxing/zxing) - 原始 ZXing 项目
- [Vue QR Code Reader](https://github.com/gruhn/vue-qrcode-reader) - Vue QR 码组件

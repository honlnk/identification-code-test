# GitHub Actions 与 GitHub Pages 部署指南

## 1. GitHub Actions 简介

GitHub Actions 是 GitHub 提供的持续集成/持续部署 (CI/CD) 服务。它允许开发者创建自定义的自动化工作流，用于构建、测试和部署代码。

### 核心概念：
- **Workflow (工作流)**：自动化流程的配置文件，通常定义在 `.github/workflows/` 目录下
- **Job (任务)**：工作流中的一个独立任务，可以包含多个步骤
- **Step (步骤)**：任务中的单个操作
- **Action (操作)**：可重用的代码单元，用于执行特定任务
- **Runner (运行器)**：执行工作流的虚拟机环境

## 2. GitHub Pages 简介

GitHub Pages 是 GitHub 提供的静态网站托管服务，可以将仓库中的静态文件部署为网站。它支持自定义域名和 HTTPS。

## 3. 部署配置详解

### 工作流文件解析：`.github/workflows/deploy.yml`

```yaml
# 构建并部署到 GitHub Pages
name: Build and Deploy  # 工作流名称

on:
  # 在推送到master分支时触发
  push:
    branches: [ master ]

# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 允许一个并发的部署
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest  # 使用最新的 Ubuntu 虚拟机
    steps:
      # 1. 检出代码
      - name: Checkout
        uses: actions/checkout@v4

      # 2. 设置 Node.js 环境
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      # 3. 安装依赖
      - name: Install dependencies
        run: npm ci

      # 4. 构建项目
      - name: Build project
        run: npm run build

      # 5. 设置 GitHub Pages
      - name: Setup Pages
        uses: actions/configure-pages@v4

      # 6. 上传构建产物
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      # 7. 部署到 GitHub Pages
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 各部分详解：

1. **`name`**: 工作流的名称，显示在 GitHub Actions 界面中

2. **`on`**: 定义触发工作流的事件，在这里设置为推送到 master 分支时触发

3. **`permissions`**: 设置 GITHUB_TOKEN 的权限，确保工作流可以写入 Pages 服务

4. **`concurrency`**: 设置并发控制，防止同时运行多个部署任务

5. **`jobs.build-and-deploy`**: 定义执行部署任务的工作流作业

6. **`runs-on`**: 指定运行环境，`ubuntu-latest` 使用最新的 Ubuntu 系统

7. **`steps`**: 定义工作流中的各个步骤：
   - `actions/checkout@v4`: 检出代码
   - `actions/setup-node@v4`: 设置 Node.js 环境
   - `npm ci`: 安装依赖
   - `npm run build`: 构建项目
   - `actions/configure-pages@v4`: 配置 GitHub Pages
   - `actions/upload-pages-artifact@v3`: 上传构建产物
   - `actions/deploy-pages@v4`: 部署到 GitHub Pages

## 4. 部署流程详解

### 第一步：代码提交
当你向 master 分支推送代码时，GitHub 会检测到 `.github/workflows/` 目录下的工作流文件。

### 第二步：触发工作流
由于配置了 `on.push.branches: [master]`，推送到 master 分支会自动触发工作流。

### 第三步：虚拟机环境准备
GitHub 会分配一个虚拟机（runner）来执行工作流，使用 `ubuntu-latest` 环境。

### 第四步：执行构建步骤
工作流按照定义的步骤依次执行：
1. 检出最新的代码
2. 安装 Node.js 环境
3. 安装项目依赖
4. 执行构建命令生成静态文件

### 第五步：部署到 GitHub Pages
构建完成后，通过 GitHub Pages 操作部署到 GitHub Pages 服务。

## 5. 自定义域名配置

### 在项目根目录创建 CNAME 文件
```
code-identify.honlnk.top
```

### 在 GitHub 仓库设置中的配置
1. 前往仓库 Settings → Pages
2. 在 "Custom domain" 字段输入你的域名
3. 确保 "Enforce HTTPS" 选项被勾选

### DNS 配置
在你的域名提供商处设置 CNAME 记录：
- 记录类型: CNAME
- 主机名: code-identify (或 @ 如果指向根域名)
- 目标值: honlnk.github.io

## 6. 常见问题与解决方案

### 问题1: 工作流无法运行
- 检查 `.github/workflows/` 目录下的 YAML 文件语法
- 确保文件扩展名为 `.yml` 或 `.yaml`
- 验证缩进是否正确（YAML 对缩进非常敏感）

### 问题2: 构建失败
- 检查 package.json 中的脚本配置
- 确认 Node.js 版本兼容性
- 检查依赖项是否正确安装

### 问题3: 部署成功但网站无法访问
- 检查 GitHub Pages 设置是否正确
- 确认构建产物是否在正确的目录（通常是 dist 或 build）
- 验证 GitHub Pages 源是否设置为 GitHub Actions

### 问题4: 自定义域名无法访问
- 检查 CNAME 文件是否正确放置在仓库根目录
- 确认 DNS 记录设置正确
- 等待 DNS 变更生效（可能需要几小时）

## 7. 最佳实践

1. 使用 `npm ci` 而不是 `npm install` 以确保可重现的构建
2. 在 workflow 文件中使用特定版本的 actions
3. 启用并发控制防止同时部署
4. 使用缓存加速依赖安装过程
5. 在提交前验证 YAML 文件语法
6. 为敏感操作设置适当的权限

## 8. 总结

GitHub Actions 与 GitHub Pages 的结合为前端项目提供了一个完整的自动化部署解决方案。通过合理配置，可以实现代码提交后自动构建和部署，大大简化了发布流程。同时，通过自定义域名，可以提供专业且可定制的网站访问体验。
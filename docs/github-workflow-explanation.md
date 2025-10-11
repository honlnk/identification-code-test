# GitHub 工作流详解：Build and Deploy

## 概述

本文档详细解释了位于 `.github/workflows/deploy.yml` 的 GitHub 工作流文件，该工作流用于自动化构建和部署项目到 GitHub Pages。

## 工作流基本信息

- **工作流名称：** Build and Deploy
- **文件位置：** `.github/workflows/deploy.yml`
- **主要功能：** 自动构建前端项目并部署到 GitHub Pages

## 触发条件

该工作流在以下情况下触发：

1. **推送事件 (`push`)：** 当推送到 master 分支时触发部署
2. **拉取请求事件 (`pull_request`)：** 当对 master 分支创建拉取请求时触发预览检查
3. **手动触发 (`workflow_dispatch`)：** 允许开发者手动触发部署

## 权限配置

```yaml
permissions:
  contents: read  # 读取仓库内容的权限
  pages: write    # 写入 GitHub Pages 的权限
  id-token: write # 写入 ID 令牌的权限
```

## 并发控制

```yaml
concurrency:
  group: "pages-${{ github.ref }}"
  cancel-in-progress: true
```

- 确保同一分支的部署不会同时运行
- 如果有新的部署开始，正在进行的部署会被取消

## 作业分析

### 1. build-and-deploy 作业

该作业仅在 push 到 master 分支或手动触发时执行。

#### 环境设置
- **环境名称：** github-pages
- **URL：** 通过部署步骤的输出动态设置

#### 运行环境
- **操作系统：** Ubuntu 最新版本

#### 详细步骤

1. **检出代码**
    ```yaml
    - name: Checkout
      uses: actions/checkout@v4
    ```
    使用 `actions/checkout@v4` 检出仓库代码

2. **设置 Node.js 环境**
    ```yaml
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
    ```
    安装 Node.js 20 版本，并配置 npm 缓存

3. **依赖缓存**
    ```yaml
    - name: Cache node modules
      id: cache-node-modules
      uses: actions/cache@v4
      with:
        path: node_modules
        key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
        restore-keys: |
          ${{ runner.os }}-node-
    ```
    使用 `actions/cache@v4` 缓存 node_modules，通过 package-lock.json 的哈希值生成缓存键

4. **安装依赖**
    ```yaml
    - name: Install dependencies
      if: steps.cache-node-modules.outputs.cache-hit != 'true'
      run: npm ci
    ```
    仅在缓存未命中时运行 `npm ci`

5. **运行测试**
    ```yaml
    - name: Run tests
      run: npm test
      continue-on-error: true
    ```
    执行 `npm test`，允许测试失败（`continue-on-error: true`）

6. **构建项目**
    ```yaml
    - name: Build project
      run: npm run build
    ```
    执行 `npm run build`，预期生成 dist 目录

7. **配置 Pages**
    ```yaml
    - name: Setup Pages
      uses: actions/configure-pages@v4
    ```
    使用 `actions/configure-pages@v4` 设置 GitHub Pages

8. **上传产物**
    ```yaml
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v3
      with:
        path: './dist'
    ```
    上传 `./dist` 目录的文件作为 GitHub Pages 的内容

9. **部署**
    ```yaml
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4
    ```
    使用 `actions/deploy-pages@v4` 部署到 GitHub Pages

### 2. pr-preview 作业

该作业仅在 pull request 事件时执行，不部署到 GitHub Pages。

#### 运行环境
- **操作系统：** Ubuntu 最新版本

#### 详细步骤

前 6 个步骤与 build-and-deploy 作业相同（检出代码、设置 Node.js、依赖缓存、安装依赖、运行测试、构建项目）。

7. **输出信息**
    ```yaml
    - name: Print build output info
      run: |
        echo "Build completed for PR #${{ github.event.number }}"
        echo "Files in dist/:"
        ls -la dist/
    ```
    打印构建完成信息和 dist 目录中的文件列表，供 PR 审查参考

## 工作流特点

### 性能优化
- 通过依赖缓存机制加快构建速度
- 仅在缓存未命中时安装依赖

### 错误容忍
- 测试失败不会导致整个工作流失败
- 确保部署过程不受测试影响

### 安全性
- 正确设置 GITHUB_TOKEN 权限
- 确保安全部署

### 灵活性
- 支持手动触发
- 为 PR 提供预构建检查
- 防止并发部署冲突

## 适用场景

这个工作流适用于以下类型的项目：

- 静态网站
- 前端应用（React, Vue, Angular, Svelte 等）
- 使用现代前端框架构建的单页应用

## 注意事项

1. 项目需要有 `build` 脚本，在 `package.json` 中定义
2. 构建后的文件应输出到 `dist` 目录
3. 项目应配置为在 GitHub Pages 上正确运行（如使用正确的基路径）
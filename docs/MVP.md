# AI Image Generator - MVP 需求文档

## 一、项目概述

**项目名称：** AI Image Generator  
**仓库：** https://github.com/KING-J-dou/image-background-remover  
**技术栈：** Next.js + Tailwind CSS + Replicate API (FLUX 模型)  
**部署平台：** Cloudflare Pages  

**目标：** 提供一个简洁易用的 AI 图像生成工具，用户输入文字描述，即可生成高质量图片并下载。

---

## 二、用户故事

| # | 作为... | 我希望... | 以便... |
|---|---------|-----------|---------|
| 1 | 普通用户 | 输入文字描述生成图片 | 快速获得 AI 创作图像 |
| 2 | 普通用户 | 看到生成进度/loading 状态 | 知道系统正在处理 |
| 3 | 普通用户 | 下载生成的图片 | 保存到本地使用 |
| 4 | 普通用户 | 在移动端正常使用 | 随时随地生成图片 |

---

## 三、功能需求

### 3.1 核心功能（MVP 必须）

#### F1 - 文字生成图片
- 用户在输入框输入 prompt（中英文均可）
- 点击「Generate」按钮或按 Enter 触发生成
- 调用 Replicate FLUX-schnell 模型
- 生成 1:1 比例 webp 格式图片

#### F2 - 生成状态反馈
- 生成中显示 loading 骨架屏 + 提示文字
- 按钮禁用，防止重复提交
- 生成失败显示错误提示

#### F3 - 图片展示与下载
- 生成完成后展示图片
- hover 显示下载按钮
- 点击下载保存到本地

### 3.2 非功能需求

- 响应时间：图片生成 ≤ 30 秒（受 API 限制）
- 移动端适配：支持 iOS/Android 浏览器
- 无需登录，开箱即用

---

## 四、页面设计

### 主页（唯一页面）

```
┌─────────────────────────────────┐
│                                 │
│      AI Image Generator         │  ← 标题（渐变色）
│   Describe anything, generate   │  ← 副标题
│                                 │
│  ┌─────────────────────┐ [Gen] │  ← 输入框 + 按钮
│  │ prompt 输入区域...   │       │
│  └─────────────────────┘       │
│                                 │
│  ┌─────────────────────────┐   │
│  │                         │   │  ← 生成的图片
│  │      [图片展示区]        │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

---

## 五、技术实现

### API 设计

**POST /api/generate**

Request:
```json
{ "prompt": "a futuristic city at sunset" }
```

Response (成功):
```json
{ "images": ["https://replicate.delivery/..."] }
```

Response (失败):
```json
{ "error": "Generation failed" }
```

### 模型参数

| 参数 | 值 | 说明 |
|------|----|------|
| model | black-forest-labs/flux-schnell | 快速生成模型 |
| num_outputs | 1 | 每次生成 1 张 |
| aspect_ratio | 1:1 | 正方形 |
| output_format | webp | 压缩格式 |
| output_quality | 80 | 质量/体积平衡 |

---

## 六、MVP 范围界定

### ✅ MVP 包含
- 文字 → 图片生成
- Loading 状态
- 图片展示 + 下载
- 移动端适配
- Cloudflare Pages 部署

### ❌ MVP 不包含（后续迭代）
- 用户登录 / 账号系统
- 生成历史记录
- 风格/尺寸选择
- 付费订阅 / 额度管理
- 图片编辑功能
- 社区分享

---

## 七、验收标准

| 功能 | 验收条件 |
|------|---------|
| 图片生成 | 输入 prompt 后 30s 内返回图片 |
| 错误处理 | API 失败时显示友好错误提示 |
| 下载 | 点击下载按钮可保存图片到本地 |
| 移动端 | iPhone/Android 浏览器正常显示和操作 |
| 部署 | Cloudflare Pages 可公开访问 |

---

## 八、后续迭代方向

**V1.1**
- 支持多种图片比例（16:9、9:16、4:3）
- 支持生成数量选择（1-4张）
- 提示词优化建议

**V1.2**
- 用户登录（GitHub OAuth）
- 生成历史（localStorage）
- 收藏功能

**V2.0**
- 付费订阅（Stripe）
- 高级模型选择（FLUX-pro、SDXL）
- API 额度管理

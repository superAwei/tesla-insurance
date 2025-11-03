# 特斯拉車險服務網站 (Tesla Insurance Website)

一個專為特斯拉車主設計的保險服務單頁應用網站，使用 Vue 3、Vite 和 Tailwind CSS 建立。

![Tesla Insurance](https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=400&fit=crop)

## ✨ 功能特色

- 🎨 **現代化設計** - 參考特斯拉官網風格，簡約科技感
- 📱 **完全響應式** - 完美支援桌面、平板、手機
- ⚡ **流暢動畫** - 滾動動畫、淡入效果、微互動
- 🚗 **互動式計算器** - 車型選擇、年份、購入時間、預算滑桿
- 📧 **表單整合** - EmailJS 郵件服務整合
- 🎯 **SEO 優化** - 語義化 HTML，適合搜尋引擎

## 🏗️ 技術棧

- **框架**: Vue 3 (Composition API)
- **建構工具**: Vite
- **樣式**: Tailwind CSS v3
- **郵件服務**: EmailJS
- **字體**: Google Fonts (Inter)
- **部署**: Vercel / Netlify

## 📦 專案結構

```
tesla-insurance/
├── public/              # 靜態資源
├── src/
│   ├── components/      # Vue 元件
│   │   ├── HeroSection.vue         # 首頁區塊
│   │   ├── FeaturesSection.vue     # 服務特色
│   │   ├── CalculatorSection.vue   # 保險計算器
│   │   ├── ContactForm.vue         # 聯絡表單
│   │   └── FooterSection.vue       # 頁尾
│   ├── App.vue          # 主應用程式
│   ├── main.js          # 入口文件
│   └── style.css        # 全域樣式
├── .env.example         # 環境變數範例
├── tailwind.config.js   # Tailwind 配置
├── postcss.config.js    # PostCSS 配置
├── vite.config.js       # Vite 配置
└── package.json         # 專案依賴
```

## 🚀 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 設定環境變數 (選擇性)

如果要使用 EmailJS 功能，請複製 `.env.example` 並重新命名為 `.env`，然後填入您的 EmailJS 憑證：

```bash
cp .env.example .env
```

編輯 `.env` 文件：

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

#### 如何取得 EmailJS 憑證：

1. 前往 [EmailJS 官網](https://www.emailjs.com/) 註冊帳號
2. 建立 Email Service（如 Gmail）
3. 建立 Email Template
4. 從 Dashboard 複製 Service ID、Template ID 和 Public Key

**注意**: 如果不設定 EmailJS，表單仍可正常運作，但會在 console 記錄資料而不會實際發送郵件。

### 3. 啟動開發伺服器

```bash
npm run dev
```

開啟瀏覽器訪問 `http://localhost:5173/`

### 4. 建構生產版本

```bash
npm run build
```

建構完成的檔案會在 `dist/` 目錄中。

### 5. 預覽生產版本

```bash
npm run preview
```

## 🌐 部署到 Vercel

### 方法一：使用 Vercel CLI（推薦）

1. 安裝 Vercel CLI（如果還沒安裝）：

```bash
npm install -g vercel
```

2. 登入 Vercel：

```bash
vercel login
```

3. 部署專案：

```bash
vercel --prod
```

4. 按照提示完成部署流程

### 方法二：使用 Vercel Dashboard

1. 前往 [Vercel 官網](https://vercel.com/) 註冊並登入
2. 點擊 "Add New Project"
3. 連結您的 GitHub 倉庫（需先將專案推送到 GitHub）
4. Vercel 會自動偵測 Vite 專案並使用正確的建構設定
5. 設定環境變數（如果使用 EmailJS）：
   - 在 Project Settings → Environment Variables 中新增：
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
6. 點擊 "Deploy"

### 方法三：使用 Netlify

1. 前往 [Netlify 官網](https://www.netlify.com/) 註冊並登入
2. 點擊 "Add new site" → "Import an existing project"
3. 連結您的 GitHub 倉庫
4. 建構設定：
   - Build command: `npm run build`
   - Publish directory: `dist`
5. 設定環境變數（與 Vercel 相同）
6. 點擊 "Deploy site"

## 📝 如何修改內容

### 修改車款圖片

編輯 `src/components/CalculatorSection.vue`，找到 `carModels` 陣列：

```javascript
const carModels = [
  {
    name: 'Model 3',
    type: '入門轎車',
    image: 'YOUR_IMAGE_URL_HERE' // 替換圖片 URL
  },
  // ...
]
```

### 修改配色

編輯 `tailwind.config.js`：

```javascript
theme: {
  extend: {
    colors: {
      'tesla-red': '#E82127',    // 特斯拉紅
      'tesla-dark': '#171A20',   // 深色背景
      'tesla-gray': '#393C41',   // 灰色
    },
  },
}
```

### 修改服務特色

編輯 `src/components/FeaturesSection.vue`，更新 `features` 陣列。

### 修改聯絡資訊

編輯 `src/components/FooterSection.vue` 中的聯絡資訊。

## 🎨 元件說明

### HeroSection.vue
- 首頁大標題區塊
- 包含 CTA 按鈕和滾動指示器
- 自動播放淡入動畫

### FeaturesSection.vue
- 服務特色展示
- 4 個特色卡片
- 滾動觸發進入動畫
- Hover 效果

### CalculatorSection.vue
- 保險方案計算器
- 車型卡片選擇
- 年份、購入時間選擇
- 預算滑桿 (NT$ 20,000 - 100,000)
- 即時顯示推薦方案

### ContactForm.vue
- 聯絡表單
- 表單驗證（姓名、電話、Email）
- EmailJS 整合
- Loading 動畫
- 成功訊息顯示

### FooterSection.vue
- 公司資訊
- 快速連結
- 聯絡資訊
- 社群媒體連結

## 🔧 進階配置

### 自訂 Tailwind CSS

編輯 `tailwind.config.js` 來新增自訂樣式、顏色、字體等。

### 新增頁面或路由

本專案為單頁應用。如需多頁面，可安裝 Vue Router：

```bash
npm install vue-router@4
```

### 整合其他服務

- **Google Analytics**: 在 `index.html` 中加入追蹤碼
- **Google Tag Manager**: 同上
- **Chatbot**: 可整合 Intercom、Tawk.to 等服務

## 🐛 疑難排解

### 問題：npm run dev 失敗

確保 Node.js 版本 >= 16.0.0：

```bash
node -v
```

### 問題：Tailwind 樣式未生效

1. 檢查 `tailwind.config.js` 的 content 路徑是否正確
2. 確認 `src/style.css` 中有引入 Tailwind 指令
3. 重新啟動開發伺服器

### 問題：EmailJS 無法發送郵件

1. 確認 `.env` 文件中的憑證是否正確
2. 檢查 EmailJS Dashboard 中的 Service 和 Template 是否已啟用
3. 查看瀏覽器 Console 是否有錯誤訊息

### 問題：部署後圖片無法顯示

確保所有圖片 URL 使用絕對路徑（https://...），而非相對路徑。

## 📄 授權

本專案為示範專案，可自由使用和修改。

## 🤝 貢獻

歡迎提出 Issue 或 Pull Request！

## 📧 聯絡方式

如有問題或建議，請聯繫：

- Email: service@tesla-insurance.com
- 電話: 0800-123-456

---

🤖 使用 [Claude Code](https://claude.com/claude-code) 建立

Made with ❤️ by Tesla Insurance Team

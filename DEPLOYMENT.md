# 部署指南 (Deployment Guide)

本文件提供詳細的部署步驟，幫助您將 Tesla Insurance 網站部署上線。

## 🎯 部署前檢查清單

- ✅ 專案可以成功建構 (`npm run build`)
- ✅ 本地開發環境運行正常 (`npm run dev`)
- ✅ Git 倉庫已初始化並提交所有變更
- ✅ (選擇性) EmailJS 憑證已設定

## 📦 方法一：Vercel 部署（推薦）

Vercel 是最簡單快速的部署方式，專為前端專案優化。

### 使用 Vercel CLI

1. **安裝 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登入 Vercel**
   ```bash
   vercel login
   ```
   選擇您偏好的登入方式（GitHub、GitLab、Bitbucket 或 Email）

3. **初始化專案**
   在專案目錄中執行：
   ```bash
   vercel
   ```

   按照提示回答問題：
   - Set up and deploy? `Y`
   - Which scope? 選擇您的帳號
   - Link to existing project? `N`
   - What's your project's name? `tesla-insurance` (或自訂)
   - In which directory is your code located? `./`
   - Want to override the settings? `N`

4. **部署到生產環境**
   ```bash
   vercel --prod
   ```

5. **設定環境變數（如使用 EmailJS）**

   在 Vercel Dashboard 中：
   - 前往專案設定 → Environment Variables
   - 新增以下變數：
     - `VITE_EMAILJS_SERVICE_ID`
     - `VITE_EMAILJS_TEMPLATE_ID`
     - `VITE_EMAILJS_PUBLIC_KEY`
   - 重新部署專案

6. **完成！**

   Vercel 會提供一個 URL，例如：
   - 預覽：`tesla-insurance-xxx.vercel.app`
   - 生產：`tesla-insurance.vercel.app`

### 使用 Vercel Dashboard (GUI)

1. **前往 Vercel 官網**

   訪問 [vercel.com](https://vercel.com) 並登入

2. **上傳專案到 GitHub**

   如果尚未上傳，執行：
   ```bash
   # 在 GitHub 建立新倉庫後
   git remote add origin https://github.com/YOUR_USERNAME/tesla-insurance.git
   git branch -M main
   git push -u origin main
   ```

3. **匯入專案**
   - 點擊 "Add New Project"
   - 選擇 "Import Git Repository"
   - 選擇您的 `tesla-insurance` 倉庫
   - Vercel 會自動偵測 Vite 設定

4. **配置專案**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. **設定環境變數**（同上）

6. **點擊 Deploy**

7. **等待部署完成**

   通常需要 1-3 分鐘

## 🌟 方法二：Netlify 部署

Netlify 也是優秀的部署平台，提供簡單的 GUI 和 CLI。

### 使用 Netlify CLI

1. **安裝 Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **登入 Netlify**
   ```bash
   netlify login
   ```

3. **初始化並部署**
   ```bash
   netlify init
   ```

   回答問題：
   - Create & configure a new site? `Yes`
   - Team: 選擇您的團隊
   - Site name: `tesla-insurance` (或自訂)
   - Build command: `npm run build`
   - Directory to deploy: `dist`

4. **部署**
   ```bash
   netlify deploy --prod
   ```

5. **設定環境變數**
   ```bash
   netlify env:set VITE_EMAILJS_SERVICE_ID "your_value"
   netlify env:set VITE_EMAILJS_TEMPLATE_ID "your_value"
   netlify env:set VITE_EMAILJS_PUBLIC_KEY "your_value"
   ```

### 使用 Netlify Dashboard

1. **前往 Netlify 官網**

   訪問 [netlify.com](https://www.netlify.com) 並登入

2. **拖放部署（最簡單）**
   - 在本地執行 `npm run build`
   - 將 `dist` 資料夾直接拖放到 Netlify Dashboard
   - 完成！

3. **從 Git 部署（推薦）**
   - 點擊 "Add new site" → "Import an existing project"
   - 選擇 Git provider（GitHub、GitLab、Bitbucket）
   - 授權並選擇倉庫
   - 配置建構設定：
     - Build command: `npm run build`
     - Publish directory: `dist`
   - 點擊 "Deploy site"

4. **設定環境變數**
   - Site settings → Environment variables
   - 新增 EmailJS 變數
   - 觸發重新部署

## 🔧 方法三：GitHub Pages

適合靜態網站，完全免費。

1. **安裝 gh-pages**
   ```bash
   npm install -D gh-pages
   ```

2. **修改 vite.config.js**
   ```javascript
   export default defineConfig({
     plugins: [vue()],
     base: '/tesla-insurance/', // 替換為您的倉庫名稱
   })
   ```

3. **新增部署腳本到 package.json**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

4. **部署**
   ```bash
   npm run deploy
   ```

5. **在 GitHub 設定**
   - 前往倉庫 Settings → Pages
   - Source: `gh-pages` branch
   - 等待部署完成

6. **訪問網站**

   `https://YOUR_USERNAME.github.io/tesla-insurance/`

## ✅ 部署後檢查

部署完成後，請確認：

1. **網站可以正常訪問**
2. **所有圖片正常載入**
3. **滾動動畫正常運作**
4. **表單可以正常提交**（如已設定 EmailJS）
5. **響應式設計在不同裝置正常顯示**
6. **沒有 Console 錯誤**

## 🎨 自訂網域（選擇性）

### Vercel

1. 前往專案 Settings → Domains
2. 新增您的自訂網域
3. 按照 DNS 設定指示操作
4. 等待 DNS 傳播（最多 48 小時）

### Netlify

1. 前往 Domain settings
2. 新增自訂網域
3. 設定 DNS 記錄
4. 啟用 HTTPS（自動）

## 📊 效能優化建議

部署後可進行以下優化：

1. **啟用 Gzip/Brotli 壓縮**（Vercel/Netlify 預設啟用）
2. **設定 CDN**（Vercel/Netlify 自動提供）
3. **圖片優化**
   - 使用 WebP 格式
   - 適當的圖片尺寸
   - Lazy loading
4. **設定快取策略**
5. **監控效能**
   - Google PageSpeed Insights
   - Lighthouse

## 🔄 持續部署 (CI/CD)

一旦設定完成，每次推送到 GitHub 主分支時，網站會自動重新部署：

```bash
git add .
git commit -m "Update content"
git push origin main
```

Vercel/Netlify 會自動：
1. 偵測變更
2. 執行建構
3. 部署新版本
4. 更新 URL

## 🆘 常見問題

### 部署失敗

1. 檢查建構日誌
2. 確認所有依賴已安裝
3. 確認 Node.js 版本兼容

### 環境變數未生效

1. 確認變數名稱正確（必須以 `VITE_` 開頭）
2. 重新部署專案
3. 清除瀏覽器快取

### 圖片 404 錯誤

1. 確認圖片 URL 使用絕對路徑
2. 檢查圖片是否可公開訪問

### CSS 樣式錯亂

1. 檢查 Tailwind 配置
2. 確認建構過程無錯誤
3. 清除瀏覽器快取

## 📞 需要協助？

- Vercel 文件: https://vercel.com/docs
- Netlify 文件: https://docs.netlify.com
- Vite 文件: https://vitejs.dev/guide/static-deploy.html

---

祝您部署順利！🚀

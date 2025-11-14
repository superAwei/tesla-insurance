# Tesla 保險網站 - 部署指南

## 🎉 您的代碼已準備就緒！

所有更改已提交到 Git，現在可以部署了。

---

## 🚀 部署方式（推薦：方式一）

### 方式一：使用 Vercel CLI（最快速）

#### 步驟 1：登入 Vercel
```bash
vercel login
```
這會開啟瀏覽器讓您登入/註冊 Vercel 帳號（免費）

#### 步驟 2：部署到生產環境
```bash
vercel --prod
```

#### 步驟 3：獲取網址
部署完成後，Vercel 會提供一個網址，例如：
```
https://tesla-insurance-xxx.vercel.app
```

---

### 方式二：使用 Vercel Web UI（推薦給初次使用者）

#### 步驟 1：訪問 Vercel
前往：https://vercel.com

#### 步驟 2：註冊/登入
使用 GitHub、GitLab 或 Email 註冊（完全免費）

#### 步驟 3：導入專案
1. 點擊 "Add New..." → "Project"
2. 選擇 "Import Git Repository"
3. 如果還沒有 GitHub repository：
   - 點擊 "Import from CLI"
   - 在終端機執行：`vercel`
   - 按照提示操作

#### 步驟 4：配置（通常自動檢測）
- Framework Preset: **Vite**
- Root Directory: `.`
- Build Command: `npm run build`
- Output Directory: `dist`

#### 步驟 5：點擊 "Deploy"
等待 2-3 分鐘，完成！

---

## 📦 後續更新流程

每次修改網站後：

```bash
# 1. 提交更改
git add .
git commit -m "描述您的更改"

# 2. 部署到 Vercel
vercel --prod
```

**或者**：如果您連接了 GitHub，只需要：
```bash
git push
```
Vercel 會自動部署！

---

## ✨ Vercel 免費方案包含

✅ **無限部署次數**
✅ **自動 HTTPS**
✅ **全球 CDN 加速**
✅ **自動部署（連接 Git 後）**
✅ **環境變數管理**
✅ **自定義網域（可選）**

---

## 🔗 連接到 GitHub（可選，但推薦）

### 為什麼要連接 GitHub？
- 每次 `git push` 自動部署
- 保留完整版本歷史
- 團隊協作更方便

### 如何連接？

#### 步驟 1：在 GitHub 創建新 repository
訪問：https://github.com/new

#### 步驟 2：連接本地專案
```bash
git remote add origin https://github.com/您的用戶名/tesla-insurance.git
git branch -M main
git push -u origin main
```

#### 步驟 3：在 Vercel 連接 GitHub
1. 前往 Vercel Dashboard
2. 選擇您的專案
3. Settings → Git
4. 連接 GitHub repository

---

## 🆘 常見問題

### Q: 部署失敗怎麼辦？
A: 檢查以下項目：
- 確保 `package.json` 正確
- 確保所有依賴已安裝（`npm install`）
- 查看 Vercel 的錯誤訊息

### Q: 如何自定義網域？
A: 在 Vercel Dashboard → Settings → Domains 添加

### Q: 如何查看部署歷史？
A: Vercel Dashboard → Deployments

---

## 📧 需要幫助？

- Vercel 文檔：https://vercel.com/docs
- Vite 文檔：https://vitejs.dev

---

**🎊 恭喜！您的 Tesla 保險網站即將上線！**

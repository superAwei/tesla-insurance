# 快速啟動指南 ⚡

只需 3 分鐘，立即啟動您的 Tesla Insurance 網站！

## 📋 前置需求

- Node.js 16.0 或更高版本
- npm 或 yarn

## 🚀 三步驟啟動

### 1️⃣ 安裝依賴

```bash
npm install
```

### 2️⃣ 啟動開發伺服器

```bash
npm run dev
```

### 3️⃣ 開啟瀏覽器

訪問 `http://localhost:5173/`

就這麼簡單！🎉

## 📝 可選：設定 EmailJS

如果想啟用郵件發送功能：

1. 複製環境變數範例：
   ```bash
   cp .env.example .env
   ```

2. 編輯 `.env` 填入您的 EmailJS 憑證

3. 重啟開發伺服器

## 🌐 部署到線上

### 最快方式：Vercel

```bash
# 安裝 Vercel CLI
npm install -g vercel

# 登入
vercel login

# 部署
vercel --prod
```

完成！您會得到一個線上網址 🎊

詳細部署說明請參考 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📚 下一步

- 閱讀 [README.md](./README.md) 了解完整功能
- 查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 學習部署方式
- 開始自訂您的網站內容！

## 🆘 遇到問題？

### 開發伺服器無法啟動

```bash
# 清除 node_modules 重新安裝
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### 建構失敗

```bash
# 確認 Node.js 版本
node -v  # 應該 >= 16.0.0

# 重新建構
npm run build
```

### 需要更多協助？

查看 README.md 的疑難排解章節

---

祝您使用愉快！✨

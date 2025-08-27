# app_baldr - 網頁安全漏洞示範專案

## 專案簡介

app_baldr 是用於向同事快速展示網頁安全漏洞的示範專案。

## 技術堆疊

### 前端技術

React, TypeScript, React Router, Axios

### 後端技術

C# .NET 8, Entity Framework Core, PostgreSQL

### 開發工具

Vite, ESLint

## 功能概述

本專案展示以下常見的網頁安全漏洞：

1. **SQL 注入 (SQLi)**

   - 示範未經處理的 SQL 查詢如何被利用
   - 展示使用參數化查詢等方法防止 SQL 注入

2. **跨站腳本攻擊 (XSS)**

   - 展示儲存型、反射型和 DOM 型 XSS 漏洞
   - 提供輸入驗證和輸出編碼的正確防護方法

## 如何使用

### 環境需求

- Node.js (v18+)
- .NET 8 SDK
- PostgreSQL

### 安裝步驟

1. 克隆專案到本地：

   ```
   git clone [專案URL]
   cd app_baldr
   ```

2. 設置後端：

   ```powershell
   cd backend
   dotnet restore
   # 更新 appsettings.json 中的資料庫連線字串
   dotnet ef database update
   dotnet run
   ```

3. 設置前端：

   ```powershell
   cd frontend
   pnpm install
   pnpm dev
   ```

4. 開啟瀏覽器訪問：
   ```
   http://localhost:XXXX
   ```

### 使用指南

專案中每個漏洞示範都有兩個版本：

- **不安全版本**：展示漏洞的存在和利用方式
- **安全版本**：展示正確的防護實作

使用者可以透過專案介面選擇不同的漏洞類型，分別查看不安全和安全的實作方式，並嘗試自行進行漏洞測試。

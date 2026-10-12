# 部署说明

本项目是纯静态网站，可一键部署到任意静态托管平台。

## 方式一：GitHub Pages（推荐，免费且自带自动更新）

1. 将本项目推送到 GitHub 仓库
2. 仓库 → **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**
3. 推送后 `.github/workflows/update-deploy.yml` 会自动：
   - 每天 09:00（北京时间）抓取最新政策数据
   - 更新 `data/data.js` 并提交
   - 部署到 GitHub Pages
4. 访问地址：`https://<你的用户名>.github.io/<仓库名>/`

## 方式二：Vercel / Netlify（秒级部署）

- **Vercel**：在 Vercel 导入仓库，Framework Preset 选 `Other`，Build Command 留空，Output Directory 填 `.`
- **Netlify**：拖拽项目文件夹到 Netlify 即可

## 本地预览

```bash
npm run serve
# 或
npx serve .
```

## 自动更新机制

`scripts/update-data.js` 会抓取国家发改委、能源局等公开数据源，匹配价差/利用率等关键指标，写入 `data/update-log.json` 供人工复核，同时更新数据时点。如需调整数据源，编辑脚本中的 `SOURCES` 数组。

# 塑料产品调研数据库 / Plastic Products Research Database

此文件夹包含三个类别的塑料产品调研数据，供 ChinaPlast Global 网站选品使用。

## 文件说明

| 文件 | 内容 | 条目数 |
|------|------|--------|
| `raw-materials.json` | 塑料原料（聚合物/树脂） | 15 |
| `finished-products.json` | 塑料制成品 | 15 |
| `additives.json` | 塑料添加剂 | 15 |

## 数据结构

每个产品条目包含以下字段：
- `rank` — 排名
- `name` / `nameZh` — 英文/中文名称
- `category` — 分类标签
- `description` — 产品描述
- `specs` — 规格参数（密度、熔指、抗拉强度等）
- `applications` — 典型用途
- `priceHint` — 价格区间参考
- `imageKeywords` — 建议的图片搜索关键词

## 图片获取说明

由于网页爬取图片涉及版权和反爬机制限制，本次调研未直接批量下载图片。
建议通过以下方式获取配图：
1. 使用 `imageKeywords` 在 **Unsplash / Pexels / Pixabay** 搜索免费商用图
2. 在 **Alibaba / Made-in-China** 用关键词搜索并索取供应商白底图
3. 使用 AI 绘图工具（Midjourney/DALL·E）根据描述生成专业产品图

## 下一步操作

打开 `raw-materials.json`、`finished-products.json`、`additives.json`，挑选中意的产品条目，将其内容复制到网站后台 `/admin` 的 Add Product 表单中即可上架。

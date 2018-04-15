# read-vue
WebApp小说阅读器

## 前言

项目中的api均来自追书神器，纯属共享学习之用。

各类排行榜以及小说基本信息: http://api.zhuishushenqi.com

小说章节内容: http://http://chapterup.zhuishushenqi.com/chapter  

有参考起点中文网app、起点中文网web端，再加上自己的一些想法搞出来的。
项目中的小图标使用的是[阿里巴巴的矢量图标库Iconfont](http://www.iconfont.cn/)。

# 技术栈
Vue2 + vuex + vue-router + webpack + ES6 + axios + stylus

## 项目运行

git clone https://github.com/WebXiaoMing/read-vue

cd read-vue

npm install

npm run dev（本地运行 访问：http://localhost:8080）

npm run build （部署上线 生成的dist文件夹放到服务器中即可：需要使用nginx配置代理）

## 预览地址
此项目只是做学习之用，只能阅读免费章节，如需追vip章节请到正版网站去。

电脑端请用Chrome浏览器开启开发者模式
[在线预览地址](http://47.106.148.2)

## 实现功能

- [x] 小说书架
- [x] 分类查询
- [x] 排行榜
- [x] 上拉加载 下拉刷新
- [x] 记录阅读历史位置
- [x] 小说详情
- [x] 小说评论社区
- [x] 章节倒序
- [x] 阅读历史记录（记录阅读章节）
- [x] 阅读夜间模式
- [x] 阅读界面设置(字体大小自适应行高及阅读背景色)
- [x] 保存阅读界面设置
- [x] 组件切换动效

## TODO

- [ ] 个人中心
- [ ] 仿真翻页




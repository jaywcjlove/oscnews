<p align="center">
  <a href="http://www.oschina.net/">
    <img height="240" src="img/oschina.svg?sanitize=true">
  </a>
</p>

这是一个Chrome插件，在新标签页查看开源中国[软件更新资讯](http://www.oschina.net/news/project)，GitHub 趋势榜、linux 命令索引，浏览历史记录，时钟页面。

<div align="center">
  <img src="./img/osc-news.png"> 
  <img src="./img/osc-news2.png"> 
  <img src="./img/osc-news3.png"> 
  <img src="./img/osc-news4.png"> 
  <img src="./img/osc-news5.png"> 
</div>

## 商店安装

[Chrome 网上商店](https://chrome.google.com/webstore/detail/oscnews/iheapfheanfjcemgneblljhaebonakbg) 搜索 `oscnews` 安装，或者直接下载 [crx 文件](https://github.com/jaywcjlove/oscnews/releases) 安装，打开 [chrome://extensions](chrome://extensions/) 将 crx 拖拽到扩展列表中安装。

[![](http://jaywcjlove.github.io/sb/download/chrome-web-store.svg)](https://chrome.google.com/webstore/detail/oscnews/iheapfheanfjcemgneblljhaebonakbg)


> [开源中国下载 oscnews.crx 文件](https://gitee.com/jaywcjlove/oscnews/releases)  
> [Github下载 oscnews.crx 文件](https://github.com/jaywcjlove/oscnews/releases)  

## 开发模式安装

下载源文件

```bash
git clone https://github.com/jaywcjlove/oscnews.git --depth=1 --recurse-submodules
# 开源中国仓库
git clone https://gitee.com/jaywcjlove/oscnews.git --depth=1 --recurse-submodules
```

安装依赖

```bash
npm install 
```

编译源码

```bash
npm run build
```

下载编译之后，在 Chrome 浏览器地址栏输入 [chrome://extensions](chrome://extensions/)  打开插件界面，通过下图方式，将生成的 `oscnews` 目录，导入到插件列表中。

![](./img/osc-extensions.png)


应用商店生成 crx 文件

```diff
- https://clients2.google.com/service/update2/crx?response=redirect&x=id%3D<这里是扩展ID>%26uc&prodversion=32
+ https://clients2.google.com/service/update2/crx?response=redirect&x=id%3Diheapfheanfjcemgneblljhaebonakbg%26uc&prodversion=32
```

## TODO

- [x] 浏览历史记录
  - [ ] 浏览历史选择今天、周、全部
- [x] 开发文档导航
  - [ ] 开发文档导航搜索过滤
  - [x] ~~添加删除文档？~~
  - [x] 文档分类前端（前端、后端、工具）
- [x] Linux命令检索，集成 [linux-command](https://github.com/jaywcjlove/linux-command)
- [ ] 开源中国新闻
  - [x] 宽度拖拽设置
  - [ ] 下拉翻页
- [ ] 添加搜索引擎页面
- [x] Github 趋势榜天、周、月统计切换，语言切换
- [ ] 常用网站导航
- [ ] Github
  - [ ] Github 登录，浏览自己项目
  - [ ] Github Start 管理
- [ ] Gitlab 登录，相关功能
- [ ] 集成 [octotree](https://github.com/buunguyen/octotree) 部分功能
- [ ] 插件官方网站
- [ ] 密码管理器
- [ ] 空页面，天气日期展示
- [ ] RSS订阅功能
- [ ] 提醒事项
  - [ ] 记录代办事项
  - [ ] Chrome通知
- [ ] 设置功能
  - [ ] 设置是否替换新标签页显示
  - [ ] 设置URL是否在新的标签页打开，
  - [ ] 菜单配置
  - [ ] 清空历史
  - [ ] 分享应用到微博
- [ ] 兼容其它浏览器
  - [ ] 兼容360急速浏览器
  - [ ] 兼容Firefox浏览器
- [x] 配置存储使用 [chrome.storage](https://developer.chrome.com/apps/storage) 替代

## License

The MIT License (MIT)
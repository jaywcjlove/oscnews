<p align="center">
  <a href="http://www.oschina.net/">
    <img height="240" src="img/oschina.svg?sanitize=true">
  </a>
</p>

[开源中国](http://www.oschina.net/) Chrome 插件，查看开源中国[软件更新资讯](http://www.oschina.net/news/project)，在每次 Chrome 浏览器新选项卡页面，展示该内容，同时还展示 GitHub [趋势榜](http://github.com/trending)。


<div align="center">
  <img src="./img/osc-news.png"> 
</div>

## 商店安装

[Chrome 网上商店](https://chrome.google.com/webstore/detail/oscnews/iheapfheanfjcemgneblljhaebonakbg) 搜索 `oscnews` 安装，或者直接下载 crx 文件安装，打开 [chrome://extensions](chrome://extensions/) 将 crx 拖拽到扩展列表中安装。

## 开发模式安装

下载源文件

```bash
git clone https://github.com/jaywcjlove/oscnews.git --depth=1
# 开源中国仓库
git clone https://gitee.com/jaywcjlove/oscnews.git --depth=1
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
# byshop

## 项目设置(安装依赖包)
```
yarn install / npm install
```

### 编译并重新加载以进行开发(项目热启动)
```
yarn serve / npm run serve
```

### 为生产而编译和缩小(项目编译压缩)
```
yarn build / npm run build
```

### Lints和fixes文件(项目打包)
```
yarn lint / npm run lint
```

### shop-server文件夹
1. 后台文件夹（需要npm install 安装依赖包）
   1. 启动前需要修改modules文件下的 db.js && pool.js文件内配置项
   2. 将后台文件夹根目录shop.sql文件添加到本地数据库
   3. 需要跨域修改 “ 项目 ” 根目录下的Vue.config.js文件内配置

### api文件夹封装数据请求文件

### common文件夹封装全局导入components/common内的组件配置项

### components公共组件 / common 全局组件

###  router 文件夹 配置路由模块

###  store Vuex 状态管理模式模块

### views 路由组件.vue文件夹

### App 项目入口文件

### Home 包含头部组件及路由出口

### Index 一级分类导航条index文件夹内路由出口

### Login 登录页面路由组件

### Register 注册页面路由组件

### Search 搜索结果页面路由组件

### ShoppongCart 购物车页面路由组件

### ProductDetails 商品详情数据渲染结果页面路由组件

### index文件夹
1. Rotation 首页包含轮播组件渲染全部商品列表页面路由组件
2. Type 首页一级分类商品列表渲染页面路由组件


### 自定义配置
See [Configuration Reference](https://cli.vuejs.org/config/).

> webpack 4.x | babel-loader 7.x | babel 6.x

# 安装

```shell
npm i -g ynw-cli
```

# 命令行参数

- `ynw init=vue` : 配置文件
- `ynw build=index env=[dev/pro/hot]` : 构建 + 开发环境/生成环境/热更新
- `ynw v` 版本号
- `ynw template=vue` 下载模板
- `ynw cros` : 打开可以跨域的 Chrome
- `ynw sprite` : 生成雪碧图(ynw.config.gulp 选项设置 src/dist)
- `ynw dll` : 生成 dll 库 引用(ynw.config.dll 选项设置 modules/dist)

### 构建项目

```shell
ynw init=vue
cnpm install
ynw build=app
```

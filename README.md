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

## 约定

- 每个项目的 style 文件夹下的 `var.scss` 文件为 scss 全局变量(无需引入)
- 每个项目的 style 文件夹下的 `theme.json` 文件为 antd 主题文件(无需引入)

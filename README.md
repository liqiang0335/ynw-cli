# 安装

> 支持 vue 和 react 单个项目的多页面打包方式

```shell
npm i -g ynw-cli
```

# 命令行参数

- `ynw init=[vue/react]` : 配置文件
- `ynw build=index env=[dev/pro/hot]` : 构建 + 开发环境/生成环境/热替换
- `ynw version` 版本号
- `ynw template` 下载模板
- `ynw cros` : 打开禁用跨域选项的 Chrome

### 使用方法

```shell
# 添加配置文件
ynw init

# 在以下配置文件中设置好参数
ynw.config.js

# 构建
ynw build=app
```

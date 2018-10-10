# 安装

> 适合单个项目的多页面打包 (支持 vue 和 react )

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

> 先在(ynw.config.js)配置文件中设置好 keys 参数

```shell
# 构建 Vue项目
# 如果是第一次切换, 先安装依赖模块 (cnpm i)
ynw init=vue # 切换到 vue 配置文件
ynw build=VueApp # 构建

# 构建 React项目

ynw init=react # 切换到 react 配置文件
ynw build=ReactApp
```

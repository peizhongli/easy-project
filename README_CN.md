# @ninjaya/easy-project-cli

其他语言：[English](https://github.com/peizhongli/easy-project-cli/blob/main/README.md) | 简体中文

本工具用于生成项目初始化目录以及组件目录（支持的模板有react-ts | react| vue-ts | vue）

## 安装

```bash
$ npm install @ninjaya/easy-project-cli -g
```

## 命令

### mkproj init [directory]

生成项目目录

```bash
Arguments:
  # 选择要生成的目录名，用“,”分割 (默认目录为 assets | components | pages | hooks | service | apis | utils | router)
  [directory]
```
#### 使用

```bash
# 生成默认目录 (assets | components | pages | hooks | service | apis | utils | router)
$ mkproj init
# 生成指定目录
$ mkproj init assets,components,pages
```



### mkproj create [options] <component>

创建组件目录（支持的模板有react-ts | react| vue-ts | vue）

```bash
$ mkproj create [options] <component>
```

```bash
Arguments: 
  # 定义组件名
  <component>

Options: 
  # 模板类型: react-ts | react | vue-ts | vue (default: react-ts)
  -t, --template <type>
```

#### 使用
```bash
# 默认生成react-ts模板的组件目录
$ mkproj create topBanner
# 生成指定模板的组件目录
$ mkproj create topBanner -t vue-ts
```

### mkproj config [options] [directory]

增量重写tsconfig.json的别名，重写vite.config（主要是配置alias和baseUrl）

```bash
$ mkproj config [options] [directory]
```

```bash
Arguments: 
  # 设置要配置别名的目录，用“,”分隔（默认为assets | components | pages | hooks | service | apis | utils）
  <directory>

Options: 
  # 模板类型: react-ts | react | vue-ts | vue (default: react-ts)
  -t, --template <type>
```
#### 使用
```bash
# 默认react-ts模板重写tsconfig.json和vite.config
$ mkproj config
# 重写指定模板tsconfig.json和vite.config
$ mkproj config -t vue-ts
# 重写指定目录别名
$ mkproj config assets,pages,apis
```

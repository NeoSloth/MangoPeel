# MangoPeel Neo

[![GitHub downloads](https://img.shields.io/github/downloads/NeoSloth/MangoPeel/total?color=green&logo=github)](https://github.com/NeoSloth/MangoPeel/releases)
[![GitHub forks](https://img.shields.io/github/forks/NeoSloth/MangoPeel?color=green&logo=github)](https://github.com/NeoSloth/MangoPeel/forks)

[简体中文](README_CN.md) | [English](README.md) | [日本語](README_JA.md)

MangoPeel Neo 是一款独立维护的 Steam Deck 插件，适用于 [Decky Loader](https://github.com/SteamDeckHomebrew/decky-loader)。它允许用户配置自己喜欢的 MangoApp 样式，覆盖 Steam 原有的五档样式。插件会查找 MangoApp 配置文件，并写入通过快捷访问菜单 UI 设置的各项参数。

## 关于此分支项目

此仓库是原始 [Gawah/MangoPeel](https://github.com/Gawah/MangoPeel) 项目的分支版本。

- 原始项目及版权所有者：Gawah
- 原始软件包作者：yxx
- MangoPeel Neo 的维护及修改：NeoSloth
- 许可证：[BSD 3-Clause License](LICENSE)

此分支版本由 NeoSloth 独立维护，并不代表获得了原作者的认可或推荐。

## 安装方法

1. 安装 [Decky Loader](https://github.com/SteamDeckHomebrew/decky-loader)，并在其设置中启用开发者模式。
2. 打开 [MangoPeel Neo 的最新版本页面](https://github.com/NeoSloth/MangoPeel/releases/latest)，从版本附件中下载 `MangoPeel-Neo.zip`。请勿下载 GitHub 自动生成的源代码压缩包。
3. 打开 Decky Loader 的开发者页面，选择从 ZIP 文件安装插件的选项。
4. 选择已下载的 `MangoPeel-Neo.zip` 文件并完成安装。

> [!IMPORTANT]
> 启用 MangoPeel Neo 前，请先禁用原始 MangoPeel。两个插件都会修改同一个 MangoApp 配置文件，因此不应同时启用。MangoPeel Neo 首次启动时，仅在 Neo 设置为空的情况下，从旧 MangoPeel 设置目录复制兼容设置。旧设置不会被删除或修改。

## 插件效果截图

![](assets/20230527214708_1.jpg)
![](assets/20230527214713_1.jpg)

## 已知问题
- 原始 MangoPeel 与 MangoPeel Neo 会监视并覆盖同一个 MangoApp 配置文件，因此请勿同时启用。
- cpu占用率过高时，可能导致pyinotify的监听失效，此时切换steam样式可能不会替换为自定义的样式，只需在cpu占用率正常时重新切换一次steam样式即可。
- mangoapp的字体比例调整差距过大时，会导致布局间隔出现异常，此为[mangohud](https://github.com/flightlessmango/MangoHud)的bug，等待修复即可。
- 部分参数例如颜色，圆角大小等，在mangohud里面可以实时配置，但是在mangoapp启动后再修改并不会生效，因此目前还未加入到快捷菜单前端中，等待[mangohud](https://github.com/flightlessmango/MangoHud)修复，或者后续有其他方式可以使其生效再加入到配置列表。

## 未来目标

- [x] 自定义文本样式
- [ ] 加入各个颜色修改参数
- [ ] 允许自定义添加参数

## 开发指南

### 前置要求

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

当前项目没有指定 Node.js 和 pnpm 的具体版本。

### 从源代码构建

```sh
git clone https://github.com/NeoSloth/MangoPeel.git
cd MangoPeel
pnpm install
pnpm run build
```

编译后的前端文件会输出到 `dist/`。如需在编辑前端代码时监视变更并自动重新构建，请运行：

```sh
pnpm run watch
```

MangoPeel Neo 还包含位于 `main.py` 中的 Python 后端。安装插件后，Decky Loader 会提供运行时所需的 `decky` 模块。

### 构建可安装的软件包

要在本地生成可安装的软件包，请运行：

```sh
npm run package
```

此命令会重新构建前端，并在仓库根目录生成 `MangoPeel-Neo.zip` 和 `MangoPeel-Neo.tar.gz`。直接运行 `bash build.sh` 也会产生相同的结果。

`.vscode/` 目录中还包含 Decky CLI 辅助脚本和 VS Code 任务。使用 Decky CLI 可以通过以下命令构建可安装的插件包：

```sh
./cli/decky plugin build "$(pwd)"
```

下文介绍的 GitHub Actions 工作流也会使用同一个本地打包脚本。

## GitHub Actions

[Release 工作流](.github/workflows/release.yml)会在以下情况下运行：

- 通过 `workflow_dispatch` 手动触发。
- 将更改推送到 `main` 或 `dev` 分支。
- 推送匹配 `v*.*.*` 的标签。

该工作流会执行以下步骤：

1. 在 Arch Linux 容器中执行构建。
2. 安装 pnpm 和项目依赖项。
3. 将 `@decky/ui` 和 `@decky/api` 更新到最新版本。
4. 运行 `npm run package`，完成前端构建和插件打包。
5. 验证 `MangoPeel-Neo.zip` 和 `MangoPeel-Neo.tar.gz` 的内容。
6. 将这两个软件包作为名为 `MangoPeel-Neo` 的 GitHub Actions 构建产物上传。

对于普通分支推送和手动运行，可以从工作流运行页面的 **Artifacts** 区域下载软件包。推送版本标签时，`publish` 作业还会创建包含自动生成发行说明的 GitHub Release，并附加这两个软件包。包含 `pre` 或 `.rc` 的标签会作为预发布版本发布。

## issues
   遇到任何问题，请在[issues](https://github.com/NeoSloth/MangoPeel/issues)提交
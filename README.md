# MangoPeel

[![GitHub downloads](https://img.shields.io/github/downloads/NeoSloth/MangoPeel/total?color=green&logo=github)](https://github.com/NeoSloth/MangoPeel/releases)
[![GitHub forks](https://img.shields.io/github/forks/NeoSloth/MangoPeel?color=green&logo=github)](https://github.com/NeoSloth/MangoPeel/forks)

[简体中文](README_CN.md) | [English](README.md) | [日本語](README_JA.md)

MangoPeel is a Steam Deck plugin used for [decky-loader](https://github.com/SteamDeckHomebrew/decky-loader). It allows users to configure their preferred MangoApp styles to override Steam's default five styles. Its functionality is based on finding the MangoApp configuration file and quickly configuring various MangoApp parameters through a shortcut menu UI, which is then written to the configuration file.

## Fork information

This repository is a fork of the original [Gawah/MangoPeel](https://github.com/Gawah/MangoPeel) project.

- Original project and copyright: Gawah
- Fork maintenance and modifications: NeoSloth
- License: [BSD 3-Clause License](LICENSE)

This fork is independently maintained and is not endorsed by the original author.

## Installation

1. Install [Decky Loader](https://github.com/SteamDeckHomebrew/decky-loader) and enable Developer Mode in its settings.
2. Open the [latest MangoPeel release](https://github.com/NeoSloth/MangoPeel/releases/latest) and download `MangoPeel.zip` from the release assets. Do not download the automatically generated source code archives.
3. Open the Developer section in Decky Loader and choose the option to install a plugin from a ZIP file.
4. Select the downloaded `MangoPeel.zip` file and complete the installation.

## Plugin effect screenshots

![](assets/20230527214708_1.jpg)
![](assets/20230527214713_1.jpg)

## Known issues
- If the CPU usage is too high, it may cause the pyinotify to stop working. At this time, switching Steam styles may not replace the custom style. Simply switch Steam styles again when the CPU usage is normal.
- If the font ratio adjustment of MangoApp is too large, it may cause abnormal layout intervals. This is a bug in [mangohud](https://github.com/flightlessmango/MangoHud) and can be fixed by waiting for a patch. 
- Some parameters, such as colors and corner radius, can be configured in real time in MangoHud, but changing them after MangoApp has started will not take effect. Therefore, they have not been added to the shortcut menu frontend yet. Waiting for [mangohud](https://github.com/flightlessmango/MangoHud) to fix this issue, or finding another way to make changes effective, before adding them to the configuration list.

## Future goals
- [x] Custom text format
- [ ] Add various color modification parameters
- [ ] Allow adding custom parameters

## Development

### Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

The project does not currently pin specific Node.js or pnpm versions.

### Build from source

```sh
git clone https://github.com/NeoSloth/MangoPeel.git
cd MangoPeel
pnpm install
pnpm run build
```

The compiled frontend files are written to `dist/`. To rebuild automatically while editing the frontend, run:

```sh
pnpm run watch
```

MangoPeel also includes a Python backend in `main.py`. Decky Loader provides the `decky` runtime module when the plugin is installed.

### Building an installable package

The repository includes Decky CLI helper scripts and VS Code tasks under `.vscode/`. The Decky CLI can build an installable plugin package with:

```sh
./cli/decky plugin build "$(pwd)"
```

Alternatively, the GitHub Actions workflow described below creates both ZIP and tar.gz packages using the same frontend build command.

## GitHub Actions

The [Release workflow](.github/workflows/release.yml) runs in the following cases:

- When triggered manually with `workflow_dispatch`.
- When changes are pushed to the `main` or `dev` branch.
- When a tag matching `v*.*.*` is pushed.

The workflow performs these steps:

1. Runs the build in an Arch Linux container.
2. Installs pnpm and the project dependencies.
3. Updates `@decky/ui` and `@decky/api` to their latest versions.
4. Runs `pnpm run build` and removes source map files from `dist/`.
5. Packages the plugin as `MangoPeel.zip` and `MangoPeel.tar.gz`.
6. Uploads both packages as a GitHub Actions artifact named `MangoPeel`.

For regular branch pushes and manual runs, the packages are available from the workflow run's **Artifacts** section. When a version tag is pushed, the `publish` job also creates a GitHub Release with automatically generated release notes and attaches both packages. Tags containing `pre` or `.rc` are published as prereleases.

## issues
   If you encounter any problems, please submit them through [issues](https://github.com/NeoSloth/MangoPeel/issues).

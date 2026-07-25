# MangoPeel

[![GitHub downloads](https://img.shields.io/github/downloads/NeoSloth/MangoPeel/total?color=green&logo=github)](https://github.com/NeoSloth/MangoPeel/releases)
[![GitHub forks](https://img.shields.io/github/forks/NeoSloth/MangoPeel?color=green&logo=github)](https://github.com/NeoSloth/MangoPeel/forks)

[简体中文](README_CN.md) | [English](README.md) | [日本語](README_JA.md)

MangoPeel は、[decky-loader](https://github.com/SteamDeckHomebrew/decky-loader) 向けの Steam Deck プラグインです。Steam に標準搭載されている 5 種類のスタイルを、好みの MangoApp スタイルで上書きできます。MangoApp の設定ファイルを検出し、ショートカットメニューの UI から各種パラメーターを素早く設定して、その内容を設定ファイルへ書き込みます。

## フォークについて

このリポジトリは、オリジナルの [Gawah/MangoPeel](https://github.com/Gawah/MangoPeel) をフォークしたものです。

- オリジナルプロジェクトおよび著作権者: Gawah
- フォークの保守および変更: NeoSloth
- ライセンス: [BSD 3-Clause License](LICENSE)

このフォークは独立して保守されており、元作者による公認を示すものではありません。

## インストール方法

1. [Decky Loader](https://github.com/SteamDeckHomebrew/decky-loader) をインストールし、設定から Developer Mode を有効にします。
2. [MangoPeel の最新リリース](https://github.com/NeoSloth/MangoPeel/releases/latest)を開き、リリースの Assets から `MangoPeel.zip` をダウンロードします。GitHub が自動生成するソースコードのアーカイブはダウンロードしないでください。
3. Decky Loader の Developer セクションを開き、ZIP ファイルからプラグインをインストールする項目を選択します。
4. ダウンロードした `MangoPeel.zip` を指定して、インストールを完了します。

## プラグインのスクリーンショット

![](assets/20230527214708_1.jpg)
![](assets/20230527214713_1.jpg)

## 既知の問題

- CPU 使用率が高すぎると、pyinotify の監視が停止する場合があります。この状態では Steam のスタイルを切り替えてもカスタムスタイルに置き換わらないことがあります。CPU 使用率が正常になった後、もう一度 Steam のスタイルを切り替えてください。
- MangoApp のフォント比率を大きく変更すると、レイアウトの間隔が不自然になる場合があります。これは [MangoHud](https://github.com/flightlessmango/MangoHud) 側の不具合であり、修正を待つ必要があります。
- 色や角丸の大きさなどの一部パラメーターは MangoHud 上でリアルタイムに設定できますが、MangoApp の起動後に変更しても反映されません。そのため、現時点ではショートカットメニューのフロントエンドに追加していません。[MangoHud](https://github.com/flightlessmango/MangoHud) 側で修正されるか、変更を反映する別の方法が見つかり次第、設定項目へ追加する予定です。

## 今後の目標

- [x] カスタムテキスト形式
- [ ] 各種カラー変更パラメーターの追加
- [ ] カスタムパラメーターの追加を許可

## 開発者向け

### 前提条件

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

現時点では、使用する Node.js と pnpm のバージョンはプロジェクトで固定されていません。

### ソースコードからビルド

```sh
git clone https://github.com/NeoSloth/MangoPeel.git
cd MangoPeel
pnpm install
pnpm run build
```

コンパイルされたフロントエンドファイルは `dist/` に出力されます。フロントエンドの編集中に変更を監視して自動的に再ビルドするには、次のコマンドを実行します。

```sh
pnpm run watch
```

MangoPeel には、`main.py` に実装された Python バックエンドも含まれています。プラグインのインストール後は、Decky Loader が実行環境の `decky` モジュールを提供します。

### インストール可能なパッケージのビルド

`.vscode/` には Decky CLI 用の補助スクリプトと VS Code タスクが含まれています。Decky CLI では、次のコマンドでインストール可能なプラグインパッケージをビルドできます。

```sh
./cli/decky plugin build "$(pwd)"
```

また、後述する GitHub Actions ワークフローでも、同じフロントエンドのビルドコマンドを使用して ZIP と tar.gz の両方を生成します。

## GitHub Actions

[Release ワークフロー](.github/workflows/release.yml)は、次の場合に実行されます。

- `workflow_dispatch` から手動で実行した場合
- `main` または `dev` ブランチへ変更を push した場合
- `v*.*.*` に一致するタグを push した場合

ワークフローでは、次の処理を実行します。

1. Arch Linux コンテナ内でビルドを実行します。
2. pnpm とプロジェクトの依存パッケージをインストールします。
3. `@decky/ui` と `@decky/api` を最新バージョンへ更新します。
4. `pnpm run build` を実行し、`dist/` からソースマップファイルを削除します。
5. プラグインを `MangoPeel.zip` と `MangoPeel.tar.gz` にパッケージ化します。
6. 両方のパッケージを、`MangoPeel` という名前の GitHub Actions artifact としてアップロードします。

通常のブランチへの push と手動実行では、ワークフロー実行画面の **Artifacts** セクションからパッケージをダウンロードできます。バージョンタグを push した場合は、`publish` ジョブが自動生成されたリリースノートを含む GitHub Release を作成し、両方のパッケージを添付します。`pre` または `.rc` を含むタグは prerelease として公開されます。

## Issues

問題が発生した場合は、[Issues](https://github.com/NeoSloth/MangoPeel/issues) から報告してください。

# MangoPeel Neo

[![GitHub downloads](https://img.shields.io/github/downloads/NeoSloth/MangoPeel/total?color=green&logo=github)](https://github.com/NeoSloth/MangoPeel/releases)
[![GitHub forks](https://img.shields.io/github/forks/NeoSloth/MangoPeel?color=green&logo=github)](https://github.com/NeoSloth/MangoPeel/forks)

[简体中文](README_CN.md) | [English](README.md) | [日本語](README_JA.md)

MangoPeel Neo は、独立して保守されている [Decky Loader](https://github.com/SteamDeckHomebrew/decky-loader) 向けの Steam Deck プラグインです。Steam に標準搭載されている 5 種類のスタイルを、好みの MangoApp スタイルで上書きできます。MangoApp の設定ファイルを検出し、クイックアクセスメニューの UI で設定した各種パラメーターを書き込みます。

## フォークについて

このリポジトリは、オリジナルの [Gawah/MangoPeel](https://github.com/Gawah/MangoPeel) をフォークしたものです。

- オリジナルプロジェクトおよび著作権者: Gawah
- オリジナルパッケージの作者: yxx
- MangoPeel Neo の保守および変更: NeoSloth
- ライセンス: [BSD 3-Clause License](LICENSE)

このフォークは独立して保守されており、元作者による公認を示すものではありません。

## インストール方法

1. [Decky Loader](https://github.com/SteamDeckHomebrew/decky-loader) をインストールし、設定から Developer Mode を有効にします。
2. [MangoPeel Neo の最新リリース](https://github.com/NeoSloth/MangoPeel/releases/latest)を開き、リリースの Assets から `MangoPeel-Neo.zip` をダウンロードします。GitHub が自動生成するソースコードのアーカイブはダウンロードしないでください。
3. Decky Loader の Developer セクションを開き、ZIP ファイルからプラグインをインストールする項目を選択します。
4. ダウンロードした `MangoPeel-Neo.zip` を指定して、インストールを完了します。

> [!IMPORTANT]
> MangoPeel Neo を有効にする前に、オリジナルの MangoPeel を無効にしてください。両方のプラグインは同じ MangoApp 設定ファイルを変更するため、同時に有効化しないでください。MangoPeel Neo は初回起動時、Neo 側の設定が空の場合に限り、旧 MangoPeel の設定ディレクトリから互換性のある設定をコピーします。旧設定は削除も変更もされません。

## プラグインのスクリーンショット

![](assets/20230527214708_1.jpg)
![](assets/20230527214713_1.jpg)

## 既知の問題

- オリジナルの MangoPeel と MangoPeel Neo は、同じ MangoApp 設定ファイルを監視して上書きするため、同時に有効化しないでください。
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

MangoPeel Neo には、`main.py` に実装された Python バックエンドも含まれています。プラグインのインストール後は、Decky Loader が実行環境の `decky` モジュールを提供します。

### インストール可能なパッケージのビルド

ローカルでインストール用パッケージを生成するには、次のコマンドを実行します。

```sh
npm run package
```

このコマンドはフロントエンドを再ビルドし、リポジトリ直下に `MangoPeel-Neo.zip` と `MangoPeel-Neo.tar.gz` を生成します。直接スクリプトを実行する場合は、`bash build.sh` でも同じ結果になります。

`.vscode/` には Decky CLI 用の補助スクリプトと VS Code タスクも含まれています。Decky CLI では、次のコマンドでインストール可能なプラグインパッケージをビルドできます。

```sh
./cli/decky plugin build "$(pwd)"
```

後述する GitHub Actions ワークフローでも同じローカルパッケージスクリプトを使用します。

## GitHub Actions

[Release ワークフロー](.github/workflows/release.yml)は、次の場合に実行されます。

- `workflow_dispatch` から手動で実行した場合
- `main` または `dev` ブランチへ変更を push した場合
- `v*.*.*` に一致するタグを push した場合

ワークフローでは、次の処理を実行します。

1. Arch Linux コンテナ内でビルドを実行します。
2. pnpm とプロジェクトの依存パッケージをインストールします。
3. `@decky/ui` と `@decky/api` を最新バージョンへ更新します。
4. `npm run package` を実行し、フロントエンドのビルドとパッケージ化を行います。
5. `MangoPeel-Neo.zip` と `MangoPeel-Neo.tar.gz` の内容を検証します。
6. 両方のパッケージを、`MangoPeel-Neo` という名前の GitHub Actions artifact としてアップロードします。

通常のブランチへの push と手動実行では、ワークフロー実行画面の **Artifacts** セクションからパッケージをダウンロードできます。バージョンタグを push した場合は、`publish` ジョブが自動生成されたリリースノートを含む GitHub Release を作成し、両方のパッケージを添付します。`pre` または `.rc` を含むタグは prerelease として公開されます。

## Issues

問題が発生した場合は、[Issues](https://github.com/NeoSloth/MangoPeel/issues) から報告してください。

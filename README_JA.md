# MangoPeel

[![GitHub downloads](https://img.shields.io/github/downloads/Gawah/MangoPeel/total?color=green&logo=github)](https://github.com/Gawah/MangoPeel/releases)
[![GitHub forks](https://img.shields.io/github/forks/Gawah/MangoPeel?color=green&logo=github)](https://github.com/Gawah/MangoPeel/forks)

[简体中文](README_CN.md) | [English](README.md) | [日本語](README_JA.md)

MangoPeel は、[decky-loader](https://github.com/SteamDeckHomebrew/decky-loader) 向けの Steam Deck プラグインです。Steam に標準搭載されている 5 種類のスタイルを、好みの MangoApp スタイルで上書きできます。MangoApp の設定ファイルを検出し、ショートカットメニューの UI から各種パラメーターを素早く設定して、その内容を設定ファイルへ書き込みます。

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

## Issues

問題が発生した場合は、[Issues](https://github.com/Gawah/MangoPeel/issues) から報告してください。

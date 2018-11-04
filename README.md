# Remo2Ambient

家電操作をリモート経由で行える[Nature Remo](https://nature.global/)が定期的に取得している温度、湿度、照度データをIoTデータ可視化サービス[Ambient](https://ambidata.io/)に送信するソフトウェアです。

Google Cloud Functions + Cloud Schedulerを組み合わせて使う前提で設計されていますが、ローカルでもそのまま実行することができます。

# 設定

`config/xxx.json`か環境変数で以下の値を設定することで実行できます。

`xxx.json`は`NODE_ENV`によって変化する。

| 名前 | 機能 | 備考 |
| --- | --- | --- |
| REMO_API_KEY | Nature Remo APIアクセス用 | https://home.nature.global/
| REMO_DEVICE_ID | Remoが１アカウントに複数紐づけされていた場合に、データを取得するデバイス番号 |
| AMBIENT_CHANNEL_ID | データを送信するAmbientのチャンネルID | 
| AMBIENT_WRITE_KEY | 書き込み先チャンネルのWRITE_KEY |

# 実行

## Cloud Functions

Node.js v8以降で、`index.js`にある`update(event, callback)`関数を実行してください。

`event`はPub/Subのpayloadが入りますが使用していません。

## Local

```
$ node local-server.js
```

定期実行する場合はPM2、node-cron等を検討してください。

# License

MIT

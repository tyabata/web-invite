# app-invites
招待画面

## setup

package.json
- `setup` : awsのbucket名を登録する
- `deploy-aws`: html/js/cssを生成してawsのs3にアップロードする。aws-cli導入必須
- `dev`: 開発の確認用サーバを起動する クロスドメインの問題を回避してawsにアクセスするための中継サーバも同時に起動

## 注意
`src/sentence/word.ts` というファイルに個人情報や開催場所を記載していました
このファイルを別途配置しないと動作しないので注意

内容は下記のようなファイルです
```
export default {
  INTRODUCTION: [
    'ここが一行目',
    'これは２行目',
  ],
  NAME: {
    HUSBAND: '夫の名前',
    WIFE: '妻の名前'
  },
  SCHEDULE: {
    DATE: '開催日'
  },
  PLACE: {
    NAME: '場所',
    ADDRESS: '住所',
    MAP:
      'google map の embed用URL'
  },
  FEE: 'お値段 円',
  DRESS_CODE: 'どれすこーどについて'
};
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

# 基本ルール

- `nest-study`フォルダを作成し、`README.md`ファイルを作成し、このルールをコピペで貼り付けてください。
- `nest-study`を git のリモートリポジトリに push してください。
- 課題ごとにブランチを作成し、なるべくこまめにコミットを実施してください。コミット名は簡潔でわかりやすいものにしてください。
- 課題完了後プルリクエストを作成してください。プルリクエストを作成したら Slack にて完了と確認の旨を連絡してください。
- プルリクエストのメッセージには、対応内容/エビデンスのスクリーンショットなどを記載し、わかりやすく説明できるようにしてください。
- `README`には環境構築方法と起動方法、基本的なフォルダ構成の説明を記載してください。

# コーディング規約

- 関数や変数には可能な限りコメントをつけましょう
- コードの可読性を高めるために、一貫したインデントとスペースを使用するように`prettier`を入れてください。
  - [Prettier 導入ガイド](https://deku.posstree.com/react/prettier/#google_vignette)
- コードのエラー検知をしやすくするために、`eslint`を導入してください。
  - [ESLint 導入ガイド](https://zenn.dev/ianchen0419/articles/3c4644d5f20bdb)
- 関数名、変数名、クラス名などの命名規則に従う
  - ファイル名：パスカルケース（PascalCase）
  - 関数と変数：キャメルケース（camelCase）

# 時間管理と振り返り

- 各課題を行う際に実施時間を計測してください、課題以外のものをする際にはタイマーを止めてください。
- 完了後、「難しかったポイント」に自分なりのポイントを記載してください。

## 環境構築方法

- フォルダ名`nest-study`で、`nest new プロジェクト名`コマンドを実行。

## 基本的なフォルダ構成の説明

- `nest-study`・・・ルートディレクトリ
- `dist`・・・コンパイル時に ts ファイルをもとに作成されたファイルを保存するフォルダ（ignore 対象）
- `node_module`・・・package.json を元にしてインストールされる各種パッケージがインストールされているフォルダ（ignore 対象）
- `src`・・・ソースファイルの保存場所
- `users`・・・ユーザー情報や、作成時の機能を保存している
- `dto`・・・ユーザー情報を更新（update）作成（create）する際の機能を保存している
- `product`・・・商品情報や、作成時の機能を保存している
- `productDto`・・・商品作成時に行う機能を保存している
- `migrations`・・・`dist`フォルダをもとにマイグレーションを作成し、DB に保存している

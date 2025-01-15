---
title: "コンテンツの例"
weight: 11
draft: false
description: "Blowfish で利用可能なすべてのパーシャル。"
slug: "content-examples"
tags: ["content", "example"]
series: ["Documentation"]
series_order: 12
---

ドキュメントを順に読んできた方なら、Blowfish で利用可能なすべての機能と設定について、すでにご存じでしょう。このページでは、これまで説明してきたすべてをまとめて、Hugo プロジェクトで使用できる実践的なサンプルを紹介します。

{{< alert >}}
**ヒント:** Hugo を初めて使用する場合は、[公式ドキュメント](https://gohugo.io/content-management/page-bundles/)でページバンドルとリソースの概念について、さらに詳しく学習することをお勧めします。
{{< /alert >}}

このページの例は、さまざまなシナリオに適応できます。あなたのプロジェクトで、特定のコンテンツをどのようにフォーマットするか、そのヒントになれば幸いです。

## ブランチページ

Hugo のブランチページバンドルは、ホームページ、セクションリスト、タクソノミーページなどを指します。ブランチバンドルで覚えておくべき重要なことは、このコンテンツタイプのファイル名が **`_index.md`** であることです。

Blowfish は、ブランチページで指定された Front Matter のパラメータを認識し、特定のページのデフォルト設定を上書きします。例えば、ブランチページで `title` パラメータを設定すると、そのページのタイトルを上書きできます。

### ホームページ

|              |                      |
| ------------ | -------------------- |
| **レイアウト:**  | `layouts/index.html` |
| **コンテンツ:** | `content/_index.md`  |

Blowfish のホームページは、その全体デザインがホームページレイアウト設定パラメータによって制御される、特別なページです。詳細は[ホームページレイアウト]({{< ref "homepage-layout" >}})セクションをご覧ください。

ホームページに独自のコンテンツを追加するには、`content/_index.md` ファイルを作成するだけです。このファイルの内容が、ホームページに表示されます。

**例:**

```yaml
---
title: "Blowfish へようこそ!"
description: "ホームページにコンテンツを追加するデモです。"
---
私のウェブサイトへようこそ! お越しいただき、本当に嬉しいです。
```

_この例では、独自のタイトルを設定し、ページ本文にテキストを追加しています。ショートコード、画像、リンクなど、Markdown 形式のテキストはすべて使用できます。_

### リストページ

|              |                              |
| ------------ | ---------------------------- |
| **レイアウト:**  | `layouts/_default/list.html` |
| **コンテンツ:** | `content/../_index.md`       |

リストページは、セクション内の全ページをまとめて、訪問者が各ページを閲覧できるようにします。ブログやポートフォリオは、投稿やプロジェクトをまとめるリストページの代表例です。

リストページは、コンテンツフォルダ内にサブディレクトリを作成するだけで簡単に作成できます。例えば、「プロジェクト」セクションを作成するには、`content/projects/` を作成します。そして、各プロジェクト用の Markdown ファイルを作成します。

リストページはデフォルトで生成されますが、コンテンツをカスタマイズするには、この新しいディレクトリ内に `_index.md` ファイルも作成する必要があります。

```shell
.
└── content
    └── projects
        ├── _index.md          # /projects
        ├── first-project.md   # /projects/first-project
        └── another-project
            ├── index.md       # /projects/another-project
            └── project.jpg
```

Hugo は、projects フォルダ内の各ページに対して、適切な URL を自動生成します。

ホームページと同様に、`_index.md` ファイルの内容は、生成されたリストのインデックスページに表示されます。そして、Blowfish は、そのセクション内のページをコンテンツの下に一覧表示します。

**例:**

```yaml
---
title: "プロジェクト"
description: "私のプロジェクトのいくつかをご紹介します。"
cascade:
  showReadingTime: false
---
このセクションでは、私の現在進行中のプロジェクトを紹介しています。
```

_この例では、特別な `cascade` パラメータを使用して、このセクション内の各ページの閲覧時間を非表示にしています。これにより、各プロジェクトページでは閲覧時間が表示されなくなります。これは、個々のページにパラメータを記述することなく、セクション全体のデフォルトのテーマパラメータを上書きできる便利な方法です。_

このサイトの[サンプルセクション]({{< ref "samples" >}})は、リストページの活用例です。

### タクソノミーページ

|                  |                                  |
| ---------------- | -------------------------------- |
| **リストレイアウト:** | `layouts/_default/taxonomy.html` |
| **タームレイアウト:** | `layouts/_default/term.html`     |
| **コンテンツ:**     | `content/../_index.md`           |

タクソノミーページには、「タクソノミーリスト」と「タクソノミーターム」の2種類があります。リストは特定のタクソノミー内の各タームの一覧を表示し、タームは特定のタームに関連付けられたページ一覧を表示します。

少し複雑に感じるかもしれないので、`animals` というタクソノミーを例に説明します。

まず、Hugo でタクソノミーを使用するには、設定が必要です。`config/_default/taxonomies.toml` に設定ファイルを作成し、タクソノミー名を定義しましょう。

```toml
# config/_default/taxonomies.toml

animal = "animals"
```

Hugo ではタクソノミーを単数形と複数形で設定する必要があるため、ここでは `animal` (単数形) = `animals` (複数形) として、サンプルのタクソノミーを作成します。

`animals` タクソノミーが作成できたので、次はこれを個々のコンテンツに追加します。フロントマターに以下のように記述するだけです。

```yaml
---
title: "ライオンの巣窟へ"
description: "今週はライオンについて学びます。"
animals: ["lion", "cat"]
---
```

これで、`animals` タクソノミー内に `lion` と `cat` という2つの _ターム_ が作成されました。

この時点ではまだ分かりませんが、Hugo はこの新しいタクソノミーのために、リストページとタームページを自動生成します。デフォルトでは、リストページは `/animals/`、タームページは `/animals/lion/` と `/animals/cat/` でアクセスできます。

リストページには、タクソノミーに含まれるすべてのタームが一覧表示されます。この例では、`/animals/` にアクセスすると、「lion」と「cat」へのリンクが表示され、それぞれのタームページへ移動できます。

タームページには、そのタームに関連付けられたすべてのページが表示されます。タームリストは、基本的に通常の[リストページ](#リストページ)と同じで、ほぼ同様に機能します。

タクソノミーページに独自のコンテンツを追加するには、タクソノミー名をサブディレクトリ名として、`content` フォルダ内に `_index.md` ファイルを作成するだけです。

```shell
.
└── content
    └── animals
        ├── _index.md       # /animals
        └── lion
            └── _index.md   # /animals/lion
```

これらのファイルに記述した内容はすべて、自動生成されたタクソノミーページに表示されます。他のコンテンツと同様に、フロントマターの変数を使用してデフォルト値を上書きできます。例えば、`lion` というタグ名を付けつつ、`title` を「Lion」と表示することも可能です。

実際の表示例は、このサイトの[タグタクソノミーリスト]({{< ref "tags" >}})をご覧ください。

## リーフページ

|                           |                                 |
| ------------------------- | ------------------------------- |
| **レイアウト:**               | `layouts/_default/single.html`  |
| **コンテンツ (スタンドアロン):** | `content/../page-name.md`       |
| **コンテンツ (バンドル):**    | `content/../page-name/index.md` |

Hugo のリーフページは、基本的に標準的なコンテンツページです。サブページを含まないページとして定義されます。例えば、自己紹介ページや、ウェブサイトのブログセクションにある個別のブログ記事などが該当します。

リーフページで最も重要なのは、ブランチページとは異なり、ファイル名をアンダースコアを _付けずに_ `index.md` とすることです。また、リーフページはセクションのトップレベルでグループ化し、それぞれに固有の名前を付けられるという点でも特別です。

```shell
.
└── content
    └── blog
        ├── first-post.md     # /blog/first-post
        ├── second-post.md    # /blog/second-post
        └── third-post
            ├── index.md      # /blog/third-post
            └── image.jpg
```

画像などのアセットをページに含める場合は、ページバンドルを使用する必要があります。ページバンドルは、`index.md` ファイルを含むサブディレクトリを使用して作成します。多くのショートコードやその他のテーマロジックは、リソースがページと共にバンドルされていることを前提としているため、アセットとコンテンツを独自のディレクトリにまとめておくことが重要です。

**例:**

```yaml
---
title: "初めてのブログ記事"
date: 2022-01-25
description: "私のブログへようこそ!"
summary: "私自身と、このブログを始めた理由についてご紹介します。"
tags: ["welcome", "new", "about", "first"]
---
_これ_ が私のブログ記事の本文です。
```

リーフページでは、表示方法をカスタマイズするために、様々な[フロントマター]({{< ref "front-matter" >}})パラメータを使用できます。

### 外部リンク

Blowfish には、記事リストの記事と一緒に外部リンクを表示できる特別な機能があります。これは、Medium などのサードパーティのウェブサイトにコンテンツがある場合や、Hugo サイトにコンテンツを複製せずにリンクしたい研究論文がある場合に便利です。

外部リンク記事を作成するには、特別なフロントマターを設定する必要があります。

```yaml
---
title: "私の Medium 記事"
date: 2022-01-25
externalUrl: "https://medium.com/"
summary: "Medium に記事を投稿しました。"
showReadingTime: false
_build:
  render: "false"
  list: "local"
---
```

`title` や `summary` などの通常の Front Matter パラメータに加えて、`externalUrl` パラメータは、これが通常の記事ではないことを Blowfish に伝えるために使用されます。ここに指定された URL は、訪問者がこの記事を選択した際にリダイレクトされる場所です。

さらに、特別な Hugo フロントマターパラメータ `_build` を使用して、このコンテンツの通常のページが生成されないようにします。外部リンクにリダイレクトするため、ページを生成する必要はありません。

テーマには、外部リンク記事を簡単に作成するためのアーキタイプが含まれています。新しいコンテンツを作成する際に、`-k external` を指定するだけです。

```shell
hugo new -k external posts/my-post.md
```

### シンプルページ

|                   |                                |
| ----------------- | ------------------------------ |
| **レイアウト:**       | `layouts/_default/simple.html` |
| **フロントマター:** | `layout: "simple"`             |

Blowfish には、シンプルなページ用の特別なレイアウトも用意されています。シンプルレイアウトは、特別なテーマ機能を使用せずに、Markdown コンテンツのみを表示する全幅テンプレートです。

シンプルレイアウトで利用できる機能は、パンくずリストと共有リンクのみです。ただし、これらの動作は、通常のページの[フロントマター]({{< ref "front-matter" >}})変数を使用して制御できます。

特定のページでシンプルレイアウトを有効にするには、`layout` フロントマター変数に値 `"simple"` を設定します。

```yaml
---
title: "私のランディングページ"
date: 2022-03-08
layout: "simple"
---
このページのコンテンツは全幅で表示されます。
```

## カスタムレイアウト

Hugo の利点の 1 つは、サイト全体、個別のセクション、またはページごとに、簡単にカスタムレイアウトを作成できることです。

レイアウトは、通常の Hugo テンプレートルールに従います。詳細は[公式 Hugo ドキュメント](https://gohugo.io/templates/introduction/)をご覧ください。

### デフォルトレイアウトの上書き

上記の各コンテンツタイプには、それぞれのタイプのページを生成するために使用されるレイアウトファイルが記載されています。このファイルをローカルプロジェクトで作成すると、テーマのテンプレートが上書きされるため、ウェブサイトのデフォルトスタイルをカスタマイズできます。

例えば、`layouts/_default/single.html` ファイルを作成すると、リーフページのレイアウトを完全にカスタマイズできます。

### カスタムセクションレイアウト

個々のコンテンツセクション用に、カスタムレイアウトを作成することも簡単です。特定のスタイルを使用して、特定のタイプのコンテンツを一覧表示するセクションを作成したい場合に便利です。

特別なレイアウトを使用してプロジェクトを一覧表示する、カスタム「プロジェクト」ページを作成する例を見てみましょう。

まず、通常の Hugo コンテンツルールに従ってコンテンツを構成し、プロジェクト用のセクションを作成します。次に、コンテンツと同じディレクトリ名を使用し、`list.html` ファイルを追加して、プロジェクトセクション用の新しいレイアウトを作成します。

```shell
.
└── content
│   └── projects
│       ├── _index.md
│       ├── first-project.md
│       └── second-project.md
└── layouts
    └── projects
        └── list.html
```

この `list.html` ファイルは、デフォルトのリストテンプレートを上書きしますが、`projects` セクションに対してのみ有効です。このファイルの中身を見る前に、まず個々のプロジェクトファイルを見てみましょう。

```yaml
---
title: "Blowfish"
date: 2021-08-11
icon: "github"
description: "Tailwind CSS を使用して構築された Hugo テーマ。"
topics: ["Hugo", "Web", "Tailwind"]
externalUrl: "https://github.com/nunocoracao/blowfish/"
---
```

_ここでは、各プロジェクトのメタデータを設定しています。このメタデータは、後ほどリストテンプレートで使用できます。ページコンテンツはありませんが、必要に応じて追加することも可能です。あなた独自のカスタムテンプレートですから!_

プロジェクトが定義できたので、次は各プロジェクトの詳細を出力するリストテンプレートを作成しましょう。

```go
{{ define "main" }}
  <section class="mt-8">
    {{ range .Pages }}
      <article class="pb-6">
        <a class="flex" href="{{ .Params.externalUrl }}">
          <div class="mr-3 text-3xl text-neutral-300">
            <span class="relative inline-block align-text-bottom">
              {{ partial "icon.html" .Params.icon }}
            </span>
          </div>
          <div>
            <h3 class="flex text-xl font-semibold">
              {{ .Title }}
            </h3>
            <p class="text-sm text-neutral-400">
              {{ .Description }}
            </p>
          </div>
        </a>
      </article>
    {{ end }}
  </section>
{{ end }}
```

これは非常にシンプルな例ですが、このセクションの各ページ (つまり、各プロジェクト) を順に処理し、アイコンと共に各プロジェクトへの HTML リンクを出力しています。各プロジェクトのフロントマターのメタデータは、表示される情報を決定するために使用されます。

関連するスタイルとクラスが利用可能であることを確認する必要があることに注意してください。場合によっては、Tailwind CSS の再コンパイルが必要になる場合があります。これについては、[高度なカスタマイズ]({{< ref "advanced-customisation" >}})セクションで詳しく説明しています。

このようなカスタムテンプレートを作成する際には、まずデフォルトの Blowfish テンプレートの動作を確認し、それを参考にすることをお勧めします。[Hugo ドキュメント](https://gohugo.io/templates/introduction/)も、テンプレート作成について学ぶための優れた情報源です。
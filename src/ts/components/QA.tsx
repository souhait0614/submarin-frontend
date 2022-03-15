import Header from "./Header"

import { memo } from "react"
import HelpItem from "./HelpItem"

export const QA = memo(() => {
  return (
    <div id="qa">
      <Header title="よくある質問" />
      <main>
        <HelpItem label="Submarinとは？">
          <>
            <p>
              不特定多数とのコミュニケーションに特化したリアルタイムチャットアプリケーションです。
            </p>
            <p>
              開いてすぐに会話に参加できることが特徴であり、必要なものはユーザーネームのみ。誰でも手軽・気軽に参加できます。
            </p>
          </>
        </HelpItem>
        <HelpItem label="チャットの仕組みは？">
          <>
            <p>
              WebSocketというWebサーバーとWebブラウザの間で双方向通信できるようにする技術を使用しています。
            </p>
            <p>
              チャットを送信するとWebサーバーに対してWebSocketでチャットの内容を送信し、それを受け取ったWebサーバーは送られたチャットの内容をチャットの参加者全員に送り返すことで実現しています。
            </p>
          </>
        </HelpItem>
        <HelpItem label="ソースが全部人間が読みたくないような形なのは？">
          <>
            <p>
              (特にJavaScriptで)膨大な量のコードを読み込む必要があるため、圧縮して読み込む量を削減しています。
            </p>
          </>
        </HelpItem>
        <HelpItem label="何を使って作られている？">
          <>
            <p>
              このWebアプリはフレームワークとしてReactを採用しており、ページ移動を含めたほとんどの動作をJavaScriptで行っています。
            </p>
            <p>
              また開発言語としてTypeScript、Sassを使用し、esbuild(Vite)を使用してバンドルやコンパイル、圧縮しています。
            </p>
          </>
        </HelpItem>
        <HelpItem label='なんでSubmarin"e"(潜水艦)ではない？'>
          <>
            <p>大本のアプリがSubmarinだったからです。</p>
            <p>
              <s>なんでなのかは私も知りたい</s>
            </p>
          </>
        </HelpItem>
        <HelpItem label="怪レい日本语変換を搭載した理由は？">
          <>
            <p>大本のアプリに存在していたからです。</p>
            <p>
              <s>実装が簡単だったのでついでに付けました</s>
            </p>
          </>
        </HelpItem>
      </main>
    </div>
  )
})

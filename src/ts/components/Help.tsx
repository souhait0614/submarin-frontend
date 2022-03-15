import Header from "./Header"

import { memo } from "react"
import HelpItem from "./HelpItem"

export const Help = memo(() => {
  return (
    <div id="help">
      <Header title="ヘルプ" />
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
        <HelpItem label="怪レい日本语変換を積んだ理由は？">
          <>
            <p>
              大本のアプリに存在していたからです。
            </p>
          </>
        </HelpItem>
      </main>
    </div>
  )
})

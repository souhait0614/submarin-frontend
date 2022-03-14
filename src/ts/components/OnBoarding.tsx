import { Ripple } from "@rmwc/ripple"
import { memo } from "react"
import { Link } from "react-router-dom"
import Header from "./Header"

//@ts-ignore
import logo from "../../img/logo_color.png"

const OnBoarding = memo(() => {

  return (
    <div id="onboarding">
      <Header noTitle removeBackBtn title={"Submarin"} />
      <main>
        <section>
          <h2>Submarinへようこそ</h2>
          <img
            className="logo"
            src={logo}
            alt="Submarin logo"
          />
          <span style={{ fontSize: "1.5rem" }}>へようこそ。</span>
          <p>
            Submarinは不特定多数とのコミュニケーションに特化した
            <br />
            リアルタイムチャットアプリケーションです。
          </p>
          <p>
            開いてすぐに会話に参加できることが特徴であり、
            <br />
            必要なものはユーザーネームのみ。誰でも手軽・気軽に参加できます。
            <br />
            <small>(アバターも設定できます)</small>
          </p>
        </section>
      </main>
      <footer>
        <Ripple>
          <Link
            to="/"
            className="btn pri"
            onClick={() => localStorage.setItem("first_run", "")}
          >
            はじめる
          </Link>
        </Ripple>
      </footer>
    </div>
  )
})

export default OnBoarding

import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./components/App"
import "../css/style.scss"
import "@material/ripple/dist/mdc.ripple.css"
import "@rmwc/tooltip/tooltip.css"
import { RecoilRoot } from "recoil"

ReactDOM.render(
  <BrowserRouter>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>,
  document.getElementById("root")
)

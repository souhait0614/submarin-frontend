import Header from "./Header"

import licenseFile from "../../license.json"
import { Ripple } from "@rmwc/ripple"
import { memo } from "react"

const OpenSourceLicense = memo(() => {
  return (
    <div id="open_source_license">
      <Header title="オープンソースライセンス" />
      <main>
        <div className="container">
          {Object.entries(licenseFile).map(([key, val]) => (
            <div className="item_container" key={key}>
              <Ripple>
                <a
                  className="item"
                  href={val.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    {key}
                    <br />
                    <span className="sub_text">{val.licenses}</span>
                  </span>
                  <i>open_in_new</i>
                </a>
              </Ripple>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
})

export default OpenSourceLicense

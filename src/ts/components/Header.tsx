import { Ripple } from "@rmwc/ripple"
import { CSSProperties, ReactElement } from "react"
import { useNavigate } from "react-router-dom"

function Header({
  removeBackBtn = false,
  title = "",
  addBtn = null,
  backBtn = null,
  noTitle = false,
}: {
  removeBackBtn?: boolean
  title: string
  addBtn?: ReactElement
  backBtn?: ReactElement
  noTitle?: boolean
}) {
  const navigate = useNavigate()
  const headerStyle: CSSProperties = {}
  removeBackBtn || (headerStyle.paddingLeft = "11px")
  addBtn && (headerStyle.paddingRight = "11px")
  return (
    <header style={headerStyle}>
      {removeBackBtn || backBtn || (
        <Ripple>
          <button onClick={() => navigate(-1)}>
            <i>arrow_back</i>
          </button>
        </Ripple>
      )}
      <h1 style={noTitle ? { display: "none" } : {}}>{title}</h1>
      <Ripple>{addBtn || <></>}</Ripple>
    </header>
  )
}

export default Header
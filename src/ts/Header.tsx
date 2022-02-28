import { useNavigate } from "react-router-dom"

function Header({
  removeBackBtn = false,
  title = "",
  addBtn = <></>,
  noTitle = false,
}) {
  const navigate = useNavigate()
  return (
    <header>
      {removeBackBtn || (
        <button onClick={() => navigate(-1)}>
          <i>arrow_back</i>
        </button>
      )}
      <h1 style={noTitle ? {display: "none"} : {}}>{title}</h1>
      {addBtn}
    </header>
  )
}

export default Header

import { Link } from "react-router-dom"
import Header from "./Header"

function Top() {
  return (
    <>
      <Header
        title="Submarin"
        removeBackBtn
        noTitle
        addBtn={
          <Link to="/settings">
            <button>
              <i>settings</i>
            </button>
          </Link>
        }
      />
      <main id="top">
        <div className="container">
          <input type="text"/>
        </div>
      </main>
    </>
  )
}

export default Top

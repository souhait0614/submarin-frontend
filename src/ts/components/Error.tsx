import { Link } from "react-router-dom"

function Error({ title = "", text = <></> }) {
  return (
    <main
      style={{
        display: "grid",
        placeContent: "center",
        textAlign: "center",
      }}
    >
      <section style={{ display: "grid", gap: "1em" }}>
        <h2 style={{ fontSize: "1.5em" }}>{title}</h2>
        <p>{text}</p>
        <Link to={"/"} className="btn pri">
          トップへ
        </Link>
      </section>
    </main>
  )
}

export default Error

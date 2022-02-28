import { Routes, Route } from "react-router-dom"

import Top from "./Top"
import Settings from "./Settings"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/*" element={<div>なんと404</div>} />
      </Routes>
    </>
  )
}

export default App

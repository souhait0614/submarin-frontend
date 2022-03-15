import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group"
import { memo, useEffect } from "react"
import Modal from "react-modal"

import Top from "./Top"
import Settings from "./Settings"
import Chat from "./Chat"
import Error from "./Error"
import OnBoarding from "./OnBoarding"
import OpenSourceLicense from "./OpenSouceLicense"
import { Help } from "./Help"
import { Service } from "./Service"
import { Policy } from "./Policy"

Modal.setAppElement("#root")
Modal.defaultStyles = {
  overlay: {},
  content: {},
}

const App = memo(() => {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem("first_run") === null) {
      navigate("/onboarding", { state: { id: 1 } })
    }
  }, [])
  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames="fade" timeout={100}>
        <Routes location={location}>
          <Route path="/" element={<Top />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/onboarding" element={<OnBoarding />} />
          <Route path="/opensouceliecnse" element={<OpenSourceLicense />} />
          <Route path="/help" element={<Help />} />
          <Route path="/service" element={<Service />} />
          <Route path="/policy" element={<Policy />} />
          <Route
            path="/*"
            element={
              <div>
                <Error text={<>ページが見つかりませんでした。</>} />
              </div>
            }
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  )
})

export default App

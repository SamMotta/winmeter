import { BrowserRouter, Routes, Route }from 'react-router-dom'

import { Home } from "./pages/Home"
import { CreateMatch } from "./pages/CreateMatch"

function App() {
  return (
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/createMatch" element={<CreateMatch />} />


        </Routes>
      </BrowserRouter>
  )
}

export default App

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Landing } from "./pages/Landing"
import { Playground } from "./pages/Playground"
import { CreateRoom } from "./pages/CreateRoom"
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/playground" element={<Playground/>}/>
        <Route path="/create" element={<CreateRoom/>}/>
      </Routes>
   
    </Router>
    
    </>
  )
}

export default App

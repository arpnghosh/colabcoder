import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Playground } from "./pages/Playground";
import { SocketRoom } from "./pages/SocketRoom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/playground/:roomId" element={<Playground />} />
          <Route path="/socketroom" element={<SocketRoom />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

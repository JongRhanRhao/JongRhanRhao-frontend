import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
// import Home from "./pages/Home";
// import About from "./pages/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {/* <Route index element={<Home />} /> */}
          {/* <Route path="about" element={<About />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

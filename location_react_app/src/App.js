import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import NouvelleAnnonce from "./Components/NouvelleAnnonce";
import Test from "./Components/Test"
import Test2 from "./Components/Test2";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/nouvelleannonce" element={<NouvelleAnnonce />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test2" element={<Test2 />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

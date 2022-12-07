import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import NouvelleAnnonce from "./Components/NouvelleAnnonce";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/nouvelleannonce" element={<NouvelleAnnonce />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

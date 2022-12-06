import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/login2" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

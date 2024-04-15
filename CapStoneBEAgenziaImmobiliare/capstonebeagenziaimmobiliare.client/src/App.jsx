import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/NavigationBar";
import "./App.scss";
import Homepage from "./components/Homepage";
import CercaCasaPage from "./components/CercaCasaPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import VendiCasaPage from "./components/VendiCasaPage";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/CercaCasa" element={<CercaCasaPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/VendiCasa" element={<VendiCasaPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

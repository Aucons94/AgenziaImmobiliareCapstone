import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/NavigationBar";
import "./App.scss";
import Homepage from "./components/Homepage/Homepage";
import CercaCasaPage from "./components/CercaCasa/CercaCasaPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import LoginPage from "./components/Login/LoginPage";
import VendiCasaPage from "./components/VendiCasa/VendiCasaPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verificaToken } from "./redux/utils/authToken";
import GestioneImmobili from "./components/GestioneImmobili/GestioneImmobiliPage";
import DettagliPage from "./components/DettaglioImmobile/DettagliPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verificaToken());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/CercaCasa" element={<CercaCasaPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/VendiCasa" element={<VendiCasaPage />} />
        <Route path="/GestioneImmobili" element={<GestioneImmobili />} />
        <Route path="/dettaglio/:idImmobile" element={<DettagliPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

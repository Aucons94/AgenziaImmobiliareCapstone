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
import ModificaImmobile from "./components/GestioneImmobili/ModificaImmobile";
import { GestioneValutazioni } from "./components/GestioneValutazioni/GestioneValutazioni";
import DettagliValutazione from "./components/GestioneValutazioni/DettagliValutazione";
import GestioneUtenti from "./components/GestioneUtenti/GestioneUtenti";
import ModificaUtente from "./components/GestioneUtenti/ModificaUtente";
import CreaUtente from "./components/GestioneUtenti/CreaUtente";
import CreaImmobile from "./components/GestioneImmobili/CreaImmobile";

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
        <Route path="/Dettaglio/:idImmobile" element={<DettagliPage />} />
        <Route path="/ModificaImmobile/:idImmobile" element={<ModificaImmobile />} />
        <Route path="/CreaImmobile" element={<CreaImmobile />} />
        <Route path="/GestioneValutazioni" element={<GestioneValutazioni />} />
        <Route path="/valutazioni/:id" element={<DettagliValutazione />} />
        <Route path="/GestioneUtenti" element={<GestioneUtenti />} />
        <Route path="/ModificaUtente/:id" element={<ModificaUtente />} />
        <Route path="/CreaUtente" element={<CreaUtente />} />
        <Route path="*" element={<div>404 - Pagina non trovata</div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

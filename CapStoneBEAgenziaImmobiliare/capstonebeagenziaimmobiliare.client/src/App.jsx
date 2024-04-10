import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./components/NavigationBar";
import "./App.scss";
import Homepage from "./components/Homepage";
import CercaCasaPage from "./components/CercaCasaPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/CercaCasa" element={<CercaCasaPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

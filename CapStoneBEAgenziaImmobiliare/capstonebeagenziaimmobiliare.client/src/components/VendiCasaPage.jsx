import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createValutazione } from "../redux/actions/VendiCasaAction";

export default function ValutazioneForm() {
  const [formState, setFormState] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    indirizzo: "",
    camereDaLetto: "",
    bagni: "",
    cucina: "",
    sala: "",
    altriVani: "",
    metratura: "",
    box: "",
    postiAuto: "",
    caratteristicheSpeciali: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.valutazione);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createValutazione(formState));
  };

  useEffect(() => {
    if (data) {
      setSubmitted(true);
    }
  }, [data]);

  if (submitted) {
    return (
      <p className="alert alert-success">
        Richiesta di Valutazione inviata. Appena possibile verrà contattato da un nostro professionista.
      </p>
    );
  }

  return (
    <div className="container mt-5">
      {loading && <p className="alert alert-info">Caricamento in corso...</p>}
      {error && <p className="alert alert-danger">Errore: {error}</p>}
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="nome" className="form-label">
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            value={formState.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="cognome" className="form-label">
            Cognome
          </label>
          <input
            type="text"
            className="form-control"
            id="cognome"
            name="cognome"
            value={formState.cognome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="telefono" className="form-label">
            Telefono
          </label>
          <input
            type="text"
            className="form-control"
            id="telefono"
            name="telefono"
            value={formState.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="indirizzo" className="form-label">
            Indirizzo
          </label>
          <input
            type="text"
            className="form-control"
            id="indirizzo"
            name="indirizzo"
            value={formState.indirizzo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="camereDaLetto" className="form-label">
            Camere da letto
          </label>
          <input
            type="number"
            className="form-control"
            id="camereDaLetto"
            name="camereDaLetto"
            value={formState.camereDaLetto}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="bagni" className="form-label">
            Bagni
          </label>
          <input
            type="number"
            className="form-control"
            id="bagni"
            name="bagni"
            value={formState.bagni}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="cucina" className="form-label">
            Cucina
          </label>
          <input
            type="text"
            className="form-control"
            id="cucina"
            name="cucina"
            value={formState.cucina}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="sala" className="form-label">
            Sala
          </label>
          <input
            type="text"
            className="form-control"
            id="sala"
            name="sala"
            value={formState.sala}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="altriVani" className="form-label">
            Altri Vani
          </label>
          <input
            type="number"
            className="form-control"
            id="altriVani"
            name="altriVani"
            value={formState.altriVani}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="metratura" className="form-label">
            Metratura
          </label>
          <input
            type="number"
            className="form-control"
            id="metratura"
            name="metratura"
            value={formState.metratura}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="box" className="form-label">
            Box
          </label>
          <input
            type="number"
            className="form-control"
            id="box"
            name="box"
            value={formState.box}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="postiAuto" className="form-label">
            Posti Auto
          </label>
          <input
            type="number"
            className="form-control"
            id="postiAuto"
            name="postiAuto"
            value={formState.postiAuto}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label htmlFor="caratteristicheSpeciali" className="form-label">
            Caratteristiche Speciali
          </label>
          <textarea
            className="form-control"
            id="caratteristicheSpeciali"
            name="caratteristicheSpeciali"
            value={formState.caratteristicheSpeciali}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 mb-5">
          <button type="submit" className="btn btn-primary">
            Invia Richiesta
          </button>
        </div>
      </form>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getImmobileDetails,
  editImmobile,
  fetchStaffMembers,
  uploadImage,
  setImageAsCover,
  removeImage,
} from "../../redux/actions/modificaImmobileAction";
import { Form, Button, Container, Row, Col, Card, Alert, Spinner, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const ModificaImmobile = () => {
  const { idImmobile } = useParams();
  const dispatch = useDispatch();
  const { immobile, loading, error } = useSelector((state) => state.modificaDettagli);
  const { staffMembers } = useSelector((state) => state.modificaStaff);
  const user = JSON.parse(localStorage.getItem("user"));
  const isMasterBroker = user && user.role === "Master Broker";
  const [immagini, setImmagini] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();
  const [fileName, setFileName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getImmobileDetails(idImmobile));
    if (isMasterBroker) {
      dispatch(fetchStaffMembers());
    }
  }, [dispatch, idImmobile, isMasterBroker]);

  useEffect(() => {
    let timer;
    if (showModal) {
      timer = setTimeout(() => {
        navigate("/GestioneImmobili");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showModal, navigate]);

  useEffect(() => {
    if (immobile) {
      setFormData({
        titolo: immobile.titolo || "",
        descrizione: immobile.descrizione || "",
        prezzo: immobile.prezzo ? immobile.prezzo.toString() : "0",
        tipoProprietà: immobile.tipoProprietà || "Residenziale",
        comune: immobile.comune || "",
        indirizzo: immobile.indirizzo || "",
        camereDaLetto: immobile.camereDaLetto ? immobile.camereDaLetto.toString() : "0",
        bagni: immobile.bagni ? immobile.bagni.toString() : "0",
        cucina: immobile.cucina || "Angolo Cottura",
        sala: immobile.sala || "",
        altriVani: immobile.altriVani ? immobile.altriVani.toString() : "0",
        metratura: immobile.metratura ? immobile.metratura.toString() : "0",
        box: immobile.box ? immobile.box.toString() : "0",
        postiAuto: immobile.postiAuto ? immobile.postiAuto.toString() : "0",
        caratteristicheSpeciali: immobile.caratteristicheSpeciali || "",
        vetrina: immobile.vetrina || false,
        pubblicata: immobile.pubblicata || false,
        locazione: immobile.locazione ? "true" : "false",
        fkIdUser: immobile.fkIdUser || "",
      });
      setImmagini(immobile.immagini || []);
    }
  }, [immobile]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const handleImageUpload = async () => {
    if (selectedFile) {
      try {
        const result = await dispatch(uploadImage(idImmobile, selectedFile));
        if (result.success) {
          setImmagini((prevImmagini) => [...prevImmagini, result.data]);
          setSelectedFile(null);
          setFileName("");
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          alert("Immagine caricata con successo!");
        } else {
          alert(result.message || "Caricamento immagine fallito.");
        }
      } catch (error) {
        console.error("Errore durante il caricamento dell'immagine:", error);
        alert("Errore nel processo di caricamento.");
      }
    }
  };

  const handleSetCover = (idImmagine) => {
    dispatch(setImageAsCover(idImmagine));
    setImmagini(
      immagini.map((img) => ({
        ...img,
        immagineCopertina: img.idImmagine === idImmagine,
      }))
    );
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRemoveImage = async (idImmagine) => {
    const result = await dispatch(removeImage(idImmobile, idImmagine));
    if (result.success) {
      alert("Immagine rimossa con successo!");
      setImmagini(immagini.filter((img) => img.idImmagine !== idImmagine));
    } else {
      alert(result.message || "Errore durante la rimozione dell'immagine.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      box: formData.box === "0" ? null : parseInt(formData.box),
      postiAuto: formData.postiAuto === "0" ? null : parseInt(formData.postiAuto),
      locazione: formData.locazione === "true",
      ...(isMasterBroker && { fkIdUser: formData.fkIdUser }),
    };

    try {
      await dispatch(editImmobile(idImmobile, submissionData));
      setShowModal(true);
    } catch (error) {
      alert("Errore durante il salvataggio delle modifiche.");
      console.error("Errore durante il salvataggio:", error);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="my-4">
      <Row className="justify-content-md-center">
        <Col md={12} lg={5} xl={6}>
          <h2 className="titoloModificaImmobile">Modifica Immobile</h2>
          <Form onSubmit={handleSubmit} className="formModificaImmobile">
            <Form.Group controlId="formTitolo">
              <Form.Label>Titolo</Form.Label>
              <Form.Control type="text" name="titolo" value={formData.titolo} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formDescrizione">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descrizione"
                value={formData.descrizione}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPrezzo">
              <Form.Label>Prezzo</Form.Label>
              <Form.Control type="number" name="prezzo" value={formData.prezzo} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formTipoProprietà">
              <Form.Label>Tipo Proprietà</Form.Label>
              <Form.Control as="select" name="tipoProprietà" value={formData.tipoProprietà} onChange={handleChange}>
                <option value="Residenziale">Residenziale</option>
                <option value="Commerciale">Commerciale</option>
                <option value="Terreni">Terreni</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formComune">
              <Form.Label>Comune</Form.Label>
              <Form.Control type="text" name="comune" value={formData.comune} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formIndirizzo">
              <Form.Label>Indirizzo</Form.Label>
              <Form.Control type="text" name="indirizzo" value={formData.indirizzo} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formCamereDaLetto">
              <Form.Label>Camere da Letto</Form.Label>
              <Form.Control type="number" name="camereDaLetto" value={formData.camereDaLetto} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formBagni">
              <Form.Label>Bagni</Form.Label>
              <Form.Control type="number" name="bagni" value={formData.bagni} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formCucina">
              <Form.Label>Cucina</Form.Label>
              <Form.Control as="select" name="cucina" value={formData.cucina} onChange={handleChange}>
                <option value="Angolo Cottura">Angolo Cottura</option>
                <option value="Cucinotto">Cucinotto</option>
                <option value="Cucina Semi-abitabile">Cucina Semi-abitabile</option>
                <option value="Cucina Abitabile">Cucina Abitabile</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formSala">
              <Form.Label>Sala</Form.Label>
              <Form.Control type="text" name="sala" value={formData.sala} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formMetratura">
              <Form.Label>Metratura</Form.Label>
              <Form.Control type="number" name="metratura" value={formData.metratura} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formAltriVani">
              <Form.Label>Altri Vani</Form.Label>
              <Form.Control type="text" name="altriVani" value={formData.altriVani} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formBox">
              <Form.Label>Box</Form.Label>
              <Form.Control
                as="select"
                name="box"
                value={formData.box === null ? "0" : formData.box}
                onChange={handleChange}
              >
                <option value="0">Nessuno</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formPostiAuto">
              <Form.Label>Posti Auto</Form.Label>
              <Form.Control
                as="select"
                name="postiAuto"
                value={formData.postiAuto === null ? "0" : formData.postiAuto}
                onChange={handleChange}
              >
                <option value="0">Nessuno</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formCaratteristicheSpeciali">
              <Form.Label>Caratteristiche Speciali</Form.Label>
              <Form.Control
                type="text"
                name="caratteristicheSpeciali"
                value={formData.caratteristicheSpeciali}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formLocazione">
              <Form.Label>Locazione</Form.Label>
              <Form.Control as="select" name="locazione" value={formData.locazione} onChange={handleChange}>
                <option value="false">Vendita</option>
                <option value="true">Affitto</option>
              </Form.Control>
            </Form.Group>
            {isMasterBroker && (
              <Form.Group controlId="formUser">
                <Form.Label>Assegna Utente</Form.Label>
                <Form.Control as="select" name="FkIdUser" value={formData.fkIdUser} onChange={handleChange}>
                  <option value="">Nessuno</option>
                  {staffMembers &&
                    staffMembers.map((staff) => (
                      <option key={staff.id} value={staff.id}>
                        {staff.nome} {staff.cognome}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
            )}
            <Form.Group controlId="formVetrina" className="mt-2">
              <Form.Check
                type="checkbox"
                label="Vetrina"
                name="vetrina"
                checked={formData.vetrina}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPubblicata">
              <Form.Check
                type="checkbox"
                label="Pubblicata"
                name="pubblicata"
                checked={formData.pubblicata}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="text-center my-3">
              <Button type="submit" className="bottoneSalvaModificaImmobile">
                Salva Modifiche
              </Button>
            </div>
          </Form>
        </Col>
        <Col md={12} lg={7} xl={6}>
          <div className="mb-3">
            <label htmlFor="file-upload" className="customFileModificaImmobile">
              Scegli File
            </label>
            <input
              id="file-upload"
              type="file"
              className="scegliFileModificaImmobile"
              onChange={handleFileSelect}
              ref={fileInputRef}
            />

            <Button onClick={handleImageUpload} disabled={!selectedFile} className="bottoneCaricaModificaImmobile ms-3">
              Carica Immagine
            </Button>
          </div>
          {fileName && <Alert variant="success">File selezionato: {fileName}</Alert>}
          <Row>
            {immagini.map((img) => (
              <Col md={6} key={img.idImmagine}>
                <Card>
                  <Card.Img variant="top" src={img.immagine} style={{ width: "100%", height: "auto" }} />
                  <Card.Body className="d-flex align-items-center justify-content-center">
                    {img.immagineCopertina ? (
                      <span className="copertinaImpostata">Copertina</span>
                    ) : (
                      <Button
                        className="bottoneImpostaCopertinaModifica"
                        onClick={() => handleSetCover(img.idImmagine)}
                      >
                        Imposta Copertina
                      </Button>
                    )}
                    <Button
                      onClick={() => handleRemoveImage(img.idImmagine)}
                      className="ms-3 bottoneRimuoviModificaImmobili"
                    >
                      Rimuovi
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
        <Modal show={showModal}>
          <Modal.Header closeButton>
            <Modal.Title>Immobile Modificato</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Immobile modificato con successo! <br /> Stai per essere reindirizzato alla Gestione Immobili
          </Modal.Body>
        </Modal>
      </Row>
    </Container>
  );
};

export default ModificaImmobile;

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createImmobile, fetchStaffMembersCreate } from "../../redux/actions/creaImmobileAction";
import { Form, Button, Col, Row, Container, Modal, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CreaImmobile() {
  const dispatch = useDispatch();
  const { staffMembers } = useSelector((state) => state.creaStaff);
  const user = JSON.parse(localStorage.getItem("user"));
  const isMasterBroker = user && user.role === "Master Broker";
  const [selectedImages, setSelectedImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [missingFields, setMissingFields] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [inputKey, setInputKey] = useState(Date.now());
  const [coverImageIndex, setCoverImageIndex] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMasterBroker) {
      dispatch(fetchStaffMembersCreate());
    }
  }, [dispatch, isMasterBroker]);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => setShowModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  const [immobile, setImmobile] = useState({
    titolo: "",
    descrizione: "",
    prezzo: 0,
    tipoProprietà: "Residenziale",
    comune: "",
    indirizzo: "",
    camereDaLetto: 0,
    bagni: 1,
    cucina: "Angolo Cottura",
    sala: "",
    altriVani: "",
    metratura: 0,
    box: 0,
    postiAuto: 0,
    caratteristicheSpeciali: "",
    vetrina: false,
    pubblicata: false,
    locazione: false,
    FkIdUser: "",
  });

  const fieldsLabels = {
    titolo: "Titolo",
    descrizione: "Descrizione",
    prezzo: "Prezzo",
    tipoProprietà: "Tipo Proprietà",
    comune: "Comune",
    indirizzo: "Indirizzo",
    camereDaLetto: "Camere da Letto",
    bagni: "Bagni",
    cucina: "Cucina",
    sala: "Sala",
    altriVani: "Altri Vani",
    metratura: "Metratura",
  };

  const requiredFields = [
    "titolo",
    "descrizione",
    "prezzo",
    "tipoProprietà",
    "comune",
    "indirizzo",
    "camereDaLetto",
    "bagni",
    "cucina",
    "sala",
    "altriVani",
    "metratura",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setImmobile({
      ...immobile,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const allFiles = [...selectedImages, ...newFiles];
    setSelectedImages(allFiles);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
    if (selectedImages.length === 0 && newFiles.length > 0) {
      setCoverImageIndex(0);
    }
    e.target.value = null;
  };

  const handleClickFileInput = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);

    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const formData = new FormData();
    Object.keys(immobile).forEach((key) => {
      formData.append(key, immobile[key]);
    });

    selectedImages.forEach((image, index) => {
      formData.append("ImmaginiCasa", image);
      formData.append("ImmagineCopertina", index === coverImageIndex);
    });

    dispatch(createImmobile(formData)).then(() => {
      setSelectedImages([]);
      setPreviews([]);
      setInputKey(Date.now());
      navigate("/GestioneImmobili");
    });
  };

  const validateForm = () => {
    const missing = requiredFields.filter((field) => !immobile[field]);
    if (missing.length > 0) {
      setMissingFields(missing.map((field) => fieldsLabels[field]));
      setShowModal(true);
      return false;
    }

    if (selectedImages.length === 0) {
      setMissingFields(["Almeno un'immagine"]);
      setShowModal(true);
      return false;
    }

    return true;
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-md-center">
        <Col md={12} lg={5} xl={6}>
          <h2 className="titoloCreaImmobile">Aggiungi un nuovo Immobile</h2>
          <Form onSubmit={handleSubmit} className="formAggiungiImmobile">
            <Form.Group controlId="formTitolo">
              <Form.Label>Titolo</Form.Label>
              <Form.Control type="text" name="titolo" value={immobile.titolo} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formDescrizione">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descrizione"
                value={immobile.descrizione}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPrezzo">
              <Form.Label>Prezzo</Form.Label>
              <Form.Control type="number" name="prezzo" value={immobile.prezzo} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formTipoProprietà">
              <Form.Label>Tipo Proprietà</Form.Label>
              <Form.Control as="select" name="tipoProprietà" value={immobile.tipoProprietà} onChange={handleChange}>
                <option value="Residenziale">Residenziale</option>
                <option value="Commerciale">Commerciale</option>
                <option value="Terreni">Terreni</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formComune">
              <Form.Label>Comune</Form.Label>
              <Form.Control type="text" name="comune" value={immobile.comune} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formIndirizzo">
              <Form.Label>Indirizzo</Form.Label>
              <Form.Control type="text" name="indirizzo" value={immobile.indirizzo} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formCamereDaLetto">
              <Form.Label>Camere da Letto</Form.Label>
              <Form.Control type="number" name="camereDaLetto" value={immobile.camereDaLetto} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formBagni">
              <Form.Label>Bagni</Form.Label>
              <Form.Control type="number" name="bagni" value={immobile.bagni} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formCucina">
              <Form.Label>Cucina</Form.Label>
              <Form.Control as="select" name="cucina" value={immobile.cucina} onChange={handleChange}>
                <option value="Angolo Cottura">Angolo Cottura</option>
                <option value="Cucinotto">Cucinotto</option>
                <option value="Cucina Semi-abitabile">Cucina Semi-abitabile</option>
                <option value="Cucina Abitabile">Cucina Abitabile</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formSala">
              <Form.Label>Sala</Form.Label>
              <Form.Control type="text" name="sala" value={immobile.sala} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formMetratura">
              <Form.Label>Metratura</Form.Label>
              <Form.Control type="number" name="metratura" value={immobile.metratura} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formAltriVani">
              <Form.Label>Altri Vani</Form.Label>
              <Form.Control type="text" name="altriVani" value={immobile.altriVani} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formBox">
              <Form.Label>Box</Form.Label>
              <Form.Control as="select" name="box" value={immobile.box} onChange={handleChange}>
                <option value="0">Nessuno</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formPostiAuto">
              <Form.Label>Posti Auto</Form.Label>
              <Form.Control as="select" name="postiAuto" value={immobile.postiAuto} onChange={handleChange}>
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
                value={immobile.caratteristicheSpeciali}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formLocazione">
              <Form.Label>Locazione</Form.Label>
              <Form.Control as="select" name="locazione" value={immobile.locazione} onChange={handleChange}>
                <option value="false">Vendita</option>
                <option value="true">Affitto</option>
              </Form.Control>
            </Form.Group>
            {isMasterBroker && (
              <Form.Group controlId="formUser">
                <Form.Label>Assegna Utente</Form.Label>
                <Form.Control as="select" name="FkIdUser" value={immobile.FkIdUser} onChange={handleChange}>
                  <option value="">Nessuno</option>
                  {staffMembers.map((staff) => (
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
                checked={immobile.vetrina}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPubblicata">
              <Form.Check
                type="checkbox"
                label="Pubblicata"
                name="pubblicata"
                checked={immobile.pubblicata}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="text-center my-3">
              <Button className="bottoneInserisciImmobile" type="submit">
                Inserisci Immobile
              </Button>
            </div>
          </Form>
        </Col>
        <Col md={12} lg={7} xl={6}>
          <div className="mt-2">
            <h4 className="immaginiCreaImmobile mb-2">Immagini</h4>
            <Button className="customFileCreaImmobile mb-3" onClick={handleClickFileInput}>
              Scegli File
            </Button>
            <input
              type="file"
              multiple
              name="immaginiCasa"
              onChange={handleImageChange}
              key={inputKey}
              ref={fileInputRef}
              style={{ display: "none" }} // Nasconde l'input file
            />
            <Row>
              {previews.map((preview, index) => (
                <Col md={6} key={index}>
                  <Card>
                    <Card.Img variant="top" src={preview} style={{ width: "100%", height: "auto" }} />
                    <Card.Body>
                      <Form.Check
                        type="radio"
                        label="Imposta come Copertina"
                        name="coverImage"
                        checked={index === coverImageIndex}
                        onChange={() => setCoverImageIndex(index)}
                      />
                      <div className="mb-3 text-center">
                        <Button className="bottoneRimuoviCreaImmobile" onClick={() => handleRemoveImage(index)}>
                          Rimuovi
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Campi mancanti</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {missingFields.length > 0 && <p>Compila i seguenti campi: {missingFields.join(", ")}</p>}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default CreaImmobile;

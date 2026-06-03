import { useState } from "react";

/**
 * Custom hook per gestire upload file con preview
 * @param {Object} options - Opzioni di configurazione
 * @returns {Object} - { file, preview, handleFileChange, clearFile, error }
 */
export const useFileUpload = (options = {}) => {
  const { maxSize = 5 * 1024 * 1024, allowedTypes = [] } = options;
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError(null);

    if (!selectedFile) {
      clearFile();
      return;
    }

    // Validazione dimensione
    if (maxSize && selectedFile.size > maxSize) {
      setError(`Il file è troppo grande. Dimensione massima: ${maxSize / 1024 / 1024}MB`);
      clearFile();
      return;
    }

    // Validazione tipo
    if (allowedTypes.length > 0 && !allowedTypes.includes(selectedFile.type)) {
      setError(`Tipo di file non supportato. Tipi consentiti: ${allowedTypes.join(", ")}`);
      clearFile();
      return;
    }

    setFile(selectedFile);

    // Crea preview per immagini
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setError(null);
  };

  return {
    file,
    preview,
    error,
    handleFileChange,
    clearFile,
  };
};

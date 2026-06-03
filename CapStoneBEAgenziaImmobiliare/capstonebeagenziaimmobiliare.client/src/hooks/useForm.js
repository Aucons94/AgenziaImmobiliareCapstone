import { useState } from "react";

/**
 * Custom hook per gestire lo stato dei form
 * @param {Object} initialValues - Valori iniziali del form
 * @returns {Object} - { values, handleChange, setValues, resetForm }
 */
export const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    handleChange,
    setValues,
    resetForm,
  };
};

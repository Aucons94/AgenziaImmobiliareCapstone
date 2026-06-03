import { useState } from "react";

/**
 * Custom hook per gestire apertura/chiusura modali
 * @param {boolean} initialState - Stato iniziale del modale
 * @returns {Object} - { isOpen, open, close, toggle }
 */
export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};

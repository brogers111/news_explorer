import { useCallback, useState } from "react";

export const useModal = (initialState = "") => {
  const [activeModal, setActiveModal] = useState(initialState);

  const handleModalOpen = (modalType) => {
    setActiveModal(modalType);
  };

  const closeActiveModal = useCallback(() => {
    setActiveModal("");
  }, []);

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal_opened")) {
      closeActiveModal();
    }
  };

  return { activeModal, handleModalOpen, closeActiveModal, handleOutsideClick };
};

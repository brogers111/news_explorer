import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterSuccessModal.css";

function RegisterSuccessModal({ activeModal, closeActiveModal, handleOutsideClick, handleModalOpen }) {

    const handleLoginModalOpen = () => {
        handleModalOpen("login");
    }

    return (
        <ModalWithForm 
            title="Registration successfully completed"
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleOutsideClick={handleOutsideClick}
        >
            <button onClick={handleLoginModalOpen} className="modal__register-complete-button">Sign in</button>
        </ModalWithForm>
    );
}

export default RegisterSuccessModal;
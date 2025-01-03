import "./ModalWithForm.css";

function ModalWithForm({ children, buttonText, title, activeModal, closeActiveModal, handleOutsideClick, onSubmit, isFormValid, secondaryButtonText, handleModalOpen, setAuthError }) {
    
    const handleSecondaryButtonClick = () => {
        setAuthError("");
        if (activeModal === "signup") {
            handleModalOpen("login");
        } else if (activeModal === "login") {
            handleModalOpen("signup");
        }
    };

    return(
        <div className={`modal ${["signup", "login", "register-complete"].includes(activeModal) ? "modal_opened" : ""}`} onClick={handleOutsideClick}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal__title">{title}</h2>
                <button onClick={closeActiveModal} type="button" className="modal__close"></button>
                <form onSubmit={onSubmit} className="modal__form">
                    {children}
                    { activeModal !== "register-complete" ? (
                        <div className="modal__submit-buttons">
                            <button type="submit" className={`modal__submit ${!isFormValid ? "modal__submit_type_disabled" : ""}`} disabled={!isFormValid}>{buttonText}</button>
                            {["signup", "login"].includes(activeModal) && (
                                <button type="button" className="modal__submit-secondary" onClick={handleSecondaryButtonClick}>
                                    <span className="modal__submit-secondary-or">or</span>{secondaryButtonText}
                                </button>
                            )}
                        </div>
                    ) : (
                        <></>
                    )}
                </form>
            </div>
        </div>
    )
}

export default ModalWithForm; 
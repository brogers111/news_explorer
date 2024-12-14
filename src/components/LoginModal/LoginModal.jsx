import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import "./LoginModal.css";

function LoginModal({ activeModal, closeActiveModal, handleOutsideClick, isLoading, handleModalOpen }) {
    const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            closeActiveModal();
        }
    };

    useEffect(() => {
        if (activeModal) {
            resetForm();
        }
    }, [activeModal, resetForm]);

    return (
        <ModalWithForm
            title="Sign in"
            buttonText={isLoading ? "Loading..." : "Sign in"}
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleOutsideClick={handleOutsideClick}
            handleModalOpen={handleModalOpen}
            onSubmit={handleSubmit}
            isFormValid={isValid}
            secondaryButtonText="Sign up"
        >
            <label htmlFor="email" className="modal__label">
                Email
                <input
                    type="email"
                    name="email"
                    className="modal__input"
                    id="email"
                    placeholder="Enter email"
                    value={values.email || ""}
                    onChange={handleChange}
                    required
                />
                {errors.email && <span className="modal__error">{errors.email}</span>}
            </label>
            <label htmlFor="password" className="modal__label">
                Password
                <input
                    type="password"
                    name="password"
                    className="modal__input"
                    id="password"
                    placeholder="Enter password"
                    value={values.password || ""}
                    onChange={handleChange}
                    required
                />
                {errors.password && <span className="modal__error">{errors.password}</span>}
            </label>
        </ModalWithForm>
    );
}

export default LoginModal;
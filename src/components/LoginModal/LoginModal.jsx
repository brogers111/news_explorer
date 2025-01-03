import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import "./LoginModal.css";

function LoginModal({ activeModal, closeActiveModal, handleOutsideClick, handleModalOpen, handleLogin, authError, setAuthError }) {
    const { isLoggedInLoading } = useContext(CurrentUserContext);
    const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            handleLogin(values);
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
            buttonText={isLoggedInLoading ? "Loading..." : "Sign in"}
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleOutsideClick={handleOutsideClick}
            handleModalOpen={handleModalOpen}
            onSubmit={handleSubmit}
            isFormValid={isValid}
            secondaryButtonText="Sign up"
            setAuthError={setAuthError}
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
                {authError && <span className="modal__error"> {authError}</span>}
            </label>
        </ModalWithForm>
    );
}

export default LoginModal;
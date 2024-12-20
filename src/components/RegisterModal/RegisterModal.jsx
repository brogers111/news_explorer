import { useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import "./RegisterModal.css";

function RegisterModal({ activeModal, closeActiveModal, handleOutsideClick, handleModalOpen, handleRegistration }) {
    const { isLoggedInLoading } = useContext(CurrentUserContext);
    const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            handleRegistration(values);
        }
    };

    useEffect(() => {
        if (activeModal) {
            resetForm();
        }
    }, [activeModal, resetForm]);

    return (
        <ModalWithForm
            title="Sign up"
            buttonText={isLoggedInLoading ? "Loading..." : "Sign up"}
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleOutsideClick={handleOutsideClick}
            handleModalOpen={handleModalOpen}
            onSubmit={handleSubmit}
            isFormValid={isValid}
            secondaryButtonText="Sign in"
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
            <label htmlFor="username" className="modal__label">
                Username
                <input
                    type="text"
                    name="username"
                    className="modal__input"
                    id="username"
                    placeholder="Enter your username"
                    value={values.username || ""}
                    onChange={handleChange}
                    required
                />
                {errors.username && <span className="modal__error">{errors.username}</span>}
            </label>
        </ModalWithForm>
    );
}

export default RegisterModal;
import { addUser } from './userManagement.js';

document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');

    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirmPassword');

    const textRegex = /^[a-zA-Z\s]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateField(field, regex) {
        field.addEventListener('keyup', function () {
            if (!regex.test(field.value)) {
                field.setCustomValidity('Caracteres inválidos encontrados.');
                field.classList.add('is-invalid');
            } else {
                field.setCustomValidity('');
                field.classList.remove('is-invalid');
            }
        });
    }

    validateField(nameField, textRegex);
    validateField(emailField, emailRegex);
    validateField(passwordField, /.{6,}/);
    validateField(confirmPasswordField, /.{6,}/);

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = registerForm.name.value;
            const email = registerForm.email.value;
            const password = registerForm.password.value;
            const confirmPassword = registerForm.confirmPassword.value;

            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            if (registerForm.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                addUser(email, password, name);
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
                window.location.href = 'index.html';
            }

            registerForm.classList.add('was-validated');
        });
    }
});

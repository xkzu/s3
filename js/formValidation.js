import { authenticateUser, changeUserPassword } from './userManagement.js';

(function() {
    'use strict';
    window.addEventListener('load', function() {
        var forms = document.getElementsByClassName('needs-validation');
        Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = event.target[0].value;
            const password = event.target[1].value;

            const user = authenticateUser(email, password);
            if (user) {
                alert('Login exitoso');
                localStorage.setItem('user', JSON.stringify(user));
                updateLoginState();
            } else {
                alert('Correo o contraseña incorrectos');
            }
        });
    }
});

function updateLoginState() {
    const user = localStorage.getItem('user');
    const loginFormContainer = document.getElementById('loginFormContainer');

    if (user) {
        const userName = JSON.parse(user).name;
        loginFormContainer.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    Bienvenido, ${userName}
                </button>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li><a class="dropdown-item" href="#" id="changePassword">Cambiar Contraseña</a></li>
                    <li><a class="dropdown-item" href="#" id="logout">Desconectarse</a></li>
                </ul>
            </div>
        `;

        document.getElementById('logout').addEventListener('click', function() {
            localStorage.removeItem('user');
            updateLoginState();
        });

        document.getElementById('changePassword').addEventListener('click', function() {
            showChangePasswordForm();
        });
    } else {
        loginFormContainer.innerHTML = `
            <form class="d-flex" id="loginForm">
                <input class="form-control me-2 bg-dark text-light" type="email" placeholder="example@gmail.com" aria-label="Email" required>
                <input class="form-control me-2 bg-dark text-light" type="password" placeholder="password" aria-label="Contraseña" required>
                <button class="btn btn-outline-success" type="submit">Login</button>
            </form>
        `;

        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const email = event.target[0].value;
                const password = event.target[1].value;

                const user = authenticateUser(email, password);
                if (user) {
                    alert('Login exitoso');
                    localStorage.setItem('user', JSON.stringify(user));
                    updateLoginState();
                } else {
                    alert('Correo o contraseña incorrectos');
                }
            });
        }
    }
}

function showChangePasswordForm() {
    const changePasswordModal = `
        <div class="modal" id="changePasswordModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content bg-dark text-light">
                    <div class="modal-header">
                        <h5 class="modal-title">Cambiar Contraseña</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="changePasswordForm">
                            <div class="form-group">
                                <label for="newPassword">Nueva Contraseña:</label>
                                <input type="password" class="form-control bg-dark text-light" id="newPassword" name="newPassword" required>
                                <div class="invalid-feedback">Por favor, ingresa la nueva contraseña.</div>
                            </div>
                            <div class="form-group">
                                <label for="confirmNewPassword">Confirmar Nueva Contraseña:</label>
                                <input type="password" class="form-control bg-dark text-light" id="confirmNewPassword" name="confirmNewPassword" required>
                                <div class="invalid-feedback">Por favor, confirma la nueva contraseña.</div>
                            </div>
                            <button type="submit" class="btn btn-primary mt-3">Cambiar Contraseña</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', changePasswordModal);
    $('#changePasswordModal').modal('show');

    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const newPassword = changePasswordForm.newPassword.value;
            const confirmNewPassword = changePasswordForm.confirmNewPassword.value;

            if (newPassword !== confirmNewPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            const user = JSON.parse(localStorage.getItem('user'));
            changeUserPassword(user.email, newPassword);
            alert('Contraseña cambiada con éxito.');
            $('#changePasswordModal').modal('hide');
            document.getElementById('changePasswordModal').remove();
        });
    }
}

export { updateLoginState };

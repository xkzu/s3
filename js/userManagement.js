const usersKey = 'users';

// Función para obtener los usuarios del local storage
function getUsers() {
    return JSON.parse(localStorage.getItem(usersKey)) || [];
}

// Función para guardar los usuarios en el local storage
function saveUsers(users) {
    localStorage.setItem(usersKey, JSON.stringify(users));
}

// Función para agregar un usuario
export function addUser(email, password, name) {
    const users = getUsers();
    users.push({ email, password, name });
    saveUsers(users);
}

// Función para autenticar un usuario
export function authenticateUser(email, password) {
    const users = getUsers();
    const user = users.find(user => user.email === email && user.password === password);
    return user;
}

// Función para cambiar la contraseña de un usuario
export function changeUserPassword(email, newPassword) {
    const users = getUsers();
    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        saveUsers(users);
    }
}

// Agregar un usuario de ejemplo (si es necesario)
if (!getUsers().length) {
    addUser('alva.vegap@duocuc.cl', 'asdf1234', 'Álvaro Vega');
}

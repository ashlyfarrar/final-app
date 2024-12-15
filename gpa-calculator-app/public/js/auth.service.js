const doLogin = async (e) => {
    e.preventDefault();
    const username = document.getElementById('formInputUsername').value;
    const password = document.getElementById('formInputPassword').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (data.auth && data.access_token) {
            localStorage.setItem('authToken', data.access_token);
            window.location.href = 'calculator.html';
        } else {
            alert('Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Login failed. Please try again later.');
    }
};

const doRegister = async (e) => {
    e.preventDefault();
    const username = document.getElementById('formInputUsernameReg').value;
    const email = document.getElementById('formInputEmailReg').value;
    const password = document.getElementById('formInputPasswordReg').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        if (data.msg === 'New user created!') {
            window.location.href = 'login.html';
            alert('Registered successfully. Please login.');
        } else {
            alert('Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Registration failed. Please try again later.');
    }
};

const doLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('authToken');
    window.location.href = 'login.html';
};

document.addEventListener('DOMContentLoaded', (event) => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const authButton = document.getElementById('authButton');

    if (loginForm) {
        loginForm.addEventListener('submit', doLogin);
    }
    if (registerForm) {
        registerForm.addEventListener('submit', doRegister);
    }
    if (authButton) {
        authButton.addEventListener('click', (e) => {
            e.preventDefault();
            doLogout(e);
        });
    }
});
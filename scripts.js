document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    
    if (username === 'eren' && password === 'zeynep') {
        window.location.href = 'dist/index.html';
    } else {
        errorMessage.textContent = 'Kullanıcı adı veya şifre yanlış.';
        document.getElementById('password').value = ''; // Clear the password field
    }
});

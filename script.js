let users = JSON.parse(localStorage.getItem('users')) || {};

function login() {
    const phone = document.getElementById('phone').value;
    const pin = document.getElementById('pin').value;

    if (users[phone] && users[phone].pin === pin) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('game-section').style.display = 'block';
        document.getElementById('user-balance').innerText = users[phone].balance;
    } else {
        alert('Invalid phone number or PIN');
    }
}

function spinWheel() {
    const result = Math.floor(Math.random() * 37);
    alert(`The wheel landed on ${result}`);
    // Add game logic here
}

function addBalance() {
    const phone = document.getElementById('admin-phone').value;
    const amount = parseInt(document.getElementById('amount').value);

    if (users[phone]) {
        users[phone].balance += amount;
        localStorage.setItem('users', JSON.stringify(users));
        alert(`Added ${amount} MMK to ${phone}`);
    } else {
        alert('User not found');
    }
}

function deductBalance() {
    const phone = document.getElementById('admin-phone').value;
    const amount = parseInt(document.getElementById('amount').value);

    if (users[phone] && users[phone].balance >= amount) {
        users[phone].balance -= amount;
        localStorage.setItem('users', JSON.stringify(users));
        alert(`Deducted ${amount} MMK from ${phone}`);
    } else {
        alert('Insufficient balance or user not found');
    }
          }

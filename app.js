
const adminEmail = "admin@gmail.com";
const adminPassword = "admin@123";

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");
const message = document.getElementById("message");
const togglePassword = document.getElementById("togglePassword");


// Show / Hide Password

togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        togglePassword.textContent = "Hide";

    } else {

        passwordInput.type = "password";
        togglePassword.textContent = "Show";

    }

});


// Admin Login

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    loginBtn.disabled = true;
    loginBtn.textContent = "Checking...";
    message.textContent = "";

    setTimeout(function () {

        if (email === adminEmail && password === adminPassword) {

            message.style.color = "green";
            message.textContent = "Login Successful! Welcome Admin.";

            loginBtn.textContent = "Login Successful";

            setTimeout(function () {

                  window.location.href = "./Admin Dashboard/index.html";

                
                

            }, 1000);

        } else {

            message.style.color = "red";
            message.textContent = "Invalid Email or Password!";

            loginBtn.disabled = false;
            loginBtn.textContent = "Login to Dashboard";

        }

    }, 1000);

});

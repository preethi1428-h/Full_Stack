document.addEventListener("DOMContentLoaded", function () {

        const authSection = document.getElementById("authSection");
        const userData = JSON.parse(localStorage.getItem("loggedInUser"));

        if (userData) {
            authSection.innerHTML = `
      <button class="logout-btn" onclick="logout()">LOGOUT</button>
    `;
        } else {
            authSection.innerHTML = `
      <a href="../Assesment/login.html" class="login-btn">LOGIN</a>
    `;
        }

        window.logout = function () {
            localStorage.removeItem("loggedInUser");
            alert("Logged out successfully!");
            window.location.reload();
        };

    });
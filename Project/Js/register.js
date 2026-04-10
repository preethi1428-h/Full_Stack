
        const togglePassword = document.getElementById("togglePassword");
        const passwordInput = document.getElementById("password");

        togglePassword.className = "eye-icon fas fa-eye";

        togglePassword.addEventListener("click", function () {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                togglePassword.classList.remove("fa-eye");
                togglePassword.classList.add("fa-eye-slash");
            } else {
                passwordInput.type = "password";
                togglePassword.classList.remove("fa-eye-slash");
                togglePassword.classList.add("fa-eye");
            }
        });

        document.getElementById("signupForm").addEventListener("submit", async function (e) {

            e.preventDefault();

            const fullname = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            const nameError = document.getElementById("nameError");
            const phoneError = document.getElementById("phoneError");
            const emailError = document.getElementById("emailError");
            const passwordError = document.getElementById("passwordError");

            [nameError, phoneError, emailError, passwordError].forEach(el => el.textContent = "");

            let valid = true;

            if (fullname.length < 2) {
                nameError.textContent = "Name must be at least 2 characters";
                valid = false;
            }

            const phonePattern = /^[6-9]\d{9}$/;
            if (!phonePattern.test(phone)) {
                phoneError.textContent = "Enter valid 10-digit phone number";
                valid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                emailError.textContent = "Enter valid email address";
                valid = false;
            }

            if (password.length < 8) {
                passwordError.textContent = "Password must be at least 8 characters";
                valid = false;
            }

            if (!valid) return;

            try {
                const response = await fetch("https://full-stack-backend-yuzh.onrender.com/auth/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: fullname,
                        phone: phone,
                        email: email,
                        password: password
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Registration Successful ");
                    window.location.href = "./login.html";
                } else {
                    alert(data.detail || "Registration failed");
                }

            } catch (error) {
                console.error(error);
                alert("Backend server OFF ");
            }

        });

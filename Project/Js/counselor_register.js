document.getElementById("registerForm").addEventListener("submit", function (e) {

            e.preventDefault();

            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let specialization = document.getElementById("specialization").value;
            let password = document.getElementById("password").value.trim();
            let confirmPassword = document.getElementById("confirmPassword").value.trim();


            let nameError = document.getElementById("nameError");
            let emailError = document.getElementById("emailError");
            let specError = document.getElementById("specError");
            let passwordError = document.getElementById("passwordError");
            let confirmError = document.getElementById("confirmError");

            // Clear previous errors
            nameError.innerText = "";
            emailError.innerText = "";
            specError.innerText = "";
            passwordError.innerText = "";
            confirmError.innerText = "";

            let valid = true;

            // Empty Form Check
            if (name === "" && email === "" && specialization === "" && password === "" && confirmPassword === "") {
                alert("Please fill all the fields");
                return;
            }

            // Name validation
            const namePattern = /^[A-Za-z ]+$/;

            if (name === "") {
                nameError.innerText = "Name is required";
                valid = false;
            }
            else if (name.length < 2) {
                nameError.innerText = "Name must be at least 2 characters";
                valid = false;
            }
            else if (!namePattern.test(name)) {
                nameError.innerText = "Only letters allowed";
                valid = false;
            }

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email === "") {
                emailError.innerText = "Email is required";
                valid = false;
            }
            else if (!emailPattern.test(email)) {
                emailError.innerText = "Enter valid email";
                valid = false;
            }

            //  Specialization validation
            if (specialization === "") {
                specError.innerText = "Select specialization";
                valid = false;
            }

            //  Password validation
            if (password === "") {
                passwordError.innerText = "Password is required";
                valid = false;
            }
            else if (password.length < 8) {
                passwordError.innerText = "Password must be at least 8 characters";
                valid = false;
            }

            //  Confirm password validation
            if (confirmPassword === "") {
                confirmError.innerText = "Confirm password required";
                valid = false;
            }
            else if (password !== confirmPassword) {
                confirmError.innerText = "Passwords do not match";
                valid = false;
            }

            if (!valid) return;

            //  Backend Connection
            //  specialization itself is service_id
            let serviceId = parseInt(specialization);

            fetch("https://full-stack-backend-yuzh.onrender.com/provider/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    specialization: specialization,
                    password: password,
                    service_id: serviceId
                })
            })
                .then(res => {
                    if (!res.ok) {
                        return res.json().then(err => { throw err; });
                    }
                    return res.json();
                })
                .then(data => {
                    alert("Registration Successful ✅ ");
                    window.location.href = "./counselor-login.html";
                })
                .catch(error => {
                    alert(error.detail || "Registration failed ❌");
                    console.error(error);
                });

        });


        //  Password Toggle
        const togglePassword = document.getElementById("togglePassword");
        const passwordInput = document.getElementById("password");

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

        //  Confirm Password Toggle
        const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
        const confirmPasswordInput = document.getElementById("confirmPassword");

        toggleConfirmPassword.addEventListener("click", function () {
            if (confirmPasswordInput.type === "password") {
                confirmPasswordInput.type = "text";
                toggleConfirmPassword.classList.remove("fa-eye");
                toggleConfirmPassword.classList.add("fa-eye-slash");
            } else {
                confirmPasswordInput.type = "password";
                toggleConfirmPassword.classList.remove("fa-eye-slash");
                toggleConfirmPassword.classList.add("fa-eye");
            }
        });

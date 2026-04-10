// PASSWORD SHOW / HIDE
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

    // LOGIN + BACKEND CONNECT
    document.getElementById("loginForm").addEventListener("submit", function (e) {
      e.preventDefault();

      let email = document.getElementById("email").value.trim();
      let password = passwordInput.value.trim();

      let emailError = document.getElementById("emailError");
      let passwordError = document.getElementById("passwordError");

      emailError.innerText = "";
      passwordError.innerText = "";

      let valid = true;

      // Email validation
      let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email === "") {
        emailError.innerText = "Email is required";
        valid = false;
      } else if (!emailPattern.test(email)) {
        emailError.innerText = "Enter valid email address";
        valid = false;
      }

      // Password validation
      if (password === "") {
        passwordError.innerText = "Password is required";
        valid = false;
      } else if (password.length < 8) {
        passwordError.innerText = "Password must be at least 8 characters";
        valid = false;
      }

      if (!valid) return;

      // Backend API Call
      fetch("https://full-stack-backend-yuzh.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Invalid credentials");
          }
          return response.json();
        })
        .then(data => {
          alert("Login Successful ✅");

          localStorage.setItem("user_id", data.id);
          localStorage.setItem("user_email", data.email);
          localStorage.setItem("isLoggedIn", "true");

        
          localStorage.setItem("loggedInUser", JSON.stringify({
            id: data.id,
            email: data.email
          }));

          window.location.href = "../../index.html";
        })
        .catch(error => {
          alert("Invalid Email or Password ❌");
          console.error(error);
        });
    });
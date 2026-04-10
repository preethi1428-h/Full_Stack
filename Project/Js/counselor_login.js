// 🔐 Password Toggle
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


// 🔥 Backend Connected Login
const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

loginForm.addEventListener("submit", function (e) {

  e.preventDefault();

  let email = document.getElementById("email").value.trim();
  let password = passwordInput.value.trim();

  errorMsg.innerText = "";

  if (email === "") {
    errorMsg.innerText = "Email is required";
    return;
  }

  if (password.length < 8) {
    errorMsg.innerText = "Password must be at least 8 characters";
    return;
  }

  fetch("https://full-stack-backend-yuzh.onrender.com/provider/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(res => {
    if (!res.ok) {
      throw new Error("Invalid credentials");
    }
    return res.json();
  })
  .then(data => {

    // Store session
    localStorage.setItem("provider_id", data.id);
    localStorage.setItem("provider_name", data.name);
    localStorage.setItem("provider_specialization", data.specialization);

    alert("Login Successful ");

    // Redirect (relative path correct)
    window.location.href = "./dashboard.html";

  })
  .catch(err => {
    errorMsg.innerText = "Invalid Email or Password";
    console.error(err);
  });

});

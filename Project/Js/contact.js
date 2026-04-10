 document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    // LOGIN / LOGOUT UI
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


    // CONTACT FORM SUBMIT
    form.addEventListener("submit", async function (e) {

      e.preventDefault();

      const name = document.querySelector("input[type='text']").value.trim();
      const email = document.querySelector("input[type='email']").value.trim();
      const message = document.querySelector("textarea").value.trim();

      let valid = true;

      // NAME VALIDATION (min 2 letters)
      const namePattern = /^[A-Za-z ]{2,}$/;

      if (!name) {

        alert("Name is required");
        valid = false;

      }
      else if (!namePattern.test(name)) {

        alert("Name must contain at least 2 letters and only alphabets");
        valid = false;

      }


      // EMAIL VALIDATION
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {

        alert("Email is required");
        valid = false;

      }
      else if (!emailPattern.test(email)) {

        alert("Enter valid email address");
        valid = false;

      }


      // MESSAGE VALIDATION (min 10 characters)
      if (!message) {

        alert("Message cannot be empty");
        valid = false;

      }
      else if (message.length < 10) {

        alert("Message must contain at least 10 characters");
        valid = false;

      }

      if (!valid) return;


      // SEND DATA TO BACKEND
      try {

        const response = await fetch("https://full-stack-backend-yuzh.onrender.com/contact/", {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name: name,
            email: email,
            message: message
          })

        });

        if (!response.ok) {

          alert("Error sending message");
          return;

        }

        alert("Message sent successfully!");

        form.reset();

      }
      catch (error) {

        alert("Server error. Check backend.");

      }

    });

  });

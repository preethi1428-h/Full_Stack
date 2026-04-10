document.addEventListener("DOMContentLoaded", function () {

      const authSection = document.getElementById("authSection");
      const container = document.getElementById("appointmentContainer");

      const userData = JSON.parse(localStorage.getItem("loggedInUser"));

      if (!userData) {
        alert("Please login first");
        window.location.href = "../Assesment/login.html";
        return;
      }

      const userId = userData.id;

      //  Logout Button
      authSection.innerHTML = `
    <button class="logout-btn" onclick="logout()">LOGOUT</button>
  `;

      window.logout = function () {
        localStorage.removeItem("loggedInUser");
        alert("Logged out successfully!");
        window.location.href = "../Assesment/login.html";
      };

      //  Load Appointments
      container.innerHTML = "<p>Loading appointments...</p>";

      fetch(`https://full-stack-backend-yuzh.onrender.com/appointments/my/${userId}`)
        .then(res => {
          if (!res.ok) throw new Error("Server error");
          return res.json();
        })
        .then(data => {

          container.innerHTML = "";

          if (!data || data.length === 0) {
            container.innerHTML = "<p class='no-data'>No appointments found.</p>";
            return;
          }

          data.forEach(app => {

            const statusClass =
              app.status === "Accepted" ? "accepted" :
                app.status === "Rejected" ? "rejected" : "pending";

            container.innerHTML += `
          <div class="appointment-card">
            <div class="card-left">
             <h3>${app.provider?.name || "Counselor Not Assigned"}</h3>
              <p><strong>Service:</strong> ${app.service?.title || "Not Available"}</p>
              <p><strong>Date:</strong> ${app.date}</p>
              <p><strong>Time:</strong> ${app.time}</p>
            </div>

            <div class="card-right">
              <span class="status ${statusClass}">
                ${app.status}
              </span>
            </div>
          </div>
        `;
          });

        })
        .catch(error => {
          console.error(error);
          container.innerHTML = "<p class='error'>Error loading appointments.</p>";
        });

    });

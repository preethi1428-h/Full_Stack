    let appointments = [];

        // LOGIN CHECK
        const providerId = localStorage.getItem("provider_id");
        const providerName = localStorage.getItem("provider_name");

        if (!providerId) {
            alert("Please login first!");
            window.location.href = "../Assesment/counselor-login.html";
        }

        // SHOW PROVIDER NAME

        const serviceMap = {
            1: "Alcohol De-Addiction",
            2: "Smoking De-Addiction",
            3: "Drug De-Addiction"
        };
        document.querySelector(".welcome-card h2 span").textContent =
            providerName || "Counselor";

        const providerSpecialization = localStorage.getItem("provider_specialization");

        document.getElementById("specialization").textContent =
            serviceMap[providerSpecialization] || "Not Available";

        // LOAD APPOINTMENTS FOR THIS PROVIDER
        async function loadAppointments() {

            try {

                const response = await fetch(
                    `https://full-stack-backend-yuzh.onrender.com/appointments/provider/${providerId}`
                );

                appointments = await response.json();

                console.log("Appointments:", appointments);

                renderTable();

            } catch (error) {

                console.error("Failed to load appointments:", error);

                document.getElementById("appointmentsTable").innerHTML =
                    `<tr>
                <td colspan="7" style="text-align:center;padding:2rem;color:#f56565">
                    Failed to load appointments. Backend running?
                </td>
            </tr>`;
            }
        }


        // RENDER TABLE
        function renderTable() {

            const tbody = document.getElementById("appointmentsTable");

            if (!appointments.length) {

                tbody.innerHTML =
                    `<tr>
                <td colspan="7" style="text-align:center;padding:2rem">
                    No appointments found
                </td>
            </tr>`;

                updateSummary();
                return;
            }

            tbody.innerHTML = appointments.map(app => `

        <tr data-appointment-id="${app.id}">

            <td>${app.name}</td>

            <td>${app.phone}</td>

            <td>${app.date}</td>

            <td>${app.time}</td>

            <td>${app.service?.title || "Not Available"}</td>

            <td>
                <span class="status ${getStatusClass(app.status)}">
                    ${app.status || "Pending"}
                </span>
            </td>

            <td>

                ${isPending(app.status) ? `

                    <button class="accept-btn"
                        onclick="updateStatus(${app.id}, 'Accepted')">
                        Accept
                    </button>

                    <button class="reject-btn"
                        onclick="updateStatus(${app.id}, 'Rejected')">
                        Reject
                    </button>

                ` : `
                    <span style="color:${getStatusColor(app.status)}">
                        ✓ ${app.status}
                    </span>
                `}

            </td>

        </tr>

    `).join("");

            updateSummary();
        }


        // UPDATE STATUS
        async function updateStatus(appointmentId, statusText) {

            const endpoint =
                `https://full-stack-backend-yuzh.onrender.com/appointments/${appointmentId}/provider/${statusText.toLowerCase()}`;

            try {

                const response = await fetch(endpoint, {
                    method: "PATCH"
                });

                if (!response.ok) throw new Error("Update failed");

                const appointment = appointments.find(a => a.id == appointmentId);

                if (appointment) {
                    appointment.status = statusText;
                }

                renderTable();

            } catch (error) {

                console.error("Update failed:", error);

                alert("Failed to update status.");
            }
        }


        // STATUS CLASS
        function getStatusClass(status) {

            const lower = (status || "pending").toLowerCase();

            if (lower === "accepted") return "accepted";

            if (lower === "rejected") return "rejected";

            return "pending";
        }


        // STATUS COLOR
        function getStatusColor(status) {

            const lower = (status || "pending").toLowerCase();

            if (lower === "accepted") return "#48bb78";

            if (lower === "rejected") return "#f56565";

            return "#ed8936";
        }


        // CHECK PENDING
        function isPending(status) {

            return !status || status.toLowerCase() === "pending";
        }


        // SUMMARY
        function updateSummary() {

            const pendingCount =
                appointments.filter(a => isPending(a.status)).length;

            document.getElementById("summary").textContent =
                `Showing ${appointments.length} appointments. Pending: ${pendingCount}`;
        }


        // LOGOUT
        document.querySelector(".logout").addEventListener("click", function () {

            localStorage.removeItem("provider_id");
            localStorage.removeItem("provider_name");

            alert("Logged out!");

            window.location.href = "../Assesment/counselor-login.html";
        });


        // PAGE LOAD
        document.addEventListener("DOMContentLoaded", () => {

            loadAppointments();

            setInterval(loadAppointments, 30000);

        });
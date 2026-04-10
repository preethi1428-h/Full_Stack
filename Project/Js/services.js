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
  
          const contentData = {
  alcohol: {
    image: '../asserts/alcohol.img.service.jpg',
    content: `
      <h3>Alcohol</h3>
      <h2>Common Symptoms</h2>
      <p class="p">Strong cravings for alcohol</p>
      <p class="p">Inability to limit drinking</p>
      <p class="p">Developing a tolerance</p>
      <p class="p">Withdrawal symptoms when not drinking</p>
      <br>
      <h2>Long-term Effects</h2>
      <p class="p">Liver disease</p>
      <p class="p">Heart problems</p>
      <p class="p">Damaged relationships</p>
      <p class="p">Financial instability</p>
    `
  },

  smoking: {
    image: '../asserts/smoking3.jpg',
    content: `
      <h3>Smoking</h3>
      <h2>Common Symptoms</h2>
      <p class="p">Strong cravings for cigarettes</p>
      <p class="p">Shortness of breath</p>
      <p class="p">Frequent coughing</p>
      <p class="p">Difficulty quitting smoking</p>
      <br>
      <h2>Long-term Effects</h2>
      <p class="p">Lung cancer</p>
      <p class="p">Chronic respiratory diseases</p>
      <p class="p">Heart disease</p>
      <p class="p">Reduced overall health</p>
    `
  },

  drug: {
    image: '../asserts/injection_s.1.jpg',
    content: `
      <h3>Drug</h3>
      <h2>Common Symptoms</h2>
      <p class="p">Strong urge to use drugs</p>
      <p class="p">Loss of control over usage</p>
      <p class="p">Mood swings and behavior changes</p>
      <p class="p">Withdrawal symptoms</p>
      <br>
      <h2>Long-term Effects</h2>
      <p class="p">Damage to brain and organs</p>
      <p class="p">Mental health disorders</p>
      <p class="p">Addiction and dependency</p>
      <p class="p">Social and financial problems</p>
    `
  }
};
          function changeContent(type) {
            const data = contentData[type];
            document.getElementById('galleryImage').src = data.image;
            document.getElementById("right").innerHTML = data.content + '<a class="read-btn" href="./appointment.html">Appointment</a>';
          }


          changeContent('alcohol');

const contentData = {
      alcohol: {
        image: './Project/asserts/alcohol 5.jpg',
        title: 'ALCOHOL',
        text: 'It can be quite difficult to overcome an alcohol addiction. It may even seem impossible at times. However, this is not the case.No matter how intense your drinking or how powerless you feel, you can recover from alcoholism and alcohol abuse if you\'re ready to stop and willing to obtain the help you need.<br><br>You don\'t have to wait until you\'ve struck rock bottom to make a change; you may do it at any time. Our instructions can help you get started on the road to recovery, whether you want to stop drinking altogether or cut back to healthier levels.'
      },
      tablet: {
        image: './Project/asserts/smoking_img_vertical.jpg',
        title: 'SMOKING',
        text: 'It can be quite difficult to overcome a smoking addiction. It may even seem impossible at times. However, this is not the case. No matter how strong your cravings or how long you’ve been smoking, you can break free from nicotine addiction if you \'re ready to quit and willing to seek the support you need.<br><br>You don’t have to wait for serious health problems to make a change; you can start at any time. Our guidance can help you begin your journey toward a smoke-free life, whether your goal is to quit completely or gradually reduce your dependence.'
      },
      injection: {
        image: './Project/asserts/injection-hme.jpg',
        title: 'DRUG',
        text: 'Overcoming drug addiction can be extremely challenging, and at times it may feel overwhelming or impossible. However, recovery is always possible. No matter how severe your addiction or how trapped you may feel, you can regain control of your life if you\'re committed to change and open to getting help.<br><br>You don’t have to wait until things get worse to take action—you can choose recovery today. With the right support and guidance, you can begin your path toward a healthier, drug-free future, whether your aim is complete recovery or taking the first steps toward it.'
      }
    };

    function changeContent(type) {
      const data = contentData[type];
      document.getElementById('galleryImage').src = data.image;
      document.getElementById('contentTitle').textContent = data.title;
      document.getElementById('contentText').innerHTML = data.text;
    }

    document.addEventListener("DOMContentLoaded", function () {
      const hamburger = document.getElementById("hamburgerBtn");
      const nav = document.getElementById("mainNav");

      if (hamburger && nav) {
        hamburger.addEventListener("click", function () {
          nav.classList.toggle("active");
        });
      }
    });


    //login and logout

    document.addEventListener("DOMContentLoaded", function () {

      const authSection = document.getElementById("authSection");
      const userData = JSON.parse(localStorage.getItem("loggedInUser"));

      if (userData) {
        authSection.innerHTML = `
      <button class="logout-btn">LOGOUT</button>
    `;

        document.querySelector(".logout-btn").addEventListener("click", function () {
          localStorage.removeItem("loggedInUser");
          alert("Logged out successfully!");
          window.location.reload();
        });

      } else {
        authSection.innerHTML = `
      <a href="./Project/Assesment/login.html" class="login-btn" >LOGIN</a>
    `;
      }

    });

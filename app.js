document.addEventListener("DOMContentLoaded",function() {

  if (!localStorage.price) {
    const price = {
      mobil:5000,
      motor:3000
    }
    localStorage.setItem("price",JSON.stringify(price))
  }
  loginBtn.addEventListener("click",()=>{
    let field = document.querySelectorAll("input[name=username],input[name=password]");
    for (let elem of field) {
      elem.value = "";
    }
  })

  const loginNotValid =_=>{
    removeClassBtn()
    loginBtn.classList.add("d-block");
    logoutBtn.classList.add("d-none");
    btnParkIn.classList.add("d-none");
    btnParkOut.classList.add("d-none");
  }

  document.querySelector("#modal-price").addEventListener("shown.bs.modal",function() {
    document.querySelector("#modal-price form").mobil.value = JSON.parse(localStorage.getItem("price")).mobil
    document.querySelector("#modal-price form").motor.value = JSON.parse(localStorage.getItem("price")).motor
  })

  const loginAuth = (username,password) =>{

    if (username == "admin" && password == "admin") {
      sessionStorage.setItem("login",true);
      sessionStorage.setItem("type",username);
      alert("Berhasil login sebagai "+username);
    }else{
      let flag = false;
      operator.forEach((item, i) => {
        if (item.username == username && item.password == password) {
          sessionStorage.setItem("login",true);
          sessionStorage.setItem("type","operator");
          sessionStorage.setItem("username",username);
          alert("Berhasil login sebagai Operator "+ item.nama);
          flag = true;
        }
      });
      if (!flag) {
        alert("Username atau password yang anda masukan salah");
      }
    }
  }

  loginNotValid();

  // Login Validation
  formLogin.addEventListener("submit",function() {
    event.preventDefault();
    const username = this.username.value;
    const password = this.password.value;
    const usernameInfo = document.querySelector("#username-info");
    const passwordInfo = document.querySelector("#password-info");
    let status = true;
    if (!usernameInfo.classList.contains("d-none") || !passwordInfo.classList.contains("d-none")) {
      usernameInfo.classList.add("d-none");
      passwordInfo.classList.add("d-none");
    }
    if (username == "") {
      usernameInfo.classList.remove("d-none");
      usernameInfo.textContent = "Username Tidak Boleh Kosong";
      status = false;
    }
    if (password == "") {
      passwordInfo.classList.remove("d-none");
      passwordInfo.textContent = "Password Tidak Boleh Kosong";
      status = false;
    }
    if (status) {
      loginAuth(username,password)
      modalHide(this.parentElement.parentElement.parentElement)
    }
  })

  // Logout
  logoutBtn.addEventListener("click",function() {
    if (sessionStorage.getItem("login")) {
      sessionStorage.removeItem("login")
      sessionStorage.removeItem("type")
    }
  })

  // Auto Refresh
  setInterval(_=>{
    const session = sessionStorage.getItem("login");
    const sessionType = sessionStorage.getItem("type");
    parkir = localStorage.getItem("parkir-list") ? JSON.parse(localStorage.getItem("parkir-list")) : [];
    if (session) {
      if (sessionType == "admin") {
        loginAdmin();
        if (!admin.classList.contains("show")) {
          admin.classList.add("show")
        }
        if (opElem.classList.contains("show")) {
          opElem.classList.remove("show")
        }
      }else {
        loginOperator();
        if (admin.classList.contains("show")) {
          admin.classList.remove("show")
        }
        if (!opElem.classList.contains("show")) {
          opElem.classList.add("show")
        }
      }
    }else {
      loginNotValid();
      if (admin.classList.contains("show")) {
        admin.classList.remove("show")
      }
      if (opElem.classList.contains("show")) {
        opElem.classList.remove("show")
      }
    }
  },500)
  let ctx = document.getElementById('myChart');
  let countMobil = 0;
  let countMotor = 0;
  parkir.forEach((item, i) => {
    if (item.type == "mobil") {
      countMobil++;
    }
    if (item.type == "motor") {
      countMotor++;
    }
  });

let myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Mobil', 'Motor'],
        datasets: [{
            label: '# of Votes',
            data: [countMobil, countMotor],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
})

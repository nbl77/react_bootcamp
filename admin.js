const btnMain = document.querySelectorAll(".btnMain");
const formParkIn = document.querySelector("#modal-parkir-masuk form");
const formParkOut = document.querySelector("#modal-parkir-keluar form");
const formLogin = document.querySelector("#modal-login form");
const formPrice = document.querySelector("#modal-price form");
const formOperator = document.querySelector("#add-operator form");
const btnParkIn = document.querySelector("#parkIn");
const btnParkOut = document.querySelector("#parkOut");
const loginBtn = document.querySelector("#login");
const logoutBtn = document.querySelector("#logout");
const admin = document.querySelector("#admin");
const opElem = document.querySelector("#opElem");
let parkir = localStorage.getItem("parkir-list") ? JSON.parse(localStorage.getItem("parkir-list")) : [];
let operator = localStorage.getItem("operator-list") ? JSON.parse(localStorage.getItem("operator-list")) : [];
const removeClassBtn =_=>{
  for (let elem of btnMain) {
    elem.classList.remove("d-inline-block")
    elem.classList.remove("d-none")
    elem.classList.remove("d-block")
  }
}
const loginAdmin =_=>{
  let priceElemMobil = document.querySelector("#price li:first-child");
  let priceElemMotor = document.querySelector("#price li:last-child");

  removeClassBtn();
  loginBtn.classList.add("d-none");
  logoutBtn.classList.add("d-inline-block");
  btnParkIn.classList.add("d-none");
  btnParkOut.classList.add("d-none");
  let {mobil,motor} = JSON.parse(localStorage.getItem("price"));
  newMobil = String(mobil).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  newMotor = String(motor).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  priceElemMobil.innerHTML = `Mobil : RP ${newMobil},00/Menit`;
  priceElemMotor.innerHTML = `Motor : RP ${newMotor},00/Menit`;
  const tableParkir = document.querySelector(".data-parkir tbody");
  const tableOperator = document.querySelector(".data-operator tbody");
  if (parkir.length > 0) {
    let rows = "";
    parkir.forEach((item, i) => {
      let menit = item.status == "keluar" ? Math.floor((item.timeout - item.time) / 60) : Math.floor(((Date.now()/1000) - item.time)/ 60);
      let detik = item.status == "keluar" ? Math.floor((item.timeout - item.time) % 60) : (Math.floor((Date.now()/1000) - item.time) % 60);
      let biaya = (menit + 1) * (item.type == "motor" ? motor : mobil);
      let operatorNama = "";
      operator.forEach(op => {
        if (op.username == item.username) {
          operatorNama = op.nama;
        }
      });

      rows += `<tr><td>${i+1}</td><td>${item.token}</td><td>${item.type}</td><td>${operatorNama}</td><td>${menit} menit, ${detik} detik</td><td>${biaya}</td><td>${item.status}</td></tr>`;
    });
    tableParkir.innerHTML = rows;
  }else {
    tableParkir.innerHTML = `<tr><td colspan="7"><center>Belum Ada Yang Parkir</center></td></tr>`;
  }

  if (operator.length > 0) {
    let rows = "";
    operator.forEach((item, i) => {
      let kendaraan_masuk = 0;
      let kendaraan_keluar = 0;
      let total_motor = 0;
      let total_mobil = 0;
      parkir.forEach(park => {
        if (park.username == item.username && park.status == "masuk") {
          kendaraan_masuk++;
        }
        if (park.username == item.username && park.status == "keluar") {
          kendaraan_keluar++;
        }
        if (park.username == item.username && park.type == "mobil" && park.status == "keluar") {
          total_mobil += Math.ceil((park.timeout - park.time)/60);
        }
        if (park.username == item.username && park.type == "motor" && park.status == "keluar") {
          total_motor += Math.ceil((park.timeout - park.time)/60);
        }
      });
      let pendapatan = (total_mobil * mobil) + (total_motor * motor);
      rows += `<tr><td>${i+1}</td><td>${item.nama}</td><td>${kendaraan_masuk}</td><td>${kendaraan_keluar}</td><td>${pendapatan}</td></tr>`;
    });
    tableOperator.innerHTML = rows;
  }else {
    tableOperator.innerHTML = `<tr><td colspan="5"><center>Belum Ada Operator</center></td></tr>`;
  }

}
const modalHide = element =>{
  bootstrap.Modal.getInstance(element).hide()
}
formPrice.addEventListener("submit",function() {
  event.preventDefault();
  let motor = parseInt(this.motor.value);
  let mobil = parseInt(this.mobil.value);
  let status = true;
  document.querySelector("#motor-info").classList.add("d-none")
  document.querySelector("#mobil-info").classList.add("d-none")
  if (!Number.isInteger(motor)) {
    document.querySelector("#motor-info").classList.remove("d-none")
    document.querySelector("#motor-info").innerHTML = "Silahkan Masukan Angka"
    status = false
  }
  if (!Number.isInteger(mobil)) {
    document.querySelector("#mobil-info").classList.remove("d-none")
    document.querySelector("#mobil-info").innerHTML = "Silahkan Masukan Angka"
    status = false
  }
  if (status) {
    let dataPrice = {mobil:mobil,motor:motor};
    dataPrice = JSON.stringify(dataPrice);
    localStorage.setItem("price",dataPrice);
    modalHide(this.parentElement.parentElement.parentElement);
    alert("berhasil merubah Harga");
  }
})

formOperator.addEventListener("submit",function() {
  event.preventDefault();
  let dataForm = {nama:this.nama.value,username:this.username.value,password:this.password.value};
  if (operator.length > 0) {
    let flag = true;
    operator.forEach((item, i) => {
      if (item.nama == dataForm.nama || item.username == dataForm.username) {
        flag = false;
      }
    });
    if (flag) {
      operator.push(dataForm);
      localStorage.setItem("operator-list",JSON.stringify(operator));
      modalHide(this.parentElement.parentElement.parentElement)
      this.nama.value = "";
      this.username.value = "";
      this.password.value = "";
      alert("Berhasil Menambah Operator");
    }else {
      alert("Nama atau username sudah ada");
    }

  }else {
    operator.push(dataForm);
    localStorage.setItem("operator-list",JSON.stringify(operator));
    modalHide(this.parentElement.parentElement.parentElement)
  }
})

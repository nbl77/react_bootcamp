const makeToken =_=> {
 var result           = '';
 var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 var charactersLength = characters.length;
 for ( var i = 0; i < 16; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}
formParkIn.addEventListener("submit",function() {
  event.preventDefault();
  let type = this.type.value;
  let time = Math.floor(Date.now() / 1000);
  let token = makeToken();
  let newParkir = {type:type,token:token,time:time,status:"masuk",username:sessionStorage.username};
  parkir.push(newParkir);
  localStorage.setItem("parkir-list",JSON.stringify(parkir));
  modalHide(this.parentElement.parentElement.parentElement);
  alert("Berhasil Parkir");
  alert("Simpan token ini untuk keluar parkir : " + token);
  this.type.children[0].selected = true
})
formParkOut.addEventListener("submit",function() {
  event.preventDefault();
  let token = this.token.value;
  let result = false;
  let biaya = "";
  let time = Math.floor(Date.now() / 1000);
  let {mobil,motor} = JSON.parse(localStorage.getItem("price"));
  for (let data of parkir) {
    if (data.username == sessionStorage.username) {
      if (data.token == token && data.status != "keluar") {
        data.status = "keluar";
        data.timeout = time;
        result = true;
        let type = data.type == "mobil" ? mobil : motor;
        biaya = Math.ceil((time - data.time) / 60) * type;
        break;
      }
    }
  }
  if (result) {
    localStorage.setItem("parkir-list",JSON.stringify(parkir));
    modalHide(this.parentElement.parentElement.parentElement);
    alert("Berhasil keluar Parkir, Biaya Yang Di Bayar Adalah : RP "+String(biaya).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")+",00");
  }else {
    alert("Token Yang anda masukan salah");
  }
  this.token.value = "";
})
const loginOperator =_=>{
  removeClassBtn();
  loginBtn.classList.add("d-none");
  logoutBtn.classList.add("d-inline-block");
  btnParkIn.classList.add("d-inline-block");
  btnParkOut.classList.add("d-inline-block");
  let nama = "";
  let dataParking = [];
  operator.forEach(item => {
    if (item.username == sessionStorage.username) {
      nama = item.nama
    }
  });
  parkir.forEach(parking => {
    if (parking.username == sessionStorage.username) {
      dataParking.push(parking);
    }
  });
  let priceElemMobil = document.querySelector("#price li:first-child");
  let priceElemMotor = document.querySelector("#price li:last-child");
  let {mobil,motor} = JSON.parse(localStorage.getItem("price"));
  let newMobil = String(mobil).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  let newMotor = String(motor).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  priceElemMobil.innerHTML = `Mobil : RP ${newMobil},00/Menit`;
  priceElemMotor.innerHTML = `Motor : RP ${newMotor},00/Menit`;
  const tableOperator = document.querySelector(".data-parkir-operator tbody");
  const op = document.querySelector("#opElem b").innerHTML = nama;
  let rows = "";
  if (dataParking.length > 0) {
    dataParking.forEach((single,i) => {
      let menit = single.status == "keluar" ? Math.floor((single.timeout - single.time) / 60) : Math.floor(((Date.now()/1000) - single.time)/ 60);
      let detik = single.status == "keluar" ? Math.floor((single.timeout - single.time) % 60) : (Math.floor((Date.now()/1000) - single.time) % 60);
      let biaya = (menit + 1) * (single.type == "motor" ? motor : mobil);
      rows += `<tr><td>${i+1}</td><td>${single.token}</td><td>${single.type}</td><td>${menit} menit, ${detik} detik</td><td>${biaya}</td><td>${single.status}</td></tr>`;
    });
    tableOperator.innerHTML = rows;
  }else {
    tableOperator.innerHTML = `<tr><td colspan="6"><center>Belum Ada Yang Parkir</center></td></tr>`;
  }
}

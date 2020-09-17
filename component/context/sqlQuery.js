import SQLite from 'react-native-sqlite-storage';
const db = SQLite.openDatabase({
        name: 'my.db',
        location: 'default',
        createFromLocation: '~www/native.db',
      });
const Execute = (sql,params=[])=> new Promise(function(resolve, reject) {
  db.transaction(tx=>tx.executeSql(sql,params,(tx,result)=>resolve(result),error =>reject(error)))
});
const createTableUsers = async ()=>{
  const table = await Execute("CREATE TABLE IF NOT EXISTS pengguna (id INTEGER, name TEXT, profile TEXT,device TEXT, email TEXT,password TEXT, PRIMARY KEY (id AUTOINCREMENT))");
}
const createUser = async data =>{
  createTableUsers();
  if (!data.password) {
    data.password = data.email
  }
  const res = await Execute("INSERT INTO pengguna(name,profile,device,email,password) VALUES(?,?,?,?,?)",[data.name,data.profile,data.device,data.email, data.password]);
  if (res.code) {
    console.log(res.message);
  }else {
    if (res.rowsAffected > 0) {
      return true
    }
  }
  return false;
}
const updateUser = async data =>{
  createTableUsers();
  const res = await Execute("UPDATE pengguna SET name=?,profile=?,device=?,email=?,password=? WHERE id=?",[data.name,data.profile,data.device,data.email, data.password, data.id]);
  if (res.code) {
    console.log(res.message);
  }else {
    if (res.rowsAffected > 0) {
      return true
    }
  }
  return false;
}
const deleteUser = async data =>{
  createTableUsers();
  const res = await Execute("DELETE FROM pengguna WHERE id=?",[data.id]);
  if (res.code) {
    console.log(res.message);
  }else {
    if (res.rowsAffected > 0) {
      return true
    }
  }
  return false;
}
const getUsers = async () =>{
  createTableUsers();
  const results =  await Execute("SELECT*FROM pengguna");
  if (results.code !== 0) {
    const pengguna = [];
    const rows = await results.rows;
    if (rows.length === 0) {
      return [404]
    }
    for (var i = 0; i < rows.length; i++) {
      pengguna.push(rows.item(i))
    }
    return pengguna;
  }else {
    console.log(results.message);
  }
}
const getUser = async data =>{
  createTableUsers();
  const results = await Execute("SELECT*FROM pengguna WHERE id=?",[data.id]);
  if (results.code !== 0) {
    const rows = await results.rows;
    return rows.item(0);
  }else {
    console.log(results.message);
  }
}
const checkEmail = async data =>{
  createTableUsers();
  const results = await Execute("SELECT*FROM pengguna WHERE email=?",[data.email]);
  if (results.code !== 0) {
    const rows = await results.rows;
    return await rows.length
  }else {
    return 0;
  }
}
const checkEmailPass = async data =>{
  createTableUsers();
  const results = await Execute("SELECT*FROM pengguna WHERE email=? AND password=?",[data.email,data.password]);
  if (results.code !== 0) {
    const rows = await results.rows;
    return await rows.length
  }else {
    return 0;
  }
}
export {
  createTableUsers,
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUser,
  checkEmail,
  checkEmailPass
}

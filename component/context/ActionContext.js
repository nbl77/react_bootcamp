import AsyncStorage from '@react-native-community/async-storage';
import {
  createTableUsers,
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUser,
  checkEmail,
  checkEmailPass
} from './sqlQuery';
const ActionStorage = ([state,dispatch]) =>{
  return{
    setUser: async user => dispatch( {
      type: "SET_USER",
      payload: user
    } ),
    restore: async token => dispatch( {
      type: "SIGN_IN",
      token: token
    } ),
    signIn: async data => {
      const check = await checkEmailPass(data);
      if (check < 1) {
        alert("Email atau password salah");
      }else {
        await AsyncStorage.setItem("token","Halo, belajar auth");
        dispatch( {
          type: "SIGN_IN",
          token: "Halo, belajar auth"
        } )
      }
    },
    signOut: async () => {
      try {
        AsyncStorage.removeItem("token");
        dispatch( {
          type: "SIGN_OUT"
        } )
      } catch (e) {
        console.log(e);
      }
    },
    signUp: async data => {
      const check = await checkEmail(data);
      if (check > 1) {
        alert("Email sudah digunakan");
      }else {
        await createUser(data);
        dispatch( {
          type: "ADD_DATA",
          payload:data
        } )
        alert("Berhasil, silahkan sign in");
      }
    },
    data: state.data,
    addData: async data =>{
      const check = await checkEmail(data);
      if (check > 1) {
        alert("Email sudah digunakan");
      }else {
        await createUser(data);
        dispatch( {
          type: "ADD_DATA",
          payload:data
        } )
      }
    },
    editData: async data =>{
      await updateUser(data);
      dispatch({
        type: "EDIT_DATA",
        payload: await getUsers()
      })
    },
    deleteData: async data =>{
      await deleteUser(data);
      dispatch({
        type: "DELETE_DATA",
        payload: await getUsers()
      })
    },
    token:state.userToken
  }
}
export default ActionStorage;

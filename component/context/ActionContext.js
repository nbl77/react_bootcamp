import AsyncStorage from '@react-native-community/async-storage';
const ActionStorage = ([state,dispatch]) =>(
  {
    restore: async token => dispatch( {
      type: "SIGN_IN",
      token: token
    } ),
    signIn: async data => {
      const isLogged = state.user.some(item=>{
        try {
          AsyncStorage.setItem("token","Halo, belajar auth");
          if (item.email === data.email && item.password === data.password) {
            return true
          }
          return false;
        } catch (e) {
          console.log(e);
          return false;
        }

      });
      if (isLogged) {
        dispatch( {
          type: "SIGN_IN",
          token: "Halo, belajar auth"
        } )
      }else{
        alert("Email atau password yang anda masukan salah");
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
      dispatch( {
        type: "SIGN_UP",
        payload:data
      } )
      alert("Berhasil sign up, silahkan sign in");
    },
    data: state.data,
    addData: data =>{
      dispatch({
        type: "ADD_DATA",
        payload: data
      })
    },
    editData: data =>{
      dispatch({
        type: "EDIT_DATA",
        payload: data
      })
    },
    deleteData: data =>{
      dispatch({
        type: "DELETE_DATA",
        payload: data
      })
    },
    token:state.userToken
  }
)
export default ActionStorage;

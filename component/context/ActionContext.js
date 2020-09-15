const ActionStorage = ([state,dispatch]) =>(
  {
    signIn: async data => {
      const isLogged = state.user.some(item=>{
        if (item.email === data.email && item.password === data.password) {
          return true
        }
        return false;
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
    signOut: async () => dispatch( {
      type: "SIGN_OUT"
    } ),
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

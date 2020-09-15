import React from 'react';
import AuthContext from './AuthContext';
import ActionStorage from './ActionContext';
const initialState = [ {
	id: 1,
	name: "Nabil",
	device: "Android",
	profile: "https://cdn.idntimes.com/content-images/community/2019/11/pjq1cp9-b535648f0a940c15c61adeebab34c338.jpg"
},
{
	id: 2,
	name: "John",
	device: "IOS",
	profile: "https://cdn.idntimes.com/content-images/community/2019/12/5cbeb8f402a1f-56275801140a9f93af2e505b4348d03c_600x400.jpg"
} ];
function ReducersState ( state, action ){
	switch ( action.type ) {
		case "SIGN_OUT":
		return {
			...state,
			isLoading: true,
			isSignout: false,
			userToken: null
		};
		break;
		case "SIGN_IN":
		return {
			...state,
			userToken : action.token
		};
		break;
		case "SIGN_UP":
		return {
			...state,
			user : [...state.user,action.payload]
		};
		break;
		case "ADD_DATA":
		return {
			...state,
			data : [...state.data,action.payload]
		};
		break;
		case "EDIT_DATA":
		return {
			...state,
			data : action.payload
		};
		break;
		case "DELETE_DATA":
		return {
			...state,
			data : action.payload
		};
		break;
		default:
			return state;
	}
}

function ReducerContext(props) {
  const Reducer = React.useReducer(ReducersState,{
    isSignout: false,
    userToken: null,
    data: initialState,
    user: [{
      email:"admin@gmail.com",
      password:"admin"
    }]
  });
  const strg = ActionStorage(Reducer);
  return (
    <AuthContext.Provider value={strg}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default ReducerContext;

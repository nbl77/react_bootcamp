import React from 'react';
import AuthContext from './AuthContext';
import ActionStorage from './ActionContext';

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
		if (state.data[0] === 404) {
			return {
				...state,
				data : [action.payload]
			};
		}else {
			return {
				...state,
				data : [...state.data,action.payload]
			};
		}
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
		case "SET_USER":
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
    data: [],
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

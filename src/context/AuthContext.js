import { createContext,useEffect,useReducer } from "react";
import AuthReducer from "./AuthReducer"

const INITIAL_STATE = {
  // get the user from localStorage if it have
  // || and if there is no user return null
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) =>{
  const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE);

  // to save user to localstorage show user don't want to login again & again
  useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(state.currentUser));

    // whenever currentUser change we store it 
  },[state.currentUser])

  return (
    <AuthContext.Provider value={{currentUser: state.currentUser, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}


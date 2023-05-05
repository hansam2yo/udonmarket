import { createContext, useEffect, useReducer } from "react";
import { appAuth } from "../firebase/config";

// context를 객체를 생성합니다.
const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: null };
    case "authIsReady":
      return { ...state, user: action.payload, isAuthReady: true };
    default:
      return state;
  }
};

// context를 객체를 구독할 컴포넌트의 묶음 범위를 설정합니다.
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthReady: false,
  });

  useEffect(() => {
    // onAuthStateChanged : 유저의 인증정보 변화를 관찰하는 함수입니다.
    // onAuthStateChanged 함수는 Unsubscribe 함수를 반환합니다. 더 이상 유저의 변화를 관찰하지 않도록 하는 함수입니다.
    // 우리는 새로고침 후 초기에 딱 한번 실행하면 되기 때문에 이후에는 구독을 중지합니다.
    const unsubscribe = appAuth.onAuthStateChanged(function (user) {
      dispatch({ type: "authIsReady", payload: user });
      unsubscribe();
    });
  }, []);

  console.log("user state: ", state);
  return (
    // { ...state, dispatch } 이 두 가지 값이 context객체를 통해 접근할 수 있는 값이 됩니다.
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };

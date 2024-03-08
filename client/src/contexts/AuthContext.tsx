import React, {
  createContext,
  FC,
  ReactNode,
  useReducer,
} from "react";
import { AuthUser } from "services/user.service";

interface AuthState {
  authToken: string | null;
  userInfo?: AuthUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  is_superuser?: boolean;
}

type AuthAction =
  | { type: "SET_AUTH_TOKEN"; token: string | null }
  | { type: "SET_USER_INFO"; info?: AuthUser | null } // Update the type accordingly
  | { type: "SET_IS_LOGGED_IN"; status: boolean }
  | { type: "SET_IS_LOADING"; status: boolean }
  | { type: "SET_IS_SUPERUSER"; is_superuser: boolean };

const initialAuthState: AuthState = {
  authToken: null,
  userInfo: null,
  isLoggedIn: false,
  isLoading: false,
  is_superuser: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_AUTH_TOKEN":
      return { ...state, authToken: action.token };
    case "SET_USER_INFO":
      return { ...state, userInfo: action.info };
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.status };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.status }
    default:
      return state;
  }
}

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({ state: initialAuthState, dispatch: () => null });

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

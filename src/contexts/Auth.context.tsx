import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import useSWRMutation from "swr/mutation";
import * as api from "../api/index";

const JWT_TOKEN_KEY = "jwtToken";
const USER_ID_TOKEN = "userId";
const USER_NAME_TOKEN = "userName";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  const {
    isMutating: loginLoading,
    error: loginError,
    trigger: doLogin,
  } = useSWRMutation("users/login", api.post);

  const {
    isMutating: registerLoading,
    error: registerError,
    trigger: doRegister,
  } = useSWRMutation("users/register", api.post);

  const {
    isMutating: updateLoading,
    error: updateError,
    trigger: doUpdate,
  } = useSWRMutation(`users/${localStorage.getItem("userId")}`, api.updateById);

  useEffect(() => {
    api.setAuthToken(token);
    setIsAuthed(Boolean(token));
    setReady(true);
  }, [token]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const { user, token } = await doLogin({ email, password });
        setToken(token);
        setUser(user);
        localStorage.setItem(JWT_TOKEN_KEY, token);
        localStorage.setItem(USER_ID_TOKEN, user.userID);
        localStorage.setItem(USER_NAME_TOKEN, user.firstname);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doLogin]
  );

  const register = useCallback(
    async (
      firstname: string,
      lastname: string,
      email: string,
      password: string,
      street: string,
      number: string,
      postalCode: string,
      city: string,
      country: string
    ) => {
      try {
        const { user, token } = await doRegister({
          firstname,
          lastname,
          email,
          password,
          street,
          number,
          postalCode,
          city,
          country,
        });
        setToken(token);
        setUser(user);
        localStorage.setItem(JWT_TOKEN_KEY, token);
        localStorage.setItem(USER_ID_TOKEN, user.userID);
        localStorage.setItem(USER_NAME_TOKEN, user.firstname);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doRegister]
  );

  const update = useCallback(
    async (
      firstname: string,
      lastname: string,
      email: string,
      street: string,
      number: string,
      postalCode: string,
      city: string,
      country: string
    ) => {
      try {
        await doUpdate({
          firstname,
          lastname,
          email,
          street,
          number,
          postalCode,
          city,
          country,
        });
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doUpdate]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem(USER_ID_TOKEN);
    localStorage.removeItem(USER_NAME_TOKEN);
    localStorage.removeItem("orderItems");
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      loginError,
      registerError,
      updateError,
      loginLoading,
      registerLoading,
      updateLoading,
      login,
      logout,
      isAuthed,
      ready,
      register,
      update,
    }),
    [
      token,
      user,
      loginError,
      registerError,
      updateError,
      loginLoading,
      registerLoading,
      updateLoading,
      login,
      logout,
      isAuthed,
      ready,
      register,
      update,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import { createContext, useEffect, useState } from "react";
import { DanbooruApi } from "../../core/config/axios.config";
import { Outlet } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { queryClient } from "../../core/config/query-client.config";
import { FindAvatarByNameUseCase } from "../../data/use-cases/external/find-avatar-by-name";

type UserData = {
  id: number,
  name: string,
  level: number,
  role: string,
  avatar: string;
}

type SignInDTO = {
  login: string;
  key: string;
}

type AuthContextProps = {
  userData: UserData;
  authenticated: boolean;
  signin: (data: SignInDTO) => void;
  signout: () => void;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextProps>(null);

export function AuthProvider() {

  const [userData, setUserData] = useState<UserData>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {

    const userAccess = secureLocalStorage.getItem("user-access") as SignInDTO;
    userAccess? signin(userAccess) : setIsLoading(false);

  }, []);

  const signin = async ({ login, key }: SignInDTO) => {

    const { data } = await DanbooruApi.get("/profile.json", { params: {
      login,
      api_key: key,
    }});

    const avatar = await FindAvatarByNameUseCase.execute(data.name);

    const payload: UserData = {
      id: data.id,
      name: data.name,
      level: data.level,
      role: data.role,
      avatar: avatar,
    };

    // set local storage data
    secureLocalStorage.setItem("user-data", payload);
    secureLocalStorage.setItem("user-access", { login, key });

    // set axios config and clear all queries
    DanbooruApi.defaults.params = { login, api_key: key };
    queryClient.invalidateQueries();

    // set user-data and loading state
    setUserData(payload);
    setIsLoading(false);

  };

  const signout = () => {

    // set local storage data
    secureLocalStorage.removeItem("user-data");
    secureLocalStorage.removeItem("user-access");

    // set axios config and clear all queries
    DanbooruApi.defaults.params = {};
    queryClient.invalidateQueries();

    // reset user-data state
    setUserData(null);

  };
  
  return (
    <AuthContext.Provider value={{ userData, authenticated: !!userData?.id, signin, signout, isLoading }}>
      { !isLoading? <Outlet /> : "" }
    </AuthContext.Provider>
  );

}
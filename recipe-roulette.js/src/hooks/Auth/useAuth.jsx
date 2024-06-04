import { useContext } from "react";
import { AuthContext } from "../../components/authentication/AuthContext";

export const useAuth = () => {
    return useContext(AuthContext);
  };
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/fakeAuthContext";
import { useEffect } from "react";

const ProtectedRoutes = ({ children }) => {
  const { isAutheticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAutheticated) navigate("/");
    },
    [isAutheticated, navigate]
  );

  return isAutheticated ? { children } : null;
};

export default ProtectedRoutes;

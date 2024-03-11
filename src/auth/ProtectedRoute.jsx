import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../auth/firebase";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [user, loading, error] = useAuthState(auth);
  /* console.log("user: ", user); */

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Component {...rest} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { Navbar } from "@/components/Navbar";

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return token ? (
    <>
      <Navbar />
      <div className="px-4 pt-6 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;

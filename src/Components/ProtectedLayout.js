
import {Navigate,Outlet} from "react-router-dom"
function ProtectedLayout() {

    const token = localStorage.getItem("token");

    return token ? <Outlet /> : <Navigate to="/" replace />;

}

export default ProtectedLayout
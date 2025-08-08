import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

function AdminProtect({ children }) {
    const { user } = useSelector((state) => state.user);
    console.log("AdminProtect user: ", user);
    const location = useLocation();

    if (!user) {
        console.log("AdminProtect: User not logged in. Redirecting to /login.");
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!user.isAdmin) {
        console.log("AdminProtect: User logged in but not an admin. Displaying unauthorized message.");
        return <h1>You are not authorized to access this page</h1>;
    }

    console.log("AdminProtect: User is an admin. Rendering children.");
    return children;
}

export default AdminProtect;
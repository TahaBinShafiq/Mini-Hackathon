import LoginPage from "../pages-partials/login-page";
import PublicRoute from "../provider/publicRoute";

export default function Login() {
    return  <PublicRoute> <LoginPage/></PublicRoute>
       
}



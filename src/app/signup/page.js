import SignUpPage from "../pages-partials/signUp-page";
import PublicRoute from "../provider/publicRoute";

export default function SignUp(){
    return <PublicRoute> <SignUpPage/> </PublicRoute>
}
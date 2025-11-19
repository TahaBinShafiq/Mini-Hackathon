import DashboardPage from "../pages-partials/dashboard";
import ProtectedRoute from "../provider/protectedRoute";

export default function Dashboard(){
    return <ProtectedRoute> <DashboardPage/> </ProtectedRoute> 
}

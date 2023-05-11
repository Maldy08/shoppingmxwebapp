import { Navigate, Route, Routes } from "react-router-dom"
import { ShoppingAppRoutes } from "../shopping-app/routes/ShoppingAppRoutes"
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { useAuthStore } from "../hooks";


export const AppRouter = () => {
    //const status = 'authenticated';
    const { status } = useAuthStore();
    

    return (
        <Routes>
            {
                 ( status === 'authenticated' )
                 ? <Route path="/*" element={ <ShoppingAppRoutes/> }/>
                 : <Route path="/auth/*" element={ <AuthRoutes /> } />
            }
            
            <Route path="/*" element={ <Navigate to="/auth/login" /> } />
        </Routes>
    )
}
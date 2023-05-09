import { Route, Routes } from "react-router-dom"
import { ShoppingAppRoutes } from "../shopping-app/routes/ShoppingAppRoutes"
import { LoginPage } from "../auth/pages/LoginPage"


export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/*" element={ <ShoppingAppRoutes/> }/>
            <Route path="/login" element={ <LoginPage/> }/>
        </Routes>
    )
}
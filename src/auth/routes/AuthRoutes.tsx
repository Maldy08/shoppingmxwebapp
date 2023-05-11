import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"
import Example from "../pages/Example"

export const AuthRoutes = () => {
    return(
        <Routes>
            <Route path="login" element={ <LoginPage/> } />
            <Route path="register" element={ <RegisterPage/> } />
            <Route path="example" element={ <Example/> } />
            <Route path="/*" element={ <Navigate to="/auth/login" />} />
        </Routes>
    )
}
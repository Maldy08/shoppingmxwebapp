import { Route, Routes } from "react-router-dom"
import { ShoppingAppRoutes } from "../shopping-app/routes/ShoppingAppRoutes"


export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/*" element={ <ShoppingAppRoutes/> }/>
        </Routes>
    )
}
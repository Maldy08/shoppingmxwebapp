import { Route, Routes } from "react-router-dom"
import { HomePage, NegociosPage, ProductosPage, PromocionesPage } from "../pages"



export const ShoppingAppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={ <HomePage/> } />
            <Route path="/negocios" element={ <NegociosPage/> } />
            <Route path="/productos" element= { <ProductosPage/> } />
            <Route path="/promociones" element={ <PromocionesPage/> } />
        </Routes>
    )
}
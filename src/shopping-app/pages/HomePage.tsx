import { MainLayout } from "../layout/MainLayout"
import appLogo from "../../assets/app-logo-grande.png";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";


export const HomePage = () => {

    return (
        <MainLayout>
            <div className=" ">
            <div className="container h-screen mt-5 ml-5">
                <div className="flex items-center gap-4">
                <NavLink className="h-100  bg-white rounded-lg border-2 gap-4  justify-between" to={""}>
                     <BriefcaseIcon className="text-indigo-800"  />
                     <span className="">AFILIADOS</span>
                </NavLink>

                </div>
            </div>
            </div>

        </MainLayout>
    )
}

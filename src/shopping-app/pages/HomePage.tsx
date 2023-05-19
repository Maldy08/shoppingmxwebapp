import { MainLayout } from "../layout/MainLayout"
import appLogo from "../../assets/app-logo-grande.png";


export const HomePage = () => {

    return (
        <MainLayout>
            <div className=" ">
            <div className="container h-screen mt-5">
                <div className="flex flex-col items-center gap-4">
                    <img src={appLogo} alt="applogo" width={600} />
                </div>
            </div>
            </div>

        </MainLayout>
    )
}

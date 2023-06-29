
import { Bars3Icon } from "@heroicons/react/24/outline"
import cn from "classnames"

type Props = {

    onMenuButtonClick():void
}

export const Navbar = ( props: Props ) => {

    return (
        <nav
            className={cn({
                "bg-white text-zinc-500":true,
                "flex items-center":true,
                "w-screen md:w-full sticky z-10 px-4 shadow-sm h-[73px] top-0 ": true,
            })}
        >
            <div className="font-bold text-lg">Consola de Administración</div>
            <div className="flex-grow"></div>
            <button title="." className="md:hidden" onClick={ props.onMenuButtonClick }>
                <Bars3Icon className="h-6 w-6"/>
            </button>

        </nav>
    )

}
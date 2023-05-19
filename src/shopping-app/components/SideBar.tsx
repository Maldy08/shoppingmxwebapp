
import cn from "classnames";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import { NavItem, NavItems } from ".";
import logo from "../../assets/app-logo-white.png"

// 👇 props to get and set the collapsed state from parent component
type Props = {
    collapsed: boolean;
    navItems?: NavItem[];
    setCollapsed(collapsed: boolean): void;
    shown:boolean;
  };

export const SideBar = ({ 
    collapsed,
    setCollapsed, 
    navItems = NavItems,
    shown,
 } : Props) => {

    const Icon = collapsed? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;

    return (
        <div
        className={cn({
            "bg-indigo-700 text-zinc-50 fixed md:static md:translate-x-0 z-20": true,
            "transition-all duration-300 ease-in-out": true,
            "fixed md:static md:translate-x-0": true,
            "w-[300px]": !collapsed,
            "w-16": collapsed,
            "-translate-x-full": !shown,
            
          })}
        >
            <div
                className={cn({
                "flex flex-col justify-between h-screen sticky inset-0 w-full": true,
                "h-full":true
                })}
            >
            {/* logo and collapse button */}
                <div
                    className={cn({
                        "flex items-center border-b border-b-indigo-800 transition-none": true,
                         "p-4 justify-between": !collapsed,
                        "py-4 justify-center": collapsed,
                     })}
                >
                    {!collapsed && <span className="whitespace-nowrap"> <img src={logo} alt="logo"  width={60} /> </span>}
                    <button
                        title="."
                        className="grid place-content-center hover:bg-indigo-800 w-10 h-10 rounded-full opacity-0 md:opacity-100"
                        // 👇 set the collapsed state on click
                        onClick={() => setCollapsed( !collapsed )}
                    >
                        <Icon className="w-5 h-5" />
                    </button>
                </div>

                <nav className="flex-grow">
                    <ul
                        className={cn({"my-2 flex flex-col gap-2 items-stretch":true})}
                    >
                        {
                            navItems.map(( item,index ) => {
                                return (
                                    <li
                                        key={ index }
                                        className={cn({
                                            "text-indigo-100 hover:bg-indigo-900 flex" : true, //colors
                                            "transition-colors duration-300": true, //animation
                                            "rounded-md p-2 mx-3 gap-4": !collapsed,
                                            "rounded-full p-2 mx-3 w-10 h-10": collapsed,
                                        })}
                                    >
                                        <NavLink to={ item.href } className="flex gap-2">
                                            { item.icon } <span>{ !collapsed && item.label }</span>
                                        </NavLink>

                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>

                <div
                    className={cn({"grid place-content-stretch p-4": true,})}
                >
                    <div
                        className="flex gap-4 items-center h-11 overflow-hidden"
                    >
                        <img src={"https://via.placeholder.com/150"} 
                            alt="profile"
                            height={36}
                            width={36}
                            className="rounded-full"
                         />
                         { !collapsed && (
                            <div className="flex flex-col">
                                <span className="text-indigo-50 my-0">Carlos Maldonado</span>
                                <Link to="/" className="text-indigo-200 text-sm">
                                    Ver Perfil
                                </Link>

                            </div>
                         ) }

                    </div>

                </div>
            </div>
        </div>

    );

}
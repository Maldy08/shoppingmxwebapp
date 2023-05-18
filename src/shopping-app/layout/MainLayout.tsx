import classNames from "classnames";
import { useState, PropsWithChildren} from "react";
import { SideBar, Navbar } from "../components";


export const MainLayout = (props: PropsWithChildren) => {
    const [collapsed, setSidebarCollapsed] = useState(false);
    const [showSidebar, setshowSidebar] = useState(true);

    return (

        <div
        className={classNames({
          "grid bg-zinc-100 min-h-screen": true,
          "grid-cols-sidebar": !collapsed,
          "grid-cols-sidebar-collapsed": collapsed,
          "transition-[grid-template-columns] duration-300 ease-in-out": true,
        })}
      >
        {/* sidebar */}
        <SideBar
          collapsed={collapsed}
          setCollapsed={ setSidebarCollapsed }
          shown={ showSidebar }
        />
        <div>
          <Navbar onMenuButtonClick={ () => setshowSidebar( ( prev ) => !prev )} />
          { props.children }
        </div>
        {/* content */}
       
      </div>
    );
}

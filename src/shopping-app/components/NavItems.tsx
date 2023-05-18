import { NewspaperIcon, HomeIcon, ShoppingBagIcon, BriefcaseIcon } from "@heroicons/react/24/outline";


export type NavItem = {
    label:string;
    href:string;
    icon: React.ReactNode
};

export const NavItems: NavItem[] = [
    {
      label: "Inicio",
      href: "/",
      icon: <HomeIcon className="w-6 h-6" />,
    },
    {
      label: "Negocio",
      href: "/negocio",
      icon: <BriefcaseIcon className="w-6 h-6" />,
    },
    {
      label: "Productos",
      href: "/producto",
      icon: <ShoppingBagIcon className="w-6 h-6" />,
    },
    {
      label: "Promociones",
      href: "/promociones",
      icon: <NewspaperIcon className="w-6 h-6" />,
    },
  ];
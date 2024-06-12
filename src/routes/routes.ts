import Home from "../pages/home";
import Menu from "../pages/menu";
import Settings from "../pages/settings";


export interface RouteType {
  path: string;
  Component: React.ComponentType;
}

export const routes: RouteType[] = [
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/settings",
    Component: Settings,
  },
  {
    path: "/menu",
    Component: Menu
  }
];

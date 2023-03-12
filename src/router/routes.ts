import Dashboard from "../pages/Dashboard/Dashboard";
import MenuBurger from "../components/MenuBurger/MenuBurger";
import Header from "../components/Header/Header";

export const DASHBOARD_PAGE = '/';

export const routesAuth = [
    {
        path: DASHBOARD_PAGE,
        component: Dashboard,
    }
];
export const routesNotAuth = [
    {
        path: DASHBOARD_PAGE,
        component: Dashboard
    },
];




export const components = [
    {
        path: "/components/Menu",
        component: MenuBurger
    },
    {
        path: "/components/Header",
        component: Header
    }
];
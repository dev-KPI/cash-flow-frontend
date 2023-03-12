import Dashboard from "../pages/Dashboard/Dashboard";
import MenuBurger from "../components/MenuBurger/MenuBurger";
import Header from "../components/Header/Header";

export const DASHBOARD_PAGE = '/';
export const ANALYTICS_PAGE = '/';
export const NOTIFICATIONS_PAGE = '/';
export const CATEGORIES_PAGE = '/';
export const GROUPS_PAGE = '/';
export const HISTORY_PAGE = '/';
export const SETTINGS_PAGE = '/';
export const LOG_IN_PAGE = '/';
export const SIGN_UP_PAGE = '/';
export const LOG_OUT = '/';


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
export const routesMobileNavigation = [
    {
        path: DASHBOARD_PAGE,
        component: Dashboard
    }, {
        path: ANALYTICS_PAGE,
        component: Dashboard
    }, {
        path: NOTIFICATIONS_PAGE,
        component: Dashboard
    }, {
        path: CATEGORIES_PAGE,
        component: Dashboard
    }, {
        path: GROUPS_PAGE,
        component: Dashboard
    }, {
        path: HISTORY_PAGE,
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
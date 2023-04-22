//pages
import Dashboard from "@pages/Dashboard/Dashboard";
import Analytics from "@pages/Analytics/Analytics";
import Categories from "@pages/Categories/Categories";
//UI
import Header from "@components/Header/Header";
import Groups from "@pages/Groups/Groups";

export const DASHBOARD_PAGE = '/dashboard';
export const ANALYTICS_PAGE = '/analytics';
export const NOTIFICATIONS_PAGE = '/notifications';
export const CATEGORIES_PAGE = '/categories';
export const GROUPS_PAGE = '/groups';
export const HISTORY_PAGE = '/history';
export const SETTINGS_PAGE = '/settings';
export const LOG_IN_PAGE = '/login';
export const SIGN_UP_PAGE = '/signup';
export const LOG_OUT = '/logout';


export const routesAuth = [
    {
        path: DASHBOARD_PAGE,
        component: Dashboard
    },
    {
        path: ANALYTICS_PAGE,
        component: Analytics
    },
    {
        path: CATEGORIES_PAGE,
        component: Categories
    },
    {
        path: GROUPS_PAGE,
        component: Groups
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
        component: Categories
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
        path: "/components/Header",
        component: Header
    }
];
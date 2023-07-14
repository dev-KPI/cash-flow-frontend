//pages
import Dashboard from "@pages/Dashboard/Dashboard";
import Analytics from "@pages/Analytics/Analytics";
import Categories from "@pages/Categories/Categories";
import Groups from "@pages/Groups/GroupsPage";
import Group from "@pages/Group/Group";
import History from "@pages/History/History";
import Login from "@pages/Login/Login";
import MobileNotifications from "@components/Header/Notifications/MobileNotifications/MobileNotifications";
import Header from "@components/Header/Header";
import GroupMember from "@pages/GroupMember/GroupMember";
import GroupMembers from "@pages/GroupMembers/GroupMembers";
import GroupHistory from "@pages/GroupHistory/GroupHistory";

export const DASHBOARD_PAGE = '/dashboard';
export const ANALYTICS_PAGE = '/analytics';
export const NOTIFICATIONS_PAGE = '/notifications';
export const CATEGORIES_PAGE = '/categories';
export const GROUPS_PAGE = '/groups';
export const GROUP_PAGE = '/group/:groupId';
export const GROUP_MEMBERS_PAGE = '/group/:groupId/members';
export const GROUP_HISTORY_PAGE = '/group/:groupId/history';
export const GROUP_MEMBER_PAGE = '/group/:groupId/member/:memberId';
export const HISTORY_PAGE = '/history';
export const SETTINGS_PAGE = '/settings';
export const LOG_IN_PAGE = '/login';
export const SIGN_UP_PAGE = '/register';
export const LOG_OUT = '/logout';

export const routesNotAuth = [
    {
        path: LOG_IN_PAGE,
        component: Login
    }
];
export const routesAuth = [
    {
        path: DASHBOARD_PAGE,
        component: Dashboard
    }, {
        path: ANALYTICS_PAGE,
        component: Dashboard
    }, {
        path: NOTIFICATIONS_PAGE,
        component: MobileNotifications
    }, {
        path: CATEGORIES_PAGE,
        component: Categories
    }, {
        path: GROUPS_PAGE,
        component: Groups
    },
    // {
    //     path: GROUP_PAGE,
    //     component: Group
    // },
    // {
    //     path: GROUP_MEMBER_PAGE,
    //     component: GroupMember
    // },
    {
        path: HISTORY_PAGE,
        component: History
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
        component: MobileNotifications
    }, {
        path: CATEGORIES_PAGE,
        component: Categories
    }, {
        path: GROUPS_PAGE,
        component: Groups
    }, {
        path: HISTORY_PAGE,
        component: History
    },
];

export const groupRoutes = [
    {
        path: GROUP_PAGE,
        component: Group
    },
    {
        path: GROUP_MEMBER_PAGE,
        component: GroupMember
    },
    {
        path: GROUP_MEMBERS_PAGE,
        component: GroupMembers
    },
    {
        path: GROUP_HISTORY_PAGE,
        component: GroupHistory
    },
]

export const components = [
    {
        path: "/components/Header",
        component: Headers
    }
];

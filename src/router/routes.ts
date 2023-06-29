//pages
import Dashboard from "@pages/Dashboard/Dashboard";
import Analytics from "@pages/Analytics/Analytics";
import Categories from "@pages/Categories/Categories";
import Groups from "@pages/Groups/GroupsPage";
import Group from "@pages/Group/Group";
import History from "@pages/History/History";
import Header from "@components/Header/Header";
import GroupMember from "@pages/GroupMember/GroupMember";
import GroupMembers from "@pages/GroupMembers/GroupMembers";

export const DASHBOARD_PAGE = '/dashboard';
export const ANALYTICS_PAGE = '/analytics';
export const NOTIFICATIONS_PAGE = '/notifications';
export const CATEGORIES_PAGE = '/categories';
export const GROUPS_PAGE = '/groups';
export const GROUP_PAGE = '/group/:groupId';
export const GROUP_MEMBERS_PAGE = '/group/:groupId/members';
export const GROUP_MEMBER_PAGE = '/group/:groupId/member/:memberId';
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
]

export const components = [
    {
        path: "/components/Header",
        component: Header
    }
];
import React, { useCallback, useEffect, useMemo } from "react";
//UI
import Footer from "@components/Footer/Footer";
import Header from "@components/Header/Header";
import GroupHeader from "@pages/Group/GroupHeader/GroupHeader";
//logic
import { Outlet, useParams } from "react-router-dom";
import { useGetInfoByGroupQuery } from "@store/Controllers/GroupsController/GroupsController";
import { useGetCurrentUserInfoQuery } from "@store/Controllers/UserController/UserController";
import { useActionCreators } from "@hooks/storeHooks/useAppStore";
import { UserSliceActions } from "@store/User/UserSlice";


const GroupLayout = () => {

    const { groupId } = useParams<{ groupId: string }>();
    const { data: GroupInfo, isLoading: isGroupInfoLoading, isError: isGroupInfoError, isSuccess: isGroupInfoSuccess } = useGetInfoByGroupQuery({group_id: Number(groupId)})
    const { data: User, isError: isUserError, isLoading: isUserLoading } = useGetCurrentUserInfoQuery(null)
    const UserSliceDispatch = useActionCreators(UserSliceActions);

    const initializeGroupAdmin = useCallback(() => {
        if (!isUserLoading && !isGroupInfoSuccess && User && GroupInfo) {
            UserSliceDispatch.setIsAdmin(User.id === GroupInfo.admin.id)
        }
    }, [GroupInfo, User])

    useEffect(() => initializeGroupAdmin, [initializeGroupAdmin])

    const getGroupHeader = useMemo(() => {
        if(isGroupInfoSuccess) {
            return <GroupHeader groupInfo={GroupInfo} />
        }
    }, [GroupInfo, isGroupInfoLoading, isGroupInfoError, isGroupInfoSuccess])


    return (<>
        <Header />
        {getGroupHeader}
        <Outlet/>
        <Footer />
    </>)
}

export default GroupLayout
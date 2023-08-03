import React, { useEffect, useMemo } from "react";
//UI
import Footer from "@components/Footer/Footer";
import Header from "@components/Header/Header";
import GroupHeader from "@pages/Group/GroupHeader/GroupHeader";
import { Outlet, useParams } from "react-router-dom";
//logic
import { useGetInfoByGroupQuery } from "@store/Controllers/GroupsController/GroupsController";
import { Omiter } from "@services/UsefulMethods/ObjectMethods";


const GroupLayout = () => {

    const { groupId } = useParams<{ groupId: string }>();
    const {data: GroupInfo, isLoading: isGroupInfoLoading, isError: isGroupInfoError, isSuccess: isGroupInfoSuccess} = useGetInfoByGroupQuery({group_id: Number(groupId)})

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
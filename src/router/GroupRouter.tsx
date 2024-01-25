import { useEffect, useMemo } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
//UI
import Footer from "@components/Footer/Footer";
import Header from "@components/Header/Header";
import GroupHeader from "@pages/Group/GroupHeader/GroupHeader";

//logic
import { useGetInfoByGroupQuery } from "@store/Controllers/GroupsController/GroupsController";



const GroupLayout = () => {

    const navigate = useNavigate();
    const { groupId } = useParams<{ groupId: string }>();
    const { data: GroupInfo, isLoading: isGroupInfoLoading, isError: isGroupInfoError, isSuccess: isGroupInfoSuccess } = useGetInfoByGroupQuery({ group_id: Number(groupId) })

    const getGroupHeader = useMemo(() => {
        if (isGroupInfoSuccess) {
            return <GroupHeader groupInfo={GroupInfo} />
        }

    }, [GroupInfo, isGroupInfoLoading, isGroupInfoError, isGroupInfoSuccess])

    useEffect(() => {
        if (isGroupInfoError || GroupInfo?.status === 'INACTIVE')
            navigate('/404')
    }, [GroupInfo, isGroupInfoError])


    return (<>
        <Header />
        {getGroupHeader}
        <Outlet />
        <Footer />
    </>)
}

export default GroupLayout
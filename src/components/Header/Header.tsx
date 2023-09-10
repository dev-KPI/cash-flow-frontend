//types
import {FC} from 'react';

//UI
import PcHeader from './PcHeader/PcHeader';
import MobileHeader from './MobileHeader/MobileHeader';
import { useGetCurrentUserInfoQuery } from '@store/Controllers/UserController/UserController';
import { useResponseInvitationByIdMutation } from '@store/Controllers/InvitationController/InvitationController';
import { notify } from 'src/App';

const Header: FC = () => {

    const {data: User, isError: isUserError, isFetching: isUserFetching} = useGetCurrentUserInfoQuery(null)
    return (<>
        { User && <> 
            <MobileHeader User={User}/>
            <PcHeader User={User}/>
        </>}
    </>);
};

export default Header;
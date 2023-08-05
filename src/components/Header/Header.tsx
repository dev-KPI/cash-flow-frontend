//types
import {FC} from 'react';

//UI
import PcHeader from './PcHeader/PcHeader';
import MobileHeader from './MobileHeader/MobileHeader';
import { useGetCurrentUserInfoQuery } from '@store/Controllers/UserController/UserController';
import PageGlobalLoader from '@components/PageGlobalPreloader/PageGlobalPreloader';

const Header: FC = () => {

    const {data: User, isError: isUserError, isFetching: isUserFetching} = useGetCurrentUserInfoQuery(null)

    return (<>
    {!isUserFetching && !isUserError && User ? 
        <> 
            <MobileHeader User={User}/>
            <PcHeader User={User}/>
        </>
        :
        <PageGlobalLoader/>
    }
    </>);
};

export default Header;
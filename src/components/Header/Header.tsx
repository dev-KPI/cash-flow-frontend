import React, { useState } from 'react';
//types
import {FC, ReactNode} from 'react';
//hooks
import { useWindowSize } from 'usehooks-ts';
import { useCallback } from 'react';

//UI
import PcHeader from './PcHeader/PcHeader';
import MobileHeader from './MobileHeader/MobileHeader';
import { useGetCurrentUserInfoQuery } from '@store/Controllers/UserController/UserController';
import { Omiter } from '@services/UsefulMethods/ObjectMethods';
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
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IThemeState } from '@store/UI_store/ThemeSlice/ThemeInterfaces';
import React from 'react';
import ContentLoader from 'react-content-loader';

const UserGroupsCardLoader = () => {
    const { theme: actualTheme } = useAppSelector<IThemeState>(state => state.persistedThemeSlice);
    const getGroups = () => {
        let res = [];
        for (let i = 0; i < 6; i++) {
            res.push(
                <React.Fragment key={'lki2' + i}>
                    <rect x={26 + i * 80} y="44" rx="4" ry="4" width="54" height="10" />
                    <circle cx={53 + i * 80} cy="85" r="23" />
                </React.Fragment>)
        }
        return res
    }

    return (
        <ContentLoader
            speed={2}
            viewBox="0 0 510 120"
            width={'100%'}
            height={'120px'}
            preserveAspectRatio="none"
            backgroundColor={actualTheme === 'light' ? "#f3f3f3" : "#212121"}
            foregroundColor={actualTheme === 'light' ? "#ecebeb" : "#2b2b2b"}
        >
            <rect x="18" y="18" rx="4" ry="4" width="120" height="16" />
            <rect x="670" y="130" rx="4" ry="4" width="24" height="24" />
            <rect x="621" y="130" rx="4" ry="4" width="24" height="24" />
            {getGroups()}
        </ContentLoader>
    )
};

export default UserGroupsCardLoader;


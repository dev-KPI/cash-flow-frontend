import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import React from 'react';
import ContentLoader from 'react-content-loader';
import classes from './GroupListItem.module.css'
const GroupListItemLoader = () => {
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);

    return (
        <ContentLoader
            speed={2}
            viewBox="0 0 356 250"
            width={'100%'}
            // height={'250px'}
            className={classes.loader}
            preserveAspectRatio="none"
            backgroundColor={actualTheme === 'light' ? "#f3f3f3" : "#212121"}
            foregroundColor={actualTheme === 'light' ? "#ecebeb" : "#2b2b2b"}
        >
            <rect x="24" y="24" rx="4" ry="4" width="100" height="26" />
            <circle cx="47" cy="107" r="23" />
            <rect x="82" y="90" rx="4" ry="4" width="120" height="18" />
            <rect x="82" y="112" rx="4" ry="4" width="100" height="15" />
            <rect x="24" y="147" rx="0" ry="0" width="300" height="14" />
            <rect x="24" y="169" rx="0" ry="0" width="300" height="14" />
            <rect x="24" y="191" rx="0" ry="0" width="300" height="14" />
            <circle cx="34" cy="225" r="10" />
            <circle cx="44" cy="225" r="10" />
            <circle cx="54" cy="225" r="10" />
            <circle cx="64" cy="225" r="10" />
        </ContentLoader>
    )
};

export default GroupListItemLoader;
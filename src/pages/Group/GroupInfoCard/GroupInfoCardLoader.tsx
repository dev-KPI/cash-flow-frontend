import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import React from 'react';
import ContentLoader from 'react-content-loader';
import classes from './GroupInfoCard.module.css'
const GroupInfoCardLoader = () => {
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);

    return (
        <ContentLoader
            speed={2}
            viewBox="0 0 374 450"
            width={'100%'}
            height={'100%'}
            className={classes.loader}
            preserveAspectRatio="none"
            backgroundColor={actualTheme === 'light' ? "#f3f3f3" : "#212121"}
            foregroundColor={actualTheme === 'light' ? "#ecebeb" : "#2b2b2b"}
        >
            <circle cx="187" cy="114" r="90" />
            <rect x="137" y="216" rx="4" ry="4" width="100" height="18" />
            <rect x="90" y="262" rx="4" ry="4" width="40" height="18" />
            <rect x="76" y="286" rx="4" ry="4" width="70" height="18" />
            <rect x="244" y="262" rx="4" ry="4" width="40" height="18" />
            <rect x="230" y="286" rx="4" ry="4" width="70" height="18" />
            <rect x="24" y="330" rx="4" ry="4" width="310" height="16" />
            <rect x="24" y="350" rx="4" ry="4" width="310" height="16" />
            <rect x="24" y="370" rx="4" ry="4" width="310" height="16" />
            <rect x="24" y="390" rx="4" ry="4" width="310" height="16" />
            <rect x="24" y="410" rx="4" ry="4" width="310" height="16" />
        </ContentLoader>
    )
};

export default GroupInfoCardLoader;
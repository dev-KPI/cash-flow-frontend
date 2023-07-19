import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import React from 'react';
import ContentLoader from 'react-content-loader';
import classes from './OperationCard.module.css'
const OperationCardLoader = () => {
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);

    return (
        <ContentLoader
            speed={2}
            // viewBox="0 0 255 120"
            width={'100%'}
            height={'120px'}
            className={classes.loader}
            preserveAspectRatio="none"
            backgroundColor={actualTheme === 'light' ? "#f3f3f3" : "#212121"}
            foregroundColor={actualTheme === 'light' ? "#ecebeb" : "#2b2b2b"}
        >
            <rect x="24" y="16" rx="4" ry="4" width="60" height="16" />
            <rect x="24" y="42" rx="4" ry="4" width="100" height="26" />
            <rect x="24" y="82" rx="6" ry="6" width="40" height="24" />
            <rect x="76" y="87" rx="4" ry="4" width="80" height="14" />
            <circle cx="calc(100% - 46px)" cy="39" r="23" />
        </ContentLoader>
    )
};

export default OperationCardLoader;
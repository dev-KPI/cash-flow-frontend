import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import React from 'react';
import ContentLoader from 'react-content-loader';
import classes from "./GroupHistoryCard.module.css";

const GroupHistoryCardLoader = () => {
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);

    const getHistories = () => {
        let res = [];

        for (let i = 0; i < 8; i++) {
            res.push(<React.Fragment key={'thf43' + i}>
                <rect x="280" y={61 + i * 47} rx="4" ry="4" width="60" height="12" />
                <rect x="170" y={61 + i * 47} rx="4" ry="4" width="60" height="12" />
                <circle cx="24" cy={67 + i * 47} r="16" />
                <rect x="46" y={73 + i * 47} rx="4" ry="4" width="80" height="12" />
                <rect x="46" y={53 + i * 47} rx="4" ry="4" width="60" height="12" />
            </React.Fragment >)
        }
        return res
    }


    return (
        <ContentLoader
            speed={2}
            viewBox="0 0 350 478"
            width={'100%'}
            height={'100%'}
            backgroundColor={actualTheme === 'light' ? "#f3f3f3" : "#212121"}
            foregroundColor={actualTheme === 'light' ? "#ecebeb" : "#2b2b2b"}
            className={classes.loader}
            preserveAspectRatio="none"
        >
            <rect x="16" y="0" rx="4" ry="4" width="150" height="26" />
            {getHistories()}
            <rect x="46" y="440" rx="4" ry="4" width="110" height="16" />
        </ContentLoader>
    )
};

export default GroupHistoryCardLoader;
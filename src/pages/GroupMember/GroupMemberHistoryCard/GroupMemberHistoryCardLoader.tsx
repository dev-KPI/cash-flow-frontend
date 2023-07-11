import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import React from 'react';
import ContentLoader from 'react-content-loader';
import classes from "./GroupMemberHistoryCard.module.css";

const GroupMemberHistoryCardLoader = () => {
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);
    const getHistories = () => {
        let res = [];

        for (let i = 0; i < 7; i++) {
            res.push(<React.Fragment key={'t123g3' + i}>
                <rect x="280" y={61 + i * 52} rx="4" ry="4" width="80" height="12" />
                <rect x="170" y={61 + i * 52} rx="4" ry="4" width="60" height="12" />
                <circle cx="24" cy={67 + i * 52} r="16" />
                <rect x="46" y={73 + i * 52} rx="4" ry="4" width="80" height="12" />
                <rect x="46" y={53 + i * 52} rx="4" ry="4" width="60" height="12" />
            </React.Fragment >)
        }
        return res
    }
    const getSmallHistories = () => {
        let res = [];

        for (let i = 0; i < 4; i++) {
            res.push(<React.Fragment key={'thqwer1' + i}>
                <rect x="280" y={61 + i * 57} rx="4" ry="4" width="60" height="12" />
                <rect x="170" y={61 + i * 57} rx="4" ry="4" width="60" height="12" />
                <circle cx="24" cy={67 + i * 57} r="16" />
                <rect x="46" y={73 + i * 57} rx="4" ry="4" width="80" height="12" />
                <rect x="46" y={53 + i * 57} rx="4" ry="4" width="60" height="12" />
            </React.Fragment >)
        }
        return res
    }

    if (window.matchMedia("screen and (max-width: 1440px)").matches) {
        return (
            <ContentLoader
                speed={2}
                viewBox="0 0 350 448"
                width={'100%'}
                height={'100%'}
                backgroundColor={actualTheme === 'light' ? "#f3f3f3" : "#212121"}
                foregroundColor={actualTheme === 'light' ? "#ecebeb" : "#2b2b2b"}
                className={classes.loader}
                preserveAspectRatio="none"
            >
                <rect x="16" y="0" rx="4" ry="4" width="150" height="26" />
                {getHistories()}
                <rect x="46" y="426" rx="4" ry="4" width="110" height="16" />
            </ContentLoader>
        )
    }
    else {
        return (
            <ContentLoader
                speed={2}
                viewBox="0 0 350 330"
                width={'100%'}
                height={'100%'}
                backgroundColor={actualTheme === 'light' ? "#f3f3f3" : "#212121"}
                foregroundColor={actualTheme === 'light' ? "#ecebeb" : "#2b2b2b"}
                className={classes.loader}
                preserveAspectRatio="none"
            >
                <rect x="16" y="0" rx="4" ry="4" width="150" height="26" />
                {getSmallHistories()}
                <rect x="46" y="308" rx="4" ry="4" width="110" height="16" />
            </ContentLoader>
        )
    }
};

export default GroupMemberHistoryCardLoader;
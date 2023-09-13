import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IThemeState } from '@store/UI_store/ThemeSlice/ThemeInterfaces';
import React from 'react';
import ContentLoader from 'react-content-loader';
import classes from "./UserHistoryCard.module.css";

const UserHistoryCardLoader = () => {
    const { theme: actualTheme } = useAppSelector<IThemeState>(state => state.persistedThemeSlice);

    const getHistories = () => {
        let res = [];

        for (let i = 0; i < 8; i++) {
            res.push(<React.Fragment key={'thf43' + i}>
                <rect x="280" y={61 + i * 47} rx="4" ry="4" width="80" height="12" />
                <circle cx="24" cy={67 + i * 47} r="8" />
                <rect x="46" y={73 + i * 47} rx="4" ry="4" width="80" height="12" />
                <rect x="46" y={53 + i * 47} rx="4" ry="4" width="60" height="12" />
            </React.Fragment >)
        }
        return res
    }

    const getSmallHistories = () => {
        let res = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 2; j++) {
                res.push(<React.Fragment key={'qwe12e' + i + j}>
                    <rect x={155 + j * 292} y={48 + i * 47} rx="4" ry="4" width="80" height="12" />
                    <circle cx={24 + j * 292} cy={54 + i * 47} r="8" />
                    <rect x={46 + j * 292} y={60 + i * 47} rx="4" ry="4" width="80" height="12" />
                    <rect x={46 + j * 292} y={40 + i * 47} rx="4" ry="4" width="60" height="12" />
                </React.Fragment>)
            }
        }
        return res
    }

    if (window.matchMedia("screen and (min-width: 864px) and (max-width: 1440px)").matches) {
        return (
            <ContentLoader
                speed={2}
                viewBox="0 0 530 240"
                width={'100%'}
                height={'100%'}
                backgroundColor={actualTheme === 'light' ? "#f3f3f3" : "#212121"}
                foregroundColor={actualTheme === 'light' ? "#ecebeb" : "#2b2b2b"}
                className={classes.loader}
                preserveAspectRatio="none"
            >
                <rect x="16" y="0" rx="4" ry="4" width="150" height="26" />
                <rect x="48" y="224" rx="4" ry="4" width="110" height="16" />
                {getSmallHistories()}
            </ContentLoader>
        )
    } else {
        return (
            <ContentLoader
                speed={2}
                viewBox="0 0 374 478"
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
    }

};

export default UserHistoryCardLoader;
import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IThemeState } from '@store/UI_store/ThemeSlice/ThemeInterfaces';
import React from 'react';
import ContentLoader from 'react-content-loader';

const UserCategoriesCardLoader = () => {
    const { theme: actualTheme } = useAppSelector<IThemeState>(state => state.persistedThemeSlice);
    const getCategories = () => {
        let res = [];
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 2; j++) {
                res.push(
                    <React.Fragment key={'qktyu2' + i + j}>
                        {i === 5 && j === 1 ? '' : <rect x={29 + i * 85} y={68 + j * 111} rx="4" ry="4" width="54" height="10" />
                        }
                        <circle cx={56 + i * 85} cy={109 + j * 111} r="23" />
                        <rect x={37 + i * 85} y={141 + j * 111} rx="4" ry="4" width="38" height="10" />
                    </React.Fragment>)
            }
        }
        return res
    }

    return (
        <ContentLoader
            speed={2}
            viewBox="0 0 540 300"
            width={'100%'}
            height={'100%'}
            backgroundColor={actualTheme === 'light' ? "#f3f3f3" : "#212121"}
            foregroundColor={actualTheme === 'light' ? "#ecebeb" : "#2b2b2b"}
        >
            <rect x="24" y="30" rx="4" ry="4" width="120" height="16" />
            <rect x="150" y="32" rx="4" ry="4" width="40" height="14" />
            <rect x="670" y="130" rx="4" ry="4" width="24" height="24" />
            <rect x="621" y="130" rx="4" ry="4" width="24" height="24" />
            <rect x="492" y="25.5" rx="4" ry="4" width="24" height="24" />
            <rect x="443" y="25.5" rx="4" ry="4" width="24" height="24" />
            {getCategories()}
        </ContentLoader>
    )
};

export default UserCategoriesCardLoader;


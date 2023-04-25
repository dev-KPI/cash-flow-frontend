import { useAppSelector } from "@hooks/storeHooks/useAppStore";
import React, { FC } from "react"
import ContentLoader, { IContentLoaderProps } from "react-content-loader"


const getYScale = () => {
    let res = [];
    for (let i = 0; i < 5; i++) {
        res.push(
            <React.Fragment key={'qhf4d' + i}>
                <rect x="40" y={120 + i * 90} rx="4" ry="4" width="50" height="14" />
            </React.Fragment >)
    }
    return res
}
const getXScale = () => {
    let res = [];
    for (let i = 0; i <= 31; i++) {
        res.push(<React.Fragment key={'hft63' + i}>
            <rect x={100 + i * 30} y="410" rx="4" ry="4" width="24" height="12" />
        </React.Fragment >)
    }
    return res
}
const getBars = () => {
    let res = [];
    let height, y;
    for (let i = 0; i <= 31; i++) {
        if (i % 4 === 0) {
            height = 180;
            y = 224
        }
        else if (i % 4 === 1) {
            height = 140;
            y = 264
        }
        else if (i % 4 === 2) {
            height = 150;
            y = 254
        }
        else if (i % 4 === 3) {
            height = 110;
            y = 294
        }
        res.push(<React.Fragment key={'jghsd' + i}>
            <rect x={100 + i * 30} y={y} rx="10" ry="10" width="24" height={height} />
        </React.Fragment >)
    }
    return res
}


const UserExpenseGraphPreloader: FC<IContentLoaderProps> = () => {
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);
    return (
        <ContentLoader
            speed={2}
            viewBox="0 0 1080 480"
            width={'100%'}
            height={'100%'}
            backgroundColor={actualTheme === 'light' ? "#f3f3f3" : "#212121"}
            foregroundColor={actualTheme === 'light' ? "#ecebeb" : "#2b2b2b"}
            preserveAspectRatio="none"
        >
            <rect x="32" y="24" rx="4" ry="4" width="100" height="26" />
            <rect x="32" y="55" rx="4" ry="4" width="130" height="12" />
            {getBars()}
            {getXScale()}
            {getYScale()}
        </ContentLoader>
    )
}

export default UserExpenseGraphPreloader
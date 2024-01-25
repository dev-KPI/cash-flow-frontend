import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import ContentLoader from 'react-content-loader';
import classes from "./GroupMemberUserCard.module.css";
import { useMemo } from 'react';
import { useWindowSize } from 'usehooks-ts';
import { IThemeState } from '@store/UI_store/ThemeSlice/ThemeInterfaces';

const GroupMemberUserCardLoader = () => {
    const { theme: actualTheme } = useAppSelector<IThemeState>(state => state.persistedThemeSlice);
    const {width} = useWindowSize();

    const loader = useMemo(() => {
        if (window.matchMedia("screen and (min-width: 400px)").matches) {
        return (
            <ContentLoader
                speed={2}
                viewBox="0 0 530 300"
                width={'100%'}
                height={'298px'}
                backgroundColor={actualTheme === 'light' ? "#f3f3f3" : "#212121"}
                foregroundColor={actualTheme === 'light' ? "#ecebeb" : "#2b2b2b"}
                className={classes.loader}
                preserveAspectRatio="none"
            >
                <circle cx={width < 1024 ? 135 : 150} cy="115" r="90" />
                <rect x="24" y="215" rx="4" ry="4" width={width < 1024 ? 246 : 230} height="26" />
                <rect x="24" y="255" rx="4" ry="4" width={width < 1024 ? 246 : 230} height="20" />

                <rect x={315} y="16" rx="4" ry="4" width={105} height="16" />
                <rect x={315} y="42" rx="4" ry="4" width={105} height="26" />
                <rect x={315} y="82" rx="6" ry="6" width='30px' height="24" />
                <rect x={350} y="87" rx="4" ry="4" width={110} height="14" />
                <circle cx={493} cy="40" r="23" />

                <rect x={315} y="126" rx="4" ry="4" width='178px' height="16" />
                <rect x={315} y="148" rx="6" ry="6" width="30" height="24" />

                <rect x={315} y="196" rx="4" ry="4" width={105} height="16" />
                <rect x={315} y="222" rx="4" ry="4" width={105} height="26" />
                <rect x={315} y="262" rx="6" ry="6" width="30"  height="24" />
                <rect x={350} y="267" rx="4" ry="4" width={120} height="14" />
                <circle cx={493} cy="220" r="23" />
            </ContentLoader>
            )
        } else {
            return (
                <ContentLoader
                    speed={2}
                    width={'100%'}
                    height={448}
                    viewBox="0 0 374 450"
                    backgroundColor={actualTheme === 'light' ? "#f3f3f3" : "#212121"}
                    foregroundColor={actualTheme === 'light' ? "#ecebeb" : "#2b2b2b"}
                    className={classes.loader}
                    preserveAspectRatio="none"
                >
                    <circle cx="187" cy="94" r="70" />
                    <rect x="77" y="180" rx="4" ry="4" width="220" height="24" />
                    <rect x="24" y="220" rx="4" ry="4" width="100" height="14" />
                    <rect x="24" y="240" rx="4" ry="4" width="80" height="22" />
                    <rect x="24" y="270" rx="4" ry="4" width="65" height="26" />
                    <rect x="100" y="277" rx="4" ry="4" width="100" height="12" />
                    <circle cx="337" cy="239" r="23" />
                    <rect x="24" y="304" rx="4" ry="4" width="100" height="14" />
                    <rect x="24" y="324" rx="4" ry="4" width="80" height="22" />
                    <rect x="24" y="368" rx="4" ry="4" width="100" height="14" />
                    <rect x="24" y="388" rx="4" ry="4" width="80" height="22" />
                    <rect x="24" y="418" rx="4" ry="4" width="65" height="26" />
                    <rect x="100" y="425" rx="4" ry="4" width="100" height="12" />
                    <circle cx="337" cy="387" r="23" />
                </ContentLoader>
            )
    }}, [width])
    return <>{loader}</>
};

export default GroupMemberUserCardLoader;


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
        if (window.matchMedia("screen and (min-width: 768px)").matches) {
        return (
            <ContentLoader
                speed={2}
                width={'100%'}
                height={'300px'}
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
        } else if (window.matchMedia("screen and (min-width: 400px) and (max-width: 768px)").matches) {
            return (
                <ContentLoader
                    speed={2}
                    width={'100%'}
                    height={'300px'}
                    backgroundColor={actualTheme === 'light' ? "#f3f3f3" : "#212121"}
                    foregroundColor={actualTheme === 'light' ? "#ecebeb" : "#2b2b2b"}
                    className={classes.loader}
                    preserveAspectRatio="none"
                >
                    <circle cx={width < 1024 ? (width < 1024 ? 145 : 135) : 150} cy="115" r={width < 1024 ? 75 : 90} />
                    <rect x="24" y="215" rx="4" ry="4" width={width < 1024 ? 246 : 230} height="26" />
                    <rect x="24" y="255" rx="4" ry="4" width={width < 1024 ? 246 : 230} height="20" />
    
                    <rect x="calc(100% - 205px)" y="16" rx="4" ry="4" width={105} height="16" />
                    <rect x="calc(100% - 205px)" y="38" rx="4" ry="4" width={105} height="26" />
                    <rect x="calc(100% - 205px)" y="82" rx="6" ry="6" width='30px' height="24" />
                    <rect x="calc(100% - 145px)" y="85" rx="4" ry="4" width={120} height="14" />
                    <circle cx="calc(100% - 48px)" cy="40" r="23" />
    
                    <rect x="calc(100% - 205px)" y="116" rx="4" ry="4" width='178px' height="16" />
                    <rect x="calc(100% - 205px)" y="138" rx="6" ry="6" width="30" height="24" />
    
                    <rect x="calc(100% - 205px)" y="181" rx="4" ry="4" width={105} height="16" />
                    <rect x="calc(100% - 205px)" y="202" rx="4" ry="4" width={105} height="26" />
                    <rect x="calc(100% - 205px)" y="238" rx="6" ry="6" width="30"  height="24" />
                    <rect x="calc(100% - 145px)" y="242" rx="4" ry="4" width={120} height="14" />
                    <circle cx="calc(100% - 48px)" cy="205" r="23" />
                </ContentLoader>
            )
        } else {
            return (
                <ContentLoader
                    speed={2}
                    width={'100%'}
                    height={474}
                    backgroundColor={actualTheme === 'light' ? "#f3f3f3" : "#212121"}
                    foregroundColor={actualTheme === 'light' ? "#ecebeb" : "#2b2b2b"}
                    className={classes.loader}
                    preserveAspectRatio="none"
                >
                    <circle cx={(width - 150)/2 + 75} cy="100" r="75" />
                    <rect x={width - (width - 24)} y="190" rx="4" ry="4" width={width-48} height="24" />
                    <rect x={width - (width - 36)} y="220" rx="4" ry="4" width={width-72} height="18" />

                    <rect x="24px" y="245" rx="4" ry="4" width={width-110} height="16"/>
                    <rect x="24px" y="265" rx="4" ry="4" width={width-110} height="26" />
                    <rect x="24px" y="295" rx="6" ry="6" width="30" height="24" />
                    <rect x="78px" y="300" rx="4" ry="4" width={width-110} height="14"/>
                    <circle cx="calc(100% - 46px)" cy="265" r="23" />

                    <rect x="24px" y="335" rx="4" ry="4" width="178" height="14" />
                    <rect x="24px" y="355" rx="4" ry="4" width="24" height="24" />

                    <rect x="24px" y="390" rx="4" ry="4" width={width-110} height="14" />
                    <rect x="24px" y="410" rx="4" ry="4" width={width-110} height="24" />
                    <rect x="24px" y="440" rx="6" ry="6" width={width-210} height="16" />
                    <circle cx="calc(100% - 46px)" cy="410" r="23" />

                </ContentLoader>
            )
    }}, [width])
    return <>{loader}</>
};

export default GroupMemberUserCardLoader;


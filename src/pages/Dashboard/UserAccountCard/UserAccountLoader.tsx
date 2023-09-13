import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import { IThemeState } from '@store/UI_store/ThemeSlice/ThemeInterfaces';
import ContentLoader from 'react-content-loader';
import classes from "./UserAccountCard.module.css";

const UserAccountCardLoader = () => {
    const { theme: actualTheme } = useAppSelector<IThemeState>(state => state.persistedThemeSlice);
    if (window.matchMedia("screen and (min-width: 863px) and (max-width: 1440px)").matches) {
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
                <rect x="24" y="24" rx="4" ry="4" width="130" height="26" />
                <circle cx="99" cy="132" r="75" />
                <rect x="224" y="69" rx="4" ry="4" width="150" height="26" />
                <rect x="224" y="104" rx="4" ry="4" width="160" height="20" />
                <rect x="224" y="149" rx="4" ry="4" width="190" height="26" />
                <rect x="224" y="179" rx="4" ry="4" width="150" height="30" />
            </ContentLoader>
        )
    } else {
        return (
            <ContentLoader
                speed={2}
                viewBox="0 0 374 450"
                backgroundColor={actualTheme === 'light' ? "#f3f3f3" : "#212121"}
                foregroundColor={actualTheme === 'light' ? "#ecebeb" : "#2b2b2b"}
                className={classes.loader}
                preserveAspectRatio="none"
            >
                <rect x="32" y="24" rx="4" ry="4" width="130" height="26" />
                <circle cx="189" cy="155" r="90" />
                <rect x="115" y="260" rx="4" ry="4" width="150" height="26" />
                <rect x="110" y="295" rx="4" ry="4" width="160" height="20" />
                <rect x="35" y="355" rx="4" ry="4" width="190" height="26" />
                <rect x="35" y="385" rx="4" ry="4" width="150" height="30" />
            </ContentLoader>
        )
    }  
};

export default UserAccountCardLoader;


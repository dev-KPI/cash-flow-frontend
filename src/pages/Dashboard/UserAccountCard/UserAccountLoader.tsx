import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import ContentLoader from 'react-content-loader';
import { useWindowSize } from 'usehooks-ts';

const UserAccountCardLoader = () => {
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);

    return (
        <ContentLoader
            speed={2}
            viewBox="0 0 310 402"
            backgroundColor={actualTheme === 'light' ? "#f3f3f3" : "#212121"}
            foregroundColor={actualTheme === 'light' ? "#ecebeb" : "#2b2b2b"}
        >
            <rect x="0" y="0" rx="8" ry="8" width="120" height="30" />
            <circle cx="150" cy="128" r="90" />
            <rect x="75" y="247" rx="8" ry="8" width="150" height="30" />
            <rect x="75" y="287" rx="8" ry="8" width="150" height="30" />
            <rect x="0" y="327" rx="8" ry="8" width="200" height="30" />
            <rect x="0" y="367" rx="8" ry="8" width="200" height="30" />
        </ContentLoader>
    )
};

export default UserAccountCardLoader;


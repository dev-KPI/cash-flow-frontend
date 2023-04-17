import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import ContentLoader from 'react-content-loader';

const UserGroupsCardLoader = () => {
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);
    return (
        <ContentLoader
            speed={2}
            viewBox="0 0 510 120"
            backgroundColor={actualTheme === 'light' ? "#f3f3f3" : "#212121"}
            foregroundColor={actualTheme === 'light' ? "#ecebeb" : "#2b2b2b"}
        >
            <rect x="18" y="18" rx="4" ry="4" width="120" height="16" />
            <rect x="670" y="130" rx="4" ry="4" width="24" height="24" />
            <rect x="621" y="130" rx="4" ry="4" width="24" height="24" />
            <rect x="26" y="44" rx="4" ry="4" width="54" height="10" />
            <circle cx="53" cy="85" r="23" />
            <rect x="638" y="186" rx="4" ry="4" width="54" height="10" />
            <circle cx="665" cy="227" r="23" />
            <rect x="646" y="259" rx="4" ry="4" width="38" height="10" />
            <rect x="106" y="44" rx="4" ry="4" width="54" height="10" />
            <circle cx="133" cy="85" r="23" />
            <rect x="186" y="44" rx="4" ry="4" width="54" height="10" />
            <circle cx="213" cy="85" r="23" />
            <rect x="266" y="44" rx="4" ry="4" width="54" height="10" />
            <circle cx="293" cy="85" r="23" />
            <rect x="346" y="44" rx="4" ry="4" width="54" height="10" />
            <circle cx="373" cy="85" r="23" />
            <rect x="426" y="44" rx="4" ry="4" width="54" height="10" />
            <circle cx="453" cy="85" r="23" />
        </ContentLoader>
    )
};

export default UserGroupsCardLoader;


import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import ContentLoader from 'react-content-loader';

const UserExpenseCardLoader = () => {
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);
    return (
        <ContentLoader
            speed={2}
            viewBox="0 0 510 300"
            backgroundColor={actualTheme === 'light' ? "#f3f3f3" : "#212121"}
            foregroundColor={actualTheme === 'light' ? "#ecebeb" : "#2b2b2b"}
        >
            <rect x="32" y="24" rx="4" ry="4" width="105" height="22" />
            <rect x="286" y="62" rx="4" ry="4" width="107" height="18" />
            <circle cx="129" cy="167" r="97" />
            <rect x="286" y="85" rx="4" ry="4" width="80" height="26" />
            <rect x="286" y="131" rx="4" ry="4" width="65" height="14" />
            <circle cx="291" cy="172" r="5" />
            <rect x="306" y="165" rx="4" ry="4" width="110" height="14" />
            <circle cx="291" cy="192" r="5" />
            <rect x="306" y="185" rx="4" ry="4" width="110" height="14" />
            <circle cx="291" cy="212" r="5" />
            <rect x="306" y="205" rx="4" ry="4" width="110" height="14" />
            <circle cx="291" cy="232" r="5" />
            <rect x="306" y="225" rx="4" ry="4" width="110" height="14" />
            <rect x="286" y="248" rx="4" ry="4" width="80" height="12" />
        </ContentLoader>
    )
};

export default UserExpenseCardLoader;
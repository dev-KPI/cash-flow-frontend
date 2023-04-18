import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import ContentLoader from 'react-content-loader';

const UserHistoryCardLoader = () => {
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);

    const getHistories = () => {
        let res = [];
        for(let i = 0; i < 8; i++){
            res.push(<>
                <circle cx="16" cy={70 + i * 45} r="8" />
                <rect x="26" y={50 + i * 45} rx="8" ry="8" width="100" height="15" />
                <rect x="26" y={70 + i * 45} rx="8" ry="8" width="100" height="15" />
                <rect x="272" y={60 + i * 45} rx="8" ry="8" width="100" height="20" />
            </>)
        }
        return res
    }

    return (
        <ContentLoader
            speed={2}
            viewBox="0 0 374 480"
            backgroundColor={actualTheme === 'light' ? "#f3f3f3" : "#212121"}
            foregroundColor={actualTheme === 'light' ? "#ecebeb" : "#2b2b2b"}
        >
            <rect x="0" y="0" rx="8" ry="8" width="190" height="30" />
            {getHistories()}
            <rect x="26" y="420" rx="8" ry="8" width="100" height="15" />
        </ContentLoader>
    )
};

export default UserHistoryCardLoader;


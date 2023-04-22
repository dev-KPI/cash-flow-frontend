import { useAppSelector } from '@hooks/storeHooks/useAppStore';
import ContentLoader from 'react-content-loader';

const UserCategoriesCardLoader = () => {
    const actualTheme = useAppSelector(state => state.persistedThemeSlice.theme);
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
            <rect x="29" y="68" rx="4" ry="4" width="54" height="10" />
            <circle cx="56" cy="109" r="23" />
            <rect x="37" y="141" rx="4" ry="4" width="38" height="10" />
            <rect x="638" y="186" rx="4" ry="4" width="54" height="10" />
            <circle cx="665" cy="227" r="23" />
            <rect x="646" y="259" rx="4" ry="4" width="38" height="10" />
            <circle cx="481" cy="220" r="23" />
            <rect x="451" y="252" rx="4" ry="4" width="60" height="10" />
            <rect x="114" y="68" rx="4" ry="4" width="54" height="10" />
            <circle cx="141" cy="109" r="23" />
            <rect x="122" y="141" rx="4" ry="4" width="38" height="10" />
            <rect x="199" y="68" rx="4" ry="4" width="54" height="10" />
            <circle cx="226" cy="109" r="23" />
            <rect x="207" y="141" rx="4" ry="4" width="38" height="10" />
            <rect x="284" y="68" rx="4" ry="4" width="54" height="10" />
            <circle cx="311" cy="109" r="23" />
            <rect x="292" y="141" rx="4" ry="4" width="38" height="10" />
            <rect x="369" y="68" rx="4" ry="4" width="54" height="10" />
            <circle cx="396" cy="109" r="23" />
            <rect x="377" y="141" rx="4" ry="4" width="38" height="10" />
            <rect x="454" y="68" rx="4" ry="4" width="54" height="10" />
            <circle cx="481" cy="109" r="23" />
            <rect x="462" y="141" rx="4" ry="4" width="38" height="10" />
            <rect x="29" y="179" rx="4" ry="4" width="54" height="10" />
            <circle cx="56" cy="220" r="23" />
            <rect x="37" y="252" rx="4" ry="4" width="38" height="10" />
            <rect x="114" y="179" rx="4" ry="4" width="54" height="10" />
            <circle cx="141" cy="220" r="23" />
            <rect x="122" y="252" rx="4" ry="4" width="38" height="10" />
            <rect x="199" y="179" rx="4" ry="4" width="54" height="10" />
            <circle cx="226" cy="220" r="23" />
            <rect x="207" y="252" rx="4" ry="4" width="38" height="10" />
            <rect x="284" y="179" rx="4" ry="4" width="54" height="10" />
            <circle cx="311" cy="220" r="23" />
            <rect x="292" y="252" rx="4" ry="4" width="38" height="10" />
            <rect x="369" y="179" rx="4" ry="4" width="54" height="10" />
            <circle cx="396" cy="220" r="23" />
            <rect x="377" y="252" rx="4" ry="4" width="38" height="10" />
        </ContentLoader>
    )
};

export default UserCategoriesCardLoader;


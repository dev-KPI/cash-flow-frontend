import React from 'react';
import ContentLoader from 'react-content-loader';
const UserExpenseCardLoader = () => {
    return (
        <ContentLoader
            speed={2}
            viewBox="0 0 510 300"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <rect x="16" y="24" rx="3" ry="3" width="105" height="22" />
            <rect x="263" y="75" rx="0" ry="0" width="107" height="13" />
            <circle cx="118" cy="174" r="99" />
            <rect x="263" y="253" rx="0" ry="0" width="51" height="0" />
            <rect x="263" y="96" rx="0" ry="0" width="63" height="23" />
            <rect x="263" y="136" rx="0" ry="0" width="65" height="11" />
            <circle cx="268" cy="178" r="5" />
            <rect x="283" y="168" rx="0" ry="0" width="110" height="19" />
            <rect x="283" y="192" rx="0" ry="0" width="110" height="19" />
            <circle cx="268" cy="202" r="5" />
            <circle cx="268" cy="226" r="5" />
            <circle cx="268" cy="250" r="5" />
            <rect x="283" y="192" rx="0" ry="0" width="110" height="19" />
            <rect x="283" y="216" rx="0" ry="0" width="110" height="19" />
            <rect x="283" y="240" rx="0" ry="0" width="110" height="19" />
        </ContentLoader>
    )
};

export default UserExpenseCardLoader;
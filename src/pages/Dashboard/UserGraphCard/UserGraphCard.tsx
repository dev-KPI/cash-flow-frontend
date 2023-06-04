import React from 'react';

//UI
import classes from './UserGraphCard.module.css'
import GraphCard from '@components/GraphCard/GraphCard';

const UserGraphCard = () => {
    return (
        <div className={classes.UserGraph}>
            <GraphCard/>
        </div>
    );
};

export default UserGraphCard;
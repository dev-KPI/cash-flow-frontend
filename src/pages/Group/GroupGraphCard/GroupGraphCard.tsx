import React from 'react';

//UI
import classes from './GroupGraphCard.module.css'
import GraphCard from '@components/GraphCard/GraphCard';

const GroupGraphCard = () => {
    return (
        <div className={classes.GroupGraph}>
            <GraphCard />
        </div>
    );
};

export default GroupGraphCard;
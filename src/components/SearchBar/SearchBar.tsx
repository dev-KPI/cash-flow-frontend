import React from 'react';

//UI
import classes from './SearchBar.module.css'

const SearchBar = () => {
    return (
        <form className={classes.searchBar}>
            <button className={classes.searchBtn} type="button">
                <i className="bi bi-search"></i>
            </button>
            <input className={classes.searchInput} type="text" placeholder="Search"/>
        </form>
    );
};

export default SearchBar;
import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

// Given an active class name so when user clicks on one of them it helps "pinpointing"
const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' exact >Burger Builder</NavigationItem>
        <NavigationItem link='/orders'>Orders</NavigationItem>
    </ul>
);

export default navigationItems;
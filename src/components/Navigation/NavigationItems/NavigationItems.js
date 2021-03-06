import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

// Given an active class name so when user clicks on one of them it helps "pinpointing"
const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' exact >Burger Builder</NavigationItem>
        { props.isAuthenticated ? <NavigationItem link='/orders'>Orders</NavigationItem> : null }
        { !props.isAuthenticated 
            ? <NavigationItem link='/auth'>Login</NavigationItem>
            : <NavigationItem link='/logout'>Logout</NavigationItem>
        }
    </ul>
);

export default navigationItems;
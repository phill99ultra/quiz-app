import React from 'react';
import classes from './menu-toggle.module.css';

const MenuToggle = props => {
    const cls = [
        'fa',
        classes.MenuToggle
    ];
    props.isOpen ? cls.push('fa-times', classes.open) : cls.push('fa-bars')
    return(
        <i
            className={cls.join(' ')}
            onClick={props.onToggle}
        />
    )
}

export default MenuToggle;
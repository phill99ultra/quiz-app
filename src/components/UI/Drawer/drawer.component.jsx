import React from 'react';
import classes from './drawer.module.css';
import { NavLink } from 'react-router-dom';
import Backdrop from '../Backdrop/backdrop.component';

const links = [
    {to: '/', label: 'List', exact: true},
    {to: '/auth', label: 'Authorization', exact: false},
    {to: '/quiz-creator', label: 'Create quiz', exact: false}
]
class Drawer extends React.Component {

    handleClick = () => {
        this.props.onClose()
    }

    renderLinks = () => {
        return links.map((link, index) => {
            return(
                <li key={index}>
                    <NavLink
                        to={ link.to }
                        exact={ link.exact }
                        activeClassName={ classes.active }
                        onClick={this.handleClick}
                    >
                        { link.label }
                    </NavLink>                   
                </li>
            )
        })
    }
    render() {
        const cls = [classes.Drawer];
        if (!this.props.isOpen) cls.push(classes.close);
        return(
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {
                            this.renderLinks()
                        }
                    </ul>
                </nav>
                { this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null }
            </React.Fragment>
        )
    }
}

export default Drawer;
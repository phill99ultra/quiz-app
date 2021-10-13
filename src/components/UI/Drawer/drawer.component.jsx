import React from 'react';
import classes from './drawer.module.css';
import { NavLink } from 'react-router-dom';
import Backdrop from '../Backdrop/backdrop.component';

class Drawer extends React.Component {

    handleClick = () => {
        this.props.onClose()
    }

    renderLinks = (links) => {
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
        const links = [
            {to: '/', label: 'List', exact: true}           
        ]
        if(this.props.isAuth) {
            links.push( {to: '/quiz-creator', label: 'Create quiz', exact: false});
            links.push( {to: '/logout', label: 'Exit', exact: false});
        } else {
            links.push(  {to: '/auth', label: 'Authorization', exact: false} )
        }
        return(
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {
                            this.renderLinks(links)
                        }
                    </ul>
                </nav>
                { this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null }
            </React.Fragment>
        )
    }
}

export default Drawer;
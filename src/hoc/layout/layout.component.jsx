import React from 'react';
import classes from './layout.module.css';
import MenuToggle from '../../components/navigation/menu-toggle/menu-toggle.component';
import Drawer from '../../components/UI/Drawer/drawer.component';

class Layout extends React.Component {
    state = {
        menu: false
    }
    handleToggleMenu = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    handleCloseMenu = () => {
        this.setState({
            menu: false
        })
    }
    render() {
        return(
            <div className={classes.Layout}>
                <Drawer
                    isOpen={ this.state.menu }
                    onClose={ this.handleCloseMenu }
                />
                <MenuToggle
                    onToggle={ this.handleToggleMenu }
                    isOpen={ this.state.menu }
                />
                <main>
                    { this.props.children }
                </main>
            </div>
        )
    }
}

export default Layout;
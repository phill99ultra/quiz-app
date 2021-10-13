import React from 'react';
import is from 'is_js';
import classes from './auth.module.css';
import Button from '../../components/UI/Button/button.component.jsx';
import Input from '../../components/UI/Input/input.component';
import { auth } from '../../store/actions/auth.action';
import { connect } from 'react-redux';


class Auth extends React.Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Add your valid email address',
                vaild: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Add your valid password',
                vaild: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    handleLogIn = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )       
    }
    handleSignUp = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )       
    }
    handleSubmit = event => {
        event.preventDefault();
    }
    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input 
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.handleOnChange(event, controlName)}
                />
            )
        })       
    }

    validateControl(value, validation) {
        if (!validation) return true
        let isValid = true;
        if (validation.required) isValid = value.trim() !== '' && isValid;
        if (validation.email) isValid = is.email(value) && isValid;
        if (validation.minLength) isValid = value.length >= validation.minLength && isValid;
        return isValid;
    }

    handleOnChange = (event, controlName) => {       
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }
        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);
        formControls[controlName] = control;
        let isFormValid = true;
        Object.keys(formControls).forEach(name => isFormValid = formControls[name].value && isFormValid)
        this.setState({
            formControls, isFormValid
        })
    }

    render() {
        return(
            <div className={classes.Auth}>
                <div>
                    <h1>Authorization</h1>
                    <form action="" onSubmit={this.handleSubmit} className={classes.AuthForm}>
                        { this.renderInputs() }
                        <Button type='success'
                            onClick={this.handleLogIn}
                            disabled={!this.state.isFormValid}
                            >
                            Sign in
                        </Button>
                        <Button type='primary'
                            onClick={this.handleSignUp}
                            disabled={!this.state.isFormValid}
                            >
                            Sign up
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth);
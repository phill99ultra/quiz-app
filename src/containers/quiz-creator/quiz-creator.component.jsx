import React from 'react';
import classes from './quiz-creator.module.css';
import Button from '../../components/UI/Button/button.component';
import Input from '../../components/UI/Input/input.component';
import Select from '../../components/UI/Select/select.component';
import { createControl, validate, validateForm } from '../../form/formTemplate';
import Auxiliary from '../../hoc/auxiliary/auxiliary';
import { connect } from 'react-redux';
import { createQuizQuestion, finishCreateQuiz } from '../../store/actions/create.action';

function createOptionControl(number) {
    return createControl({
        label: `Answer ${number}`,
            errorMessage: 'Answer can not be empty!',
            id: number
        }, {required: true}
    )
}

function createFormControls() {
    return {    
        question: createControl({
            label: 'Write your question',
            errorMessage: 'Question can not be empty!'
        }, {required: true}),
        option_1: createOptionControl(1),
        option_2: createOptionControl(2),
        option_3: createOptionControl(3),
        option_4: createOptionControl(4)
    }
}

class QuizCreator extends React.Component {
    state = {        
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    }
    handleSubmit = event => {
        event.preventDefault();
    }
    handleAddQuestion = event => {
        event.preventDefault();       
        const {question, option_1, option_2, option_3, option_4} = this.state.formControls;
        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option_1.value, id: option_1.id},
                {text: option_2.value, id: option_2.id},
                {text: option_3.value, id: option_3.id},
                {text: option_4.value, id: option_4.id}
            ]
        }
        this.props.createQuizQuestion(questionItem);
        this.setState({           
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    }
    handleCreateQuiz = event => {
        event.preventDefault();               
        this.setState({               
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
        this.props.finishCreateQuiz()                 
    }
    handleOnChange = (value, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }
        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);
        formControls[controlName] = control;
        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    renderControls = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Auxiliary key={controlName + index}>
                    <Input 
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.handleOnChange(event.target.value, controlName)}
                    />
                    { index === 0 ? <hr/> : null }
                </Auxiliary>
            )
        })
    }

    handleSelectChange = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {
        const select = <Select
            label="Choose corect answer"
            value={this.state.rightAnswerId}
            onChange={this.handleSelectChange}
            options={
                [
                    {text: 1, value: 1},
                    {text: 2, value: 2},
                    {text: 3, value: 3},
                    {text: 4, value: 4}
                ]
            }
        />
        return(
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Create the test</h1>
                    <form onSubmit={this.handleSubmit}>
                        {
                            this.renderControls()
                        }
                        {
                            select
                        }
                        <Button
                            type='primary'
                            onClick={this.handleAddQuestion}
                            disabled={!this.state.isFormValid}
                        >
                            Add question
                        </Button>
                        <Button
                            type='success'
                            onClick={this.handleCreateQuiz}
                            disabled={this.props.quiz.length === 0}
                        >
                            Create test
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)
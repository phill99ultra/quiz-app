import React from 'react';
import classes from './active-quiz.module.css';
import AnswersList from './answers-list/answers-list.component';

const ActiveQuiz = props => {
    return(
        <div className={ classes.ActiveQuiz }>
            <p className={classes.Question}>
                <span>
                    <strong>{ props.answerNumber }.</strong>&nbsp;
                    { props.question }
                </span>
                <small>
                    { props.answerNumber } from { props.quizLength }
                </small>
            </p>
            <AnswersList
                answers={ props.answers }
                onAnswerClick={ props.onAnswerClick }
                state={ props.state }
            />
        </div>
    )
}

export default ActiveQuiz;
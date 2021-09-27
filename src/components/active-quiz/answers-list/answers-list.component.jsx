import React from 'react';
import classes from './answers-list.module.css';
import AnswerItem from './answer-item/answer-item.component';

const AnswersList = props => {
    return(
        <ul className={classes.AnswersList}>
            { props.answers.map((answer, index) => (
                <AnswerItem
                    key={index}
                    answer={ answer }
                    onAnswerClick={ props.onAnswerClick }
                    state={ props.state ? props.state[answer.id] : null }
                />
            )) }
        </ul>
    )
}

export default AnswersList;
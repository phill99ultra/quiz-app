import React from 'react';
import classes from './answer-item.module.css';

const AnswerItem = props => {
    const AnswerClasses = [classes.AnswerItem]
    if (props.state) {
        AnswerClasses.push(classes[props.state])
    }
    return(
        <li className={ AnswerClasses.join(' ') }
            onClick={ ()=> props.onAnswerClick( props.answer.id ) }
        >
            { props.answer.text }
        </li>
    )
}

export default AnswerItem;
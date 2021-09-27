import React from 'react';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/UI/Loader/loader.component';
import classes from './quiz-list.module.css';
import axios from '../../axios/axios-quiz';

export default class QuizList extends React.Component {
    state = {
        quizes: [],
        loading: true
    }
    renderQuizes() {
        return this.state.quizes.map(quiz => (
            <li key={quiz.id}>
                <NavLink to={`/quiz/${quiz.id}`}>
                    {quiz.name}
                </NavLink>
            </li>
        ))
    }

    componentDidMount = async () => {
        try {        
            const response = await axios.get('/quizes.json');               
            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test Nr. ${index + 1}`
                })
            })
            this.setState({
                quizes,
                loading: false
            })
        } catch(error) {
            console.error(error)
        }
    }

    render() {
        return(
            <div className={classes.QuizList}>
                <div>
                    <h1>List of tests</h1>
                    {
                        this.state.loading
                            ? <Loader/>
                            :  <ul>
                                {
                                    this.renderQuizes()
                                }
                            </ul>
                    }                   
                </div>
            </div>
        )
    }
}
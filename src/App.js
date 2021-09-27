import React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './hoc/layout/layout.component';
import Quiz from './containers/quiz/quiz.component';
import Auth from './containers/auth/auth.component';
import QuizCreator from './containers/quiz-creator/quiz-creator.component';
import QuizList from './containers/quiz-list/quiz-list.component';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path={'/auth'} component={ Auth }/>
        <Route path={'/quiz-creator'} component={ QuizCreator }/>
        <Route path={'/quiz/:id'} component={ Quiz }/>
        <Route path={'/'} component={ QuizList }/>
      </Switch>
    </Layout>
  );
}

export default App;

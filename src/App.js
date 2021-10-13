import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router';
import Layout from './hoc/layout/layout.component';
import Quiz from './containers/quiz/quiz.component';
import Auth from './containers/auth/auth.component';
import QuizCreator from './containers/quiz-creator/quiz-creator.component';
import QuizList from './containers/quiz-list/quiz-list.component';
import { connect } from 'react-redux';
import Logout from './components/logout/logout.component';
import { autoLogin } from './store/actions/auth.action';

class App extends React.Component {
  componentDidMount() {
    this.props.autoLogin()
  }
  render() {
    let routes = (
      <Switch>
        <Route path={'/auth'} component={ Auth }/>    
        <Route path={'/quiz/:id'} component={ Quiz }/>
        <Route path={'/'} exact component={ QuizList }/>
        <Redirect to={'/'}/>
      </Switch>
    )
    if (this.props.isAuth) {
      routes = (
        <Switch>       
          <Route path={'/quiz-creator'} component={ QuizCreator }/>
          <Route path={'/quiz/:id'} component={ Quiz }/>
          <Route path={'/logout'} component={ Logout }/>
          <Route path={'/'} exact component={ QuizList }/>
          <Redirect to={'/'}/>
        </Switch>
      )
    }  
    return (
      <Layout>
        { routes }
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

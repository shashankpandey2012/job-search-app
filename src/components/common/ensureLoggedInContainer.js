import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import JobDetail from '../landing/JobDetail';
import Landing from '../landing';
import NotFound from './notFound';
import { fetchLoginDetail } from "../../actions/appActions";

class EnsureLoggedInContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { isLogin, checkLogin }  = this.props;
    // logoutUser();
    console.log('checking status',this.props.isLogin);
    if (!isLogin) {
      checkLogin();
    }
  }

  componentDidUpdate( prevProps, prevState, snapshot ) {
    const { history, isLogin, checkLogin, loginCheck } = this.props;
    if (!isLogin && loginCheck) {
      history.push('/login');
    } else {
      checkLogin();
    }
  }

  render() {
    const { isLogin } = this.props;
    const routePages = [
      {
        ID: 'landing',
        COMPONENT: Landing,
        PATH: '/',
      },
      {
      ID: 'jobs',
      COMPONENT: JobDetail,
      PATH: '/jobs/:id',
    }]
    return (
      <div>
        {routePages && isLogin ? (
          <Switch>
            {routePages
            && routePages.length > 0
            && routePages.map(item => (
              <Route
                key={item.ID}
                exact
                path={item.PATH}
                component={item.COMPONENT}
              />
            ))}
            <Route path="*" render={NotFound} />
          </Switch>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default withRouter(
  connect(({ app }) => ({
    isLogin: app.isLogin,
     loginCheck: app.loginCheck
  }),
    dispatch => ({
      checkLogin: params => dispatch(fetchLoginDetail(params))
    }),
    )(EnsureLoggedInContainer),
);

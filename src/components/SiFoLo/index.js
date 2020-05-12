import React from 'react';

import Login from './Login';
import Signup from './Signup';
import { withRouter } from "react-router";
import { connect } from "react-redux";
// import { submitLoginAction } from "../../actions/appActions";

class SiFoLo extends React.Component{
  constructor( props ) {
    super( props );
    this.state = {

    }
  }

  componentDidMount() {
    const { isLogin, history } = this.props;
    if (isLogin) {
      history.push('/');
    } else {
      history.push('/login');
    }
  }

  componentDidUpdate( prevProps, prevState, snapshot ) {
    console.log("Update ", prevProps.isLogin, this.props.isLogin);
    const { history, isLogin } = this.props;
    if (!prevProps.isLogin && isLogin) {
      history.push('/');
    }
  }

  render(){

    const { match } = this.props;
    return (
      <div>
        {match.path === '/login' && <Login/>}
        {match.path === '/signup' && <Signup/>}
      </div>
    )
  }

}

export default withRouter(
  connect(
    ({ app }) => ({
      isLogin: app.isLogin,
    }),
    null,
  )(SiFoLo),
);

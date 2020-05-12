import React from 'react';
import {
  Button,
  Grid,
  TextField,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  isPassword,
  isEmail,
} from '../../utilities/commonValidation';
import { submitLoginAction } from '../../actions/appActions';

class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }

  componentDidUpdate( prevProps, prevState, snapshot ) {
    console.log("Update ", prevProps.isLogin, this.props.isLogin);
    const { history, isLogin } = this.props;
    if (!prevProps.isLogin && isLogin) {
      history.push('/');
    }
  }

  _handleLogin = (type, ev) => {
    if (type === 'email') {
      this.setState({
        email: ev.target.value,
        emailError: false,
      });
    } else if (type === 'password') {
      this.setState({
        password: ev.target.value,
        passwordError: false,
      });
    }
  };

  _submitLogin = () => {
    const { submitLogin } = this.props;
    const {
      email,
      password,
    } = this.state;
    const passwordErrorCheck = !isPassword(password);
    const emailErrorCheck = !isEmail(email);
    this.setState({
      emailError: emailErrorCheck,
    });
    this.setState({
      passwordError: passwordErrorCheck,
    });
    if (!emailErrorCheck && !passwordErrorCheck){
      submitLogin({email, password});
    }

  };

  handleKeyPress = (ev) => {
    if (ev.key === 'Enter') {
      this._submitLogin();
      ev.preventDefault();
    }
  };

  _moveToSignup = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push('/signup');
  }

  _renderLoginButtons = () => {
    const {
      email,
      password,
      passwordError,
      emailError,
    } = this.state;
    const { loginError } = this.props;
    return (
      <div className="signup-page">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {(
              <TextField
                error={!!emailError}
                helperText={emailError ? 'Please enter valid email id' : ''}
                id="email"
                label="Email ID"
                className="textField inputHead customText-width"
                margin="normal"
                value={email}
                onChange={ev => this._handleLogin('email', ev)}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={!!passwordError}
              helperText={
                passwordError ? 'Password should be greater than 8 digit' : ''
              }
              id="password"
              label={
                'Password'
              }
              className="textField inputHead customText-width"
              margin="normal"
              type="password"
              value={password}
              onChange={ev => this._handleLogin('password', ev)}
              onKeyPress={ev => this.handleKeyPress(ev)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ul className="modalButtons">
            <li className="darkgreenBtnHeader">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="button darkgreenBtn"
                onClick={this._submitLogin}
              >
                Login
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="button darkgreenBtn"
                onClick={this._moveToSignup}
                style={{
                  marginLeft: "20px"
                }}
              >
                Signup
              </Button>
              <p className="errorMsg">{loginError}</p>
            </li>
          </ul>
        </Grid>
        {/* <div className="loginbyEmail">
         <p>Login by Email ID</p>

         </div>
         <div className="signin">
         <p></p>
         </div> */}
      </div>
    );
  };

  render(){
    return (
      <div className="signup-page-heading">
        <h1>Login Page</h1>
        {this._renderLoginButtons()}
      </div>
    )
  }
}

export default withRouter(
  connect(
    ({ app }) => ({
      userData: app.userData,
      isLogin: app.isLogin,
      loginError: app.loginError,
    }),
    dispatch => ({
      submitLogin: (params) => dispatch(submitLoginAction(params)),
    }),
  )(Login),
);

import React from 'react';
import { Button,Grid, TextField } from "@material-ui/core";
import { isEmail, isPassword } from "../../utilities/commonValidation";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { registerUserAction } from '../../actions/appActions';
import '../../App.css';

class Signup extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }

  componentDidUpdate( prevProps, prevState, snapshot ) {
    const { isRegistered, history } = this.props;
    if (!prevProps.isRegistered && isRegistered) {
      history.push('/login');
    }
  }

  _handleSignup = (type, ev) => {
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
    } else if(type === 'cfmpassword') {
      this.setState( {
        confirmPassword: ev.target.value,
        confirmpasswordError: false,
      } );
    }
  };

  _submitSignup = () => {
    const { registerUser } = this.props;
    const {
      email,
      password,
      confirmPassword,
    } = this.state;
    const passwordErrorCheck = !isPassword(password);
    const emailErrorCheck = !isEmail(email);
    this.setState({
      emailError: emailErrorCheck,
    });
    this.setState({
      passwordError: passwordErrorCheck,
    });
    if (password !== confirmPassword) {
      this.setState({
        confirmPasswordError: 'Passwords do not match',
      });
    }
    if (!emailErrorCheck && !passwordErrorCheck && password === confirmPassword){
      registerUser({email, password});
    }

  };

  handleKeyPress = (ev) => {
    if (ev.key === 'Enter') {
      this._submitSignup();
      ev.preventDefault();
    }
  };

  _moveToLogin = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push('/login');
  }

  _renderSignupButtons = () => {
    const {
      email,
      password,
      confirmPassword,
      passwordError,
      emailError,
      confirmPasswordError,
    } = this.state;
    const { registrationError } = this.props;
    return (
      <div className="signup-page">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              error={!!emailError}
              helperText={emailError ? 'Please enter valid email id' : ''}
              id="email"
              label="Email ID"
              className="textField inputHead customText-width"
              margin="normal"
              value={email}
              onChange={ev => this._handleSignup('email', ev)}
            />
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
              onChange={ev => this._handleSignup('password', ev)}
              onKeyPress={ev => this.handleKeyPress(ev)}
            />
          </Grid>
        </Grid>
        <TextField
          error={!!confirmPasswordError}
          helperText={
            confirmPasswordError ? 'Passwords do not match' : ''
          }
          id="cfmpassword"
          label={
            'Confirm Password'
          }
          className="textField inputHead customText-width"
          margin="normal"
          type="password"
          value={confirmPassword}
          onChange={ev => this._handleSignup('cfmpassword', ev)}
          onKeyPress={ev => this.handleKeyPress(ev)}
        />
        <ul className="modalButtons">
          <li className="darkgreenBtnHeader">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="button darkgreenBtn"
              onClick={this._submitSignup}
            >
              Signup
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="button darkgreenBtn"
              onClick={this._moveToLogin}
              style={{
                marginLeft: "20px"
              }}
            >
              Login
            </Button>
            <p className="errorMsg">{registrationError}</p>
          </li>
        </ul>
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
        <h1>Signup Page</h1>
        {this._renderSignupButtons()}
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
      isRegistered: app.isRegistered,
      registrationError: app.registrationError
    }),
    dispatch => ({
      registerUser: (params) => {
        dispatch(registerUserAction(params));
      }
    }),
  )(Signup),
);

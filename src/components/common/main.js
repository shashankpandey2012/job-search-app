import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { setMessage } from '../../actions/appActions';
import SiFoLo from '../SiFoLo';
import NotFound from './notFound';
import ErrorBoundary from './errorBoundary';
import EnsureLoggedInContainer from './ensureLoggedInContainer';
import { checkUserData } from '../../actions/appActions';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flag: true };
  }

  componentDidMount() {
    const {
      message, updateMessage,
      // updateUserData,
    } = this.props;
    if (!message) {
      updateMessage("Hi, I'm from client!");
    }
  }

  render() {
    const { fetching } = this.props;
    return (
      <React.Fragment>
        {fetching ? <div>Loading</div> : null}
        <ErrorBoundary>
          <Switch>
            <Route path="/login" exact component={SiFoLo} />
            <Route path="/signup" exact component={SiFoLo} />
            <Route component={EnsureLoggedInContainer} />
            <Route path="*" render={NotFound} />
          </Switch>
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}

// Just for example, later it will be removed
export default withRouter(
  connect(
    ({ app }) => ({
      fetching: app.fetching,
      isLogin: app.isLogin,
    }),
    dispatch => ({
      updateMessage: messageText => dispatch(setMessage(messageText)),
      updateUserData: userData => dispatch(checkUserData(userData)),
    }),
  )(MainPage),
);

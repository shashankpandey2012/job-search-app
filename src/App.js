import React from 'react';
import Main from './components/common/main';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {

    };
  }

  render() {
    // The entire state is passed to the provider
    return (
        <Main />
    );
  }
}

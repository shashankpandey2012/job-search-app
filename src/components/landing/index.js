import React from 'react';
import {
  Button,
  TextField,
  Grid,
} from '@material-ui/core';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { fetchGithubDataAct } from '../../actions/landingActions';
import JobsList from './JobsList';

class Landing extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      inputText: '',
      inputError: ''
    }
  }

  _handleOnChange = (e) => {
    e.preventDefault();
    this.setState({
      inputText: e.target.value,
      inputError: ''
    })
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    const { inputText } = this.state;
    const { fetchGithubData } = this.props;
    if (inputText) {
      fetchGithubData(inputText);
    } else {
      this.setState({
        inputError: 'Please enter Programming Language'
      })
    }
  }

  _switchRoute = (id) => {
    const { history } = this.props;
    history.push(`/jobs/${id}`);
  }

    render() {
      const { inputText, inputError } = this.state;
      const { jobsList,isFetching } = this.props;
      return (
        <div className="">
          <div className="signup-page">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  error={ !!inputError }
                  helperText={ inputError ? inputError : '' }
                  id="input"
                  label="Enter Programming Language"
                  className="textField inputHead customText-width"
                  margin="normal"
                  value={ inputText }
                  onChange={ ev => this._handleOnChange( ev ) }
                />
              </Grid>
              <Grid item xs={12} className="search-button">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="button darkgreenBtn"
                  onClick={ this._handleSubmit }
                >
                  Search
                </Button>
                {isFetching && <label>Fetching Data....</label>}
              </Grid>
            </Grid>
          </div>

          <div>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {jobsList.length && jobsList.length > 0 &&
                <JobsList
                  list={jobsList}
                  _switchRoute={this._switchRoute}
                />}
              </Grid>
            </Grid>
          </div>
        </div>

      )
    }
}

export default withRouter(
  connect(
    ({ landing }) => ({
      message: landing.message,
      jobsList: landing.jobsList,
      isFetching: landing.isFetching
    }),
    dispatch => ({
      fetchGithubData: (params) => dispatch(fetchGithubDataAct(params)),
    })
  )(Landing)
);



import React from 'react';
import _ from 'lodash';
import { Grid,Avatar,Button, TextField, TextareaAutosize } from '@material-ui/core';
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Modal from '../common/Modal';
import { fetchJobByIdAct } from "../../actions/landingActions";
import { isEmail } from "../../utilities/commonValidation";

class JobDetail extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      name: '',
      nameError: '',
      email: '',
      emailError: '',
      coverLetterNote: '',
      coverLetterNoteError: '',
      selectedFile: null,
      jobApplied: false,
      applying: false
    }
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    this._getJobById(id);
  }

  _getJobById = (id) => {
    const { fetchJobById } = this.props;
    fetchJobById(id);
  };

  toggleFormModal = () => {
    this.setState({
      isModalOpen: !(this.state.isModalOpen)
    })
  };

  handleOnChange = (type, value) => {
    this.setState({
      [type]: value,
      [`${type}Error`]: ''
    });
  }

  onFileChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, coverLetterNote} = this.state;
    const emailErrorCheck = !isEmail(email);
    let nameError = '';
    let coverLetterNoteError = '';
    this.setState({
      emailError: emailErrorCheck,
    });
    if (!name) {
      nameError = 'Enter name';
      this.setState({
        nameError: nameError,
      });
    }
    if (!coverLetterNote) {
      coverLetterNoteError = 'Enter COver Latter';
      this.setState({
        coverLetterNoteError: coverLetterNoteError,
      });
    }
    if (!nameError && !emailErrorCheck && !coverLetterNoteError) {
      const self = this;
      this.setState({
        applying: true
      })
      setTimeout(()=> {
        self.setState({
          jobApplied: true,
          applying: true
        })
      }, 5000);
    }
  }

  render() {
    const { jobDetail } = this.props;
    const { applying,jobApplied, isModalOpen,name, email,coverLetterNote, nameError, emailError,coverLetterNoteError  } = this.state;
    const months = ['Jan', 'Feb', 'March', 'April', 'May',  'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date;
    if (!_.isEmpty(jobDetail)) {
      date = new Date(jobDetail.created_at);
    }

    return (
      <div className="signup-page-heading">
        <h1>Job Details</h1>
        <div className="signup-page" style={{width: "1000px"}}>
          <Grid item xs={12} className="detailGrid">
            {!_.isEmpty(jobDetail) &&
            <ul>
              <Avatar alt="C" src={jobDetail.company_logo} style={{
                display: 'flex',
                '& > *': {
                  margin: '100px',
                },
                width: '120px',
                height: '120px',
              }} />
              <li>
                Company :
                <span>{jobDetail.company}</span>
              </li>
              <li>
                Title :
                <span>{ jobDetail.title }</span>
              </li>
              <li>
                Type :
                <span>{ jobDetail.type }</span>
              </li>
              <li>
                Location :
                <span>{ jobDetail.location }</span>
              </li>
              <li>
                Description :
                <span dangerouslySetInnerHTML={{__html: jobDetail.description}} />
              </li>
              <li>
                URL :
                <span>
                <a target={'_blank'} rel="noopener noreferrer" href={jobDetail.url}>{jobDetail.url}</a>
              </span>
              </li>
              <li>
                How to Apply :
                <span dangerouslySetInnerHTML={{__html: jobDetail.how_to_apply}} />
              </li>
              <li>
                Job Posted At :
                <span>{ `${date.getDate()} - ${months[date.getMonth()]} - ${date.getFullYear()}` }</span>
              </li>
              <li>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="button darkgreenBtn"
                  onClick={this.toggleFormModal}
                >
                  Apply
                </Button>
              </li>
            </ul>

            }
          </Grid>
          <Modal
            titleContent={'Application Form'}
            isOpen={isModalOpen}
            onClose={this.toggleFormModal}
          >
            {!applying && !jobApplied && <div className="signup-page">
              <Grid>
                <TextField
                  error={ !!nameError }
                  helperText={ nameError ? nameError : '' }
                  id="name"
                  label="Enter Name"
                  className="textField inputHead customText-width"
                  margin="normal"
                  value={ name }
                  onChange={ ev => this.handleOnChange('name', ev.target.value) }
                />
                <TextField
                  error={ !!emailError }
                  helperText={ emailError ? emailError : '' }
                  id="email"
                  label="Enter Email"
                  className="textField inputHead customText-width"
                  margin="normal"
                  value={ email }
                  onChange={ ev => this.handleOnChange('email', ev.target.value)}
                />
                <TextareaAutosize
                  error={ !!coverLetterNoteError }
                  helperText={ coverLetterNoteError ? coverLetterNoteError : '' }
                  id="coverLetterNote"
                  label="Cover Letter Note"
                  className="textArea"
                  margin="normal"
                  value={ coverLetterNote }
                  onChange={ ev => this.handleOnChange('coverLetterNote', ev.target.value) }
                />
                <label className="inputFile">Upload Resume</label>
                <input className="inputFile" type="file" onChange={this.onFileChange} about={"Add Resume"}/>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="button darkgreenBtn"
                  onClick={(e) => this.onFormSubmit(e)}
                >
                  Apply
                </Button>
              </Grid>
            </div>}
            {applying && !jobApplied &&
              <div className="signup-page">
                <h2>Applying Please Wait...</h2>
              </div>
            }
            {jobApplied &&
              <div className="signup-page" style={{
                display: 'inline'
              }}>
                <h2>Job Applied</h2>
                <h3>Name: {name}</h3>
                <h3>Email: {email}</h3>
                <h3>Company: {jobDetail.company}</h3>
                <h3>Title: {jobDetail.title}</h3>
                <h2>File Details:</h2>
                <p>File Name: {this.state.selectedFile.name}</p>
                <p>File Type: {this.state.selectedFile.type}</p>
                <p>
                  Last Modified:{" "}
                  {this.state.selectedFile.lastModifiedDate.toDateString()}
                </p>
              </div>
            }
          </Modal>
        </div>

      </div>
    )
  }
}

export default withRouter(
  connect(
    ({ landing }) => ({
      jobsList: landing.jobsList,
      isFetching: landing.isFetching,
      jobDetail: landing.jobDetail,
      fetchingJobDetail: landing.fetchingJobDetail,
    }),
    dispatch => ({
      fetchJobById: (id) => dispatch(fetchJobByIdAct(id)),
    })
  )(JobDetail)
);

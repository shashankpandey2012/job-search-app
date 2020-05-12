import axios from 'axios';

export const fetchGithubDataAct = (params) => async dispatch => {
  try {
    dispatch({
      type: 'FETCHING_JOBS',
      payload: null,
    })
    const response = await axios.get(`http://localhost:8001/jobs?language=${params}`,
      {
        headers: {'Access-Control-Allow-Origin': '*'}
      }
      );
    if (response) {
      console.log("Response", response);
      dispatch({
        type: 'FETCH_JOBS_SUCCESS',
        payload: response.data
      })
    } else {
      dispatch({
        type: 'FETCH_JOBS_FAILED',
        payload: []
      })
    }
  } catch(e) {
    console.log("E", e);
    dispatch({
      type: 'FETCH_JOBS_FAILED',
      payload: e.message
    })
  }

};

export const fetchJobByIdAct = (id) => async dispatch => {
  try {
    dispatch({
      type: 'FETCHING_JOB_DETAIL',
      payload: null,
    })
    const response = await axios.get(`http://localhost:8001/getJobById?id=${id}`,
      {
        headers: {'Access-Control-Allow-Origin': '*'}
      }
    );
    if (response) {
      console.log("Response", response);
      dispatch({
        type: 'FETCH_JOB_DETAIL_SUCCESS',
        payload: response.data
      })
    } else {
      dispatch({
        type: 'FETCH_JOB_DETAIL_FAILED',
        payload: []
      })
    }
  } catch(e) {
    console.log("E", e);
    dispatch({
      type: 'FETCH_JOBS_DETAIL_FAILED',
      payload: e.message
    })
  }
};

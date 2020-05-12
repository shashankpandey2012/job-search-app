const initialState = {
  message: null,
  jobsList: [],
  isFetching: false,
  fetchingJobDetail: false,
  jobDetail: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_JOBS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        jobsList: action.payload
      }
    case 'FETCH_JOBS_FAILED':
      return {
        ...state,
        isFetching: false,
        jobsList: []
      }

    case 'FETCHING_JOBS':
      return {
        ...state,
        isFetching: true,
        jobsList: []
      }

    case 'FETCHING_JOB_DETAIL':
      return {
        ...state,
        fetchingJobDetail: true,
        jobDetail: {}
      }

    case 'FETCH_JOB_DETAIL_SUCCESS':
      return {
        ...state,
        fetchingJobDetail: false,
        jobDetail: action.payload
      }
    case 'FETCH_JOB_DETAIL_FAILED':
      return {
        ...state,
        fetchingJobDetail: false,
        jobDetail: {}
      }

    default:
      return state;
  }
};

import { combineReducers } from 'redux';
import { SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT, REQUEST_POSTS, RECEIVE_POSTS, FETCH_FAILURE } from '../actions';

function selectedSubreddit(state = 'alternativeart', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
}

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
    error: false,
  },
  action,
) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return { ...state, didInvalidate: true, error: false };
    case REQUEST_POSTS:
      return {
        ...state,
        ...{
          isFetching: true,
          didInvalidate: false,
          error: false,
        },
      };
    case RECEIVE_POSTS:
      return {
        ...state,
        ...{
          isFetching: false,
          didInvalidate: false,
          items: action.posts,
          lastUpdated: action.receivedAt,
          error: false,
        },
      };
    case FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}

function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
    case FETCH_FAILURE:
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action),
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit,
});

export default rootReducer;
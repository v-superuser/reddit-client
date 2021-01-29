export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const FETCH_POSTS = 'FETCH_POSTS';

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit,
  };
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit,
  };
}

export function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit,
  };
}

export function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now(),
  };
}

export function fetchPostsIfNeeded(subreddit) {
  return {
    type: FETCH_POSTS,
    subreddit,
  };
}

export function fetchFailure(subreddit) {
  return {
    type: FETCH_FAILURE,
    subreddit,
  };
}
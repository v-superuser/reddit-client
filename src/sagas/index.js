import { put, takeEvery, select, call } from 'redux-saga/effects';

import fetchPosts from '../api/fetchPosts';
import { FETCH_POSTS, receivePosts, requestPosts, fetchFailure } from '../actions';
import { getPostsBySubreddit } from '../selectors';

const shouldFetchPosts = (posts) => {
  if (!posts) return true;
  else if (posts.isFetching) return false;
  return posts.didInvalidate;
};

function* fetchPostsIfNeeded({ subreddit }) {
  try {
    const posts = yield select(getPostsBySubreddit, subreddit);
    if (shouldFetchPosts(posts)) {
      yield put(requestPosts(subreddit));
      const json = yield call(fetchPosts, subreddit);
      yield put(receivePosts(subreddit, json));
    }
  } catch (error) {
    yield put(fetchFailure(subreddit));
  }
}

export default function* fetchPostsWatcher() {
  yield takeEvery(FETCH_POSTS, fetchPostsIfNeeded);
}
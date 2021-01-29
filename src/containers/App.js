import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    document.title = 'Reddit Client';
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props;
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
  }

  handleChange(nextSubreddit) {
    const { dispatch } = this.props;
    dispatch(selectSubreddit(nextSubreddit));
    dispatch(fetchPostsIfNeeded(nextSubreddit));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  render() {
    const {
      selectedSubreddit, posts, isFetching,
    } = this.props;
    return (
      <div>
        <Picker
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={['alternativeart', 'pics', 'gifs', 'adviceanimals', 'cats', 'images', 'photoshopbattles', 'hmmm', 'all', 'aww']}
        />
        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {posts.length > 0 && (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        )}
      </div>
    );
  }
}

App.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state;
  const { isFetching, items: posts } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: [],
  };

  return {
    selectedSubreddit,
    posts,
    isFetching,
  };
}

export default connect(mapStateToProps)(App);
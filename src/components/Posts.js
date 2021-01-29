import React from 'react';
import PropTypes from 'prop-types';
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faCommentDots } from '@fortawesome/free-solid-svg-icons'


export default function Posts({ posts }) {
  return (
  <ul className='posts-list'>
      {posts.map(({ id, post_hint, title, ups, num_comments , url, permalink }) => {
        const post_link = "https://reddit.com" + permalink;
          if(post_hint==="image") {
              return(
                <li key={id} className="post-item">
                    <div className="info">
                        <div className="metadata">
                            <div className="upvotes"> <FontAwesomeIcon icon={faChevronUp} /> {ups}</div>
                            <div className="comments"> <FontAwesomeIcon icon={faCommentDots} /> {num_comments}</div>
                        </div>
                        <a href={post_link}><h2 className="title">{title}</h2></a>
                    </div>
                    <img src={url} />
                </li>
              )
          }
        })}
  </ul>
  );
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};
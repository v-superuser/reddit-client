import fetch from 'cross-fetch';

export default function fetchPosts(subreddit) {
  return new Promise((resolve, reject) => {
    fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          reject(new Error(json.message));
        } else resolve(json);
      })
      .catch(reject);
  });
}
import React from 'react';
import PropTypes from 'prop-types';

export default function Picker({ value, onChange, options }) {
  return (
    <span>
      <h1 className="sub-title">r/{value}</h1>
      <div className="picker-container">
        <p>Pick Subreddit to browse: </p>
        <select onChange={e => onChange(e.target.value)} value={value}>
          {options.map(option => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      
    </span>
  );
}

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
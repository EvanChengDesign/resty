import React from 'react';
import './Results.scss';

const Results = ({ data }) => {
  return (
    <div className="response-container">
      {data ? (
        <pre> {data?JSON.stringify(data, null, 2):null}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Results;

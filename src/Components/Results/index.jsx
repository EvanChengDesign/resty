import React from 'react';
import ReactJson from 'react-json-view';
import './Results.scss';

const Results = ({ data }) => {
  return (
    <div className="response-container">
      {data ? (
        <ReactJson src={data} theme="rjv-default" collapsed={2} enableClipboard={false} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Results;

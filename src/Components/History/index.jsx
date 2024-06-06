import React from 'react';
import './History.scss';

const History = ({ history, displayHistoryItem }) => {
  return (
    <div className="history-container">
      <ul className="history-list">
        {[...history].reverse().map((entry, index) => (
          <li key={index} className="history-item">
            <button onClick={() => displayHistoryItem(entry.results, {})} className={`history-button ${entry.method}`}>
              {entry.method} {entry.url}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;

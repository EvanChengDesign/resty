import React from 'react';

const Results = ({ data, headers }) => {
  const formatJsonString = (jsonString) => {
    try {
      const jsonObject = JSON.parse(jsonString);
      return JSON.stringify(jsonObject, null, 2)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\\s*:)?)|(\\b(true|false|null)\\b)|(\\b-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?\\b)/g, (match) => {
          let cls = 'json-value';
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'json-key';
            } else {
              cls = 'json-string';
            }
          } else if (/true|false/.test(match)) {
            cls = 'json-boolean';
          } else if (/null/.test(match)) {
            cls = 'json-null';
          }
          return `<span class="${cls}">${match}</span>`;
        });
    } catch (error) {
      return jsonString;
    }
  };

  return (
    <div>
      <pre>
        <code
          dangerouslySetInnerHTML={{
            __html: formatJsonString(JSON.stringify(data)),
          }}
        />
      </pre>
      <h2>Headers</h2>
      <pre>
        <code>{JSON.stringify(headers, null, 2)}</code>
      </pre>
    </div>
  );
};

export default Results;

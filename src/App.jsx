import React, { useState } from 'react';
import './App.scss';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

const App = () => {
  const [data, setData] = useState(null);
  const [headers, setHeaders] = useState(null);
  const [requestParams, setRequestParams] = useState({});

  const callApi = async (requestParams) => {
    setRequestParams(requestParams);

    try {
      const response = await fetch(requestParams.url, {
        method: requestParams.method,
        headers: requestParams.headers,
        body: requestParams.body,
      });

      const responseHeaders = {};
      response.headers.forEach((value, name) => {
        responseHeaders[name] = value;
      });

      const data = await response.json();
      setData(data);
      setHeaders(responseHeaders);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const formatJsonString = (jsonString) => {
    try {
      const jsonObject = JSON.parse(jsonString);
      return JSON.stringify(jsonObject, null, 2)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?)|(\b(true|false|null)\b)|(\b-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?\b)/g, (match) => {
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
      console.error("Error parsing JSON string:", error);
      return jsonString; // Return the original string if parsing fails
    }
  };

  return (
    <React.Fragment>
      <Header />
      <section>
        <Form handleApiCall={callApi} />
      </section>
      <section>
        <div>Request Method: {requestParams.method}</div>
        {requestParams.body && (
          <div>
            <pre className="request-params" dangerouslySetInnerHTML={{ __html: formatJsonString(requestParams.body) }} />
          </div>
        )}
        <div>URL: {requestParams.url}</div>
      </section>
      <div className="response-container">
        <h2>Response Headers</h2>
        <pre className="response-headers">{headers && formatJsonString(JSON.stringify(headers))}</pre>
        <h2>Results</h2>
        <Results data={data} />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default App;

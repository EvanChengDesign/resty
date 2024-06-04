import React, { useState } from 'react';
import './App.scss';

import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

const App = () => {
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});

  const callApi = async (requestParams) => {
    setRequestParams(requestParams);

    try {
      const response = await fetch(requestParams.url, {
        method: requestParams.method,
        headers: requestParams.headers,
        body: requestParams.body,
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
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
        <div>URL: {requestParams.url}</div>
      </section>
      <div className="response-container">
        <Results data={data} />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default App;

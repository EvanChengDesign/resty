import React, { useReducer, useEffect } from 'react';
import './App.scss';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import History from './Components/History';

const initialState = {
  loading: false,
  data: null,
  headers: null,
  requestParams: {},
  history: [],
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'SET_DATA':
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        headers: action.payload.headers,
        history: [
          {
            method: state.requestParams.method,
            url: state.requestParams.url,
            results: action.payload.data,
          },
          ...state.history,
        ],
      };
    case 'SET_REQUEST_PARAMS':
      return { ...state, requestParams: action.payload };
    case 'SET_DISPLAY_DATA':
      return { ...state, data: action.payload.data, headers: action.payload.headers };
    default:
      return state;
  }
}

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
    console.error("Error parsing JSON string:", error);
    return jsonString; // Return the original string if parsing fails
  }
};

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      if (!state.requestParams.url) return;

      dispatch({ type: 'SET_LOADING' });

      try {
        const response = await fetch(state.requestParams.url, {
          method: state.requestParams.method,
          headers: state.requestParams.headers,
          body: state.requestParams.body,
        });

        const responseHeaders = {};
        response.headers.forEach((value, name) => {
          responseHeaders[name] = value;
        });

        const data = await response.json();
        dispatch({
          type: 'SET_DATA',
          payload: { data, headers: responseHeaders },
        });
      } catch (error) {
        console.error('Error fetching data: ', error);
        dispatch({ type: 'SET_LOADING' });
      }
    };

    fetchData();
  }, [state.requestParams]);

  const callApi = (params) => {
    dispatch({ type: 'SET_REQUEST_PARAMS', payload: params });
  };

  const displayHistoryItem = (data, headers) => {
    dispatch({ type: 'SET_DISPLAY_DATA', payload: { data, headers } });
  };

  return (
    <div className="App">
      <Header />
      <section>
        <Form handleApiCall={callApi} />
      </section>
      <section>
        <div data-testid="request-method">Request Method: {state.requestParams.method}</div>
        {state.requestParams.body && (
          <div>
            <pre className="request-params" dangerouslySetInnerHTML={{ __html: formatJsonString(state.requestParams.body) }} />
          </div>
        )}
        <div data-testid="request-url">URL: {state.requestParams.url}</div>
      </section>
      <div className="response-container">
        <h2>Response Headers</h2>
        <pre className="response-headers" data-testid="response-headers">{state.headers && formatJsonString(JSON.stringify(state.headers))}</pre>
        <h2>Results</h2>
        <Results data={state.data} data-testid="json-display" />
      </div>
      <h2>History</h2>
      <History history={state.history} displayHistoryItem={displayHistoryItem} />
      <Footer />
    </div>
  );
};

export default App;

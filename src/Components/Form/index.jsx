import React, { useState } from 'react';
import './Form.scss';

const Form = (props) => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [body, setBody] = useState('');

  const handleMethodClick = (e) => {
    setMethod(e.target.id);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      method: method,
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
      body: method === 'POST' || method === 'PUT' ? body : null,
    };
    props.handleApiCall(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <label>
          <span>URL: </span>
          <input name='url' type='text' value={url} onChange={handleUrlChange} data-testid='url-input' />
          <button type="submit" data-testid='fetch-api-button'>GO!</button>
        </label>
        <div className="methods">
          <button
            type="button"
            id="GET"
            onClick={handleMethodClick}
            className={method === 'GET' ? 'GET active' : 'GET'}
            data-testid='get-input'
          >
            GET
          </button>
          <button
            type="button"
            id="POST"
            onClick={handleMethodClick}
            className={method === 'POST' ? 'POST active' : 'POST'}
            data-testid='post-input'
          >
            POST
          </button>
          <button
            type="button"
            id="PUT"
            onClick={handleMethodClick}
            className={method === 'PUT' ? 'PUT active' : 'PUT'}
            data-testid='put-input'
          >
            PUT
          </button>
          <button
            type="button"
            id="DELETE"
            onClick={handleMethodClick}
            className={method === 'DELETE' ? 'DELETE active' : 'DELETE'}
            data-testid='delete-input'
          >
            DELETE
          </button>
        </div>
        {(method === 'POST' || method === 'PUT') && (
          <label>
            <span>Body: </span>
            <textarea name='body' value={body} onChange={handleBodyChange} data-testid='body-input' />
          </label>
        )}
      </form>
    </>
  );
};

export default Form;

import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App', () => {

  it('should do a get api call', async () => {

    render(<App />);

    const urlInput = screen.getByTestId('url-input');
    const getInput = screen.getByTestId('get-input');
    const submitButton = screen.getByTestId('fetch-api-button');

    let method = 'GET';
    let url = 'https://auth-api-zx33.onrender.com/api/api-routes/clothes';

    // 1 - if I type into the url and method fields, does the url display change?
    fireEvent.change(urlInput, { target: { value: url } });
    fireEvent.click(getInput);
    fireEvent.click(submitButton);

    // does the json display show the results of the API call?
    expect(await screen.findByTestId('json-display')).not.toBeNull();
  });

});



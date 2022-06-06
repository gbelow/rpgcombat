import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../renderer/app/store';
import App from '../renderer/App';

describe('App', () => {
  it('should render', () => {
    expect(
      render(
        <React.StrictMode>
          <Provider store={store}>
            <App />
          </Provider>
        </React.StrictMode>
      )
    ).toBeTruthy();
  });
});

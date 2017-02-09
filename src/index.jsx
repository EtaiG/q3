import React from 'react';
import {Provider} from 'mobx-react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AppState from './AppState';
import LayoutStore from './LayoutStore';
import App from './App';
import _ from 'lodash';

const appState = new AppState();
const layoutStore = new LayoutStore();
const layoutAPI = _.pick(layoutStore, ['requestLayout', 'registerToLayout', 'unregisterLayout']);
render(
  <AppContainer>
      <Provider layoutAPI={layoutAPI}>
        <App appState={appState} />
      </Provider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;

    render(
      <AppContainer>
          <Provider layoutAPI={layoutAPI}>
              <NextApp appState={appState} />
          </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}

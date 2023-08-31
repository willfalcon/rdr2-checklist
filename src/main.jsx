import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import debounce from './lib/debounce';
import { saveState } from './browser-storage';

import './index.css';
import Root from './routes/root';
import ErrorPage from './error-page';

import Tracking, { loader as trackingLoader, action as trackingAction } from './routes/tracking';
import Lists, { loader as listsLoader } from './routes/lists';
import List, { loader as listLoader, action as listAction } from './routes/list';
import Data from './routes/data';
import All, { loader as allLoader } from './routes/all';
import { action as incrementMaterialAction } from './routes/increment';

store.subscribe(
  // we use debounce to save the state once each 800ms
  // for better performances in case multiple changes occur in a short time
  debounce(() => {
    saveState(store.getState());
  }, 800)
);

function getRouter(store) {
  return createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Lists />,
          loader: () => listsLoader(store),
        },
        {
          path: 'tracking',
          element: <Tracking />,
          loader: () => trackingLoader(store),
          action: args => trackingAction(args, store),
        },
        {
          path: 'list/:slug',
          element: <List />,
          loader: args => listLoader(args, store),
          action: args => listAction(args, store),
        },
        {
          path: '/all',
          element: <All />,
          loader: allLoader,
        },
        {
          path: '/increment',
          action: args => incrementMaterialAction(args, store),
        },
        // {
        //   path: 'data',
        //   element: <Data />,
        // },
      ],
    },
  ]);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={getRouter(store)} />
    </Provider>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { peopleApi } from './api/peopleSlice/peopleSlice';
import { NotFoundPage } from './components/NotFoundPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './api/store';
import './index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFoundPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
);

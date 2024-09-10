import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {ThemeProvider} from '@mui/material/styles';
import {theme} from './components/theme/theme'
import {BrowserRouter} from "react-router-dom";
import {SnackbarProvider} from 'notistack';
import {Provider} from "react-redux";
import store, {persistor} from "./store/store"
import {PersistGate} from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
    document.getElementById('root')
);
root.render(
    <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <SnackbarProvider maxSnack={4} anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}>
                        <App/>
                    </SnackbarProvider>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </PersistGate>
)
;
import React, { Component, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from '@reach/router';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import UsersList from './components/user/list/UsersList';
import UserDetails from './components/user/detail/UserDetails';
import store from './userApi/store';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#224d78',
            contrastText: '#FFF'
        },
        secondary: {
            main: '#77B2E8',
            contrastText: '#FFF'
        }
    }
});

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider theme={theme}>
                    <Router style={{marginTop: 64}}>
                        <UsersList path="/" />
                        <UserDetails path="/:username" />
                    </Router>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
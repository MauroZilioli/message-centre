import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import store from './singletons/store';
import history from './singletons/history';

import * as SH from './sh/src/elements';
import RoutesContainer from './containers/RoutesContainer';
import HeaderContainer from './containers/HeaderContainer';


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div style={{width: '100%', height: '100%'}}>
                <SH.Site>
                    <SH.Siteheader>
                        <HeaderContainer />
                    </SH.Siteheader>
                    <SH.Sitecontent>
                        <RoutesContainer />
                    </SH.Sitecontent>
                </SH.Site>
            </div>
        </Router>
    </Provider>,
    document.getElementById('app')
);

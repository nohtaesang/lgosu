import React from 'react';

import Nav from './nav/Nav';
import Admin from './sections/admin/Admin';
import Main from './sections/main/Main';
import DevTools from './DevTools';

const App = () => (
    <div id="app">
        {/* <Nav /> */}
        <Admin />
        {/* <Main /> */}
        <DevTools />
    </div>
);

export default App;

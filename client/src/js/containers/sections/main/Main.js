import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tab from './Tab';
import MatchList from './MatchList';

class ConnectedMain extends Component {
    render() {
        return (
            <div id="main">
                <Tab />
                <MatchList />
            </div>
        );
    }
}

const Main = connect(null)(ConnectedMain);

export default Main;

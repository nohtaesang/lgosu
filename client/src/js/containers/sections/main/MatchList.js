import React, { Component } from 'react';
import { connect } from 'react-redux';

class ConnectedMatchList extends Component {
    render() {
        return <div id="matchList" />;
    }
}

const MatchList = connect(null)(ConnectedMatchList);

export default MatchList;

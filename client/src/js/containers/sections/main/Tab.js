import React, { Component } from 'react';
import { connect } from 'react-redux';

class ConnectedTab extends Component {
    render() {
        return (
            <div id="tab">
                <button type="button" name="ongoing">
                    {'진행중'}
                </button>
                <button type="button" name="end">
                    {'마감'}
                </button>
                <button type="button" name="whole">
                    {'전체'}
                </button>
            </div>
        );
    }
}

const Tab = connect(null)(ConnectedTab);

export default Tab;

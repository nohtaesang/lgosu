import React, { Component } from 'react';
import { connect } from 'react-redux';
// import MatchAddForm from './MatchAddForm';
import MatchList from './MatchList';

class ConnectedAdmin extends Component {
    render() {
        return (
            <div id="admin">
                {/* <MatchAddForm /> */}
                <MatchList />
            </div>
        );
    }
}

const Admin = connect(null)(ConnectedAdmin);

export default Admin;

import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { adminLoadMatchList } from '../../../actions/index';

const mapDispatchToProps = dispatch => ({
    adminLoadMatchList: state => dispatch(adminLoadMatchList(state)),
});

const mapStateToProps = state => ({
    matchList: state.matchList,
});

class ConnectedMatchList extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        axios
            .get('/api/admin/loadMatches')
            .then((response) => {
                this.props.adminLoadMatchList(response.data);
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div id="adminMatchList">
                {this.props.matchList
                    ? this.props.matchList.map(match => (
                        <div className="match" key={match._id}>
                            <div className="day">{match.day}</div>
                            <div className="home">{match.home}</div>
                            <div className="away">{match.away}</div>
                            <button type="button" className="deleteBtn">
                                {'delete'}
                            </button>
                        </div>
                    ))
                    : null}
            </div>
        );
    }
}

const MatchList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConnectedMatchList);

export default MatchList;

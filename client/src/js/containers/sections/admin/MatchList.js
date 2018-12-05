import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as matchAction from '../../../modules/match';
import Match from './Match';

class ConnectedMatchList extends Component {
    componentDidMount() {
        this.getMatchList();
    }

    // componentWillReceiveProps(nextProps) {
    //     if (this.props.numberOfMatches !== nextProps.numberOfMatches) {
    //         // this.getMatchList(nextProps.numberOfMatches);
    //     }
    // }

    getMatchList = async () => {
        const { MatchAction } = this.props;
        try {
            await MatchAction.getMatchList(this.props.numberOfMatches);
        } catch (e) {
            console.log('err');
        }
    };

    getMoreMatchList = async () => {
        const { MatchAction } = this.props;
        try {
            await MatchAction.getMoreMatchList();
            await MatchAction.getMatchList(this.props.numberOfMatches);
        } catch (e) {
            console.log('err');
        }
    };

    render() {
        return (
            <div id="adminMatchList">
                {this.props.matchList
                    ? this.props.matchList.map((match, i) => <Match key={match._id} index={i} />)
                    : null}
                {this.props.loading ? (
                    <p>loading...</p>
                ) : (
                    <button type="button" name="loadMore" onClick={this.getMoreMatchList}>
                        {'loadMore'}
                    </button>
                )}
            </div>
        );
    }
}

export default connect(
    state => ({
        matchList: state.match.matchList,
        numberOfMatches: state.match.numberOfMatches,
        loading: state.pender.pending.GET_MATCH_LIST,
    }),
    dispatch => ({
        MatchAction: bindActionCreators(matchAction, dispatch),
    }),
)(ConnectedMatchList);

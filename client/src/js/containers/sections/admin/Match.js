import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as matchAction from '../../../modules/match';

class ConnectedMatch extends Component {
    deleteMatch = async (id) => {
        const { MatchAction } = this.props;
        try {
            await MatchAction.deleteMatch(id);
            await this.getMatchList();
        } catch (e) {
            console.log('err');
        }
    };

    getMatchList = async () => {
        const { MatchAction } = this.props;
        try {
            await MatchAction.getMatchList(this.props.numberOfMatches);
        } catch (e) {
            console.log('err');
        }
    };

    updateMatch = async (id, update, index) => {
        const { MatchAction } = this.props;
        try {
            await MatchAction.updateMatch(id, update);
            await this.getMatchList();
        } catch (e) {
            console.log('err!');
        }
    };

    render() {
        const { index } = this.props;
        const match = this.props.matchList[index];
        return (
            <div className="match">
                <div className="date">{match.date}</div>
                <div className="time">{match.time}</div>
                <div className="home">{match.home}</div>
                <div className="away">{match.away}</div>
                <div>{`matchEnd=${match.matchEnd}`}</div>
                <div>{`bettingEnd=${match.bettingEnd}`}</div>

                <button
                    type="button"
                    name="matchEnd"
                    className="matchEnd"
                    onClick={() => this.updateMatch(match._id, { matchEnd: !match.matchEnd }, index)
                    }
                    id={match._id}
                >
                    {'matchEnd'}
                </button>
                <button
                    type="button"
                    name="deleteMatch"
                    className="deleteMatchBtn"
                    onClick={() => this.deleteMatch(match._id)}
                    id={match._id}
                >
                    {'deleteMatch'}
                </button>
            </div>
        );
    }
}

export default connect(
    state => ({
        matchList: state.match.matchList,
    }),
    dispatch => ({
        MatchAction: bindActionCreators(matchAction, dispatch),
    }),
)(ConnectedMatch);

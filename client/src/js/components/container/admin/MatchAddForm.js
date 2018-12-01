import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { adminLoadMatchList } from '../../../actions/index';

const mapDispatchToProps = dispatch => ({
    adminLoadMatchList: state => dispatch(adminLoadMatchList(state)),
});

class ConnectedMatchAddForm extends Component {
    constructor() {
        super();
        this.state = {
            day: '',
            home: '',
            away: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        switch (name) {
        case 'day':
            this.setState({ day: value });
            break;
        case 'home':
            this.setState({ home: value });
            break;
        case 'away':
            this.setState({ away: value });
            break;
        default:
            break;
        }
    }

    handleSubmit() {
        axios
            .post('/api/admin/addMatch', {
                day: this.state.day,
                home: this.state.home,
                away: this.state.away,
            })
            .then();
        // axios
        //     .get('/api/admin/loadMatches')
        //     .then((response) => {
        //         this.props.adminLoadMatchList(response.data);
        //     })
        //     .catch(err => console.log(err)),
        this.setState({
            day: '',
            home: '',
            away: '',
        });
    }

    render() {
        return (
            <div id="matchAddForm">
                <input
                    type="text"
                    placeholder="start day"
                    onChange={this.handleChange}
                    name="day"
                    value={this.state.day}
                />
                <input
                    type="text"
                    placeholder="home"
                    onChange={this.handleChange}
                    name="home"
                    value={this.state.home}
                />
                <input
                    type="text"
                    placeholder="away"
                    onChange={this.handleChange}
                    name="away"
                    value={this.state.away}
                />
                <button type="submit" onClick={this.handleSubmit}>
                    {'등록'}
                </button>
            </div>
        );
    }
}

const MatchAddForm = connect(null)(ConnectedMatchAddForm);

export default MatchAddForm;

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { joinError } from '../../actions/JoinActions';

const mapDispatchToProps = dispatch => ({
    joinError: state => dispatch(joinError(state)),
});

const mapStateToProps = state => ({
    joinErrorMessage: state.joinErrorMessage,
});

class ConnectedJoin extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password1: '',
            password2: '',
            nickname: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { target } = e;
        const { name, value } = target;

        switch (name) {
        case 'email':
            this.setState({ email: value });
            break;
        case 'password1':
            this.setState({ password1: value });
            break;
        case 'password2':
            this.setState({ password2: value });
            break;
        case 'nickname':
            this.setState({ nickname: value });
            break;
        default:
            break;
        }
    }

    handleSubmit() {
        const { state, props } = this;
        const {
            email, password1, password2, nickname,
        } = state;

        if (
            email.length === 0
            || password1.length === 0
            || password2.length === 0
            || nickname.length === 0
        ) {
            props.joinError('입력 미완료');
        } else if (password1 !== password2) {
            props.joinError('패스워드 불일치');
        } else {
            this.join(email);
        }
    }

    render() {
        const { props } = this;
        const { joinErrorMessage } = props;
        return (
            <div id="join">
                <input type="text" name="email" onChange={this.handleChange} />
                <input type="password" name="password1" onChange={this.handleChange} />
                <input type="password" name="password2" onChange={this.handleChange} />
                <input tpye="text" name="nickname" onChange={this.handleChange} />
                <button type="submit" onClick={this.handleSubmit}>
                    {'join'}
                </button>
                <p>{joinErrorMessage}</p>
            </div>
        );
    }
}

const Join = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConnectedJoin);

export default Join;

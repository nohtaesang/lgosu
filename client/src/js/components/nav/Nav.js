import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navMovePage, loginEmailChange, loginPasswordChange } from '../../actions/NavActions';
import '../../../css/components/nav/Nav.css';

const mapDispatchToProps = dispatch => ({
    navMovePage: state => dispatch(navMovePage(state)),
    loginEmailChange: state => dispatch(loginEmailChange(state)),
    loginPasswordChange: state => dispatch(loginPasswordChange(state)),
});

const mapStateToProps = state => ({
    login: state.login,
});

class ConnectedNav extends Component {
    constructor() {
        super();

        this.textBoxChange = this.textBoxChange.bind(this);
        this.clickLogo = this.clickLogo.bind(this);
        this.clickJoin = this.clickJoin.bind(this);
    }

    componentDidMount() {}

    textBoxChange(e) {
        const { name, value } = e.target;

        if (name === 'email') {
            this.props.loginEmailChange(value);
        } else if (name === 'password') {
            this.props.loginPasswordChange(value);
        }
    }

    clickLogo() {
        const { props } = this;
        props.navMovePage('index');
    }

    clickJoin() {
        const { props } = this;
        props.navMovePage('join');
    }

    render() {
        // const { loginEmail, loginPassword } = this.props.login;
        // console.log(login);
        console.log(this.props);
        return (
            <div id="nav">
                <button id="logoBtn" type="button" onClick={this.clickLogo}>
                    {'LGOSU'}
                </button>

                <form>
                    <input
                        type="email"
                        placeholder="email"
                        name="email"
                        onChange={this.textBoxChange}
                    />
                    <input type="password" placeholder="password" />
                    <button id="loginBtn" type="button">
                        {'Login'}
                    </button>
                </form>

                <button id="joinBtn" type="button" onClick={this.clickJoin}>
                    {'Join'}
                </button>
            </div>
        );
    }
}

const Nav = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConnectedNav);

export default Nav;

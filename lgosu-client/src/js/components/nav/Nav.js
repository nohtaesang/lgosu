import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navMovePage } from '../../actions/NavActions';
import '../../../css/components/nav/Nav.css';

const mapDispatchToProps = dispatch => ({
    navMovePage: state => dispatch(navMovePage(state)),
});

const mapStateToProps = state => ({});

class ConnectedNav extends Component {
    constructor() {
        super();
        this.clickLogo = this.clickLogo.bind(this);
        this.clickJoin = this.clickJoin.bind(this);
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
        return (
            <div id="nav">
                <button id="logoBtn" type="button" onClick={this.clickLogo}>
                    {'LGOSU'}
                </button>
                <form>
                    <input />
                    <input />
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

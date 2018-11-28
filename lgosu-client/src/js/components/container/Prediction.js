import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({});

class ConnectedPrediction extends Component {
    constructor() {
        super();
    }

    render() {
        return <div id="prediction" />;
    }
}

const Prediction = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConnectedPrediction);

export default Prediction;

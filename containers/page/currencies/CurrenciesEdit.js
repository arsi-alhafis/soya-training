import React, { Component } from 'react';
import fetch from "isomorphic-unfetch";
import { parseQueryString } from '../../../util/util';
import CurrenciesForm from './CurrenciesForm';

class CurrenciesEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currencyId: undefined
        }
    }

    componentWillMount = async () => {
        const id = parseQueryString().id;
        this.setState({
            currencyId: id
        });
    }

    render() {
        return (
            <CurrenciesForm currencyId={this.state.currencyId} />
        );
    }
}

export default CurrenciesEdit;

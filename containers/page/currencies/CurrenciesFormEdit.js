import React, { Component } from 'react';

import fetch from "isomorphic-unfetch";
import { Box, Switch, Label, BoxBody, BoxEmpty, BoxHeader, BoxFooter } from '@traveloka/soya-components';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    Input,
    Button
  } from '@traveloka/soya-components';
  import { NotificationManager } from '@traveloka/soya-components';
  import { parseQueryString } from '../../../util/util';

class CurrenciesForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currencyId: "",
            currencyName: "",
            currencyCode: "",
            currencySymbol: "",
            isActive: false,
            showErrorCode: false,
            errorMessageCode: [],
            showErrorName: false,
            errorMessageName: [],
            showErrorSymbol: false,
            errorMessageSymbol: []
        }
    }

    componentDidMount = async () => {
        const id = parseQueryString().id;

        const res = await fetch("http://soya-training.test.tvlk.cloud:3001/currency/" + id);
        const cur = await res.json();
        const data = await cur['data'];
        
        console.log(data.currency.Name);
        this.setState({
            currencyId: id,
            currencyName: data.currency.name,
            currencyCode: data.currency.code,
            currencySymbol: data.currency.symbol,
            isActive: data.currency.isActive
        });
        console.log(data);
    }

    showSuccessNotif = () => {
        NotificationManager.showSuccess('Successfully Edit Currency');
    }

    showErrorNotif = () => {
        NotificationManager.showError('An Error Occured');
    }

    handleCode = e => {
        if (e !== "") {
            this.setState({
                currencyCode: e,
                showErrorCode: false,
                errorMessageCode: []
            });
        } else {
            this.setState({
                currencyCode: e,
                showErrorCode: true,
                errorMessageCode: ['This field is required']
            });
        }
    }

    handleName = e => {
        if (e !== "") {
            this.setState({
                currencyName: e,
                showErrorName: false,
                errorMessageName: []
            });
        } else {
            this.setState({
                currencyName: e,
                showErrorName: true,
                errorMessageName: ['This field is required']
            });
        }
    }

    handleSymbol = e => {
        if (e !== "") {
            this.setState({
                currencySymbol: e,
                showErrorSymbol: false,
                errorMessageSymbol: []
            });
        } else {
            this.setState({
                currencySymbol: e,
                showErrorSymbol: true,
                errorMessageSymbol: ['This field is required']
            });
        }
    }

    handleActive = e => {
        this.setState({isActive: e});
    }

    handleReset = () => {
        this.setState({
            currencyName: "",
            currencyCode: "",
            currencySymbol: "",
            isActive: false
        });
    }

    handleSubmit = () => {
        const valid = this.check();
        if(valid) {
            fetch("http://soya-training.test.tvlk.cloud:3001/currency/" + this.state.currencyId, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code: this.state.currencyCode,
                    name: this.state.currencyName,
                    symbol: this.state.currencySymbol,
                    isActive: this.state.isActive
                })
            }).then(response =>
                response.json().then(json => {
                    this.showSuccessNotif();
                })
            ).catch(error => {
                this.showErrorNotif();
            });
        }
    }

    check = () => {
        let valid = true;
        if(this.state.currencyName === "") {
            this.setState({
                showErrorName: true,
                errorMessageName: ['This field is required']
            });
            valid = false;
        }

        if(this.state.currencyCode === "") {
            this.setState({
                showErrorCode: true,
                errorMessageCode: ['This field is required']
            });
            valid = false;
        }

        if(this.state.currencySymbol === "") {
            this.setState({
                showErrorSymbol: true,
                errorMessageSymbol: ['This field is required']
            });
            valid = false;
        }
        return valid;
    }

    render() {

        return (
            <div>
                <form>
                    <Box>
                        <BoxBody>
                            <Label isRequired>Currency Code</Label>
                            <Input
                            value={this.state.currencyCode}
                            handleChange={this.handleCode}
                            showErrorMessage={this.state.showErrorCode}
                            placeholder='IDR'
                            errorMessages={this.state.errorMessageCode}
                            />
                            <Label isRequired>Currency Name</Label>
                            <Input
                            value={this.state.currencyName}
                            placeholder='Indonesia Rupiah'
                            handleChange={this.handleName}
                            showErrorMessage={this.state.showErrorName}
                            errorMessages={this.state.errorMessageName}
                            />
                            <Label isRequired>Currency Symbol</Label>
                            <Input
                            value={this.state.currencySymbol}
                            placeholder='Rp'
                            handleChange={this.handleSymbol}
                            showErrorMessage={this.state.showErrorSymbol}
                            errorMessages={this.state.errorMessageSymbol}
                            />
                            <Label>Is Active?</Label>
                            <Switch value={this.state.isActive} onChange={this.handleActive}/>
                        </BoxBody>
                        <BoxFooter>
                            <Button onClick={this.handleSubmit}variant='orange'>Save</Button> &nbsp;
                            <Button onClick={this.handleReset}>Reset</Button>
                        </BoxFooter>
                    </Box>
                </form>
            </div>
        );
    }
}

export default CurrenciesForm;

import React, { Component } from 'react';
import fetch from "isomorphic-unfetch";
import { Box, Switch, Label, BoxBody, BoxFooter, Breadcrumb, Button, Input, NotificationManager } from '@traveloka/soya-components';

class CurrenciesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isDisabled: false,
            currencyId: "",
            isEdit: false,
            currencyName: "",
            currencyCode: "",
            currencySymbol: "",
            isActive: false,
            showErrorCode: false,
            errorMessageCode: [],
            showErrorName: false,
            errorMessageName: [],
            showErrorSymbol: false,
            errorMessageSymbol: [],
            theme: 'zetta'
        }
    }

    componentWillMount = async () => {
        this.setState({theme: localStorage.getItem('theme')});

        const id = this.props.currencyId;
        if (id !== undefined) {
            const res = await fetch("http://soya-training.test.tvlk.cloud:3001/currency/" + id);
            const cur = await res.json();
            const data = await cur['data'];

            this.setState({
                currencyId: id,
                currencyName: data.currency.name,
                currencyCode: data.currency.code,
                currencySymbol: data.currency.symbol,
                isActive: data.currency.isActive,
                theme: localStorage.getItem('theme'),
                isEdit: true
            });
        }
    }

    showSuccessNotif = () => {
        if (this.state.isEdit) {
            NotificationManager.showSuccess('Successfully Edit Currency');
        } else {
            NotificationManager.showSuccess('Successfully Add Currency');
        }
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
        if (!this.state.isEdit) {
            this.setState({
                currencyName: "",
                currencyCode: "",
                currencySymbol: "",
                isActive: false,
                isLoading: false,
                isDisabled: false
            });
        } else {
            this.setState({
                isLoading: false,
                isDisabled: false
            });
        }
    }

    handleSubmit = () => {
        this.setState({
            isLoading: true,
            isDisabled: true
        });

        if (this.state.isEdit) {
            this.handleEdit();
        } else {
            this.handleAdd();
        }
    }

    handleAdd = () => {
        const valid = this.check();
        if(valid) {
            fetch("http://soya-training.test.tvlk.cloud:3001/currency/", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
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
                    this.handleReset();
                    this.showSuccessNotif();
                })
            ).catch(error => {
                this.showErrorNotif();
            });
        }
    }

    handleEdit = () => {
        const valid = this.check();
        if (valid) {
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
                    this.handleReset();
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
        const links = [
            {
              title: 'Soya',
              href: '/'
            },
            {
                title: 'Currencies',
                href: '/currencies'
            },
            {
              title: this.state.isEdit ? 'Edit' : 'Add' ,
            }
          ];

        return (
            <div>
                <br/>
                <Breadcrumb theme={this.state.theme} links={links} />
                <br/>
                <form>
                    <Box theme={this.state.theme}>
                        <BoxBody theme={this.state.theme}>
                            <Label theme={this.state.theme} isRequired>Currency Code</Label>
                            <Input
                            theme={this.state.theme}
                            value={this.state.currencyCode}
                            handleChange={this.handleCode}
                            showErrorMessage={this.state.showErrorCode}
                            placeholder='IDR'
                            errorMessages={this.state.errorMessageCode}
                            isDisabled={this.state.isDisabled}
                            />
                            <Label theme={this.state.theme} isRequired>Currency Name</Label>
                            <Input
                            theme={this.state.theme}
                            value={this.state.currencyName}
                            placeholder='Indonesia Rupiah'
                            handleChange={this.handleName}
                            showErrorMessage={this.state.showErrorName}
                            errorMessages={this.state.errorMessageName}
                            isDisabled={this.state.isDisabled}
                            />
                            <Label theme={this.state.theme} isRequired>Currency Symbol</Label>
                            <Input
                            theme={this.state.theme}
                            value={this.state.currencySymbol}
                            placeholder='Rp'
                            handleChange={this.handleSymbol}
                            showErrorMessage={this.state.showErrorSymbol}
                            errorMessages={this.state.errorMessageSymbol}
                            isDisabled={this.state.isDisabled}
                            />
                            <Label theme={this.state.theme}>Is Active?</Label>
                            <Switch theme={this.state.theme} value={this.state.isActive} onChange={this.handleActive} isDisabled={this.state.isDisabled}/>
                        </BoxBody>
                        <BoxFooter theme={this.state.theme}>
                            <Button loaderProps={{type: 'circular'}} isLoading={this.state.isLoading} theme={this.state.theme} onClick={this.handleSubmit}variant='orange'>Save</Button> &nbsp;
                            <Button theme={this.state.theme} onClick={this.handleReset}>Reset</Button>
                        </BoxFooter>
                    </Box>
                </form>
            </div>
        );
    }
}

export default CurrenciesForm;

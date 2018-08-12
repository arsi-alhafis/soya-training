import React, { Component } from 'react';
import { Breadcrumb, Select, Label } from '@traveloka/soya-components';

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: 'zetta'
        };
    }

    componentDidMount = () => {
        const theme = localStorage.getItem('theme');
        this.setState({ theme });
    }

    handleChange = e => {
        this.setState({ theme: e });
        localStorage.setItem('theme', e);
    }

    render() {
        const links = [
            {
                title: 'Soya',
                href: '/'
            },
            {
                title: 'Settings',
            }
        ];

        const options = [
            {
                label: 'Tera', value: 'tera'
            },
            {
                label: 'Zetta', value: 'zetta'
            }
        ];


        return (
            <div>
                <br />
                <Breadcrumb theme={this.state.theme} links={links} />
                <br />
                <Label theme={this.state.theme}>Theme</Label>
                <Select theme={this.state.theme} handleChange={this.handleChange} value={this.state.theme} options={options} />
            </div>
        );
    }
}

export default Setting;

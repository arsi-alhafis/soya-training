import React, { Component } from 'react';

import { Breadcrumb, Select, Label } from '@traveloka/soya-components';
import Link from 'next/link';

class Home extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     theme: 'zetta'
        // };
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
                <br/>
                <span>
                <Link href='/currencies'>
                    <a>Currencies</a>
                </Link>&nbsp;&nbsp;&nbsp;&nbsp;
                <Link href='/settings'>
                    <a>Settings</a>
                </Link>
                </span>
            </div>
        );
    }
}

export default Home;

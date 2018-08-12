import React, { Component } from 'react';

import { parseQueryString } from '../../../util/util';
import fetch from "isomorphic-unfetch";
import { Table, TableSection, Text, Button } from '@traveloka/soya-components';
import { Loader, LOADER_COLOR, LOADER_TYPE, LOADER_SIZE } from '@traveloka/soya-components';
import createHistory from "history/createBrowserHistory"
import {
    BUTTON_VARIANT,
    BUTTON_SIZE,
    BUTTON_TYPE,
    BUTTON_ICON_POSITION
  } from '@traveloka/soya-components';
  import { Pagination, PAGINATION_TYPE } from '@traveloka/soya-components';
  import { ModalManager, MODAL_TYPE } from '@traveloka/soya-components';
  import Link from 'next/link';
  import { NotificationManager } from '@traveloka/soya-components';

class CurrenciesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: null,
            numberOfPage: 1
        }
    }

    componentDidMount = () => {
        this.refresh();
    }

    changePage = e => {
        const page = e.selected + 1;

        const history = createHistory();
        history.push('?page=' + page);

        this.refresh();
    }

    showSuccessNotif = () => {
        NotificationManager.showSuccess('Successfully Remove Currency');
    }

    showErrorNotif = () => {
        NotificationManager.showError('An Error Occured');
    }

    showConfirmModal = async (id, name) => {
        console.log(id);

        ModalManager.show({
            type: MODAL_TYPE.CONFIRM,
            body: 'Are you sure want to delete ' + name + '?',
            onConfirm: async () => {
                await this.delete(id);
            }
        });
    }

    delete = (id) => {
        fetch("http://soya-training.test.tvlk.cloud:3001/currency/" + id, {
            method: 'delete'
        }).then(response =>
            response.json().then(json => {
                console.log(json);
                this.refresh();
                this.showSuccessNotif();
            })
        ).catch(error => {
            this.showErrorNotif();
        });
    }

    refresh = async () => {
        let page = parseQueryString().page;

        if (page === undefined || page < 1) {
            const history = createHistory();
            history.push('?page=1');
        }

        page = parseQueryString().page;

        const res = await fetch("http://soya-training.test.tvlk.cloud:3001/currency?page=" + page);
        const cur = await res.json();
        const data = await cur['data'];

        this.setState({currencies: data.currencies, numberOfPage: data.pageCount});
    }

    render() {

        return (
            <div>
                <Text tag="h1" marginBottom="md">
                    Currency List
            </Text>
                <Table cellSpacing='sm'>
                    <thead>
                        <tr>
                            <th colSpan={5}>
                                Click <Link href="/currencies/add"><Button variant='blue' iconPosition='left' iconProps={{ icon: 'add' }}>Add</Button></Link> to add new currency data
                            </th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Symbol</th>
                            <th>Is Active?</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.currencies ?
                                this.state.currencies.map(currency => (
                                    <tr key={currency.id}>
                                        <td>{currency.code}</td>
                                        <td>{currency.name}</td>
                                        <td>{currency.symbol}</td>
                                        <td>{currency.isActive ? "a" : "b"}</td>
                                        <td>
                                            <Button
                                                variant="green"
                                                type={BUTTON_TYPE.BUTTON || 'button'}
                                                iconProps={{ icon: 'edit' }}
                                                />
                                                &nbsp;
                                            <Button
                                                variant="red"
                                                onClick={() => this.showConfirmModal(currency.id, currency.name)}
                                                type={BUTTON_TYPE.BUTTON || 'button'}
                                                iconProps={{ icon: 'trash' }}
                                                />
                                        </td>
                                    </tr>
                                ))
                                : 
                                <tr>
                                    <td colSpan={5}>
                                        <Loader />
                                    </td>
                                </tr>
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={5}>
                                <Pagination onPageChange={this.changePage} initialPage={0} totalPage={this.state.numberOfPage} marginBottom />
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        );
    }
}

export default CurrenciesTable;

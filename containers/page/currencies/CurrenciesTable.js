import React, { Component } from 'react';
import { parseQueryString } from '../../../util/util';
import fetch from "isomorphic-unfetch";
import { Table, Button, Icon, Breadcrumb, Loader, Pagination, ModalManager, MODAL_TYPE, NotificationManager } from '@traveloka/soya-components';
import createHistory from "history/createBrowserHistory";
import Link from 'next/link';

class CurrenciesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: undefined,
            deleteLoading: false,
            numberOfPage: 1,
            theme: 'zetta',
            currentPage: 0
        }
    }

    componentDidMount = () => {
        let page = parseQueryString().page !== undefined ? parseQueryString().page : 1;
        this.setState({ theme: localStorage.getItem('theme'), currentPage: page - 1 });
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
            footer: (
                <div>
                  <Button variant='link-black' onClick={() => ModalManager.dismiss()}>
                    Close
                  </Button>
                  <Button loaderProps={{type: 'circular'}} isLoading={this.state.deleteLoading} variant='orange' onClick={() => this.delete(id)}>
                    Yes
                  </Button>
                </div>
              )
        });
    }

    delete = (id) => {
        this.setState({deleteLoading: true});
        fetch("http://soya-training.test.tvlk.cloud:3001/currency/" + id, {
            method: 'delete'
        }).then(response =>
            response.json().then(json => {
                this.setState({deleteLoading: false});
                this.refresh();
                this.showSuccessNotif();
                ModalManager.dismiss();
            })
        ).catch(error => {
            this.showErrorNotif();
            ModalManager.dismiss();
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

        this.setState({ currencies: data.currencies, numberOfPage: data.pageCount });
    }

    render() {

        const links = [
            {
                title: 'Soya',
                href: '/'
            },
            {
                title: 'Currencies',
            }
        ];

        return (
            <div>
                <Breadcrumb theme={this.state.theme} links={links} />
                <br />
                <Table theme={this.state.theme} cellSpacing='sm'>
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
                                        <td>{currency.isActive ? <Icon icon="check" /> : <Icon icon="close" />}</td>
                                        <td>
                                            <Link href={'currencies/edit?id=' + currency.id}>
                                                <Button
                                                    variant="green"
                                                    iconProps={{ icon: 'edit' }}
                                                />
                                            </Link>
                                            &nbsp;
                                            <Button
                                                variant="red"
                                                onClick={() => this.showConfirmModal(currency.id, currency.name)}
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
                    {
                        this.state.currencies !== undefined ?
                            <tfoot>
                                <tr>
                                    <td colSpan={5}>
                                        <Pagination onPageChange={this.changePage} initialPage={this.state.currentPage} totalPage={this.state.numberOfPage} marginBottom />
                                    </td>
                                </tr>
                            </tfoot> : <tfoot></tfoot>
                    }
                </Table>
            </div>
        );
    }
}

export default CurrenciesTable;

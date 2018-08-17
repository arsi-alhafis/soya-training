import Head from "next/head";
import React from 'react';
import { createPageWithOIDCAuth, OIDCAuthorize } from '@traveloka/soya-components/ath';
import CurrenciesEdit from '../../containers/page/currencies/CurrenciesEdit';
import Layout from "../../components/Layout/Layout";

const title = 'Tools';
const heading = 'Edit Currencies';

const IndexPage = () => (
    <OIDCAuthorize>
        <Layout>
            <div>
                <Head>
                    <title>{title}</title>
                </Head>
                <h1>{heading}</h1>
                <CurrenciesEdit />
            </div>
        </Layout>
    </OIDCAuthorize>
);
export default createPageWithOIDCAuth()(IndexPage);
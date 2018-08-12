import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import React from 'react';
import { createPageWithOIDCAuth, OIDCAuthorize } from '@traveloka/soya-components/ath';
import CurrenciesTable from '../../containers/page/currencies/CurrenciesTable';
import { ModalContainer } from '@traveloka/soya-components';

const title = 'Tools';
const heading = 'Currencies';

const IndexPage = () => (
  <OIDCAuthorize>
    <Layout>
      <div>
        <Head>
          <title>{ title }</title>
        </Head>
        <h1>{ heading }</h1>
        <br />
        <CurrenciesTable />
        <ModalContainer />
      </div>
    </Layout>
  </OIDCAuthorize>
);
export default createPageWithOIDCAuth()(IndexPage);
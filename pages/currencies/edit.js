import Head from "next/head";
const Layout = require("../../components/Layout/Layout").default;
import React from 'react';
import { createPageWithOIDCAuth, OIDCAuthorize } from '@traveloka/soya-components/ath';
import CurrenciesForm from '../../containers/page/currencies/CurrenciesFormEdit';
const title = 'Tools';
const heading = 'Edit Currencies';

const IndexPage = () => (
  <OIDCAuthorize>
    <Layout>
      <div>
        <Head>
          <title>{ title }</title>
        </Head>
        <h1>{ heading }</h1>
        <CurrenciesForm />
      </div>
    </Layout>
  </OIDCAuthorize>
);
export default createPageWithOIDCAuth()(IndexPage);
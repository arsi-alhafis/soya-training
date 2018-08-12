import Head from "next/head";
import React from 'react';
import { createPageWithOIDCAuth, OIDCAuthorize } from '@traveloka/soya-components/ath';
import CurrenciesForm from '../../containers/page/currencies/CurrenciesForm';
import Layout from "../../components/Layout/Layout";

const title = 'Tools';
const heading = 'Add Currencies';

const IndexPage = () => (
  <OIDCAuthorize>
    <Layout>
      <div>
        <Head>
          <title>{title}</title>
        </Head>
        <h1>{heading}</h1>
        <CurrenciesForm />
      </div>
    </Layout>
  </OIDCAuthorize>
);
export default createPageWithOIDCAuth()(IndexPage);